import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';

// import {BarIndicator} from 'react-native-indicators';

// import firebase from 'react-native-firebase';

import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

import Icon from 'react-native-vector-icons/FontAwesome';
import Shazam from 'react-native-vector-icons/Fontisto';

import Item from './SearchItem';
import List from './ListRecent';

export default function Search(props) {
  const [text, setText] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [songItems, setSongItems] = useState(null);
  const [singer, setSinger] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const ref = firestore().collection('recents');
  const ref1 = firestore().collection('singers');
  const ref2 = firestore().collection('songs');

  useEffect(() => {
    (async () => {
      const querySnapshot = await ref.limit(9).get();
      const song = [];
      querySnapshot.forEach((doc) => {
        song.push({
          id: doc.id,
          name: doc.data().text,
        });
      });
      setText(song);
      setIsLoading(true);
    })();

    // (async () => {
    //   const querySnapshot = await ref2.get();
    //   const song = [];
    //   querySnapshot.forEach(doc => {
    //     song.push(doc.data());
    //   });
    //   setSongItems(song);
    // })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchFilterFunction = (text) => {
    setTextSearch(text);

    (async () => {
      const querySnapshot = await ref2.get();
      const song = [];
      querySnapshot.forEach((doc) => {
        song.push(doc.data());
      });
      setSongItems(
        song.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        }),
      );
    })();

    (async () => {
      const querySnapshot = await ref1.get();
      const singer = [];
      querySnapshot.forEach((doc) => {
        singer.push(doc.data());
      });
      setSinger(
        singer.filter((item) => {
          return item.name.toLowerCase().indexOf(text) !== -1;
        }),
      );
    })();
  };

  const addRecents = () => {
    if (textSearch !== '') {
      ref.add({
        text: textSearch,
      });
      // console.log(this.state.textSearch.length);
    } else {
      alert('Nhập để tìm kiếm');
    }
  };

  const printSong = () => {
    if (textSearch === '') {
      return (
        <SafeAreaView>
          <ScrollView>
            <View>
              <View style={styles.container2}>
                <Text style={styles.header}>LỊCH SỬ</Text>
              </View>
              <View
                style={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                {text.map((item, index) => (
                  <List
                    key={index}
                    name={item.name}
                    onAddRecent={addRecentTOState}
                  />
                ))}
              </View>
              {text.length > 9 ? (
                <View />
              ) : (
                <View style={{alignItems: 'center', paddingHorizontal: 10}}>
                  <TouchableOpacity onPress={loadMoreData}>
                    <Text style={{fontSize: 17, color: '#C2257F'}}>
                      Xem Thêm
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={{height: 140, paddingLeft: 10}}>
            {singer ? (
              <Text style={{fontSize: 25, color: 'black'}}>Ca sĩ </Text>
            ) : (
              <View />
            )}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={singer}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('SearchDetail', {
                      id: item.id,
                      name: item.name,
                      likes: item.likes,
                      hearts: item.hearts,
                      url: item.url,
                      description: item.description,
                    })
                  }>
                  <View style={styles.findSinger}>
                    <Image
                      source={{
                        uri: item.url,
                      }}
                      style={{height: 70, width: 70, borderRadius: 35}}
                    />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={{color: '#059cff'}}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
          <View>
            <Text style={{marginLeft: 10, fontSize: 25, color: 'black'}}>
              Bài hát{' '}
            </Text>
            <FlatList
              data={songItems}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Player', {
                      name: item.name,
                      url: item.url.cover,
                      singer: item.singer,
                      play: item.url.play,
                      likes: item.likes,
                      plays: item.plays,
                    })
                  }>
                  <Item
                    key={index}
                    // onDelete={this.onDelete}
                    // onPlayer={onPlayer}
                    // id={item.id}
                    onload={() => props.navigation.navigate('Player')}
                    name={item.name}
                    singer={item.singer}
                    url={item.url.cover}
                    urlPlay={item.play}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        </View>
      );
    }
  };

  const loadMoreData = () => {
    ref.onSnapshot((snapshot) => {
      const texts = [];
      snapshot.forEach((doc) => {
        texts.push({
          id: doc.id,
          name: doc.data().text,
        });
      });
      setText(texts);
      // console.log(this.state.text);
    });
  };

  const addRecentTOState = (name) => {
    searchFilterFunction(name);
    setTextSearch(name);
  };

  if (!isLoading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator color={'green'} size={'large'} />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <View style={styles.left}>
            <TouchableOpacity>
              <Icon name="search" size={25} color="#dcdcdc" />
            </TouchableOpacity>
            <TextInput
              placeholder="Tìm kiếm ..."
              style={styles.textInput}
              onChangeText={(text) => searchFilterFunction(text)}
              autoCapitalize={'none'}
              value={textSearch}
            />
          </View>
          <View style={styles.right}>
            <View>
              <TouchableOpacity onPress={addRecents}>
                <Shazam name={'shazam'} size={50} color={'#059cff'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>{printSong()}</View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    padding: 10,
    // paddingHorizontal: 10,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  left: {
    height: 50,
    backgroundColor: '#ffffff',
    flex: 1,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 30,
    shadowColor: '#152734',
    shadowRadius: 20,
    shadowOpacity: 0.4,
  },
  right: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 7,
  },
  main: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    height: '100%',
    width: 60,
    borderRadius: 30,
  },
  textInput: {
    marginLeft: 10,
    fontSize: 20,
    width: 250,
  },
  header: {
    fontSize: 25,
  },
  container2: {
    marginHorizontal: 15,
    // marginBottom: 15,
  },
  flatList: {
    flexWrap: 'wrap',
  },
  content: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  item: {
    padding: 10,
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  findSinger: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
