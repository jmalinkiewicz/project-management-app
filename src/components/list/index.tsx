import { useState } from "react";
import { Project, Task, useProjects } from "../../state/projects";
import PlusIcon from "../icons/plus";
import { createId } from "@paralleldrive/cuid2";
import TaskCard from "../task";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
  type: "toDo" | "inProgress" | "done";
};

export default function List({ id, type }: Props) {
  const project = useProjects((state) =>
    state.projects.find((p) => p.id === id),
  );

  const taskIDs = project?.lists[type];
  const tasks = taskIDs?.map((id) => project?.tasks.find((t) => t.id === id));

  const label = {
    toDo: "To Do",
    inProgress: "In Progress",
    done: "Done",
  }[type];

  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { updateProject } = useProjects();
  const { isOver, setNodeRef } = useDroppable({
    id: type,
  });

  const style = isOver ? "bg-slate-300 pb-8" : "";

  function handleCreateTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!isCreating) {
      setIsCreating(true);
      return;
    }
    if (!name) return;

    if (
      project === undefined ||
      project.lists === undefined ||
      project.lists[type] === undefined
    ) {
      return;
    }

    const task: Task = {
      name,
      id: createId(),
    };

    const updatedProject: Project = {
      ...project,
      lists: {
        ...project.lists,
        [type]: [...project.lists[type], task.id],
      },
      tasks: [...project.tasks, task],
    };

    updateProject(id, updatedProject);

    setName("");
    setIsCreating(false);
  }

  function handleDeleteTask(task: string) {
    if (
      project === undefined ||
      project.lists === undefined ||
      project.lists[type] === undefined
    ) {
      return;
    }

    const updatedProject: Project = {
      ...project,
      lists: {
        ...project.lists,
        [type]: project.lists[type].filter((t) => t !== task),
      },
      tasks: project.tasks.filter((t) => t.id !== task),
    };

    updateProject(id, updatedProject);
  }

  return (
    <div className="flex w-72 min-w-72 flex-col gap-4 rounded border-2 border-black/10 bg-slate-200 p-2">
      <h2 className="text-xl font-semibold">{label}</h2>
      <div ref={setNodeRef} className={`flex flex-col gap-2 rounded ${style}`}>
        {tasks?.map((task) => (
          <TaskCard
            key={task?.id}
            task={task}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
        {tasks?.length === 0 && (
          <h3 className="py-2 text-black/50">No tasks</h3>
        )}
      </div>
      <form className="flex flex-col gap-2">
        {isCreating && (
          <div>
            <label className="flex flex-col gap-2">
              <span>Task:</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded p-1"
              />
            </label>
          </div>
        )}
        <button
          onClick={handleCreateTask}
          className="flex w-full gap-3 rounded p-1.5 font-semibold text-gray-500 hover:bg-gray-300 hover:text-gray-700"
        >
          <span>
            <PlusIcon />
          </span>
          <span>Create Task</span>
        </button>
      </form>
    </div>
  );
}
