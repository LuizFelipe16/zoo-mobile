import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title: string;
    showCancel?: boolean;
}

export default function Header( { title, showCancel = true } : HeaderProps) {
    const navigation = useNavigation();

    function handleNavigateToLanding() {
        navigation.navigate('Landing');
    }

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#32BF84" />
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>

            { showCancel ? (
                <BorderlessButton onPress={handleNavigateToLanding} >
                    <Feather name="x" size={24} color="#ff669d" />
                </BorderlessButton>
            ) : (
                <View></View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
        paddingTop: 44,
        elevation: 1,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    title: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#32BF84',
        fontSize: 16
    }
})