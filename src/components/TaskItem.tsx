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
import { useModal } from '../hooks/useModal';
import { Target, TaskActions } from '../context/taskReducer';
import { Task } from '../models';

interface TaskItemProps {
  index: number;
  todo: Task;
  dispatch: Dispatch<TaskActions>;
}

const TaskItem: FC<TaskItemProps> = memo(({ index, todo, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoText, setEditTodoText] = useState<string>(todo.todoText);
  const { isModalOpen, openModal, closeModal } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef?.current?.focus();
    }
  }, [isEditing, isModalOpen]);

  const handleDone = (id: string, target: Target): void => {
    dispatch({ type: 'DONE-TASK', payload: { id, target } });
    dispatch({ type: 'MOVE-TASK-BETWEEN-LISTS', payload: { target } });
    dispatch({ type: 'DELETE-TASK', payload: { id, target } });
  };

  const handleDelete = (id: string): void => {
    dispatch({ type: 'DELETE-TASK', payload: { id, target: 'todos' } });
    dispatch({
      type: 'DELETE-TASK',
      payload: { id, target: 'doneTodos' },
    });
  };

  const handleToggleEdit = (): void => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSaveEdit = (): void => {
    if (editTodoText.trim().length === 0) {
      openModal();
      return;
    }

    dispatch({
      type: 'EDIT-TASK',
      payload: { id: todo.id, editTodoText },
    });
    setIsEditing(false);
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
                  disabled={isEditing}
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
            {isEditing ? (
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
              {!todo.done && (
                <button
                  className="todo-control-btn"
                  aria-label={isEditing ? 'Save' : 'Edit'}
                  onClick={isEditing ? handleSaveEdit : handleToggleEdit}
                >
                  {isEditing ? <FaPlus /> : <FaEdit />}
                </button>
              )}
              <button
                className="todo-control-btn"
                disabled={isEditing}
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
          onClose={closeModal}
          title="Error"
          message="The already created task cannot be empty. Edit it correctly."
        />
      )}
    </>
  );
});

export default TaskItem;
