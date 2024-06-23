import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading } from '@chakra-ui/react';
import { Usuario } from '../../../Models/Usuario';

const UsuarioCadastrar: React.FC = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  async function cadastrarUsuario() {
    const usuario: Usuario = {
      nome,
      idade: parseInt(idade),
    };

    try {
      const response = await fetch('http://localhost:5284/api/usuarios/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        console.log('Usuário cadastrado com sucesso');
      } else {
        console.error('Erro ao cadastrar usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Cadastrar Usuário</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cadastrarUsuario();
        }}
      >
        <FormControl id="nome" mb={4}>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="idade" mb={4}>
          <FormLabel>Idade</FormLabel>
          <Input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">Cadastrar</Button>
      </form>
      <Link to="/usuario">
        <Button mt={4} colorScheme="teal">Voltar para Listagem</Button>
      </Link>
    </Box>
  );
};

export default UsuarioCadastrar;
