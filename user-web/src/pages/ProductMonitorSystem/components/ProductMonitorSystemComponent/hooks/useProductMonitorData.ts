import { dataDemoProduct } from '@/pages/data-demo';
import { formatNumberOrString } from '@/utils/format';
import { useModel, useRequest } from '@umijs/max';
import { useInterval } from 'ahooks';
import mqtt from 'mqtt/*';
import { useEffect, useMemo, useState } from 'react';
// default Device Map
const deviceIdMap = [
  {
    name: 'Coating Gum',
    id: '7ae3e672-8c37-11ee-aa64-35945e245523',
  },
  {
    name: 'Lamination',
    id: '7ae3e671-8c37-11ee-aa64-35945e245523',
  },
  {
    name: 'Executive 1',
    id: '7ae45ba0-8c37-11ee-aa64-35945e245523',
  },
  {
    name: 'Executive 2',
    id: '7ae3e670-8c37-11ee-aa64-35945e245523',
  },
  {
    name: '3D',
    id: '7aef0a00-8c37-11ee-aa64-35945e245523',
  },
  {
    name: 'Bosch Bipack 1 & 2',
    id: '7b118620-8c37-11ee-aa64-35945e245523',
  },
  {
    name: 'Auto Bottle line 1',
    id: '7af4d660-8c37-11ee-aa64-35945e245523',
  },
  {
    name: 'Auto Bottle line 2',
    id: '7af9df70-8c37-11ee-aa64-35945e245523',
  },
];
const findDeviceById = (deviceId?: null | string) => {
  return deviceIdMap.find((item) => item.id === deviceId);
};
const deviceNames = deviceIdMap.map((item) => item.name);
//
const getDeviceIdFromTopic = (topic: string): string | null => {
  try {
    const pattern = /meigroup\/things\/v2\/([^/]+)\/telemetry/;

    const match = topic.match(pattern);

    if (match && match.length > 1) {
      const id = match[1];
      return id;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const useProductMonitorData = () => {
  const [data, setData] = useState(dataDemoProduct);
  const { loading } = useRequest(
    async () => {
      return {
        data: dataDemoProduct,
      };
    },
    {
      onSuccess(data) {
        setData(data);
      },
    },
  );

  useInterval(() => {
    setData((prev) =>
      prev.map((zone) => ({
        ...zone,
        data: zone.data.map((zoneItem) => ({
          ...zoneItem,
          data: zoneItem.data.map((product) => ({
            ...product,
            actual: (() => {
              if (
                // zone.zone === 'Semi-finished Goods' &&
                zoneItem.productName === 'Gum' &&
                deviceNames.includes(product.label || '')
              ) {
                // chỗ này để realtime
                return product.actual;
              }
              return product.actual + 1;
            })(),
          })),
        })),
      })),
    );
  }, 1000 * 30); // 30 seconds
  const totalTarget = useMemo(
    () =>
      data.reduce((prev, zone) => {
        let res = prev;
        zone.data.forEach((zoneItem) =>
          zoneItem.data.forEach((product) => {
            res = res + product.hourlyTarget;
          }),
        );
        return res;
      }, 0),
    [data],
  );
  const totalActual = useMemo(
    () =>
      data.reduce((prev, zone) => {
        let res = prev;
        zone.data.forEach((zoneItem) =>
          zoneItem.data.forEach((product) => {
            res = res + product.actual;
          }),
        );
        return res;
      }, 0),
    [data],
  );
  /**
   * @description realtime data
   *
   */
  const { mqttClient } = useModel('MQTTNotification');
  const handleOnMessage: mqtt.OnMessageCallback = (topic, msg) => {
    try {
      const deviceId = getDeviceIdFromTopic(topic);
      const deviceName = findDeviceById(deviceId)?.name;
      type DataType = { ts: string; key: string; value: number };
      const data: DataType[] = JSON.parse(msg.toString());
      const dataReceive = {
        deviceId,
        deviceName,
        data: data.find((item) => item.key === 'counter'),
      };

      if (dataReceive.data && dataReceive.deviceId && dataReceive.deviceName) {
        setData((prev) =>
          prev.map((zone) => ({
            ...zone,
            data: zone.data.map((zoneItem) => ({
              ...zoneItem,
              data: zoneItem.data.map((product) => ({
                ...product,
                actual: (() => {
                  if (
                    // zone.zone === 'Semi-finished Goods' &&
                    zoneItem.productName === 'Gum' &&
                    deviceNames.includes(product.label || '')
                  ) {
                    // chỗ này để realtime
                    if (product.label === dataReceive.deviceName) {
                      return (
                        formatNumberOrString(dataReceive.data?.value || product.actual, {
                          default: product.actual,
                          digits: 2,
                        }) || product.actual
                      );
                    }

                    return product.actual;
                  }
                  return product.actual;
                })(),
              })),
            })),
          })),
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    mqttClient.on('message', handleOnMessage);
    return () => {
      mqttClient.off('message', handleOnMessage);
    };
  }, [mqttClient]);

  return useMemo(
    () => ({
      data,
      totalActual: formatNumberOrString(totalActual, { default: totalActual, digits: 2 }) as number,
      totalTarget: formatNumberOrString(totalTarget, { default: totalTarget, digits: 2 }) as number,
      totalDiff: formatNumberOrString(totalActual - totalTarget, {
        default: totalActual - totalTarget,
        digits: 2,
      }) as number,
      loading,
    }),
    [data, totalActual, totalTarget, loading],
  );
};
