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
    { id: 1, title: 'Intensivão React.JS e typescript', image: require('../images/typescript.jpg') },
    { id: 2, title: 'Música e Inteligência Artificial', image: require('../images/musica.jpg') },
    { id: 3, title: 'Educação financeira', image: require('../images/reuniao.jpg') },
    { id: 4, title: 'Imersão Phyton', image: require('../images/python.jpg') },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {eventos.map(evento => (
          <View key={evento.id} style={styles.card}>
            <Text style={styles.cardTitle}>{evento.title}</Text>
            <View style={styles.CardImagens}>
              <Image source={evento.image} style={styles.Fotos} />
            </View>
            <Button
              buttonStyle={styles.buttonCard}
              title="Ver mais..."
              onPress={() => alert(`Entrar no ${evento.title}`)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


const Inicio = () => {
  const feed = [
    { id: 1, title: 'Aulão Banco de Dados', image: require('../images/banco.jpg') },
    { id: 2, title: 'Aprenda Java', image: require('../images/java.jpg') },
    { id: 3, title: 'O Data Science', image: require('../images/datasience.jpg') },
    { id: 4, title: 'Javascript descomplicado', image: require('../images/javascript.jpg') },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {feed.map(feed => (
          <View key={feed.id} style={styles.cardInicio}>
            <Text style={styles.cardTitle}>{feed.title}</Text>
            <View style={styles.CardImagens}>
              <Image source={feed.image} style={styles.Fotos} />
            </View>
            <Button
              buttonStyle={styles.buttonCard}
              title="Ver mais..."
              onPress={() => alert(`Entrar no ${feed.title}`)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
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
  cardInicio: {
    width: 350,
    height: 350,
    margin: 5,
    padding: 10,
    backgroundColor: '#006da4',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    paddingTop: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    backgroundColor: '#032030',
    width: '100%',
    height: '15%',
    elevation: 15,
    shadowColor: 'white'
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
  CardImagens: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  Fotos: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
});


const Principal = () => {
  return (
    <Tab.Navigator initialRouteName='Feed' screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tab.Screen
        name="Feed"
        component={Inicio}
        options={({ navigation }) => ({
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="home" color={color} size={size} />),
          // headerRight: () => (
          //   <MaterialIcons
          //     name="logout"
          //     size={24}
          //     color="red"
          //     style={{ marginRight: 10 }}
          //     onPress={() => {
          //       navigation.navigate('Login');
          //     }}
          //   />
          // ),
          headerTitle: ""
        })}
      />
      <Tab.Screen
        name="Eventos"
        component={Eventos}
        options={{
          tabBarLabel: 'Eventos',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="event" color={color} size={size} />),
          headerTitle: "",

        }}
      />
      <Tab.Screen
        name="Leitor"
        component={Scanner}
        options={{
          tabBarLabel: 'Leitor de QrCode',
          tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="data-matrix-scan" color={color} size={size} />), headerTitle: "",
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
              name="logout"
              size={24}
              color="blue"
              style={{ marginRight: 10 }}
              onPress={() => {
                navigation.navigate('Login');
              }}
            />
          ),
          headerTitle: "",

        })}
      />
    </Tab.Navigator>
  );
}

export default Principal;
