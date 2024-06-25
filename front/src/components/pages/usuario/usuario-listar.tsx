import React, { useEffect, useState } from "react";
import { Usuario } from "../../../Models/Usuario";
import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UsuarioListar: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await fetch("http://localhost:5284/api/usuarios/listar");
        const data: Usuario[] = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }
    fetchUsuarios();
  }, []);

  async function excluirUsuario(id: string) {
    try {
      const response = await fetch(`http://localhost:5284/api/usuarios/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        console.log("Usuário excluído com sucesso");
      } else {
        console.error("Erro ao excluir usuário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  }

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
                <Button colorScheme="red" onClick={() => excluirUsuario(usuario.id!)}>
                  Excluir
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UsuarioListar;
