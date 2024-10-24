import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import TodoListItem from './TodoListItem';

const todoStatusText = {
  true: 'completed',
  false: 'active',
};

const filterTodo = (todos, filters) =>
  todos.filter((todo) => {
    const filterColorHasDefaultState = filters.colors.length === 0;
    const filterStatusHasDefaultState = filters.status === 'all';
    const filteredByColor =
      filterColorHasDefaultState || filters.colors.includes(todo.color);
    const filteredByStatus =
      filterStatusHasDefaultState ||
      filters.status === todoStatusText[todo.completed];

    return filteredByColor && filteredByStatus;
  });

const selectTodoIds = (state) => {
  const { todos, filters } = state;

  return filterTodo(todos, filters).map((todo) => todo.id);
};

const TodoList = () => {
  const todoIds = useSelector(selectTodoIds, shallowEqual);

  const renderedListItems = todoIds.map((todoId) => (
    <TodoListItem key={todoId} id={todoId} />
  ));

  return <ul className="todo-list">{renderedListItems}</ul>;
};

export default TodoList;
