import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Heading } from "@chakra-ui/react";
import { Tarefa } from "../../../Models/Tarefa";

function TarefasEditar() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tarefa, setTarefa] = useState<Tarefa>({
    id: "",
    nome: "",
    descricao: "",
    prioridade: "",
    status: "",
    prazo: "",
    categoria: "",
  });

  useEffect(() => {
    async function fetchTarefa() {
      const response = await fetch(`http://localhost:5284/api/tarefa/${id}`);
      const data = await response.json();
      setTarefa(data);
    }

  }, [id]);

  async function atualizarTarefa(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`http://localhost:5284/api/tarefa/editar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    });
    navigate("/tarefa");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTarefa((prevTarefa) => ({
      ...prevTarefa,
      [name]: value,
    }));
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Editar Tarefa</Heading>
      <form onSubmit={atualizarTarefa}>
        <FormControl id="nome" mb={4}>
          <FormLabel>Nome</FormLabel>
          <Input type="text" name="nome" value={tarefa.nome} onChange={handleChange} required />
        </FormControl>
        <FormControl id="descricao" mb={4}>
          <FormLabel>Descrição</FormLabel>
          <Input type="text" name="descricao" value={tarefa.descricao} onChange={handleChange} required />
        </FormControl>
        <FormControl id="prioridade" mb={4}>
          <FormLabel>Prioridade</FormLabel>
          <Input type="text" name="prioridade" value={tarefa.prioridade} onChange={handleChange} required />
        </FormControl>
        <FormControl id="status" mb={4}>
          <FormLabel>Status</FormLabel>
          <Input type="text" name="status" value={tarefa.status} onChange={handleChange} required />
        </FormControl>
        <FormControl id="prazo" mb={4}>
          <FormLabel>Prazo</FormLabel>
          <Input type="date" name="prazo" value={tarefa.prazo} onChange={handleChange} required />
        </FormControl>
        <FormControl id="categoria" mb={4}>
          <FormLabel>Categoria</FormLabel>
          <Input type="text" name="categoria" value={tarefa.categoria} onChange={handleChange} required />
        </FormControl>
        <Button type="submit" colorScheme="teal">Atualizar</Button>
      </form>
      <Link to="/tarefa">
        <Button mt={4} colorScheme="teal">Voltar para Listagem</Button>
      </Link>
    </Box>
  );
}

export default TarefasEditar;
