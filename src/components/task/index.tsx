import { useDraggable } from "@dnd-kit/core";
import XMarkIcon from "../icons/xmark";

type Props = {
  task: any;
  handleDeleteTask: (id: string) => void;
};

export default function TaskCard({ task, handleDeleteTask }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task?.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex justify-between hyphens-auto rounded bg-gray-100 p-2 shadow"
    >
      <span>{task?.name}</span>
      <button
        onClick={() => {
          handleDeleteTask(task?.id || "");
        }}
        className="rounded hover:bg-gray-200"
      >
        <XMarkIcon />
      </button>
    </div>
  );
}
