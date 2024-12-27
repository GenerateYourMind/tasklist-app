import { FC, FormEvent, useRef, useContext, useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import Modal from './Modal';
import { useModal } from '../hooks/useModal';
import { TaskContext } from '../context/TaskContext';
import './styles.scss';

const CreateTask: FC = () => {
  const [todoText, setTodoText] = useState('');
  const { isModalOpen, openModal, closeModal } = useModal();
  const { dispatch } = useContext(TaskContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmitTask = (event: FormEvent): void => {
    event.preventDefault();

    if (todoText.trim().length === 0) {
      openModal();
      setTodoText('');
      return;
    }

    dispatch({ type: 'CREATE-TODO', payload: { todoText } });
    setTodoText('');
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
            value={todoText}
            onChange={(event) => setTodoText(event.target.value)}
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
