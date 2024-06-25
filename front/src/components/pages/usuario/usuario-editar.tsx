import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Box, FormControl, FormLabel, Input, Heading } from "@chakra-ui/react";
import { Usuario } from "../../../Models/Usuario";

const UsuarioEditar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [usuario, setUsuario] = useState<Usuario>({
    nome: "",
    idade: 0,
  });

  useEffect(() => {
    async function fetchUsuario() {
      const response = await fetch(`http://localhost:5284/api/usuarios/${id}`);
      const data = await response.json();
      setUsuario(data);
    }

    fetchUsuario();
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5284/api/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      if (response.ok) {
        console.log("Usuário atualizado com sucesso");
      } else {
        console.error("Erro ao atualizar usuário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Editar Usuário</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="nome" mb={4}>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            value={usuario.nome}
            onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
            required
          />
        </FormControl>
        <FormControl id="idade" mb={4}>
          <FormLabel>Idade</FormLabel>
          <Input
            type="number"
            value={usuario.idade.toString()}
            onChange={(e) => setUsuario({ ...usuario, idade: parseInt(e.target.value) })}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">Atualizar</Button>
      </form>
      <Link to="/usuarios">
        <Button mt={4} colorScheme="red">Cancelar</Button>
      </Link>
    </Box>
  );
};

export default UsuarioEditar;
