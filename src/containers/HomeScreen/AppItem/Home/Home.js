import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// import firebase from 'react-native-firebase';

import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/FontAwesome5';

// import {BarIndicator} from 'react-native-indicators';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function Home(props) {
  const [loading, setLoading] = useState(true);

  const [albums, setAlbum] = useState([]);

  const [singers, setSinger] = useState([]);

  const [top50, setTop50] = useState([]);

  const ref3 = firestore().collection('albums');

  const ref2 = firestore()
    .collection('songs')
    .where('plays', '>', 20)
    .limit(50);

  const ref1 = firestore().collection('singers').where('hearts', '>', 20);

  useEffect(() => {
    // console.log(firebase.auth().currentUser.uid);
    let userId = auth().currentUser.uid;
    let getUser = auth().currentUser;
    let providerData = auth().currentUser.providerData[0];
    firestore()
      .collection('users')
      .doc(userId)
      .collection('infomation')
      .doc(userId)
      .set({
        displayName: providerData.displayName,
        email: providerData.email,
        isAnonymous: getUser.isAnonymous,
        metadata: {
          creationTime: new Date(getUser.metadata.creationTime).toString(),
          lastSignInTime: new Date(getUser.metadata.lastSignInTime).toString(),
        },
        phoneNumber: providerData.phoneNumber,
        photoURL: providerData.photoURL,
        providerData: [
          {
            providerId: providerData.providerId,
            uid: providerData.uid,
          },
        ],
        providerId: providerData.providerId,
        uid: getUser.uid,
      });
  }, []);

  useEffect(() => {
    (async () => {
      const querySnapshot = await ref1.get();
      const singers = [];
      querySnapshot.forEach((doc) => {
        singers.push(doc.data());
      });
      setSinger(
        singers.sort((a, b) => {
          return a.hearts < b.hearts;
        }),
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singers]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await ref3.get();
      const albums = [];
      querySnapshot.forEach((doc) => {
        albums.push(doc.data());
      });
      setAlbum(
        albums.sort((a, b) => {
          return a.name > b.name;
        }),
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [albums]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await ref2.get();
      const songHot = [];
      querySnapshot.forEach((doc) => {
        songHot.push(doc.data());
      });
      setTop50(
        songHot.sort((a, b) => {
          return a.likes > b.likes;
        }),
      );
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [top50]);

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num);
  }

  if (loading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator color={'green'} size={'large'} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            {/*<View style={styles.header}>*/}
            {/*  <Image*/}
            {/*    source={require('./../../../../../images/headphones-512.png')}*/}
            {/*    style={{height: 30, width: 30}}*/}
            {/*  />*/}
            {/*  <Text style={{color: '#1976D2', fontWeight: 'bold', fontSize: 20}}>*/}
            {/*    Home*/}
            {/*  </Text>*/}
            {/*</View>*/}
            <View
              style={[styles.item1, {justifyContent: 'center', marginTop: 10}]}>
              <Text style={styles.title}>Albums</Text>
              <Text
                style={styles.description}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                popular playlist from Soundcloud , have a lot of best song
              </Text>
              <View style={styles.child}>
                <SafeAreaView>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={albums}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('HomeAlbum', {
                            name: item.name,
                            id: item.id,
                            url: item.url,
                          })
                        }>
                        <View style={styles.children}>
                          <Image
                            style={{width: 120, height: 120}}
                            source={{uri: item.url}}
                          />
                          <Text
                            style={[styles.albumName, {marginTop: 10}]}
                            ellipsizeMode={'tail'}
                            numberOfLines={1}>
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.name}
                  />
                </SafeAreaView>
              </View>
            </View>
            {/*<View style={styles.item}>*/}
            {/*  <Text style={styles.title}>Relax</Text>*/}
            {/*  <Text*/}
            {/*    style={styles.description}*/}
            {/*    numberOfLines={1}*/}
            {/*    ellipsizeMode={'tail'}>*/}
            {/*    popular playlist from Soundcloud , have a lot of best song*/}
            {/*  </Text>*/}
            {/*</View>*/}
            {/*<View style={styles.item}>*/}
            {/*  <Text style={styles.title}>Study</Text>*/}
            {/*  <Text*/}
            {/*    style={styles.description}*/}
            {/*    numberOfLines={1}*/}
            {/*    ellipsizeMode={'tail'}>*/}
            {/*    popular playlist from Soundcloud , have a lot of best song*/}
            {/*  </Text>*/}
            {/*</View>*/}
            <View style={styles.item}>
              <Text style={styles.title}>Hot singer</Text>
              <Text
                style={styles.description}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                popular playlist from Soundcloud , have a lot of best song
              </Text>
              <View style={styles.child}>
                <SafeAreaView>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={singers}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('HomeSinger', {
                            id: item.id,
                            name: item.name,
                            likes: item.likes,
                            hearts: item.hearts,
                            url: item.url,
                            description: item.description,
                          })
                        }>
                        <View style={styles.children}>
                          <Image
                            style={{width: 120, height: 120}}
                            source={{uri: item.url}}
                          />
                          <Text
                            style={[styles.albumName, {marginTop: 5}]}
                            ellipsizeMode={'tail'}
                            numberOfLines={1}>
                            {item.name}
                          </Text>
                          {/*<Text style={styles.singer}>{item.singer}</Text>*/}
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              marginTop: 10,
                            }}>
                            {/*<View*/}
                            {/*  style={{*/}
                            {/*    flexDirection: 'row',*/}
                            {/*  }}>*/}
                            {/*  <Icon1 name={'like2'} size={15} color={'#666666'} />*/}
                            {/*  <Text style={{marginLeft: 5, color: '#666666'}}>*/}
                            {/*    {item.likes}*/}
                            {/*  </Text>*/}
                            {/*</View>*/}
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              <SimpleLineIcons
                                name={'user-follow'}
                                size={15}
                                color={'#666666'}
                              />
                              <Text style={{marginLeft: 5, color: '#666666'}}>
                                {kFormatter(item.hearts)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.name}
                  />
                </SafeAreaView>
              </View>
            </View>
            <View style={styles.item2}>
              <Text style={styles.title}>Chart: Top 50</Text>
              <Text
                style={styles.description}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                popular playlist from Soundcloud , have a lot of best song
              </Text>
              <View style={styles.child}>
                <SafeAreaView>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={top50}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('Player', {
                            id: item.id,
                            name: item.name,
                            url: item.url.cover,
                            singer: item.singer,
                            play: item.url.play,
                            likes: item.likes,
                            plays: item.plays,
                          })
                        }>
                        <View style={styles.children}>
                          <Image
                            style={{width: 120, height: 120}}
                            source={{uri: item.url.cover}}
                          />
                          <Text
                            style={[styles.albumName, {marginTop: 5}]}
                            ellipsizeMode={'tail'}
                            numberOfLines={1}>
                            {item.name}
                          </Text>
                          <Text style={styles.singer}>{item.singer}</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              marginTop: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              <Icon
                                name={'headphones'}
                                size={15}
                                color={'#666666'}
                              />
                              <Text style={{marginLeft: 5, color: '#666666'}}>
                                {kFormatter(item.plays)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.name}
                  />
                </SafeAreaView>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e6e6',
    flex: 1,
    // padding: 10,
  },
  item: {
    height: 260,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  item1: {
    height: 240,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  item2: {
    height: 270,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    paddingLeft: 10,
    color: 'black',
    marginTop: 10,
  },
  description: {
    marginLeft: 10,
    fontSize: 17,
    color: '#666666',
  },
  child: {
    marginTop: 10,
  },
  children: {
    marginLeft: 10,
    height: 180,
    width: 120,
    marginRight: 10,
  },
  albumName: {
    fontSize: 15,
    color: '#666666',
  },
  singer: {
    fontSize: 11,
    color: '#666666',
  },
  header: {
    backgroundColor: 'white',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
