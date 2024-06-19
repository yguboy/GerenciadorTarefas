import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Box, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";
// Especificando manualmente o caminho correto para o arquivo de model
import { Status } from "../../../Models/Status";

function StatusEditar() {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<Status | null>(null);
  const [nome, setNome] = useState("");

  useEffect(() => {
    async function fetchStatus() {
      const response = await fetch(`http://localhost:5284/api/status/${id}`);
      const data = await response.json();
      setStatus(data);
      setNome(data.nome);
    }

    fetchStatus();
  }, [id]);

  async function editarStatus() {
    if (!status) return;
    
    const updatedStatus: Status = {
      ...status,
      nome
    };

    await fetch(`http://localhost:5284/api/status/editar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStatus),
    });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Editar Status</Heading>
      {status && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editarStatus();
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
            Salvar
          </Button>
        </form>
      )}
      <Link to="/status">
        <Button mt={4} colorScheme="teal">Cancelar</Button>
      </Link>
    </Box>
  );
}

export default StatusEditar;
