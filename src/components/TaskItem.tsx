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
  task: Task;
  dispatch: Dispatch<TaskActions>;
}

const TaskItem: FC<TaskItemProps> = memo(({ index, task, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskText, setEditTaskText] = useState<string>(task.taskText);
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
    dispatch({ type: 'DELETE-TASK', payload: { id, target: 'tasks' } });
    dispatch({
      type: 'DELETE-TASK',
      payload: { id, target: 'doneTasks' },
    });
  };

  const handleToggleEdit = (): void => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSaveEdit = (): void => {
    if (editTaskText.trim().length === 0) {
      openModal();
      return;
    }

    dispatch({
      type: 'EDIT-TASK',
      payload: { id: task.id, editTaskText },
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
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided) => (
          <li
            className="task-item"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="task-control-buttons">
              <button
                className="task-control-btn"
                disabled={isEditing}
                aria-label={task.done ? 'Return' : 'Complete'}
                onClick={() =>
                  handleDone(task.id, task.done ? 'doneTasks' : 'tasks')
                }
              >
                {task.done ? <RiArrowGoBackFill /> : <MdDoneOutline />}
              </button>
            </div>
            {isEditing ? (
              <input
                type="text"
                className="task-text"
                value={editTaskText}
                onChange={(event) => setEditTaskText(event.target.value)}
                onKeyDown={handleKeyDownEnter}
                // onBlur={(event) => {
                // 	handleEdit(event, task.id);
                // 	inputRef.current?.blur();
                // }}
                ref={inputRef}
              />
            ) : (
              <p
                style={{ textDecoration: task.done ? 'line-through' : 'none' }}
                className="task-text"
              >
                {task.taskText}
              </p>
            )}
            <div className="task-control-buttons">
              {!task.done && (
                <button
                  className="task-control-btn"
                  aria-label={isEditing ? 'Save' : 'Edit'}
                  onClick={isEditing ? handleSaveEdit : handleToggleEdit}
                >
                  {isEditing ? <FaPlus /> : <FaEdit />}
                </button>
              )}
              <button
                className="task-control-btn"
                disabled={isEditing}
                aria-label="Delete"
                onClick={() => handleDelete(task.id)}
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
