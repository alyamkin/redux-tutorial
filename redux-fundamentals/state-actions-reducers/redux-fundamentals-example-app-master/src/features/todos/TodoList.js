import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import TodoListItem from './TodoListItem';
import { selectFilteredTodoIds, selectLoadingStatus } from './todoSlice';

const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds);
  const loadingStatus = useSelector(selectLoadingStatus);

  const renderedListItems = todoIds.map((todoId) => (
    <TodoListItem key={todoId} id={todoId} />
  ));

  if (loadingStatus === 'loading') {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    );
  }

  return <ul className="todo-list">{renderedListItems}</ul>;
};

export default TodoList;
