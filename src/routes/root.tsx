import { Link } from "react-router-dom";
import { useProjects } from "../state/projects";

export default function Root() {
  const projects = useProjects((state) => state.projects);

  return (
    <main className="flex flex-col gap-16 p-8 lg:p-16">
      <h1 className="text-5xl font-bold">Hello!</h1>
      {projects.length === 0 && (
        <p className="text-xl">You don't have any projects yet.</p>
      )}
      {projects.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl">Recent Projects</h2>
          <ul className="flex flex-col gap-2">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  to={`/projects/${project.id}`}
                  className="text-xl text-blue-500 hover:underline"
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <Link
          to="/new"
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Create Project
        </Link>
      </div>
    </main>
  );
}
