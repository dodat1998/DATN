import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import Slider from '@react-native-community/slider';

import Icon from 'react-native-vector-icons/AntDesign';

import Feather from 'react-native-vector-icons/Feather';

import Ionicon from 'react-native-vector-icons/Ionicons';

import Octicons from 'react-native-vector-icons/Octicons';

import Moment from 'moment';

export default function Player({route, navigation}) {
  const [trackLength, setTrackLength] = useState(300);

  const [timeElapsed, setTimeElapsed] = useState('0:00');

  const [timeRemaining, setTimeRemaining] = useState('5:00');

  const [name, setName] = useState('');

  const [singger, setSinger] = useState('');

  const [url, setUrl] = useState('');

  const [play, setPlay] = useState('');

  this.spinValue = new Animated.Value(0);

  useEffect(() => {
    spin();
  });

  const spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 120000,
      easing: Easing.linear,
    }).start(() => spin());
  };

  const spin1 = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setName(route.params.name);
    setSinger(route.params.singer);
    setPlay(route.params.play);
    setUrl(route.params.url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, singger, url]);

  const changeTime = (seconds) => {
    setTimeElapsed(Moment.utc(seconds * 1000).format('m:ss'));
    setTimeRemaining(Moment.utc((trackLength - seconds) * 1000).format('m:ss'));
  };

  return (
    <SafeAreaView style={style.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <Ionicon name={'md-arrow-back'} size={30} color={'white'} />
      </TouchableOpacity>
      <View style={{alignItems: 'center', marginTop: 24}}>
        <View style={{alignItems: 'center'}}>
          <Text style={[style.textLight, {fontSize: 12}]}>PLAYLIST</Text>
          <Text
            style={[
              style.text,
              {fontSize: 15, fontWeight: '500', marginTop: 8},
            ]}>
            Subcriber in to APP
          </Text>
        </View>
        <View style={style.coverContainer}>
          {url ? (
            <Animated.Image
              style={{
                width: 250,
                height: 250,
                borderRadius: 125,
                transform: [{rotate: spin1}],
              }}
              source={{uri: url}}
            />
          ) : (
            <Text />
          )}
        </View>
        <View style={{alignItems: 'center', marginTop: 32}}>
          <Text style={[style.textDark, {fontSize: 20, fontWeight: '500'}]}>
            {name}
          </Text>
          <Text style={[style.text, {marginTop: 8, fontSize: 16}]}>
            Ca sĩ : {singger}
          </Text>
        </View>
      </View>
      <View style={{margin: 32}}>
        <Slider
          minimumValue={0}
          maximumValue={trackLength}
          trackStyle={style.track}
          minimumTrackTintColor={'#93A8B3'}
          onValueChange={(seconds) => changeTime(seconds)}
        />
        <View
          style={{
            marginTop: -5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={[style.textLight, style.timeStamp]}>{timeElapsed}</Text>
          <Text style={[style.textLight, style.timeStamp]}>
            {timeRemaining}
          </Text>
        </View>
      </View>
      <View
        style={{
          // // marginTop: 32,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity>
          <Icon name={'stepbackward'} size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert('play')}
          style={style.playButtonContainer}>
          <Feather style={{marginLeft: 10}} name={'play'} size={60} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name={'stepforward'} size={40} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEC',
  },
  textLight: {
    color: '#B6B7BF',
  },
  text: {
    color: '#8E97A6',
  },
  textDark: {
    color: '#8E97A6',
  },
  coverContainer: {
    marginTop: 32,
    width: 250,
    height: 250,
    shadowColor: '#5D3F6A',
    shadowOffset: {height: 15},
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  cover: {
    height: 250,
    width: 250,
    borderRadius: 125,
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#FFF',
  },
  thumb: {
    width: 8,
    height: 8,
    backgroundColor: '#3D425C',
  },
  timeStamp: {
    fontSize: 11,
    fontWeight: '500',
  },
  playButtonContainer: {
    backgroundColor: '#FFF',
    borderColor: 'rgba(93,63,106,0.2)',
    borderWidth: 10,
    width: 100,
    height: 100,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 32,
    shadowColor: '#5D3F6A',
    shadowRadius: 32,
    shadowOpacity: 0.5,
  },
});
