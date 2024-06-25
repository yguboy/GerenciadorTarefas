import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Box, Heading } from "@chakra-ui/react";

const UsuarioExcluir: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  async function excluirUsuario() {
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:5284/api/usuarios/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Usuário excluído com sucesso");
        navigate("/usuarios");
      } else {
        console.error("Erro ao excluir usuário:", response.statusText);
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      setIsDeleting(false);
    }
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Tem certeza que deseja excluir este usuário?
      </Heading>
      <Button onClick={excluirUsuario} colorScheme="red" isLoading={isDeleting}>
        Excluir
      </Button>
      <Link to="/usuarios">
        <Button ml={4} colorScheme="teal">
          Cancelar
        </Button>
      </Link>
    </Box>
  );
};

export default UsuarioExcluir;
