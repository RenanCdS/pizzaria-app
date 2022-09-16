import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import {createTables} from './services/DbService';
import HomeScreen from './Screens/HomeScreen/Index';
import ProductCreationScreen from './Screens/ProductCreationScreen/Index';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    createTables();-
    console.log('Successfully created database!');
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{title: 'Bem vindo!'}} /> */}

        <Stack.Screen 
          name="ProductCreation"
          component={ProductCreationScreen}
          options={{title: 'Registro de produto'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
