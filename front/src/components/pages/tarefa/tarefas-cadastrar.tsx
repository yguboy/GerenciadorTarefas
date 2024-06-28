import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Tarefa } from "../../../Models/Tarefa";

function TarefaCadastrar() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prazo, setPrazo] = useState("");
  const [categoria, setCategoria] = useState("");

  async function cadastrarTarefa() {
    const tarefa: Tarefa = {
      nome,
      descricao,
      prazo,
      categoria,
      prioridade: "",
      status: ""
    };

    await fetch("http://localhost:5284/api/tarefa/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Cadastrar Tarefa</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cadastrarTarefa();
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
        <FormControl id="prazo" mb={4}>
          <FormLabel>Prazo</FormLabel>
          <Input
            type="date"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="categoria" mb={4}>
          <FormLabel>Categoria</FormLabel>
          <Input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Cadastrar
        </Button>
      </form>
      <Link to="/tarefa">
        <Button mt={4} colorScheme="teal">Voltar para Listagem</Button>
      </Link>
    </Box>
  );
}

export default TarefaCadastrar;
