import React from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import  HomeScreen from '@/src/screen/HomeScreen';

export default function HomeData() {

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
             Resumen
            </Text>

            <HomeScreen />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: '#020617',

        padding: 20,

    },

    title: {

        color: '#fff',

        fontSize: 24,

        fontWeight: 'bold',

        marginBottom: 20,

    },

});