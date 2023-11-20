import { dataDemoProduct } from '@/pages/data-demo';
import { formatNumberOrString } from '@/utils/format';
import { useModel, useRequest } from '@umijs/max';
import { useInterval } from 'ahooks';
import mqtt from 'mqtt/*';
import { useEffect, useMemo, useState } from 'react';

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
                zone.zone === 'Semi-finished Goods' &&
                zoneItem.productName === 'Gum' &&
                ['Coating Gum', 'Lamination'].includes(product.label || '')
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
      const deviceIdMap = {
        '8d472440-874f-11ee-b281-07dc49710156': 'Coating Gum',
        '32375800-8708-11ee-b281-07dc49710156': 'Lamination',
      };
      const deviceId = getDeviceIdFromTopic(topic);
      const deviceName = deviceIdMap?.[deviceId as keyof typeof deviceIdMap];
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
                    zone.zone === 'Semi-finished Goods' &&
                    zoneItem.productName === 'Gum' &&
                    ['Coating Gum', 'Lamination'].includes(product.label || '')
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
      totalActual,
      totalTarget,
      totalDiff: formatNumberOrString(totalActual - totalTarget, {
        default: 0,
      }) as number,
      loading,
    }),
    [data, totalActual, totalTarget, loading],
  );
};
