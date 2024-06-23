import React from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Link } from "react-router-dom";
import TarefaListar from "./components/pages/tarefa/tarefas-listar";
import TarefaCadastrar from "./components/pages/tarefa/tarefas-cadastrar";
import TarefaEditar from "./components/pages/tarefa/tarefas-editar";
import TarefaExcluir from "./components/pages/tarefa/tarefas-excluir";
import UsuarioListar from "./components/pages/usuario/usuario-listar";
import UsuarioCadastrar from "./components/pages/usuario/usuario-cadastrar";
import UsuarioEditar from "./components/pages/usuario/usuario-editar";
import UsuarioExcluir from "./components/pages/usuario/usuario-excluir";
import PrioridadeListar from "./components/pages/prioridade/prioridade-listar"; // Importe a página de listagem de prioridades
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div>
    <ChakraProvider>
        <BrowserRouter>
        <nav>
          <ul>
          <li> <Link to="/"> Home </Link> </li>
          <li> <Link to="/front/src/components/pages/tarefa/TarefaCadastrar.tsx"> Cadastrar Tarefas </Link> </li>
          <li> <Link to="/front/src/components/pages/tarefa/TarefaEditar.tsx"> Editar Tarefas </Link> </li>
          <li> <Link to="/front/src/components/pages/tarefa/TarefaListar.tsx"> Listar Tarefas </Link> </li>
          <li> <Link to="/front/src/components/pages/tarefa/TarefaExcluir.tsx"> Excluir Tarefas </Link> </li>
          </ul>
        </nav>
            <Routes>
              <Route path="/tarefas" element={<TarefaListar />} />
              <Route path="/tarefas/cadastrar" element={<TarefaCadastrar />} />
              <Route path="/tarefas/:id/editar" element={<TarefaEditar />} />
              <Route path="/tarefas/:id/excluir" element={<TarefaExcluir />} />
              <Route path="/usuarios" element={<UsuarioListar />} />
              <Route path="/usuarios/cadastrar" element={<UsuarioCadastrar />} />
              <Route path="/usuarios/:id/editar" element={<UsuarioEditar />} />
              <Route path="/usuarios/:id/excluir" element={<UsuarioExcluir />} />
              <Route path="/prioridades" element={<PrioridadeListar />} />
            </Routes>
          <footer>
          <p> Desenvolvido por Felipe Pupo e Ygor Espada </p>
        </footer>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
