import { useState } from "react";
import { View, StyleSheet } from "react-native";
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
      <Text style={specificStyle.Text} h3> EventX </Text>
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
          icon={
            <Icon
              name="check"
              size={15}
              color="white"
            />
          }
          title="Entrar"
          onPress={() => entrar()}
        />
        <Button
          icon={
            <Icon 
              name="user"
              size={15}
              color="white"
            />
          }
          title="Cadastrar"
          onPress={() => Cadastro()}
        />
      </View>
    </View>
  );
}

const specificStyle = StyleSheet.create({
  Text: {
    position: 'relative',
    bottom: 100,

  },
  button: {
    width: 110,

  },
 })
