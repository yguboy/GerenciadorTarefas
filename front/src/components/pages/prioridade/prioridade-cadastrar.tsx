import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Prioridade } from "../../../Models/Prioridade";

function PrioridadeCadastrar() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  async function cadastrarPrioridade() {
    const prioridade: Prioridade = {
      nome,
      descricao
    };

    await fetch("http://localhost:5284/api/prioridades/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prioridade),
    });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Cadastrar Prioridade</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cadastrarPrioridade();
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
        <FormControl id="descricao" mb={4}>
          <FormLabel>Descrição</FormLabel>
          <Input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Cadastrar
        </Button>
      </form>
      <Link to="/prioridades">
        <Button mt={4} colorScheme="teal">Voltar para Listagem</Button>
      </Link>
    </Box>
  );
}

export default PrioridadeCadastrar;
