import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthScreen } from './screens/auth';
import { HomeScreen } from './screens/home';
import { SplashScreen } from './screens/splash';
import { autoLoginUser } from './store/actions/authActions';

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
      <NavigationContainer>
        <Stack.Navigator>
          {this.props.auth.isAuth ? (
              <Stack.Screen 
              name="HomeScreen" 
              component={HomeScreen} 
              options={{headerShown: false}}
              />
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
    );
  }
  
}

const mapStateToProps = state => ({auth: state.auth})

export default connect(mapStateToProps)(App);