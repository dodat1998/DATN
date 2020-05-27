import React, {Component} from 'react';
// import PropTypes from 'prop-types';

import firebase from 'react-native-firebase';

import {StyleSheet, View, Text} from 'react-native';

import CustomButton from '../../components/CustomButton';

/**
 * Just a centered logout button.
 */

export default class HomeScreen extends Component {
  // static propTypes = {
  //   logout: PropTypes.func,
  // };
  state = {user: {}};

  componentDidMount(): void {
    this.setState({user: firebase.auth().currentUser});

    // firebase.auth().onAuthStateChanged(changeUser => {
    //   this.setState({user: changeUser});
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.user.email}</Text>
        <CustomButton
          text={'Logout'}
          onPress={this.props.logout}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <Text onPress={() => firebase.auth().signOut()}>Logout</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1976D2',
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
