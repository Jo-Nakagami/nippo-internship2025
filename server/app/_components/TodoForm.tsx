'use client';

import React from "react";
import TodoItem from "@/app/_components/TodoItem";
import { TodoData, TodoStatus } from "@/app/_types/TodoTypes";
import TodoEditor from "@/app/_components/TodoEditor";

type TodoFormProps = {
  children: TodoData[]; // 初期データを children で受け取る
};

const TodoForm = ({ children }: TodoFormProps): JSX.Element => {
  
  const [todoList, setTodoList] = React.useState<TodoData[]>(children);
  const newTodo: TodoData = {
    id: todoList.length === 0 ? 0 : todoList.map((todo) => todo.id).reduce((val1, val2) => (Math.max(val1, val2))) + 1,
    status: TodoStatus.Backlog,
    title: "Newタスク",
    description: "タスクの説明文",
  };

  const [editingTodoIndex, setEditingTodoIndex] = React.useState<number>(undefined);
  const [editTargetTodo, setEditTargetTodo] = React.useState<TodoData>(newTodo);

  const onTodoSubmitted = (todo: TodoData) => {
     const result = window.confirm('新タスクを追加しますか');
      if (result) {
        switch (editingTodoIndex) {
        case undefined:
          setTodoList([...todoList, todo]);
          break;
        case 0:
          setTodoList([todo, todoList.slice(1)].flat());
          break;
        default:
          setTodoList([todoList.slice(0, editingTodoIndex), todo, todoList.slice(editingTodoIndex + 1)].flat());
      }
      setEditingTodoIndex(undefined);
      setEditTargetTodo(newTodo);
          
      }
  };

 
  const onTodoEditBegining = (todo: TodoData) => {
    const idx = todoList.findIndex((item) => item.id === todo.id);
    setEditingTodoIndex(idx);
    setEditTargetTodo(todoList[idx]);
   
  };
   const onStatusChange = (id: number, newStatus: TodoStatus) => {
    const updatedList = todoList.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodoList(updatedList);
  };
  return (
    <>
      { todoList && todoList.map((item, idx) => (
        <TodoItem key={item.id}
                  todo={item} 
                  onEditBeginingHandler={onTodoEditBegining}
                  isediting={idx === editingTodoIndex}
                  onStatusChange={onStatusChange}
          />
      ))}
      <TodoEditor editTargetTodo={editTargetTodo} onSubmit={onTodoSubmitted} />
    </>
  );
};

export default TodoForm;
