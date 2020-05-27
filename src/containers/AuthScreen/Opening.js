import React, {Component} from 'react';
// import PropTypes from 'prop-types';

import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-animatable';

import CustomButton from '../../components/CustomButton';
import metrics from '../../config/metrics';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Opening extends Component {
  // static propTypes = {
  //   onCreateAccountPress: PropTypes.func.isRequired,
  //   onSignInPress: PropTypes.func.isRequired,
  // };

  render() {
    return (
      <View style={styles.container}>
        <View animation={'zoomIn'} delay={600} duration={400}>
          <CustomButton
            text={'Create Account'}
            onPress={this.props.onCreateAccountPress}
            buttonStyle={styles.createAccountButton}
            textStyle={styles.createAccountButtonText}
          />
        </View>
        <View
          style={styles.separatorContainer}
          animation={'zoomIn'}
          delay={700}
          duration={400}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{'Or'}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View animation={'zoomIn'} delay={800} duration={400}>
          <CustomButton
            text={'Sign In'}
            onPress={this.props.onSignInPress}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>
        <View
          style={styles.separatorContainer}
          animation={'zoomIn'}
          delay={700}
          duration={400}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{'And'}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View
          animation={'zoomIn'}
          delay={800}
          duration={400}
          style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={this.props.Loginfacebook}
            style={[
              styles.signInButton,
              {
                paddingLeft: 20,
                borderRadius: 3,
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                height: 40,
                backgroundColor: '#004080',
              },
            ]}>
            <Icon name={'facebook-f'} size={20} color={'white'} />
            <Text
              style={[
                styles.signInButtonText,
                {marginLeft: 20, fontWeight: 'bold'},
              ]}>
              Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.LoginGoole}
            style={[
              styles.signInButton,
              {
                paddingLeft: 20,
                borderRadius: 3,
                alignItems: 'center',
                flex: 1,
                marginLeft: 10,
                flexDirection: 'row',
                backgroundColor: '#cc3300',
              },
            ]}>
            <Icon name={'google'} size={20} color={'white'} />
            <Text
              style={[
                styles.signInButtonText,
                {marginLeft: 20, fontWeight: 'bold'},
              ]}>
              Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: metrics.DEVICE_WIDTH * 0.1,
    justifyContent: 'center',
  },
  createAccountButton: {
    backgroundColor: '#9B9FA4',
  },
  createAccountButtonText: {
    color: 'white',
  },
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#9B9FA4',
  },
  separatorOr: {
    color: '#9B9FA4',
    marginHorizontal: 8,
  },
  signInButton: {
    backgroundColor: '#1976D2',
  },
  signInButtonText: {
    color: 'white',
  },
});
