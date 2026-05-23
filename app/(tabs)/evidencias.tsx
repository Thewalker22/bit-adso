import React from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import EvidenciasScreen from '@/src/screen/EvidenciasScreen';

export default function EvidenciasTab() {

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
              
            </Text>

            <EvidenciasScreen />

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