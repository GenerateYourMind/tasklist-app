import {
  FC,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  memo,
  Dispatch,
  KeyboardEvent,
  ChangeEvent,
  MouseEvent,
  AnimationEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { Draggable } from '@hello-pangea/dnd';
import clsx from 'clsx';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { MdDoneOutline } from 'react-icons/md';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { getTaskDropStyle } from '@utils/getTaskDropStyle';
import { portal } from '@utils/portal';
import Modal from '@components/Modal';
import { useModal } from '@hooks/useModal';
import { useWindowResize } from '@hooks/useWindowResize';
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
  const isAnimating = useRef(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const updateTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  useWindowResize(updateTextareaHeight, isEditing);

  useLayoutEffect(() => {
    if (!isEditing) return;

    updateTextareaHeight();
  }, [isEditing, editTaskText, updateTextareaHeight]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!isEditing || isModalOpen || !textarea) return;

    textarea.focus();
    const length = textarea.value.length;
    textarea.setSelectionRange(length, length);
  }, [isEditing, isModalOpen]);

  const handleMoveTaskBetweenLists = (): void => {
    const target: Target = task.isCompleted ? 'completedTasks' : 'activeTasks';

    dispatch({ type: 'COMPLETE_TASK', payload: { id: task.id, target } });
    dispatch({ type: 'MOVE_TASK_BETWEEN_LISTS', payload: { target } });
    dispatch({ type: 'DELETE_TASK', payload: { id: task.id, target } });
  };

  const handleDelete = (): void => {
    dispatch({
      type: 'DELETE_TASK',
      payload: { id: task.id, target: 'activeTasks' },
    });
    dispatch({
      type: 'DELETE_TASK',
      payload: { id: task.id, target: 'completedTasks' },
    });
  };

  const handleToggleEdit = (): void => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSaveEdit = (): void => {
    const trimmedText = editTaskText.trim();

    if (trimmedText.length === 0) {
      textareaRef.current?.blur();
      setEditTaskText(task.taskText);
      openModal();
      return;
    }

    dispatch({
      type: 'EDIT_TASK',
      payload: { id: task.id, editTaskText: trimmedText },
    });
    setEditTaskText(trimmedText);
    setIsEditing(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key !== 'Enter' || event.shiftKey) return;

    event.preventDefault();
    handleSaveEdit();
  };

  const handleEditTaskText = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setEditTaskText(event.target.value);
  };

  const handleKeepTextareaFocus = (event: MouseEvent<HTMLElement>): void => {
    // Prevent textarea blur on mousedown to avoid UI flickering
    event.preventDefault();
  };

  const handleAnimationEnd = (event: AnimationEvent<HTMLLIElement>): void => {
    if (event.animationName.includes('appear')) {
      isAnimating.current = false;
    }
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index} isDragDisabled={isEditing}>
        {(provided, snapshot) => (
          <li
            className={clsx(styles.taskItem, {
              [styles.isAnimating]: isAnimating.current,
              [styles.isDragging]: snapshot.isDragging,
              [styles.isEditing]: isEditing,
            })}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getTaskDropStyle(provided.draggableProps.style, snapshot)}
            onAnimationEnd={handleAnimationEnd}
            ref={provided.innerRef}
          >
            <div className={styles.controlButtons}>
              <button
                className={styles.controlButton}
                disabled={isEditing}
                aria-label={task.isCompleted ? 'Return' : 'Complete'}
                onClick={handleMoveTaskBetweenLists}
              >
                {task.isCompleted ? <RiArrowGoBackFill /> : <MdDoneOutline />}
              </button>
            </div>
            {isEditing ? (
              <textarea
                className={styles.text}
                value={editTaskText}
                onChange={handleEditTaskText}
                onKeyDown={handleKeyDown}
                ref={textareaRef}
                rows={1}
              ></textarea>
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
                  onMouseDown={handleKeepTextareaFocus}
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

      {isEditing &&
        !isModalOpen &&
        createPortal(
          <div
            className={styles.backdrop}
            onMouseDown={handleKeepTextareaFocus}
            onClick={handleSaveEdit}
          />,
          portal
        )}

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
