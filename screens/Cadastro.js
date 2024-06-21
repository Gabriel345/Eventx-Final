import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, CheckBox, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../style/MainStyle";
import { useNavigation } from "@react-navigation/native";
// import { TextInputMask } from "react-native-masked-text";
import Login from "./Login";

export default function Cadastro() {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [nome, setNome] = useState(null);
  const [isSelected, setisSelected] = useState(false);
  const [erroremail, setErrorEmail] = useState(null);
  const [errornome, setErrorNome] = useState(null);
  const [senha, setSenha] = useState(null);
  const [errorsenha, setErrorSenha] = useState(null);


  const validar = () => {
    let error = false;
    setErrorEmail(null);

    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!re.test(String(email).toLocaleLowerCase())) {
      setErrorEmail("Preencha seu E-mail corretamente");
      error = true;
    }
    if (senha == null) {
      setErrorSenha("Por favor, insira uma senha")
      error = true;
    }

    return !error;
  };

  const salvar = () => {
    if (validar()) {
      alert("Cadastrado com sucesso !");
      navigation.navigate(Login);
    }

  };

  return (
    <View style={[styles.container, specificStyle.specificContainer]}>
      <Text style={specificStyle.Text} h3>
        {" "}
        Cadastre-se{" "}
      </Text>

      <Input
        placeholder="Nome: "
        onChangeText={(value) => setNome(value)}
        errorMessage={errornome}
     
     />
      <Input
        placeholder="E-mail: "
        onChangeText={(value) => {
          setEmail(value);
          setErrorEmail(null);
        }}
        keyboardType="email-address"
        errorMessage={erroremail}
      
      />
      <Input
        placeholder="Senha:"
        onChangeText={(value) => {
          setSenha(value);
          setErrorSenha(null);
        }}
        errorMessage={errorsenha}
     
     />
      <Input
        placeholder="Confirme sua Senha:"
        onChangeText={(value) => {
          setSenha(value);
          setErrorSenha(null);
        }}
        errorMessage={errorsenha}
     
     />
    
      <CheckBox
        title="Aceito os termos de uso"
        checkedIcon="check"
        uncheckedIcon="square-o"
        checkedColor="blue"
        uncheckedColor="red"
        checked={isSelected}
        onPress={() => setisSelected(!isSelected)}
      />

      <Button
        icon={<Icon name="check" size={15} color="white" />}
        title="Salvar"
        buttonStyle={specificStyle.button}
        onPress={() => salvar()}
      />
    </View>
  );
}

const specificStyle = StyleSheet.create({
  Text: {
    position: "relative",
    bottom: 100,
  },
  button: {
    width: 120,
    marginTop: 20,
  },

  

});
