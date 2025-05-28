import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';

// Screens
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import CategoryScreen from './screens/CategoryScreen';
import DrugListScreen from './screens/DrugListScreen';
import DrugDetailScreen from './screens/DrugDetailScreen';
import LearningListScreen from './screens/LearningListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Register' }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Categories" component={CategoryScreen} options={{ title: 'Drug Categories' }} />
          <Stack.Screen name="Drugs" component={DrugListScreen} options={{ title: 'Drugs List' }} />
          <Stack.Screen name="Drug Details" component={DrugDetailScreen} options={{ title: 'Drug Details' }} />
          <Stack.Screen name="Learned Drugs" component={LearningListScreen} options={{ title: 'Your Learning List' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
