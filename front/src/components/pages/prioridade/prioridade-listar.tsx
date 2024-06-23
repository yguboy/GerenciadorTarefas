import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Especificando manualmente o caminho correto para o arquivo de model
import { Prioridade } from "../../../Models/Prioridade";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Heading } from "@chakra-ui/react";

function PrioridadeListar() {
  const [prioridadeList, setPrioridadeList] = useState<Prioridade[]>([]);

  useEffect(() => {
    async function fetchPrioridadeList() {
      const response = await fetch("http://localhost:5284/api/prioridades");
      const data = await response.json();
      setPrioridadeList(data);
    }

    fetchPrioridadeList();
  }, []);

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Listar Prioridades</Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Descrição</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {prioridadeList.map((prioridade) => (
            <Tr key={prioridade.id}>
              <Td>{prioridade.id}</Td>
              <Td>{prioridade.nome}</Td>
              <Td>{prioridade.descricao}</Td>
              <Td>
                <Link to={`/prioridades/editar/${prioridade.id}`}>
                  <Button mr={2} colorScheme="blue">Editar</Button>
                </Link>
                <Link to={`/prioridades/excluir/${prioridade.id}`}>
                  <Button colorScheme="red">Excluir</Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Link to="/prioridades/cadastrar">
        <Button mt={4} colorScheme="teal">Cadastrar Nova Prioridade</Button>
      </Link>
    </Box>
  );
}

export default PrioridadeListar;
