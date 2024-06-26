import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Tarefa } from "../../../Models/Tarefa";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from "@chakra-ui/react";

function TarefaEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tarefa, setTarefa] = useState<Tarefa>({
    id: "",
    nome: "",
    descricao: "",
    prioridade: "",
    status: "",
  });

  useEffect(() => {
    async function fetchTarefa() {
      const response = await fetch(`http://localhost:5284/api/tarefas/buscar/${id}`);
      const data = await response.json();
      setTarefa(data);
    }

    fetchTarefa();
  }, [id]);

  async function editarTarefa() {
    await fetch(`http://localhost:5284/api/tarefas/alterar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    })
      .then((resposta) => resposta.json())
      .then((tarefaEditada: Tarefa) => {
        console.log(tarefaEditada);
        navigate("/tarefas");
      });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Editar Tarefa
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editarTarefa();
        }}
      >
        <FormControl id="nome" mb={4}>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            value={tarefa.nome}
            onChange={(e) => setTarefa({ ...tarefa, nome: e.target.value })}
            required
          />
        </FormControl>
        <FormControl id="descricao" mb={4}>
          <FormLabel>Descrição</FormLabel>
          <Input
            type="text"
            value={tarefa.descricao}
            onChange={(e) => setTarefa({ ...tarefa, descricao: e.target.value })}
            required
          />
        </FormControl>
        <FormControl id="prioridade" mb={4}>
          <FormLabel>Prioridade</FormLabel>
          <Input
            type="text"
            value={tarefa.prioridade}
            onChange={(e) => setTarefa({ ...tarefa, prioridade: e.target.value })}
            required
          />
        </FormControl>
        <FormControl id="status" mb={4}>
          <FormLabel>Status</FormLabel>
          <Input
            type="text"
            value={tarefa.status}
            onChange={(e) => setTarefa({ ...tarefa, status: e.target.value })}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Atualizar
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

export default TarefaEditar;
