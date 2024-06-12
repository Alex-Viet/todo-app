import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  Button,
  Input,
  Heading,
  HStack,
  VStack,
  Checkbox,
  Text,
  StackDivider,
  useToast,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      text: 'Выполнить тестовое задание',
      completed: true,
    },
    {
      id: 2,
      text: 'Написать красивый код',
      completed: false,
    },
    {
      id: 3,
      text: 'Покрыть тестами',
      completed: true,
    },
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const toast = useToast();

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
      toast({
        title: 'Task added',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
    toast({
      title: 'Completed tasks cleared',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleToggleTask = (
    evt:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | ChangeEvent<HTMLDivElement>,
    taskId: number,
  ) => {
    evt.preventDefault();

    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
  });

  return (
    <Box
      maxW="3xl"
      mx="auto"
      mt={10}
      p={4}
      borderWidth={1}
      boxShadow="lg"
      bg="#f5f5f5"
    >
      <Heading
        mb={6}
        textAlign="center"
        color="#eccbc8"
        fontSize="7xl"
        fontWeight="100"
      >
        todos
      </Heading>
      <Box bg="#fff">
        <VStack
          divider={<StackDivider />}
          borderColor="gray.200"
          borderWidth="1px"
          p={4}
          spacing={4}
          align="stretch"
        >
          <HStack gap="0">
            <IconButton
              aria-label="Add task"
              bg="#fff"
              minW="20px"
              _hover={{ color: 'inherit' }}
              _active={{ color: 'inherit' }}
              icon={<ChevronDownIcon color="#b9b7b7" />}
              onClick={handleAddTask}
            />
            <Input
              border="none"
              p="10px"
              _focus={{ boxShadow: 'none' }}
              placeholder="Type your task and press Enter"
              _placeholder={{ color: '#b9b7b7' }}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            />
          </HStack>
          {filteredTasks.map((task) => (
            <HStack
              key={task.id}
              spacing={4}
              onClick={(e) => handleToggleTask(e, task.id)}
              cursor="pointer"
            >
              <Checkbox
                size="lg"
                iconColor="green"
                colorScheme="inherit"
                sx={{
                  '[data-checked]': { borderRadius: '50px' },
                  '& .chakra-checkbox__control': { borderRadius: '50px' },
                }}
                isChecked={task.completed}
                onChange={(e) => handleToggleTask(e, task.id)}
              />
              <Text
                as={task.completed ? 'del' : undefined}
                color={task.completed ? 'gray.500' : 'black'}
                flex={1}
              >
                {task.text}
              </Text>
            </HStack>
          ))}
          <HStack color="#b9b7b7" justify="space-between">
            <Text>
              {tasks.filter((task) => !task.completed).length} items left
            </Text>
            <Stack direction="row" spacing={4}>
              <Button size="sm" onClick={() => setFilter('all')}>
                All
              </Button>
              <Button size="sm" onClick={() => setFilter('active')}>
                Active
              </Button>
              <Button size="sm" onClick={() => setFilter('completed')}>
                Completed
              </Button>
            </Stack>
            <Button size="sm" onClick={handleClearCompleted}>
              Clear completed
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
