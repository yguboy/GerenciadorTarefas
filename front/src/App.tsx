import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TarefaListar from "./components/pages/tarefa/tarefas-listar";
import TarefaCadastrar from "./components/pages/tarefa/tarefas-cadastrar";
import TarefaEditar from "./components/pages/tarefa/tarefas-editar";
import TarefaExcluir from "./components/pages/tarefa/tarefas-excluir";
import UsuarioListar from "./components/pages/usuario/usuario-listar";
import UsuarioCadastrar from "./components/pages/usuario/usuario-cadastrar";
import UsuarioEditar from "./components/pages/usuario/usuario-editar";
import UsuarioExcluir from "./components/pages/usuario/usuario-excluir";
import PrioridadeListar from "./components/pages/prioridade/prioridade-listar";
import { ChakraProvider, Box, Table, Tbody, Td, Th, Thead, Tr, Heading } from "@chakra-ui/react";
import StatusListar from "./components/pages/status/status-listar";
import PrioridadeCadastrar from "./components/pages/prioridade/prioridade-cadastrar";
import PrioridadeEditar from "./components/pages/prioridade/prioridade-editar";
import PrioridadeExcluir from "./components/pages/prioridade/prioridade-excluir";
import StatusCadastrar from "./components/pages/status/status-cadastrar";
import StatusEditar from "./components/pages/status/status-editar";
import StatusExcluir from "./components/pages/status/status-excluir";

function App() {
  return (
    <div>
      <ChakraProvider>
        <Router>
          <Box p={5}>
            <nav>
              <Heading as="h2" size="lg" mb={5}>Opções de Tarefas</Heading>
              <Table variant="striped" colorScheme="teal" mb={5}>
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Link</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Cadastrar Tarefas</Td>
                    <Td>
                      <Link to="/tarefas-cadastrar">Cadastrar</Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Editar Tarefas</Td>
                    <Td>
                      <Link to="/tarefas-editar">Editar</Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Listar Tarefas</Td>
                    <Td>
                      <Link to="/tarefas-listar">Listar</Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Excluir Tarefas</Td>
                    <Td>
                      <Link to="/tarefas-excluir">Excluir</Link>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>

              <Heading as="h2" size="lg" mb={5}>Opções de Usuário</Heading>
              <Table variant="striped" colorScheme="teal" mb={5}>
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Link</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Cadastrar Usuários</Td>
                    <Td>
                      <Link to="/usuario-cadastrar">Cadastrar</Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Editar Usuários</Td>
                    <Td>
                      <Link to="/usuario-editar">Editar</Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Listar Usuários</Td>
                    <Td>
                      <Link to="/usuario-listar">Listar</Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Excluir Usuários</Td>
                    <Td>
                      <Link to="/usuario-excluir">Excluir</Link>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>

              <Heading as="h2" size="lg" mb={5}>Opções de Prioridade</Heading>
              <Table variant="striped" colorScheme="teal" mb={5}>
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Link</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Cadastrar Prioridades</Td>
                    <Td>
                      <Link to="/prioridade-cadastrar">Cadastrar</Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Editar Prioridades</Td>
                    <Td>
                      <Link to="/prioridade-editar">Editar</Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Listar Prioridades</Td>
                    <Td>
                      <Link to="/prioridade-listar">Listar</Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Excluir Prioridades</Td>
                    <Td>
                      <Link to="/prioridade-excluir">Excluir</Link>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>

              <Heading as="h2" size="lg" mb={5}>Opções de Status</Heading>
              <Table variant="striped" colorScheme="teal" mb={5}>
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Link</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Cadastrar Status</Td>
                    <Td>
                      <Link to="/status-cadastrar">Cadastrar</Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Editar Status</Td>
                    <Td>
                      <Link to="/status-editar">Editar</Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Listar Status</Td>
                    <Td>
                      <Link to="/status-listar">Listar</Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Excluir Status</Td>
                    <Td>
                      <Link to="/status-excluir">Excluir</Link>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </nav>
            <Routes>
              <Route path="/tarefas-cadastrar" element={<TarefaCadastrar />} />
              <Route path="/tarefas-editar" element={<TarefaEditar />} />
              <Route path="/tarefas-listar" element={<TarefaListar />} />
              <Route path="/tarefas-excluir" element={<TarefaExcluir />} />
              <Route path="/usuario-cadastrar" element={<UsuarioCadastrar />} />
              <Route path="/usuario-editar" element={<UsuarioEditar />} />
              <Route path="/usuario-listar" element={<UsuarioListar />} />
              <Route path="/usuario-excluir" element={<UsuarioExcluir />} />
              <Route path="/prioridade-cadastrar" element={<PrioridadeCadastrar />} />
              <Route path="/prioridade-editar" element={<PrioridadeEditar />} />
              <Route path="/prioridade-listar" element={<PrioridadeListar />} />
              <Route path="/prioridade-excluir" element={<PrioridadeExcluir />} />
              <Route path="/status-cadastrar" element={<StatusCadastrar />} />
              <Route path="/status-editar" element={<StatusEditar />} />
              <Route path="/status-listar" element={<StatusListar />} />
              <Route path="/status-excluir" element={<StatusExcluir />} />
            </Routes>
          </Box>
          <footer>
            <Box p={5} mt={5} textAlign="center">
              <p> Desenvolvido por Felipe Pupo e Ygor Espada </p>
            </Box>
          </footer>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
