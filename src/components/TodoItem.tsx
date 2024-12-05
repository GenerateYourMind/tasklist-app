import {
  FC,
  useState,
  useRef,
  useEffect,
  memo,
  Dispatch,
  KeyboardEvent,
} from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { MdDoneOutline } from 'react-icons/md';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { Draggable } from '@hello-pangea/dnd';
import Modal from './Modal';
import { Target, TodoActions } from '../context/todoReducer';
import { Todo } from '../models';

interface TodoItemProps {
  index: number;
  todo: Todo;
  dispatch: Dispatch<TodoActions>;
}

// * Check this component and functions on right using todos and doneTodos
const TodoItem: FC<TodoItemProps> = memo(({ index, todo, dispatch }) => {
  const [edit, setEdit] = useState(false);
  const [editTodoText, setEditTodoText] = useState<string>(todo.todoText);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edit) {
      inputRef?.current?.focus();
    }
  }, [edit, isModalOpen]);

  const handleDone = (id: string, target: Target): void => {
    dispatch({ type: 'DONE-TODO', payload: { id, target } });
    dispatch({ type: 'MOVE-TODO-BETWEEN-LISTS', payload: { target } });
    dispatch({ type: 'DELETE-TODO', payload: { id, target } });
  };

  const handleDelete = (id: string): void => {
    dispatch({ type: 'DELETE-TODO', payload: { id, target: 'todos' } });
    dispatch({
      type: 'DELETE-TODO',
      payload: { id, target: 'doneTodos' },
    });
  };

  const handleToggleEdit = (): void => {
    if (!edit) {
      setEdit(true);
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  //TODO: Review this function and where it's using below this code, because uses only for todos not for doneTodos
  //TODO: Consider adding a condition for an empty string
  const handleSaveEdit = (): void => {
    if (editTodoText.trim().length === 0) {
      toggleModal();
      return;
    }

    dispatch({
      type: 'EDIT-TODO',
      payload: { id: todo.id, editTodoText, target: 'todos' },
    });
    // dispatch({
    // 	type: 'EDIT-TODO',
    // 	payload: { id, editTodoText, target: 'doneTodos' },
    // });

    setEdit(false);
  };

  const handleKeyDownEnter = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSaveEdit();
    }
  };

  return (
    <>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided) => (
          <li
            className="todo-item"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="todo-control-buttons">
              {!todo.done ? (
                <button
                  className="todo-control-btn"
                  disabled={edit}
                  aria-label="Complete"
                  onClick={() => handleDone(todo.id, 'todos')}
                >
                  <MdDoneOutline />
                </button>
              ) : (
                <button
                  className="todo-control-btn"
                  aria-label="Return"
                  onClick={() => handleDone(todo.id, 'doneTodos')}
                >
                  <RiArrowGoBackFill />
                </button>
              )}
            </div>
            {edit ? (
              <input
                type="text"
                className="todo-text"
                value={editTodoText}
                onChange={(event) => setEditTodoText(event.target.value)}
                onKeyDown={handleKeyDownEnter}
                // onBlur={(event) => {
                // 	handleEdit(event, todo.id);
                // 	inputRef.current?.blur();
                // }}
                ref={inputRef}
              />
            ) : (
              <p
                style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
                className="todo-text"
              >
                {todo.todoText}
              </p>
            )}
            <div className="todo-control-buttons">
              {!edit ? (
                <button
                  className="todo-control-btn"
                  aria-label="Edit"
                  onClick={handleToggleEdit}
                >
                  <FaEdit />
                </button>
              ) : (
                <button
                  className="todo-control-btn"
                  aria-label="Save"
                  onClick={handleSaveEdit}
                >
                  <FaPlus />
                </button>
              )}
              <button
                className="todo-control-btn"
                disabled={edit}
                aria-label="Delete"
                onClick={() => handleDelete(todo.id)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        )}
      </Draggable>
      {isModalOpen && (
        <Modal
          onClose={toggleModal}
          title="Error"
          message="The already created task cannot be empty. Edit it correctly."
        />
      )}
    </>
  );
});

export default TodoItem;
