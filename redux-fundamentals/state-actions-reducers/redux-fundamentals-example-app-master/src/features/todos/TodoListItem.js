import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as TimesSolid } from './times-solid.svg';

import { availableColors, capitalize } from '../filters/colors';
import {
  selectTodoById,
  todoToggled,
  colorSelected,
  todoDeleted,
} from '../todos/todoSlice';

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id));
  const { text, completed, color } = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = (e) => {
    dispatch(todoToggled(todo.id));
  };

  const handColorChanged = (e) => {
    dispatch(colorSelected(e.target.value, todo.id));
  };

  const handleDelete = () => {
    dispatch(todoDeleted(todo.id));
  };

  const colorOptions = availableColors.map((c) => {
    return (
      <option key={c} value={c}>
        {capitalize(c)}
      </option>
    );
  });

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={handleDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
