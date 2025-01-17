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
import { Task, TaskActions, Target } from '../types/taskTypes';

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

  const handleComplete = (id: string, target: Target): void => {
    dispatch({ type: 'COMPLETE-TASK', payload: { id, target } });
    dispatch({ type: 'MOVE-TASK-BETWEEN-LISTS', payload: { target } });
    dispatch({ type: 'DELETE-TASK', payload: { id, target } });
  };

  const handleDelete = (id: string): void => {
    dispatch({ type: 'DELETE-TASK', payload: { id, target: 'activeTasks' } });
    dispatch({
      type: 'DELETE-TASK',
      payload: { id, target: 'completedTasks' },
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
                aria-label={task.isCompleted ? 'Return' : 'Complete'}
                onClick={() =>
                  handleComplete(
                    task.id,
                    task.isCompleted ? 'completedTasks' : 'activeTasks'
                  )
                }
              >
                {task.isCompleted ? <RiArrowGoBackFill /> : <MdDoneOutline />}
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
                style={{
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                }}
                className="task-text"
              >
                {task.taskText}
              </p>
            )}
            <div className="task-control-buttons">
              {!task.isCompleted && (
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
          message="The existing task cannot be empty. Please edit the task name."
        />
      )}
    </>
  );
});

export default TaskItem;
