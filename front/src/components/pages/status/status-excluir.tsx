import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Box, Heading } from "@chakra-ui/react";

function StatusExcluir() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  async function excluirStatus() {
    await fetch(`http://localhost:5284/api/status/deletar/${id}`, {
      method: "DELETE",
    }).then(() => {
      navigate("/status");
    });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Tem certeza que deseja excluir este status?
      </Heading>
      <Button onClick={excluirStatus} colorScheme="red">
        Excluir
      </Button>
      <Link to="/status">
        <Button ml={4} colorScheme="teal">
          Cancelar
        </Button>
      </Link>
    </Box>
  );
}

export default StatusExcluir;
