import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Button,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {ListItem} from 'react-native-elements';

// import firebase from 'react-native-firebase';

import firestore from '@react-native-firebase/firestore';

// import {BarIndicator} from 'react-native-indicators';

export default function HomeSinger({route, navigation}) {
  console.disableYellowBox = true;

  const {id} = route.params;
  const {name} = route.params;
  const {url} = route.params;
  const {likes} = route.params;
  const {hearts} = route.params;
  const {description} = route.params;

  const [song, setSong] = useState([]);
  const [loading, setLoading] = useState(true);

  const ref3 = firestore().collection('songs').where('singer', '==', name);

  useEffect(() => {
    (async () => {
      const querySnapshot = await ref3.get();
      const songs = [];
      querySnapshot.forEach((doc) => {
        songs.push(doc.data());
      });
      setSong(
        songs.sort((a, b) => {
          return a.name > b.name;
        }),
      );
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song]);

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num);
  }

  if (loading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator size={'large'} color={'green'} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./../../../../../images/abstract-background-mobile-fluid-shapes-with-gradient-effect_79603-560.jpg')}
        style={{height: '100%', width: '100%', flex: 1}}>
        <View style={{marginTop: 64, alignItems: 'center'}}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{uri: url}} />
          </View>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.statContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>{kFormatter(likes)}</Text>
            <Text style={styles.statTitle}>likes</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>{kFormatter(hearts)}</Text>
            <Text style={styles.statTitle}>Follwers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>70</Text>
            <Text style={styles.statTitle}>Following</Text>
          </View>
        </View>
        <View style={{padding: 10, alignItems: 'center'}}>
          <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={{color: 'white'}}>
            {description}
          </Text>
        </View>
      </ImageBackground>
      <View
        style={{
          flex: 1,
          padding: 10,
        }}>
        <FlatList
          data={song}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Player', {
                  id: item.id,
                  name: item.name,
                  url: item.url.cover,
                  singer: item.singer,
                  play: item.url.play,
                  likes: item.likes,
                  plays: item.plays,
                })
              }>
              <ListItem
                key={item.index}
                leftAvatar={{source: {uri: item.url.cover}}}
                title={item.name}
                titleStyle={{color: 'black'}}
                subtitle={item.singer}
                // bottomDivider
                style={{marginTop: 5, borderRadius: 10}}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    shadowColor: '#152734',
    shadowRadius: 30,
    shadowOpacity: 0.4,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 32,
    color: 'white',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statAmount: {
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
  },
  statTitle: {
    color: '#C3C5CD',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
