import { Tabs } from 'expo-router';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function TabsLayout() {

  return (

    <Tabs

      screenOptions={{

        headerShown: false,

        tabBarStyle: {

          backgroundColor: '#0f172a',

          borderTopWidth: 0,

          height: 80,

          paddingBottom: 10,
      

        },

        tabBarActiveTintColor: '#3b82f6',

        tabBarInactiveTintColor: '#94a3b8',

      }}

    >

      {/* ====================== */}
      {/* INICIO */}
      {/* ====================== */}

      <Tabs.Screen
        name='index'
        options={{

          title: 'Inicio',

          tabBarIcon: ({ color, size }) => (

            <Ionicons
              name='home'
              size={size}
              color={color}
            />

          ),

        }}
      />



      {/* ====================== */}
      {/* EVIDENCIAS */}
      {/* ====================== */}

      <Tabs.Screen
        name='evidencias'
        options={{

          title: 'Evidencias',

          tabBarIcon: ({ color, size }) => (

            <Ionicons
              name='book'
              size={size}
              color={color}
            />

          ),

        }}
      />



      {/* ====================== */}
      {/* ALERTAS */}
      {/* ====================== */}

      <Tabs.Screen
        name='alertas'
        options={{

          title: 'Alertas',

          tabBarIcon: ({ color, size }) => (

            <Ionicons
              name='notifications'
              size={size}
              color={color}
            />

          ),

        }}
      />



      {/* ====================== */}
      {/* PERFIL */}
      {/* ====================== */}

      <Tabs.Screen
        name='perfil'
        options={{

          title: 'Perfil',

          tabBarIcon: ({ color, size }) => (

            <Ionicons
              name='person'
              size={size}
              color={color}
            />

          ),

        }}
      />

    </Tabs>

  );

}