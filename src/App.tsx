import { ChakraProvider } from '@chakra-ui/react';
import { ToDoList } from './components/todo-list/ToDoList';

function App() {
  return (
    <ChakraProvider>
      <ToDoList />
    </ChakraProvider>
  );
}

export default App;
