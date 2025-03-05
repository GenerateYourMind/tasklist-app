import {
  FC,
  useState,
  useRef,
  useEffect,
  memo,
  Dispatch,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { MdDoneOutline } from 'react-icons/md';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { Draggable } from '@hello-pangea/dnd';
import Modal from '@components/Modal';
import { useModal } from '@hooks/useModal';
import { Task, TaskActions, Target } from '@typings/taskTypes';
import styles from './TaskItem.module.scss';

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
      inputRef.current?.focus();
    }
  }, [isEditing, isModalOpen]);

  const handleComplete = (): void => {
    const target: Target = task.isCompleted ? 'completedTasks' : 'activeTasks';

    dispatch({ type: 'COMPLETE-TASK', payload: { id: task.id, target } });
    dispatch({ type: 'MOVE-TASK-BETWEEN-LISTS', payload: { target } });
    dispatch({ type: 'DELETE-TASK', payload: { id: task.id, target } });
  };

  const handleDelete = (): void => {
    dispatch({
      type: 'DELETE-TASK',
      payload: { id: task.id, target: 'activeTasks' },
    });
    dispatch({
      type: 'DELETE-TASK',
      payload: { id: task.id, target: 'completedTasks' },
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

  const handleEditTaskText = (event: ChangeEvent<HTMLInputElement>): void => {
    setEditTaskText(event.target.value);
  };

  return (
    <>
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided) => (
          <li
            className={styles.taskItem}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className={styles.controlButtons}>
              <button
                className={styles.controlButton}
                disabled={isEditing}
                aria-label={task.isCompleted ? 'Return' : 'Complete'}
                onClick={handleComplete}
              >
                {task.isCompleted ? <RiArrowGoBackFill /> : <MdDoneOutline />}
              </button>
            </div>
            {isEditing ? (
              <input
                type="text"
                className={styles.text}
                value={editTaskText}
                onChange={handleEditTaskText}
                onKeyDown={handleKeyDownEnter}
                ref={inputRef}
              />
            ) : (
              <p
                className={styles.text}
                style={{
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                }}
              >
                {task.taskText}
              </p>
            )}
            <div className={styles.controlButtons}>
              {!task.isCompleted && (
                <button
                  className={styles.controlButton}
                  aria-label={isEditing ? 'Save' : 'Edit'}
                  onClick={isEditing ? handleSaveEdit : handleToggleEdit}
                >
                  {isEditing ? <FaPlus /> : <FaEdit />}
                </button>
              )}
              <button
                className={styles.controlButton}
                disabled={isEditing}
                aria-label="Delete"
                onClick={handleDelete}
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
