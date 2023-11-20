// src/models/count.ts
import { WSS_URL_DEV, WSS_URL_PROD } from '@/common/contanst/constanst';
import { getAccessToken, getInfoFromAccessToken } from '@/utils/localStorage';
import { useModel } from '@umijs/max';
import mqtt from 'mqtt';
import { useEffect, useMemo } from 'react';

export default () => {
  const connectUrl = process.env.NODE_ENV === 'production' ? WSS_URL_PROD : WSS_URL_DEV;
  const { initialState } = useModel('@@initialState');

  const accessToken = getAccessToken();

  const options = {
    clean: true, // retain session
    connectTimeout: 4000, // Timeout period
    // Authentication information
    clientId: Math.random().toString(16),
    username: 'unused',
    password: accessToken || '',
  };
  const client = useMemo(() => mqtt.connect(connectUrl, options), []);
  const handleReconnect = () => {
    console.log('Reconnecting:');
  };
  const handleError: mqtt.OnErrorCallback = (error) => {
    console.log('Connection failed:', error);
  };
  useEffect(() => {
    if (initialState?.currentUser) {
      if (!client) return;
      client.removeAllListeners('message');

      const decoded = getInfoFromAccessToken();
      const allTopic = decoded?.acl?.sub;
      client.on('connect', function () {
        /**
         * @description set setMaxListeners
         */
        client.setMaxListeners(20);
        allTopic?.forEach((topic: string) => {
          client.subscribe(topic, function (err) {
            if (err) {
              console.log('subscribe', topic, 'error:', err);
            } else {
              // console.log('subscribe success', topic);
            }
          });
        });
      });

      client.on('reconnect', handleReconnect);
      client.on('error', handleError);
    }
    return () => {
      client?.removeAllListeners?.('message');
    };
  }, [client, initialState]);

  return {
    mqttClient: client,
  };
};
