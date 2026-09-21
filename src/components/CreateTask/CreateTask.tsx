import {
  FC,
  FormEvent,
  useRef,
  useContext,
  useState,
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import { PiPlusBold } from 'react-icons/pi';
import Modal from '@components/Modal';
import { useModal } from '@hooks/useModal';
import { TaskContext } from '@context/TaskContext';
import styles from './CreateTask.module.scss';

const CreateTask: FC = () => {
  const [taskText, setTaskText] = useState('');
  const { isModalOpen, openModal, closeModal } = useModal();
  const { dispatch } = useContext(TaskContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTaskText(event.target.value);
  };

  const handleSubmitTask = (event: FormEvent): void => {
    event.preventDefault();
    const trimmedText = taskText.trim();

    if (trimmedText.length === 0) {
      setTaskText('');
      openModal();
      return;
    }

    inputRef.current?.blur();
    dispatch({ type: 'CREATE_TASK', payload: { taskText: trimmedText } });
    setTaskText('');
  };

  const handleFormKeyDown = (event: KeyboardEvent<HTMLFormElement>): void => {
    if (event.key === 'Escape' && event.target instanceof HTMLElement) {
      event.target.blur();
    }
  };

  const handleKeepInputFocus = (event: MouseEvent<HTMLButtonElement>): void => {
    // Prevent input blur on mousedown to avoid UI flickering
    event.preventDefault();
  };

  return (
    <>
      <form
        className={`${styles.form} ${styles.backdrop}`}
        onSubmit={handleSubmitTask}
        onKeyDown={handleFormKeyDown}
      >
        <input
          className={styles.input}
          type="text"
          placeholder="Enter your task..."
          value={taskText}
          aria-label="New task"
          onChange={handleInputChange}
          ref={inputRef}
        />
        <button
          className={styles.submitButton}
          aria-label="Create"
          onMouseDown={handleKeepInputFocus}
        >
          <PiPlusBold />
        </button>
      </form>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          title="Error"
          message="A task cannot have an empty name."
        />
      )}
    </>
  );
};

export default CreateTask;
