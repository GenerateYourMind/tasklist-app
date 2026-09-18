import {
  FC,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  memo,
  Dispatch,
  KeyboardEvent as ReactKeyboardEvent,
  ChangeEvent,
  MouseEvent,
  AnimationEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { Draggable } from '@hello-pangea/dnd';
import { FocusTrap } from 'focus-trap-react';
import clsx from 'clsx';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { MdDoneOutline } from 'react-icons/md';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { getTaskDropStyle } from '@utils/getTaskDropStyle';
import { portal } from '@utils/portal';
import Modal from '@components/Modal';
import { useModal } from '@hooks/useModal';
import { useWindowResize } from '@hooks/useWindowResize';
import { Task, TaskActions } from '@typings/taskTypes';
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
    if (!isEditing || !textarea) return;

    textarea.focus();
    const length = textarea.value.length;
    textarea.setSelectionRange(length, length);
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing || isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setEditTaskText(task.taskText);
        setIsEditing(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isEditing, isModalOpen, task.taskText]);

  const handleToggleComplete = (): void => {
    dispatch({ type: 'TOGGLE_TASK_COMPLETE', payload: { task } });
  };

  const handleDelete = (): void => {
    dispatch({
      type: 'DELETE_TASK',
      payload: { id: task.id, isCompleted: task.isCompleted },
    });
  };

  const handleStartEdit = (): void => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSaveEdit = (): void => {
    const trimmedText = editTaskText.trim();

    if (trimmedText.length === 0) {
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

  const handleKeyDown = (
    event: ReactKeyboardEvent<HTMLTextAreaElement>
  ): void => {
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
          <FocusTrap
            active={isEditing}
            focusTrapOptions={{
              allowOutsideClick: true,
              escapeDeactivates: false,
              initialFocus: false,
              returnFocusOnDeactivate: true,
            }}
          >
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
                  onClick={handleToggleComplete}
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
                    onClick={isEditing ? handleSaveEdit : handleStartEdit}
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
          </FocusTrap>
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
