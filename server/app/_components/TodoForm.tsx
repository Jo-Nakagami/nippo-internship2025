'use client';
import React from "react";
import TodoItem from "@/app/_components/TodoItem";
import { TodoData, TodoStatus } from "@/app/_types/TodoTypes";
import TodoEditor from "@/app/_components/TodoEditor";

const TodoForm = ({ children }: { children: TodoData[] }): JSX.Element => {
  const [todoList, setTodoList] = React.useState<TodoData[]>(children);
  const [editingTodoIndex, setEditingTodoIndex] = React.useState<number | undefined>(undefined);

  const generateNewTodo = (): TodoData => {
    const newId =
      todoList.length === 0
        ? 0
        : Math.max(...todoList.map((todo) => todo.id)) + 1;
    return {
      id: newId,
      status: TodoStatus.Backlog,
      title: "Newタスク",
      description: "タスクの説明文",
    };
  };

  const [editTargetTodo, setEditTargetTodo] = React.useState<TodoData>(generateNewTodo());

  const onTodoSubmitted = (todo: TodoData) => {

    const result = window.confirm('新タスクを追加しますか？');
    if (!result) return;

    if (editingTodoIndex === undefined) {
      // 新規追加
      const newTodo = { ...todo, id: generateNewTodo().id };
      setTodoList([...todoList, newTodo]);
    } else {
      // 既存編集
      const updatedList = [...todoList];
      updatedList[editingTodoIndex] = todo;
      setTodoList(updatedList);
    }

    setEditingTodoIndex(undefined);
    setEditTargetTodo(generateNewTodo());
  };


  const onTodoEditBegining = (todo: TodoData) => {
    const idx = todoList.findIndex((item) => item.id === todo.id);
    if (idx !== -1) {
      setEditingTodoIndex(idx);
      setEditTargetTodo(todoList[idx]);
    }
  };

  // ここから追加: 削除関数
  const onDeleteTodo = (id: number) => {
    const result = window.confirm('本当にこのタスクを削除しますか？');
    if (result) {
      setTodoList(todoList.filter(todo => todo.id !== id));
      // 編集中のタスクを削除した場合は編集状態もリセット
      if (editingTodoIndex !== undefined) {
        const editingTodo = todoList[editingTodoIndex];
        if (editingTodo && editingTodo.id === id) {
          setEditingTodoIndex(undefined);
          setEditTargetTodo(newTodo);
        }
      }
    }
  }
  // ここまで追加

  return (
    <>

      {todoList && todoList.map((item) => (

        <TodoItem
          key={item.id}
          todo={item}
          onEditBeginingHandler={onTodoEditBegining}

          onDeleteHandler={onDeleteTodo}  // ここで削除ハンドラを渡す

        />
      ))}
      <TodoEditor editTargetTodo={editTargetTodo} onSubmit={onTodoSubmitted} />
    </>
  );
};

export default TodoForm;