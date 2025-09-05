'use client';
import React from "react";
import TodoItem from "@/app/_components/TodoItem";
import { TodoData, TodoStatus } from "@/app/_types/TodoTypes";
import TodoEditor from "@/app/_components/TodoEditor";

// <<<<<<< HEAD
// const TodoForm = ({ children }): JSX.Element => {
//   const [todoList, setTodoList] = React.useState<TodoData[]>(children);

//   const newTodo: TodoData = {
//     id: todoList.length === 0
//       ? 0
//       : todoList.map((todo) => todo.id).reduce((val1, val2) => Math.max(val1, val2)) + 1,
//     status: TodoStatus.Backlog,
//     title: "Newタスク",
//     description: "タスクの説明文",
//   };

//   const [editingTodoIndex, setEditingTodoIndex] = React.useState<number | undefined>(undefined);
//   const [editTargetTodo, setEditTargetTodo] = React.useState<TodoData>(newTodo);

//   const onTodoSubmitted = (todo: TodoData) => {
//     const result = window.confirm(editingTodoIndex !== undefined ? 'タスクを変更しますか？' : '新タスクを追加しますか？');
// =======
type TodoFormProps = {
  children: TodoData[]; // 初期データを children で受け取る
};

const TodoForm = ({ children }: TodoFormProps): JSX.Element => {
  
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
    const result = window.confirm(editingTodoIndex !== undefined ? 'タスクを変更しますか？' : '新タスクを追加しますか？');
// >>>>>>> origin/main
    if (!result) return;

    if (editingTodoIndex === undefined) {
      // 新規追加
// <<<<<<< HEAD
//       setTodoList([...todoList, todo]);
//     } else {
//       // 既存のタスクを更新
// =======
      const newTodo = { ...todo, id: generateNewTodo().id };
      setTodoList([...todoList, newTodo]);
    } else {
      // 既存編集
// >>>>>>> origin/main
      const updatedList = [...todoList];
      updatedList[editingTodoIndex] = todo;
      setTodoList(updatedList);
    }


    // フォームをリセット
    setEditingTodoIndex(undefined);
    setEditTargetTodo({
      ...todo,
      id:
        todoList.length === 0
          ? 0
          : todoList.map((todo) => todo.id).reduce((val1, val2) => Math.max(val1, val2)) + 1,
    });
  };


    setEditingTodoIndex(undefined);
    setEditTargetTodo(generateNewTodo());
  // };

 
  const onTodoEditBegining = (todo: TodoData) => {
    const idx = todoList.findIndex((item) => item.id === todo.id);
// <<<<<<< HEAD
//     setEditingTodoIndex(idx);
//     setEditTargetTodo(todoList[idx]);
//   };

//   return (
//     <>
//       {todoList &&
//         todoList.map((item) => (
//           <TodoItem key={item.id} todo={item} onEditBeginingHandler={onTodoEditBegining} />
//         ))}
//       <TodoEditor
//         editTargetTodo={editTargetTodo}
//         onSubmit={onTodoSubmitted}
//         isEditing={editingTodoIndex !== undefined}
//       />
// =======
    if (idx !== -1) {
      setEditingTodoIndex(idx);
      setEditTargetTodo(todoList[idx]);
    }
  };

  const onStatusChange = (id: number, newStatus: TodoStatus) => {
    const updatedList = todoList.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodoList(updatedList);
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
          setEditTargetTodo(editingTodo);
        }
      }
    }
  }
  // ここまで追加

  return (
    <>

      {todoList && todoList.map((item, idx) => (

        <TodoItem
          key={item.id}
          todo={item}
          onEditBeginingHandler={onTodoEditBegining}
          isediting={idx === editingTodoIndex}

          onDeleteHandler={onDeleteTodo}  // ここで削除ハンドラを渡す
          onStatusChange={onStatusChange}

        />
      ))}
      <TodoEditor editTargetTodo={editTargetTodo} onSubmit={onTodoSubmitted} isEditing={editingTodoIndex !== undefined} />

    </>
  );
};

export default TodoForm;