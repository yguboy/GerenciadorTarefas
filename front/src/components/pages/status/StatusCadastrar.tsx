import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";
// Especificando manualmente o caminho correto para o arquivo de model
import { Status } from "../../../Models/Status";

function StatusCadastrar() {
  const [nome, setNome] = useState("");

  async function cadastrarStatus() {
    const status: Status = {
      nome
    };

    await fetch("http://localhost:5284/api/status/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Cadastrar Status</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cadastrarStatus();
        }}
      >
        <FormControl id="nome" mb={4}>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Cadastrar
        </Button>
      </form>
      <Link to="/status">
        <Button mt={4} colorScheme="teal">Voltar para Listagem</Button>
      </Link>
    </Box>
  );
}

export default StatusCadastrar;
