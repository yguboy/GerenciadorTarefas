import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Heading } from "@chakra-ui/react";
import { Tarefa } from "../../../Models/Tarefa";

function TarefaListar() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    async function fetchTarefas() {
      const response = await fetch("http://localhost:5284/api/tarefa");
      const data = await response.json();
      setTarefas(data);
    }
  }, []);

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Listar Tarefas</Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tarefas.map((tarefa) => (
            <Tr key={tarefa.id}>
              <Td>{tarefa.id}</Td>
              <Td>{tarefa.nome}</Td>
              <Td>
                <Link to={`/tarefa/editar/${tarefa.id}`}>
                  <Button mr={2} colorScheme="blue">Editar</Button>
                </Link>
                <Link to={`/tarefa/excluir/${tarefa.id}`}>
                  <Button colorScheme="red">Excluir</Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Link to="/tarefa/cadastrar">
        <Button mt={4} colorScheme="teal">Cadastrar Nova Tarefa</Button>
      </Link>
    </Box>
  );
}

export default TarefaListar;