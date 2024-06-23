import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Heading } from "@chakra-ui/react";
// Especificando manualmente o caminho correto para o arquivo de model
import { Status } from "../../../Models/Status";

function StatusListar() {
  const [statusList, setStatusList] = useState<Status[]>([]);

  useEffect(() => {
    async function fetchStatusList() {
      const response = await fetch("http://localhost:5284/api/status");
      const data = await response.json();
      setStatusList(data);
    }

    fetchStatusList();
  }, []);

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Listar Status</Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {statusList.map((status) => (
            <Tr key={status.id}>
              <Td>{status.id}</Td>
              <Td>{status.nome}</Td>
              <Td>
                <Link to={`/status/editar/${status.id}`}>
                  <Button mr={2} colorScheme="blue">Editar</Button>
                </Link>
                <Link to={`/status/excluir/${status.id}`}>
                  <Button colorScheme="red">Excluir</Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Link to="/status/cadastrar">
        <Button mt={4} colorScheme="teal">Cadastrar Novo Status</Button>
      </Link>
    </Box>
  );
}

export default StatusListar;
