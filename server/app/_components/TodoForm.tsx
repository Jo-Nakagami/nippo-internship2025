'use client';

import React from "react";
import TodoItem from "@/app/_components/TodoItem";
import { TodoData, TodoStatus } from "@/app/_types/TodoTypes";
import TodoEditor from "@/app/_components/TodoEditor";

const TodoForm = ({ children }): JSX.Element => {
  const [todoList, setTodoList] = React.useState<TodoData[]>(children);

  const newTodo: TodoData = {
    id: todoList.length === 0
      ? 0
      : todoList.map((todo) => todo.id).reduce((val1, val2) => Math.max(val1, val2)) + 1,
    status: TodoStatus.Backlog,
    title: "Newタスク",
    description: "タスクの説明文",
  };

  const [editingTodoIndex, setEditingTodoIndex] = React.useState<number | undefined>(undefined);
  const [editTargetTodo, setEditTargetTodo] = React.useState<TodoData>(newTodo);

  const onTodoSubmitted = (todo: TodoData) => {
    const result = window.confirm(editingTodoIndex !== undefined ? 'タスクを変更しますか？' : '新タスクを追加しますか？');
    if (!result) return;

    if (editingTodoIndex === undefined) {
      // 新規追加
      setTodoList([...todoList, todo]);
    } else {
      // 既存のタスクを更新
      const updatedList = [...todoList];
      updatedList[editingTodoIndex] = todo;
      setTodoList(updatedList);
    }

    // フォームをリセット
    setEditingTodoIndex(undefined);
    setEditTargetTodo({
      ...newTodo,
      id:
        todoList.length === 0
          ? 0
          : todoList.map((todo) => todo.id).reduce((val1, val2) => Math.max(val1, val2)) + 1,
    });
  };

  const onTodoEditBegining = (todo: TodoData) => {
    const idx = todoList.findIndex((item) => item.id === todo.id);
    setEditingTodoIndex(idx);
    setEditTargetTodo(todoList[idx]);
  };

  return (
    <>
      {todoList &&
        todoList.map((item) => (
          <TodoItem key={item.id} todo={item} onEditBeginingHandler={onTodoEditBegining} />
        ))}
      <TodoEditor
        editTargetTodo={editTargetTodo}
        onSubmit={onTodoSubmitted}
        isEditing={editingTodoIndex !== undefined}
      />
    </>
  );
};

export default TodoForm;