import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Box, Heading } from "@chakra-ui/react";

function PrioridadeExcluir() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  async function excluirPrioridade() {
    await fetch(`http://localhost:5284/api/prioridades/deletar/${id}`, {
      method: "DELETE",
    }).then(() => {
      navigate("/prioridades");
    });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Tem certeza que deseja excluir esta prioridade?
      </Heading>
      <Button onClick={excluirPrioridade} colorScheme="red">
        Excluir
      </Button>
      <Link to="/prioridades">
        <Button ml={4} colorScheme="teal">
          Cancelar
        </Button>
      </Link>
    </Box>
  );
}

export default PrioridadeExcluir;
