import { FC, FormEvent, useRef, useContext, useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import Modal from './Modal';
import { useModal } from '../hooks/useModal';
import { TaskContext } from '../context/TaskContext';
import './styles.scss';

const CreateTask: FC = () => {
  const [taskText, setTaskText] = useState('');
  const { isModalOpen, openModal, closeModal } = useModal();
  const { dispatch } = useContext(TaskContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmitTask = (event: FormEvent): void => {
    event.preventDefault();

    if (taskText.trim().length === 0) {
      openModal();
      setTaskText('');
      return;
    }

    dispatch({ type: 'CREATE-TASK', payload: { taskText } });
    setTaskText('');
  };
  // createTask instead of create-todo-form classes
  // add name to input or look on console in webdev tools
  return (
    <>
      <form
        className="create-todo-form"
        onSubmit={(event) => {
          handleSubmitTask(event);
          inputRef.current?.blur();
        }}
      >
        <div className="input-backdrop">
          <input
            type="text"
            placeholder="Enter your task..."
            className="create-todo-input"
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            ref={inputRef}
          />
        </div>
        <button className="create-todo-button" aria-label="Create">
          <PiPlusBold />
        </button>
      </form>
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          title="Error"
          message="A task cannot have an empty field."
        />
      )}
    </>
  );
};

export default CreateTask;
