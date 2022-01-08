import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'expo-status-bar';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HomeStack} from './stacks/homeStack';
import {AuthScreen} from './screens/auth';
import {SplashScreen} from './screens/splash';
import {autoLoginUser} from './store/actions/authActions';
import {View} from 'react-native';

const Stack = createStackNavigator()

class App extends Component {

  state = {
    loading: true
  }

  componentDidMount() {
    this.props.dispatch(autoLoginUser()).then(() => {
      this.setState({loading: false})
    })
  }

  render() {
    return (
      <>
        <View style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          height: 40,
        }}>
          <StatusBar
            translucent
            backgroundColor='transparent'
            hideTransitionAnimation='fade'
          />
        </View>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
          >
            {this.props.auth.isAuth ? (
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeStack}
                  options={{headerShown: false}}
                />
              </>

            )
            : (
              this.state.loading ?
                <Stack.Screen
                  name="SplashScreen"
                  component={SplashScreen}
                  options={{headerShown: false}}
                />
                :
                <Stack.Screen
                  name="AuthScreen"
                  component={AuthScreen}
                  options={{headerShown: false}}
                />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </>

    );
  }

}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(App);
