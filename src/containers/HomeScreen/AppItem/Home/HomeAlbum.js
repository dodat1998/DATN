import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// import firebase from 'react-native-firebase';

import firestore from '@react-native-firebase/firestore';

import {ListItem} from 'react-native-elements';

export default function HomeAlbum({route, navigation}, props) {
  console.disableYellowBox = true;

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const [loading, setLoading] = useState(true);

  const [songs, setSong] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setName(route.params.name);
    setId(route.params.id);
    setUrl(route.params.url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, name, url]);

  const ref3 = firestore()
    .collection('songs')
    .where('category', 'array-contains', name);

  useEffect(() => {
    (async () => {
      const querySnapshot = await ref3.get();
      const song = [];
      querySnapshot.forEach((doc) => {
        song.push(doc.data());
      });
      setSong(
        song.sort((a, b) => {
          return a.name > b.name;
        }),
      );
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songs]);

  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection('songs')
  //     .add({
  //       category: ['Cover'],
  //       likes: 0,
  //       name: 'Anh thanh niên ',
  //       plays: 0,
  //       singer: 'Hương L',
  //       url: {
  //         cover: 'https://i.kfs.io/album/global/70160979,0v1/fit/500x500.jpg',
  //         play:
  //           'https://mp3cdna.ytjar.xyz/get.php/6/6_exaWxp_MQ.mp3?h=Nu7_UFSYlCI5QWyitYPeig&s=1585301775&n=Anh-Thanh-Nien-HuyR-HUONG-LY-COVER',
  //       },
  //     })
  //     .then(() => console.log('created'));
  // }, []);

  if (loading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator color={'green'} size={'large'} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/*<View style={{margin: 10, backgroundColor: 'white', height: 50}}>*/}
      {/*  <Text>Tim kiem</Text>*/}
      {/*</View>*/}
      <View
        style={{
          padding: 10,
        }}>
        <FlatList
          data={songs}
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
              }
              key={item.index}>
              <ListItem
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
