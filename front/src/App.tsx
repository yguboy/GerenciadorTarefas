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
import StatusListar from "./components/pages/status/status-listar";

function App() {
  return (
    <div>
    <ChakraProvider>
        <BrowserRouter>
        <nav>
          <ul>
            <li> <Link to="/"> Opções de Tarefas </Link> </li>
              <li> <Link to="/front/src/components/pages/tarefa/tarefas-cadastrar.tsx"> Cadastrar Tarefas </Link> </li>
              <li> <Link to="/front/src/components/pages/tarefa/tarefas-editar.tsx"> Editar Tarefas </Link> </li>
              <li> <Link to="/front/src/components/pages/tarefa/tarefas-listar.tsx"> Listar Tarefas </Link> </li>
              <li> <Link to="/front/src/components/pages/tarefa/tarefas-excluir.tsx"> Excluir Tarefas </Link> </li>
            </ul>
          <br />
          <ul>
            <li> <Link to="/"> Opções de Usuario </Link> </li>
              <li> <Link to="/front/src/components/pages/usuario/usuario-cadastrar.tsx"> Cadastrar Usuarios </Link> </li>
              <li> <Link to="/front/src/components/pages/usuario/usuario-editar.tsx"> Editar Usuarios </Link> </li>
              <li> <Link to="/front/src/components/pages/usuario/usuario-listar.tsx"> Listar Usuarios </Link> </li>
              <li> <Link to="/front/src/components/pages/usuario/usuario-excluir.tsx"> Excluir Usuarios </Link> </li>
            </ul>
          <br />
          <ul>
              <li> <Link to="/"> Opções de Prioridade </Link> </li>
              <li> <Link to="/front/src/components/pages/prioridade/prioridade-cadastrar.tsx"> Cadastrar Prioridades </Link> </li>
              <li> <Link to="/front/src/components/pages/prioridade/prioridade-editar.tsx"> Editar Prioridades </Link> </li>
              <li> <Link to="/front/src/components/pages/prioridade/prioridade-listar.tsx"> Listar Prioridades </Link> </li>
              <li> <Link to="/front/src/components/pages/prioridade/prioridade-excluir.tsx"> Excluir Prioridades </Link> </li>
          </ul>
          <br />
          <ul>
              <li> <Link to="/"> Opções de Status </Link> </li>
              <li> <Link to="/front/src/components/pages/status/status-cadastrar.tsx"> Cadastrar Status </Link> </li>
              <li> <Link to="/front/src/components/pages/status/status-editar.tsx"> Editar Status </Link> </li>
              <li> <Link to="/front/src/components/pages/status/status-listar.tsx"> Listar Status </Link> </li>
              <li> <Link to="/front/src/components/pages/status/status-excluir.tsxs"> Excluir Status </Link> </li>
          </ul>
        </nav>
            <Routes>
              <Route path="/front/src/components/pages/tarefa/tarefas-cadastrar.tsx" element={<TarefaCadastrar />} />
              <Route path="/front/src/components/pages/tarefa/tarefas-editar.tsx" element={<TarefaEditar />} />
              <Route path="/front/src/components/pages/tarefa/tarefas-listar.tsx" element={<TarefaListar />} />
              <Route path="/front/src/components/pages/tarefa/tarefas-excluir.tsx" element={<TarefaExcluir />} />
              <Route path="/front/src/components/pages/usuario/usuario-cadastrar.tsx" element={<UsuarioCadastrar />} />
              <Route path="/front/src/components/pages/usuario/usuario-editar.tsx" element={<UsuarioEditar />} />
              <Route path="/front/src/components/pages/usuario/usuario-listar.tsx" element={<UsuarioListar />} />
              <Route path="/front/src/components/pages/usuario/usuario-excluir.tsx" element={<UsuarioExcluir />} />
              <Route path="/front/src/components/pages/prioridade/prioridade-listar.tsx" element={<PrioridadeListar />} />
              <Route path="/front/src/components/pages/status" element={<StatusListar />} />
            </Routes>
          <footer>
          <br />
          <p> Desenvolvido por Felipe Pupo e Ygor Espada </p>
        </footer>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
