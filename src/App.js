import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthScreen } from './screens/auth';
import { HomeScreen } from './screens/home';

const Stack = createStackNavigator()

class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {!this.props.auth.isAuth ? (
            <Stack.Screen 
              name="AuthScreeen" 
              component={AuthScreen} 
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen 
              name="HomeScreen" 
              component={HomeScreen} 
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