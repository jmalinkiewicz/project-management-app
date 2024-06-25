import { useState } from "react";
import { Project, useProjects } from "../../state/projects";
import XMarkIcon from "../icons/xmark";

type Props = {
  id: string;
  type: "toDo" | "inProgress" | "done";
};

export default function List({ id, type }: Props) {
  const project = useProjects((state) =>
    state.projects.find((p) => p.id === id),
  );

  const list = project?.lists[type];

  const label = {
    toDo: "To Do",
    inProgress: "In Progress",
    done: "Done",
  }[type];

  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { updateProject } = useProjects();

  function handleCreateTask(e: any) {
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

    const updatedProject: Project = {
      ...project,
      lists: {
        ...project.lists,
        [type]: [...project.lists[type], name],
      },
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
    };

    updateProject(id, updatedProject);
  }

  return (
    <div className="flex w-72 min-w-72 flex-col gap-4 rounded bg-slate-200 p-2">
      <h2>{label}</h2>
      <div className="flex flex-col gap-2">
        {list?.map((task) => (
          <div
            key={task}
            className="flex justify-between hyphens-auto rounded bg-gray-100 p-2 shadow"
          >
            <span>{task}</span>
            <button
              onClick={() => {
                handleDeleteTask(task);
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
          className="w-full rounded bg-blue-500 p-1.5 font-bold text-white hover:bg-blue-600"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
