import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import Icon1 from 'react-native-vector-icons/Ionicons';

// import firebase from 'react-native-firebase';

import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

export default function PFProfile({route, navigation}) {
  console.disableYellowBox = true;
  const {uid} = route.params;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [adress, setAdress] = useState('');
  const [avatar, setAvatar] = useState('');

  const ref1 = firestore().collection('users');

  const onUpdate = () => {
    if ((name !== '', phone !== '', gender !== '', adress !== '')) {
      firestore()
        .collection('users')
        .doc(uid)
        .collection('infomation')
        .doc(uid)
        .update({
          displayName: name,
          phoneNumber: phone,
          gender,
          adress,
        })
        .then(() => alert('Update complete'));
    }
  };

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(uid)
      .collection('infomation')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setName(doc.data().displayName);
          setAdress(doc.data().adress);
          setGender(doc.data().gender);
          setPhone(doc.data().phoneNumber);
          setUser(doc.data());
          // console.log(doc.data());
        });
      })
      .then(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return (
      <ImageBackground
        source={{
          uri:
            'https://i.pinimg.com/originals/fe/e5/ea/fee5eab30a698c169dc4fd5752359c2c.jpg',
        }}
        style={{height: '100%', width: '100%'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'white'} />
        </View>
      </ImageBackground>
    );
  }
  return (
    <ImageBackground
      source={{
        uri:
          'https://i.pinimg.com/originals/fe/e5/ea/fee5eab30a698c169dc4fd5752359c2c.jpg',
      }}
      style={{height: '100%', width: '100%'}}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              // marginLeft: 10,
              height: 60,
              width: 60,
              borderRadius: 30,
              // backgroundColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon1 name={'md-arrow-round-back'} size={30} color={'white'} />
          </TouchableOpacity>
          <View
            style={{
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {!user.photoURL ? (
              <TouchableOpacity
                style={{
                  borderWidth: 5,
                  borderColor: 'black',
                  padding: 20,
                  height: 150,
                  width: 150,
                  borderRadius: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={'camera'} size={70} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: user.photoURL,
                  }}
                  style={{height: '100%', width: '100%', borderRadius: 100}}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{padding: 20}}>
            <View>
              <Text style={{fontSize: 20}}>Email</Text>
              <TextInput
                style={{
                  height: 50,
                  backgroundColor: '#cccccc',
                  paddingLeft: 10,
                  borderRadius: 5,
                  fontSize: 20,
                }}
                placeholderTextColor={'black'}
                placeholder={user.email}
                editable={false}
              />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 20}}>Name</Text>
              <TextInput
                style={{
                  height: 50,
                  backgroundColor: 'white',
                  paddingLeft: 10,
                  borderRadius: 5,
                  fontSize: 20,
                }}
                placeholder={name}
                placeholderTextColor={'black'}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 20}}>Phone</Text>
              <TextInput
                style={{
                  height: 50,
                  backgroundColor: 'white',
                  paddingLeft: 10,
                  borderRadius: 5,
                  fontSize: 20,
                }}
                placeholder={phone}
                onChangeText={(text) => setPhone(text)}
                placeholderTextColor={'black'}
              />
            </View>
            <View style={{marginTop: 20, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 20}}>Signin With</Text>

                {/*<TouchableOpacity>*/}
                {/*  <View style={styles.datePickerBox}>*/}
                {/*    <Text style={styles.datePickerText}>{DateText}</Text>*/}
                {/*  </View>*/}
                {/*</TouchableOpacity>*/}

                {/*/!* Place the dialog component at end of your views and assign the references, event handlers to it.*!/*/}
                {/*<DatePickerDialog*/}
                {/*  ref="DatePickerDialog"*/}
                {/*  onDatePicked={onDatePickedFunction}*/}
                {/*/>*/}
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: '#cccccc',
                    paddingLeft: 10,
                    borderRadius: 5,
                    fontSize: 20,
                  }}
                  placeholderTextColor={'black'}
                  placeholder={user.providerData[0].providerId}
                  editable={false}
                />
              </View>
              <View style={{flex: 1, marginLeft: 10}}>
                <Text style={{fontSize: 20}}>gender</Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: 'white',
                    paddingLeft: 10,
                    borderRadius: 5,
                    fontSize: 20,
                  }}
                  placeholder={gender}
                  onChangeText={(text) => setGender(text)}
                  placeholderTextColor={'black'}
                />
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 20}}>Adress</Text>
              <TextInput
                placeholder={adress}
                style={{
                  height: 50,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  paddingLeft: 10,
                  fontSize: 20,
                }}
                // multiline={true}
                onChangeText={(text) => setAdress(text)}
                placeholderTextColor={'black'}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={onUpdate}
                style={{
                  height: 50,
                  backgroundColor: 'white',
                  marginTop: 20,
                  borderRadius: 25,
                  width: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    color: '#1976D2',
                    fontWeight: 'bold',
                  }}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  datePickerBox: {
    borderRadius: 4,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 5,
  },

  datePickerText: {
    fontSize: 20,
    marginLeft: 5,
    borderWidth: 0,
    color: '#000',
  },
});
