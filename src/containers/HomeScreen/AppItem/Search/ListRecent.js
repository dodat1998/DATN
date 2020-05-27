import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function List(props) {
  const name = props.name;
  const onAddRecent = name => {
    props.onAddRecent(name);
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onAddRecent(name)}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: '#C2257F',
  },
  container: {
    height: 40,
    borderColor: '#C2257F',
    padding: 10,
    borderRadius: 20,
    color: '#C2257F',
    borderWidth: 1,
    margin: 10,
  },
});
