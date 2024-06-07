import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, Linking, ScrollView, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('window');

const Feed = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Início!</Text>
    </View>
  );
}

const Eventos = () => {
  const eventos = [
    { id: 1, title: 'Evento 1' },
    { id: 2, title: 'Evento 2' },
    { id: 3, title: 'Evento 3' },
    { id: 4, title: 'Evento 4' },
    { id: 5, title: 'Evento 5' },
    { id: 6, title: 'Evento 6' },
    { id: 7, title: 'Evento 7' },
    { id: 8, title: 'Evento 8' },
    { id: 9, title: 'Evento 9' },
    { id: 10, title: 'Evento 10' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {eventos.map(evento => (
          <View key={evento.id} style={styles.card}>
            <Text style={styles.cardTitle}>{evento.title}</Text>
            <View style={styles.CardImagens}>
              <Image source={require('../images/foto2.jpg')} style={styles.Fotos}></Image>
            </View>
            <Button
              buttonStyle={styles.buttonCard}
              title="Entrar"
              onPress={() => alert(`Entrar no ${evento.title}`)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>Perfil da pessoa!</Text>
    </View>
  );
}

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const animateScanner = Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: height - 40,
          duration: 2500,
          useNativeDriver: true
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true
        })
      ])
    );
    animateScanner.start();
    return () => animateScanner.stop();
  }, [animation]);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    if (data.startsWith('https://')) {
      Linking.openURL(data);
    }
  };

  if (hasPermission === null) {
    return <Text>Permitir acesso à câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer}></View>
          <View style={[styles.focusedContainer, { width: width - 40 }]}>
            <View style={styles.unfocusedContent}></View>
            <View style={styles.focusArea}>
              <Animated.View style={[styles.animationLine, { transform: [{ translateY: animation }] }]} />
            </View>
            <View style={styles.unfocusedContent}></View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title={scanned ? 'Escanear novamente' : 'Escanear'} onPress={() => setScanned(false)} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  scrollViewContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  card: {
    width: 350,
    height: 350,
    margin: 5,
    padding: 10,
    backgroundColor: '#006da4',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  buttonCard: {
    width: 100,
    alignSelf: 'center',
    backgroundColor: '#032023',
  },

  CardImagens: {
    borderRadius: 10,
    elevation: 10,
    width: '100%',
    height: '60%',
    backgroundColor: '#004d74',

  },
  Fotos: {
    width: '100%',
    height: '100%',


  },
  camera: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  focusedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unfocusedContent: {
    flex: 1,
  },
  focusArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  animationLine: {
    height: 2,
    width: '100%',
    backgroundColor: 'red'
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    padding: 10,
  },
});

const Principal = () => {
  return (
    <Tab.Navigator initialRouteName='Feed' screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={({ navigation }) => ({
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="home" color={color} size={size} />),
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={24}
              color="red"
              style={{ marginRight: 10 }}
              onPress={() => {
                navigation.navigate('Login');
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Eventos"
        component={Eventos}
        options={{
          tabBarLabel: 'Eventos',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="event" color={color} size={size} />)
        }}
      />
      <Tab.Screen
        name="Leitor"
        component={Scanner}
        options={{
          tabBarLabel: 'Leitor de QrCode',
          tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="data-matrix-scan" color={color} size={size} />)
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={({ navigation }) => ({
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="person" color={color} size={size} />),
          headerRight: () => (
            <MaterialIcons
              name="settings"
              size={24}
              color="blue"
              style={{ marginRight: 10 }}
              onPress={() => {
                navigation.navigate('Login');
              }}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export default Principal;
