import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const APICall = () => {
  const [data, setData] = useState<null | { activity: string }>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://bored-api.appbrewery.com/random');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {data ? <Text>{data.activity}</Text> : <Text>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default APICall;
