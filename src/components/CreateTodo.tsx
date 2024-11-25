import { FC, FormEvent, useRef, useContext, useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import Modal from './Modal';
import { TodoContext } from '../context/TodoContext';
import './styles.scss';

const CreateTodo: FC = () => {
  const [todoText, setTodoText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dispatch } = useContext(TodoContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleModal = (): void => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  const handleSubmitTodo = (event: FormEvent): void => {
    event.preventDefault();

    if (todoText.trim().length === 0) {
      toggleModal();
      setTodoText('');
      return;
    }

    dispatch({ type: 'CREATE-TODO', payload: { todoText } });
    setTodoText('');
  };
  // createTodo instead of create-todo-form classes
  // add name to input or look on console in webdev tools
  return (
    <>
      <form
        className="create-todo-form"
        onSubmit={(event) => {
          handleSubmitTodo(event);
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
          onClose={toggleModal}
          title="Error"
          message="A task cannot have an empty field."
        />
      )}
    </>
  );
};

export default CreateTodo;
