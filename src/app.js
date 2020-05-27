import React, {Component} from 'react';

import AuthScreen from './containers/AuthScreen';
// import HomeScreen from './containers/HomeScreen/index';
import HomeScreen from './containers/HomeScreen/AppStack/AppStack';
// import SplashScreen from 'react-native-splash-screen';

import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';

// import firebase from 'react-native-firebase';
//
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import auth from '@react-native-firebase/auth';

/**
 * The root component of the application.
 * In this component I am handling the entire application state, but in a real app you should
 * probably use a state management library like Redux or MobX to handle the state (if your app gets bigger).
 */
export class LoginAnimation extends Component {
  state = {
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false, // Has the app completed the login animation?
  };

  componentDidMount() {
    // SplashScreen.hide();

    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoading: true});
        setTimeout(
          () =>
            this.setState({
              isLoggedIn: true,
              isLoading: false,
              isAppReady: true,
            }),
          1000,
        );
      } else {
        this.setState({isLoggedIn: false, isAppReady: false});
      }
    });

    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '44995992215-nu3uh74s8p4k208i2usja26bq2oa7p8j.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }

  /**
   * Two login function that waits 1000 ms and then authenticates the user succesfully.
   * In your real app they should be replaced with an API call to you backend.
   */
  _simulateLogin = (email, password) => {
    // this.setState({isLoading: true});
    // setTimeout(() => this.setState({isLoggedIn: true, isLoading: false}), 1000);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({isLoading: true});
        setTimeout(
          () =>
            this.setState({
              isLoggedIn: true,
              isLoading: false,
              isAppReady: true,
            }),
          1000,
        );
      })
      .catch(function (error) {
        alert(error);
      });
  };

  _simulateSignup = (email, password, fullName) => {
    alert(fullName);
    this.setState({isLoading: true});
    setTimeout(() => this.setState({isLoggedIn: true, isLoading: false}), 1000);
  };

  __simulateLogout = () => {
    auth()
      .signOut()
      .then(() => {
        this.setState({isLoggedIn: false, isAppReady: false});
      })
      .catch((err) => alert(err));
  };

  _SimulateFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error('User cancelled request');
      }

      // console.log(
      //   `Login success with permissions: ${result.grantedPermissions.toString()}`,
      // );

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        throw new Error(
          'Something went wrong obtaining the users access token',
        );
      }

      // create a new firebase credential with the token
      const credential = auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      const firebaseUserCredential = await auth().signInWithCredential(
        credential,
      );

      // console.log(firebaseUserCredential.user.uid);

      // firebase
      //   .firestore()
      //   .collection('users')
      //   .doc(firebase.auth().currentUser.uid)
      //   .set(firebase.auth().currentUser);

      this.setState({isLoading: true});
      setTimeout(() => this.setState({isLoggedIn: true, isLoading: false}), 0);

      // console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (e) {
      console.error(e);
    }
  };

  _SimulateGoogle = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo: userInfo, loggedIn: true});
      // console.log(userInfo);
      // create a new firebase credential with the token
      const credential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      // login with credential
      const firebaseUserCredential = await auth().signInWithCredential(
        credential,
      );

      this.setState({isLoading: true});
      setTimeout(() => this.setState({isLoggedIn: true, isLoading: false}), 0);

      // console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log('operation (f.e. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
      } else {
        // some other error happened
        console.log('some other error happened');
      }
    }
  };

  /**
   * Simple routing.
   * If the user is authenticated (isAppReady) show the HomeScreen, otherwise show the AuthScreen
   */
  render() {
    if (this.state.isAppReady) {
      return <HomeScreen logout={this.__simulateLogout} />;
    } else {
      return (
        <AuthScreen
          login={this._simulateLogin}
          signup={this._simulateSignup}
          Loginfacebook={this._SimulateFacebook}
          LoginGoogle={this._SimulateGoogle}
          isLoggedIn={this.state.isLoggedIn}
          isLoading={this.state.isLoading}
          onLoginAnimationCompleted={() => this.setState({isAppReady: true})}
        />
      );
    }
  }
}

export default LoginAnimation;
