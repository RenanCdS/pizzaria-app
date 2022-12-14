// Renan Castro dos Santos 081180029 EC10
// Wellison Sousa 081180040

import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import {createTables} from './services/DbService';
import ProductCreationScreen from './Screens/ProductCreationScreen/Index';
import ProductListScreen from './Screens/ProductListScreen/Index';
import ProductUpdateScreen from './Screens/ProductUpdateScreen/Index';
import { OrderScreen } from './Screens/OrderScreen/Index';
import CategoryCreationScreen from './Screens/CategoryCreationScreen/Index';
import CategoryListScreen from './Screens/CategoryListScreen/Index';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CategoryUpdateScreen } from './Screens/CategoryUpdateScreen/Index';
import { CheckoutScreen } from './Screens/CheckoutScreen/Index';
import { OrderListScreen } from './Screens/OrderListScreen/Index';
import HomeScreen from './Screens/HomeScreen/Index';

const Tab = createBottomTabNavigator();

export default function App() {

  useEffect(() => {
    async function createDatabase() {
      await createTables();
    }
    createDatabase().then(() => {
      console.log('Successfully created database!');
    }).catch();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator 
      initialRouteName='Home'
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 18
        }
      }}>
        
        <Tab.Screen name='ProductList'  component={ProductListScreen}
         options={{
          title: 'Produtos',
          tabBarLabel: 'Produtos',
          tabBarIcon: ({color}) => (<MaterialCommunityIcons name='pizza' size={30} />)
         }} />
        <Tab.Screen name='CategoryList' component={CategoryListScreen}
          options={{
            title: 'Categorias',
            tabBarLabel: 'Categorias',
            tabBarIcon: ({color}) => (<MaterialCommunityIcons name='archive' size={30} />)
          }} />

        <Tab.Screen name='OrderScreen' component={OrderScreen} 
          options={{
            title: 'Comprar',
            tabBarLabel: 'Comprar',
            tabBarIcon: ({color}) => (<MaterialCommunityIcons name='wallet' size={30} />)
          }} />

        <Tab.Screen name='OrderList' component={OrderListScreen} 
          options={{
            title: 'Lista de pedidos', 
            tabBarLabel: 'Pedidos',
            tabBarIcon: ({color}) => (<MaterialCommunityIcons name='shopping' size={30} />)
          }} />

        <Tab.Screen name='ProductCreation' component={ProductCreationScreen} 
          options={{
            title: 'Registro de produtos',
            tabBarItemStyle: { display: "none" },
          }} />

        <Tab.Screen name='CategoryCreation' component={CategoryCreationScreen} 
          options={{
            title: 'Registro de categorias',
            tabBarItemStyle: { display: "none" },
          }} />

        <Tab.Screen name='ProductUpdate' component={ProductUpdateScreen} 
          options={{
            title: 'Atualiza????o de produtos',
            tabBarItemStyle: { display: "none" },
          }} />

        <Tab.Screen name='CategoryUpdate' component={CategoryUpdateScreen} 
          options={{
            title: 'Atualiza????o de categoria',
            tabBarItemStyle: { display: "none" },
          }} />

        <Tab.Screen name='Checkout' component={CheckoutScreen} 
          options={{
            title: 'Continuar pedido',
            tabBarItemStyle: { display: "none" },
          }} />

        <Tab.Screen name='Home' component={HomeScreen} 
          options={{
            tabBarItemStyle: { display: 'none' },
            tabBarStyle: {display: 'none'}
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
