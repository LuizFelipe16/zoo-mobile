import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {  createStackNavigator} from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Landing from './Pages/Landing';
import AddAnimal from './Pages/AddAnimal';
import ListAnimals from './Pages/ListAnimals';
import AnimalDetails from './Pages/AnimalDetails';
import Header from './Components/Header';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#fefefe' }  }}>
                <Screen name="Landing" component={Landing} />
                
                <Screen 
                    name="AddAnimal" 
                    component={AddAnimal}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Novo Animal" />
                    }} 
                />
                
                <Screen 
                    name="ListAnimals" 
                    component={ListAnimals}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Animais do seu Zoo!" />
                    }}  
                />
                
                <Screen 
                    name="AnimalDetails" 
                    component={AnimalDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Detalhes" />
                    }} 
                />
            </Navigator>
        </NavigationContainer>
    );
}