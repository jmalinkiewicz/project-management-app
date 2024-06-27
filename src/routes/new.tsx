import { useState } from "react";
import { useProjects } from "../state/projects";
import { useNavigate } from "react-router-dom";
import { createSlug } from "../helpers";

export default function New() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const { addProject } = useProjects();

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const slug = createSlug(name);

    if (!name) {
      return;
    }

    addProject({
      name,
      id: name.toLowerCase(),
      lists: {
        toDo: [],
        inProgress: [],
        done: [],
      },
      slug,
      tasks: [],
    });

    navigate("/projects/" + slug);
  }

  return (
    <main className="flex flex-col gap-8 p-8 lg:p-16">
      <h1 className="text-5xl font-bold">Create a New Project</h1>
      <div className="flex justify-center">
        <form
          onSubmit={handleCreate}
          className="w-full max-w-xl rounded bg-gray-100 p-4"
        >
          <label className="flex flex-col gap-2">
            <span className="text-xl font-bold">Name</span>
            <input
              className="rounded p-1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <button className="mt-4 w-full rounded bg-blue-500 p-1 font-bold text-white hover:bg-blue-600">
            Create
          </button>
        </form>
      </div>
    </main>
  );
}
