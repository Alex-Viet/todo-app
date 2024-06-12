import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ToDoList } from './ToDoList';

describe('ToDoList component', () => {
  it('renders initial tasks', () => {
    render(<ToDoList />);
    expect(screen.getByText('Выполнить тестовое задание')).toBeInTheDocument();
    expect(screen.getByText('Написать красивый код')).toBeInTheDocument();
    expect(screen.getByText('Покрыть тестами')).toBeInTheDocument();
  });

  it('adds a new task', () => {
    render(<ToDoList />);
    const input = screen.getByPlaceholderText('Type your task and press Enter');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  it('filters tasks', () => {
    render(<ToDoList />);
    fireEvent.click(screen.getByText('Completed'));
    expect(
      screen.queryByText('Выполнить тестовое задание'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Написать красивый код')).not.toBeInTheDocument();
    expect(screen.queryByText('Покрыть тестами')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Active'));
    expect(
      screen.queryByText('Выполнить тестовое задание'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Написать красивый код')).toBeInTheDocument();
    expect(screen.queryByText('Покрыть тестами')).not.toBeInTheDocument();
  });

  it('clears completed tasks', () => {
    render(<ToDoList />);
    fireEvent.click(screen.getByText('Clear completed'));
    expect(
      screen.queryByText('Выполнить тестовое задание'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Покрыть тестами')).not.toBeInTheDocument();
  });
});
