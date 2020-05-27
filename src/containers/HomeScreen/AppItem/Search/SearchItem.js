import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Item(props) {
  const name = props.name;
  const url = props.url;
  const singer = props.singer;
  const id = props.id;
  const play = props.urlPlay;
  const data = [{name, id, url, singer, play}];

  // const onPlayer = data => {
  //   props.onPlayer(data);
  // };
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={{uri: url}}
          style={{height: 50, width: 50, borderRadius: 10}}
        />
      </View>
      <View style={styles.right}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{fontSize: 20, color: 'black'}}>
          {name}
        </Text>
        <Text style={{fontSize: 17, color: 'black'}}>{singer}</Text>
      </View>
      <View style={styles.close}>
        <Icon
          // onPress={() => this.onDelete(`${this.props.id}`)}
          name="download"
          size={25}
          color="black"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    // marginTop: 10,
    // flex: 1,
  },
  left: {
    height: 50,
    width: '15%',
  },
  right: {
    height: 50,
    width: '75%',
    flexDirection: 'column',
    paddingLeft: 10,
  },
  close: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '10%',
  },
});
