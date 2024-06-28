import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Box, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Prioridade } from "../../../Models/Prioridade";

function PrioridadeEditar() {
  const { id } = useParams<{ id: string }>();
  const [prioridade, setPrioridade] = useState<Prioridade | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPrioridade() {
      const response = await fetch(`http://localhost:5284/api/prioridades/editar/${id}`);
      const data = await response.json();
      setPrioridade(data);
      setNome(data.nome);
      setDescricao(data.descricao);
    }

  }, [id]);

  async function editarPrioridade() {
    if (!prioridade) return;
    
    const updatedPrioridade: Prioridade = {
      ...prioridade,
      nome,
      descricao
    };

    await fetch(`http://localhost:5284/api/prioridades/editar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPrioridade),
    })
      .then((resposta) => resposta.json())
      .then(() => {
        navigate("/prioridades");
      });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Editar Prioridade</Heading>
      {prioridade && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editarPrioridade();
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
          <FormControl id="descricao" mb={4}>
            <FormLabel>Descrição</FormLabel>
            <Input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Salvar
          </Button>
        </form>
      )}
      <Link to="/prioridades">
        <Button mt={4} colorScheme="teal">Cancelar</Button>
      </Link>
    </Box>
  );
}

export default PrioridadeEditar;
