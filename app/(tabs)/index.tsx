import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function HomeScreen() {

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Bienvenido a BIT-ADSO
      </Text>

      <Text style={styles.subtitle}>
        Gestiona tus evidencias
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#020617',

  },

  title: {

    fontSize: 28,

    fontWeight: 'bold',

    color: '#fff',

  },

  subtitle: {

    fontSize: 16,

    color: '#94a3b8',

    marginTop: 10,

  },

});