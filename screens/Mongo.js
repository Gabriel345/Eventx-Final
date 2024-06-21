import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import axios from 'axios';
import EventosScreen from './EventosScreen'; // Importe o componente de EventosScreen

const UsersScreen = () => {
  const [eventos, setEventos] = useState([]); // Alterado de users para eventos
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    fetchEventos(); // Alterado de fetchUsers para fetchEventos
  }, []);

  const fetchEventos = async () => { // Alterado de fetchUsers para fetchEventos
    try {
      const response = await axios.get('http://localhost:5000/eventos'); // Alterado de /users para /eventos
      setEventos(response.data); // Alterado de users para eventos
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <EventosScreen eventos={eventos} /> {/* Passando os eventos para o componente de EventosScreen */}
    </View>
  );
};

export default UsersScreen;
