import { useState } from "react";
import { Project, Task, useProjects } from "../../state/projects";
import XMarkIcon from "../icons/xmark";
import PlusIcon from "../icons/plus";
import { createId } from "@paralleldrive/cuid2";

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
    <div className="flex w-72 min-w-72 flex-col gap-4 rounded bg-slate-200 p-2">
      <h2>{label}</h2>
      <div className="flex flex-col gap-2">
        {tasks?.map((task) => (
          <div
            key={task?.id}
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
        ))}
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
