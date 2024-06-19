import { useState } from "react";
import { Tarefa } from "../../../Models/Tarefa";
import { Link } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Heading } from "@chakra-ui/react";

function TarefaCadastrar() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [status, setStatus] = useState("");

  async function cadastrarTarefa() {
    const tarefa: Tarefa = {
      nome,
      descricao,
      prioridade,
      status,
    };

    await fetch("http://localhost:5284/api/tarefas/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    })
      .then((resposta) => resposta.json())
      .then((tarefaCadastrada: Tarefa) => {
        console.log(tarefaCadastrada);
      });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Cadastrar Tarefa
      </Heading>
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
        <FormControl id="prioridade" mb={4}>
          <FormLabel>Prioridade</FormLabel>
          <Input
            type="text"
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="status" mb={4}>
          <FormLabel>Status</FormLabel>
          <Input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Cadastrar
        </Button>
      </form>
      <Link to="/tarefas">
        <Button mt={4} colorScheme="teal">
          Voltar para Listagem
        </Button>
      </Link>
    </Box>
  );
}

export default TarefaCadastrar;
