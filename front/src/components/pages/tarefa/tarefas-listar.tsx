import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Heading } from "@chakra-ui/react";
import { Tarefa } from "../../../Models/Tarefa";

function TarefaListar() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    async function fetchTarefas() {
      const response = await fetch('http://localhost:5284/api/tarefas/listar');
      const data = await response.json();
      setTarefas(data);
    }

    fetchTarefas();
  }, []);

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Listar Tarefas</Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Descrição</Th>
            <Th>Prioridade</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tarefas.map((tarefa) => (
            <Tr key={tarefa.id}>
              <Td>{tarefa.id}</Td>
              <Td>{tarefa.nome}</Td>
              <Td>{tarefa.descricao}</Td>
              <Td>{tarefa.prioridade}</Td>
              <Td>{tarefa.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default TarefaListar;
