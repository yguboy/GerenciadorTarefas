import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Heading } from "@chakra-ui/react";
import { Usuario } from "../../../Models/Usuario";

function UsuarioListar() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    async function fetchUsuarios() {
      const response = await fetch("http://localhost:5284/api/usuario");
      const data = await response.json();
      setUsuarios(data);
    }

  }, []);

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Listar Usuários</Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Idade</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {usuarios.map((usuario) => (
            <Tr key={usuario.id}>
              <Td>{usuario.id}</Td>
              <Td>{usuario.nome}</Td>
              <Td>{usuario.idade}</Td>
              <Td>
                <Link to={`/usuario/editar/${usuario.id}`}>
                  <Button mr={2} colorScheme="blue">Editar</Button>
                </Link>
                <Link to={`/usuario/excluir/${usuario.id}`}>
                  <Button colorScheme="red">Excluir</Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Link to="/usuario/cadastrar">
        <Button mt={4} colorScheme="teal">Cadastrar Novo Usuário</Button>
      </Link>
    </Box>
  );
}

export default UsuarioListar;
