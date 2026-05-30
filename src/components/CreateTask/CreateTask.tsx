import {
  FC,
  FormEvent,
  useRef,
  useContext,
  useState,
  ChangeEvent,
  MouseEvent,
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

  const handleTaskText = (event: ChangeEvent<HTMLInputElement>): void => {
    setTaskText(event.target.value);
  };

  const handleSubmitTask = (event: FormEvent): void => {
    event.preventDefault();

    if (taskText.trim().length === 0) {
      inputRef.current?.blur();
      setTaskText('');
      openModal();
      return;
    }

    inputRef.current?.blur();
    dispatch({ type: 'CREATE-TASK', payload: { taskText } });
    setTaskText('');
  };

  const handleKeepInputFocus = (event: MouseEvent<HTMLButtonElement>): void => {
    // Prevent input blur on mousedown to avoid UI flickering
    event.preventDefault();
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmitTask}>
        <div className={styles.inputBackdrop}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your task..."
            value={taskText}
            onChange={handleTaskText}
            ref={inputRef}
          />
        </div>
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
