import { View, Text, StyleSheet, Image, Dimensions, Animated} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import { Audio } from 'expo-av';
import { useEffect } from 'react';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const scaleAnim = new Animated.Value(0.7);


export default function SplashScreen(){

  useEffect(()=>{

    let sound:any;

    const reproducirSonido = async () => {
      const { sound: sonido } = await Audio.Sound.createAsync(
        require('../assets/sounds/intro.mp3')
      );
      sound = sonido;
      await sound.playAsync();

    };

    reproducirSonido();

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver:true
    }).start();

    const timer = setTimeout(() => {
      router.replace('/auth/register');
    }, 7000);
    
    return () => {
    
      clearTimeout(timer);

      if (sound) {
      sound.unloadAsync();
      }
    }

  },[]);

  return (

    <LinearGradient
    colors={['#000000', '#2360db']}
    style={styles.container}
    >

    {/* Logo */}
    <Animated.Image

  source={require('../assets/images/logo-adso.png')}

  style={[
    styles.logo,
    {
      transform: [
        { scale: scaleAnim }
      ]
    }
  ]}

/>
   
    </LinearGradient>

  )
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: width * 0.70,
    height: width * 0.70,
    resizeMode: 'contain',
  },

  titulo: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 18,
    color: '#DDD',
  },

});