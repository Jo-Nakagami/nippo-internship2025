'use client';
import React from "react";
import { TodoData } from "@/app/_types/TodoTypes";

type TodoEditorProps = {
  editTargetTodo: TodoData;
  onSubmit: (todo: TodoData) => void;
  isEditing: boolean;
};

// <<<<<<< HEAD
// const TodoEditor = ({ editTargetTodo, onSubmit, isEditing }: TodoEditorProps): JSX.Element => {
//   if (!editTargetTodo) {
//     return <p>loading...</p>
//   }

//   const [todo, setTodo] = React.useState<TodoData>(editTargetTodo);
// =======
const TodoEditor = ({ editTargetTodo, onSubmit, isEditing }: TodoEditorProps): JSX.Element => {
  const [todo, setTodo] = React.useState<TodoData | null>(null);
// >>>>>>> origin/main

  React.useEffect(() => {
    setTodo(editTargetTodo);
  }, [editTargetTodo]);

  if (!todo) {
    return <p>loading...</p>;
  }

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.target.value });
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, description: e.target.value });
// <<<<<<< HEAD
// =======
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      onSubmit(todo);
    }
// >>>>>>> origin/main
  };

  return (
    <div className="w-100 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <form onSubmit={handleSubmit}>
        <div className="m-2">
          <label className="text-gray-400">タイトル</label>
          <input
            type="text"
            value={todo.title}
            onChange={onTitleChange}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="m-2">
          <label className="text-gray-400">詳細</label>
          <input
            type="text"
            value={todo.description}
            onChange={onDescriptionChange}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="m-2">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isEditing ? "変更" : "追加"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoEditor;