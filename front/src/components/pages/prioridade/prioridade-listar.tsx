import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Heading } from "@chakra-ui/react";
import { Prioridade } from "../../../Models/Prioridade";

function PrioridadeListar() {
  const [prioridades, setPrioridades] = useState<Prioridade[]>([]);

  useEffect(() => {
    async function fetchPrioridades() {
      const response = await fetch("http://localhost:5284/api/prioridade/listar");
      const data = await response.json();
      setPrioridades(data);
    }

  }, []);

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Listar Prioridades</Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {prioridades.map((prioridade) => (
            <Tr key={prioridade.id}>
              <Td>{prioridade.id}</Td>
              <Td>{prioridade.nome}</Td>
              <Td>
                <Link to={`/prioridade/editar/${prioridade.id}`}>
                  <Button mr={2} colorScheme="blue">Editar</Button>
                </Link>
                <Link to={`/prioridade/excluir/${prioridade.id}`}>
                  <Button colorScheme="red">Excluir</Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Link to="/prioridade/cadastrar">
        <Button mt={4} colorScheme="teal">Cadastrar Nova Prioridade</Button>
      </Link>
    </Box>
  );
}

export default PrioridadeListar;
