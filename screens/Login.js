import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../style/MainStyle";
import { useNavigation } from '@react-navigation/native';

export default function Login() {

  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const entrar = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Principal" }]

    })
  }

  const Cadastro = () => {
    navigation.navigate("Cadastro")
  }

  return (
    <View style={[styles.container, specificStyle.specificContainer]}>
       <Text style={specificStyle.Logo} h1> Event<Text style={{ color: "blue" }} h3>X</Text> </Text> 
      <Input
        placeholder="E-mail: "
        leftIcon={{ type: "font-awesome", name: "envelope" }}
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
      />

      <Input
        placeholder="Senha: "
        leftIcon={{ type: "font-awesome", name: "lock" }}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
      />

      <View style={styles.botoes}>
        <Button
          title="Entrar"
          onPress={() => entrar()}

        />

      </View>

      <View style={specificStyle.container}>
        <View style={specificStyle.textRow}>
          <Text style={specificStyle.textCadastro}>
            Não possui cadastro?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={specificStyle.link}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const specificStyle = StyleSheet.create({
  container: {
    paddingTop: 40,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center', // Alinha verticalmente os itens ao centro
  },
  textCadastro: {
    fontSize: 18,
  },
  link: {
    color: 'blue',
    fontSize: 18,
  },
  Logo: {
    position: 'relative',
    bottom: 150,
  }

});

