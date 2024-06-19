import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TarefaListar from "./components/pages/tarefa/TarefaListar";
import TarefaCadastrar from "./components/pages/tarefa/TarefaCadastrar";
import TarefaEditar from "./components/pages/tarefa/TarefaEditar";
import TarefaExcluir from "./components/pages/tarefa/TarefaExcluir";
import UsuarioListar from "./components/pages/usuario/UsuarioListar";
import UsuarioCadastrar from "./components/pages/usuario/UsuarioCadastrar";
import UsuarioEditar from "./components/pages/usuario/UsuarioEditar";
import UsuarioExcluir from "./components/pages/usuario/UsuarioExcluir";
import PrioridadeListar from "./components/pages/prioridade/PrioridadeListar"; // Importe a página de listagem de prioridades
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/tarefas" element={<TarefaListar />} />
          <Route path="/tarefas/cadastrar" element={<TarefaCadastrar />} />
          <Route path="/tarefas/:id/editar" element={<TarefaEditar />} />
          <Route path="/tarefas/:id/excluir" element={<TarefaExcluir />} />
          <Route path="/usuarios" element={<UsuarioListar />} />
          <Route path="/usuarios/cadastrar" element={<UsuarioCadastrar />} />
          <Route path="/usuarios/:id/editar" element={<UsuarioEditar />} />
          <Route path="/usuarios/:id/excluir" element={<UsuarioExcluir />} />
          <Route path="/prioridades" element={<PrioridadeListar />} /> {/* Adicione a rota para a listagem de prioridades */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
