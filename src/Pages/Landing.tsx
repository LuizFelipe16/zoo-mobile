import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

export default function Landing() {
    const navigation = useNavigation();

    function handleNavigateToAddAnimal() {
        navigation.navigate('AddAnimal');
    }

    function handleNavigateToListAnimals() {
        navigation.navigate('ListAnimals');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Zoo!
            </Text>

            <Text style={styles.h2}>
                Seja Bem-Vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton
                    style={[styles.button, styles.buttonPrimary]}
                    onPress={handleNavigateToAddAnimal}>

                    <Feather name="plus" size={40} color="#32BF84" />

                    <Text style={styles.buttonText}>Novo Animal</Text>
                </RectButton>

                <RectButton
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={handleNavigateToListAnimals}>
                    
                    <Feather name="upload" size={40} color="#32BF84" />

                    <Text style={styles.buttonText}>Entrar no Zoo!</Text>
                </RectButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#32BF84',
        padding: 20,
        paddingTop: 110,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    title: {
        color: '#fff',
        fontSize: 80,
        fontFamily: 'Nunito_800ExtraBold'
    },

    h2: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '500',
        marginTop: 100
    },

    titleBold: {
        fontWeight: 'bold'
    },

    buttonsContainer: {
        width: '100%',
        height: '33%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    buttonPrimary: {
        backgroundColor: '#fff',
    },

    buttonSecondary: {
        backgroundColor: '#fff',
    },

    button: {
        borderRadius: 10,
        width: '49%',
        height: '100%',
        padding: 20,
        elevation: 3,

        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },

    buttonText: {
        color: '#32BF84',
        fontSize: 25,
        fontFamily: 'Nunito_400Regular'
    }
});
