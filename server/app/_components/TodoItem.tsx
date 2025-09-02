import { FaCheckCircle, FaPen } from "react-icons/fa";
import { TodoData, TodoStatus } from "@/app/_types/TodoTypes";

type TodoItemProps = {
  id: number;
  todo: TodoData;
  onEditBeginingHandler?: (todo: TodoData) => void;
};

const TodoItem = ({ todo, onEditBeginingHandler }: TodoItemProps): JSX.Element => {

  let itemDesign = {
    caption: "",
    textColor: "",
    bgColor: "",
  };

  switch (todo.status) {
    case TodoStatus.Backlog:
      itemDesign.caption = "未着手";
      itemDesign.textColor = "text-gray-500";
      itemDesign.bgColor = "bg-gray-500";
      break;
    case TodoStatus.Inprogress:
      itemDesign.caption = "対応中";
      itemDesign.textColor = "text-blue-500";
      itemDesign.bgColor = "bg-blue-500";
      break;
    case TodoStatus.Done:
      itemDesign.caption = "完了"
      itemDesign.textColor = "text-emerald-500";
      itemDesign.bgColor = "bg-emerald-500";
      break;
  }
 // 編集中の状態に追加するスタイル
  const editingStyles = isediting ? "border-2 border-red-500 bg-red-50" : "";

  // 編集中の「編集」ボタン用のスタイル
  const editButtonStyles = isediting
    ? "bg-red-600 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-300"
    : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-300";

  // ボタンをクリックしたときに isediting の状態を切り替える
  const [isEditing, setIsEditing] = useState<boolean>(isediting);

  const handleEditClick = () => {
    if (onEditBeginingHandler) {
      onEditBeginingHandler(todo);
    }
    setIsEditing(!isEditing);
  };
  return (
    <div className="flex w-full border border-gray-300 max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className={`flex items-center justify-center w-12 ${itemDesign.bgColor}`}>
        {todo.status === TodoStatus.Done && (
          <FaCheckCircle className="w-6 h-6 text-white fill-current" />
        )}
      </div>

      <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
          <span className={`font-semibold ${itemDesign.textColor}`}>
            {todo.title}
          </span>
          <p className="me-1 mb-0 text-gray-700">{itemDesign.caption}</p>
          <p className="text-sm text-gray-600 dark:text-gray-200">
            {todo.description}
          </p>
          {/* 編集ボタン */}
          <button
            className={`flex w-20 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${editButtonStyles}`}
            onClick={handleEditClick}
          >
            <FaPen className="mr-2" /> {/*FaPen アイコンをボタン内に追加*/}
            編集
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
