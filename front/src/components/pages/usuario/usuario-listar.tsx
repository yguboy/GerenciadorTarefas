import React, { useEffect, useState } from "react";
import { Usuario } from "../../../Models/Usuario";
import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

function UsuarioListar() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    async function fetchUsuarios() {
      const response = await fetch("http://localhost:5284/api/usuarios/listar");
      const data: Usuario[] = await response.json();
      setUsuarios(data);
    }

    fetchUsuarios();
  }, []);

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Lista de Usuários
      </Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Idade</Th>
          </Tr>
        </Thead>
        <Tbody>
          {usuarios.map((usuario) => (
            <Tr key={usuario.id}>
              <Td>{usuario.id}</Td>
              <Td>{usuario.nome}</Td>
              <Td>{usuario.idade}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default UsuarioListar;
