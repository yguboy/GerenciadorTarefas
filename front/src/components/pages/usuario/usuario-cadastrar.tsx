import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Usuario } from "../../../Models/Usuario";

function UsuarioCadastrar() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  async function cadastrarUsuario() {
    const usuario: Usuario = {
      nome,
      idade: parseInt(idade),
    };

    await fetch("http://localhost:5284/api/usuario/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
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
        <Button type="submit" colorScheme="teal">
          Cadastrar
        </Button>
      </form>
      <Link to="/usuario">
        <Button mt={4} colorScheme="teal">Voltar para Listagem</Button>
      </Link>
    </Box>
  );
}

export default UsuarioCadastrar;
