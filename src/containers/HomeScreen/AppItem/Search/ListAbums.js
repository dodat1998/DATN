import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

export default function ListAlbums(props) {
  const name = props.name;
  return (
    <ImageBackground
      style={{
        width: 190,
        height: 120,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7,
      }}
      source={{
        uri: props.urlPath,
      }}>
      <Text style={styles.text}>{name}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    // opacity: 1,
  },
});
