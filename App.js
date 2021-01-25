import React, { Component } from 'react';
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

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };

    this.keyExtractor = this.keyExtractor.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json });
      })
      .catch(error => console.error(`Oops! ... something went wrong`))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  keyExtractor(item) {
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

  render() {
    const { data, isLoading } = this.state;

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
}
