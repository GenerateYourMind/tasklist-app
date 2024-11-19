# Task List App

Task List App is a task management web application built with React and TypeScript. Users can create, edit, and move tasks between active and done lists. The app supports drag-and-drop functionality, along with animations for interactions. Themes are automatically set based on system preferences, and all changes are stored in localStorage. The app features both light and dark modes, as well as modal windows for error notifications. Built with Vite for fast development and optimized performance.

![Image](https://github.com/user-attachments/assets/d2ba4bf2-6e85-4fdc-a1cb-d75ff2be9a8e)

![Image](https://github.com/user-attachments/assets/7fb90ca1-d324-4776-90ed-d182265de969)

![Image](https://github.com/user-attachments/assets/f7410956-590b-48ec-98f8-2697656ae3e8)

## Features

- Create new tasks with a form and add them to the active task list.
- Edit existing tasks in the active task list.
- Mark tasks as complete, which automatically moves them to the done task list.
- Drag and drop tasks between the active and done task lists, as well as within the same list.
- Animated modals appear for error handling when tasks are not properly created or edited.
- Switch between light and dark themes, with automatic theme detection based on system preferences.
- Store tasks and theme preferences in localStorage for persistence across sessions.
- Interactive buttons for task actions: edit, complete, delete, and restore tasks.
- Optimized performance and fast development with Vite.

## Technologies

Project is created with:

- Vite version: 4.4.0
- React version: 18.2.0
- TypeScript": 5.0.2
- Sass, (Scss syntax): 1.63.6
- Html5
- @hello-pangea/dnd": 16.3.0
- uuid: 10.0.0
- react-icons: 4.10.1

## Installation

You need to install [Node.js and npm](https://nodejs.org/en/) to run this app.

1. Clone the repository:

   `git clone https://github.com/GenerateYourMind/tasklist-app.git`

2. Navigate to the project folder:

   `cd TaskListApp`

3. Install the dependencies:

   `npm install`

4. Start the app in development mode:

   `npm run dev`

5. Builds the app for production:

   `npm run build`

6. Start the app in production mode:

   `npm run preview`

## Usage

The application features an intuitive interface where you can create tasks by filling out a simple form and clicking the "Add Task" button or prresing the "Enter" key on your keyboard. Newly created tasks will appear in the active task list.

You can edit tasks, mark them as complete, or delete them using the corresponding buttons. Tasks can be dragged and dropped between the active and done lists, as well as reordered within the same list.

When you first enter the app, it automatically detects your system's theme and applies it. You can later switch between light and dark modes by clicking the theme toggle in the top-right corner.

In case of any errors, such as leaving the task form empty or trying to save an empty edited task, an animated modal window will appear with an error message to guide you.

All tasks and your theme preferences are saved in localStorage, so they persist even after refreshing or reopening the app.
