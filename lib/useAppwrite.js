import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useAppWrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fn();
      setData(res);
    } catch (e) {
      setIsLoading(false);
      Alert.alert('Error', e.message);
      console.log('error :', e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, fetchData };
};
