import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

import {ListItem} from 'react-native-elements';

// import firebase from 'react-native-firebase';

import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

import Icon from 'react-native-vector-icons/Feather';

export default function Profile({navigation}) {
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged((userChange) => {
      setUser(userChange);
      // console.log(userChange);
      setTimeout(() => setLoading(false), 1000);
    });
  }, [user]);
  if (loading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator color={'green'} size={'large'} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() =>
              navigation.navigate('ProfileDetail', {
                uid: user.uid,
              })
            }>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                marginBottom: 5,
                height: 60,
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 10,
              }}>
              {user.photoURL && (
                <Image
                  source={{uri: user.photoURL}}
                  style={{height: 40, width: 40, borderRadius: 25}}
                />
              )}
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 'bold',
                }}>
                {user.email || user.displayName}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                marginBottom: 5,
                height: 60,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: 20,
              }}>
              <Icon name={'edit'} size={20} />
            </View>
          </TouchableOpacity>

          <View style={styles.item}>
            <ListItem
              containerStyle={{
                backgroundColor: 'white',
                borderColor: '#f2f2f2',
                borderBottomWidth: 5,
              }}
              title={'Playlist'}
              titleStyle={{color: 'black'}}
              leftIcon={{name: 'headset', color: 'black'}}
              bottomDivider
              chevron
            />
            <ListItem
              containerStyle={{
                backgroundColor: 'white',
                borderColor: '#f2f2f2',
                borderBottomWidth: 5,
              }}
              title={'Albums'}
              titleStyle={{color: 'black'}}
              leftIcon={{name: 'theaters', color: 'black'}}
              bottomDivider
              chevron
            />
            <ListItem
              containerStyle={{
                backgroundColor: 'white',
                borderColor: '#f2f2f2',
                borderBottomWidth: 5,
              }}
              title={'Following'}
              titleStyle={{color: 'black'}}
              leftIcon={{name: 'people', color: 'black'}}
              bottomDivider
              chevron
            />
            <ListItem
              containerStyle={{
                backgroundColor: 'white',
              }}
              title={'Stations'}
              titleStyle={{color: 'black'}}
              leftIcon={{name: 'track-changes', color: 'black'}}
              chevron
            />
          </View>
          <View style={styles.item1}>
            <Text style={{fontSize: 20, color: 'black'}}>Recently played</Text>
          </View>
          <View style={styles.item2} />
          <View
            style={{
              height: 50,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <TouchableOpacity onPress={() => auth().signOut()}>
              <Text style={{fontSize: 20, fontWeight: '600', color: 'red'}}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e6e6',
    flex: 1,
    padding: 10,
  },
  item: {
    height: 220,
    backgroundColor: 'white',
    // marginTop: 20,
  },
  item1: {
    marginTop: 8,
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    color: 'red',
  },
  item2: {
    height: 350,
    backgroundColor: 'white',
  },
  item3: {
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: 5,
    // borderTopColor: 'black',
    // borderTopWidth: 1,
  },
  button: {
    backgroundColor: '#1976D2',
    margin: 20,
  },
});
