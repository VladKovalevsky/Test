import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: 20,
  },
  content: {
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 12,
  }
});

export default function App {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData()
  })

  const fetchData = useMemo(() => async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts').json()
      setData(response)
    } catch(e) {
      console.error(`Oops! ... something went wrong`, e)
    } finally {
      setIsLoading(false)
    }
  })

  const keyExtractor = item => {
    return item.id;
  }

  renderItem({ item }) {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    );
  }

  return (
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        )}
      </View>
  );
}
