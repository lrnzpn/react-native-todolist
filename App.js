import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
// import {uuid} from 'uuidv4';

// bring components
import Header from './components/Header';
import AddItem from './components/AddItem';
import ListItem from './components/ListItem';

// functional components
const App = () => {
  const [items, setItems] = useState([
    // hard coded data
    {
      id: uuid(),
      text: 'Eat',
    },
    {
      id: uuid(),
      text: 'Sleep',
    },
    {
      id: uuid(),
      text: 'Code',
    },
    {
      id: uuid(),
      text: 'Cry',
    },
  ]);

  const deleteItem = (id) => {
    setItems((prevItems) => {
      // not get the one to be deleted
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const addItem = (text) => {
    // validation if empty
    if (!text) {
      Alert.alert('Error', 'Please enter an item', {text: 'OK'});
    } else {
      setItems((prevItems) => {
        // spread operator to append new object infront of array
        return [{id: uuid(), text}, ...prevItems];
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Todo List" />
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem item={item} deleteItem={deleteItem} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
});

// since uuid doesn't work because of some issues,
// here is a function that would perform the same thing
// source: https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
const uuid = () => {
  let dt = new Date().getTime();
  let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return id;
};

export default App;
