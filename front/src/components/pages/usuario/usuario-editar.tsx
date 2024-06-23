import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Box, FormControl, FormLabel, Input, Heading } from "@chakra-ui/react";

function UsuarioEditar() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: ""
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
    await fetch(`http://localhost:5284/api/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Editar Usuário
      </Heading>
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
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
            required
          />
        </FormControl>
        <FormControl id="senha" mb={4}>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            value={usuario.senha}
            onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Atualizar
        </Button>
      </form>
      <Link to="/usuarios">
        <Button mt={4} colorScheme="red">
          Cancelar
        </Button>
      </Link>
    </Box>
  );
}

export default UsuarioEditar;
