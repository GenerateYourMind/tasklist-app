import {
  FC,
  FormEvent,
  useRef,
  useContext,
  useState,
  ChangeEvent,
} from 'react';
import { PiPlusBold } from 'react-icons/pi';
import Modal from '@components/Modal';
import { useModal } from '@hooks/useModal';
import { TaskContext } from '@context/TaskContext';
import './CreateTask.scss';

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
      openModal();
      setTaskText('');
      return;
    }

    dispatch({ type: 'CREATE-TASK', payload: { taskText } });
    setTaskText('');
    inputRef.current?.blur();
  };

  return (
    <>
      <form className="create-task-form" onSubmit={handleSubmitTask}>
        <div className="input-backdrop">
          <input
            type="text"
            className="create-task-input"
            placeholder="Enter your task..."
            value={taskText}
            onChange={handleTaskText}
            ref={inputRef}
          />
        </div>
        <button className="create-task-button" aria-label="Create">
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
