import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Box, Heading } from "@chakra-ui/react";

function TarefaExcluir() {
  const { id } = useParams();
  const navigate = useNavigate();

  async function excluirTarefa() {
    await fetch(`http://localhost:5284/api/tarefas/deletar/${id}`, {
      method: "DELETE",
    });
    navigate("/tarefas");
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Tem certeza que deseja excluir esta tarefa?
      </Heading>
      <Button onClick={excluirTarefa} colorScheme="red">
        Excluir
      </Button>
      <Link to="/tarefas">
        <Button ml={4} colorScheme="teal">
          Cancelar
        </Button>
      </Link>
    </Box>
  );
}

export default TarefaExcluir;
