import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, CheckBox, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../style/MainStyle";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";

export default function Cadastro() {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [nome, setNome] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [isSelected, setisSelected] = useState(false);
  const [erroremail, setErrorEmail] = useState(null);
  const [errornome, setErrorNome] = useState(null);
  const [errorcpf, setErrorCpf] = useState(null);
  const [errortelefone, setErrorTelefone] = useState(null);

  let cpffield = null;
  let telefonefield = null;

  const validar = () => {
    let error = false;
    setErrorEmail(null);
    setErrorCpf(null);

    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!re.test(String(email).toLocaleLowerCase())) {
      setErrorEmail("Preencha seu E-mail corretamente");
      error = true;
    }
    if (!cpffield.isValid()) {
      setErrorCpf("Preencha seu CPF corretamente");
      error = true;
    }
    if (telefone == null) {
      setErrorTelefone("Preencha seu Telefone corretamente");
      error = true;
    }
    return !error;
  };

  const salvar = () => {
    if (validar()) {
      alert("Cadastrado com sucesso !");
    }

  };

  return (
    <View style={[styles.container, specificStyle.specificContainer]}>
      <Text style={specificStyle.Text} h3>
        {" "}
        Cadastre-se{" "}
      </Text>

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
        placeholder="Nome: "
        onChangeText={(value) => setNome(value)}
        errorMessage={errornome}
      />

      <View style={styles.containerMask}>
        <TextInputMask
          placeholder="Cpf:"
          type="cpf"
          value={cpf}
          onChangeText={(value) => {
            setCpf(value);
            setErrorCpf(null);
          }}
          keyboardType="phone-pad"
          style={styles.maskedInput}
          ref={(ref) => (cpffield = ref)}
        />
      </View>
      <Text style={styles.errorMessage}>{errorcpf}</Text>

      <View style={styles.containerMask}>
        <TextInputMask
          placeholder="Telefone:"
          type={"cel-phone"}
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) ",
          }}
          value={telefone}
          onChangeText={(value) => setTelefone(value)}
          keyboardType="phone-pad"
          style={styles.maskedInput}
          ref={(ref) => (telefonefield = ref)}
        />
      </View>
      <Text style={styles.errorMessage}>{errortelefone}</Text>

      <CheckBox
        title="Aceito os termos de uso"
        checkedIcon="check"
        uncheckedIcon="square-o"
        checkedColor="green"
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
    width: 100,
    marginTop: 20,
  },
});
