import { AnimatePresence, motion } from "framer-motion";
import FolderIcon from "../icons/folder";
import SettingsIcon from "../icons/settings";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProjects } from "../../state/projects";

type Props = {
  id: string;
};

export default function Nav({ id }: Props) {
  const project = useProjects((state) =>
    state.projects.find((p) => p.id === id),
  );
  if (!project || project === undefined) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const { deleteProject, updateProject } = useProjects();
  const navigate = useNavigate();

  function handleDelete() {
    deleteProject(id);
    navigate("/");
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (project === undefined) {
      return;
    }

    updateProject(id, {
      name: event.target.value,
      id: project.id,
      lists: {
        toDo: project.lists.toDo,
        inProgress: project.lists.inProgress,
        done: project.lists.done,
      },
      slug: project.slug,
      tasks: project.tasks,
    });
  }

  return (
    <nav className="border-b-[1px] border-gray-400 p-4">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <motion.div
              initial={{
                backgroundColor: "#ffffff",
              }}
              className="rounded-full p-1.5"
              whileHover={{
                backgroundColor: "#f5f5f5",
              }}
              whileTap={{
                scale: 0.9,
              }}
            >
              <FolderIcon />
            </motion.div>
          </Link>
          <motion.input
            onChange={handleNameChange}
            whileHover={{
              backgroundColor: "#f5f5f5",
            }}
            whileFocus={{
              backgroundColor: "#f5f5f5",
            }}
            className="w-[450px] min-w-48 py-0.5 text-2xl font-bold focus:outline-none"
            type="text"
            spellCheck={false}
            value={project.name}
          />
        </div>
        <div className="relative flex items-center justify-center">
          <motion.button
            initial={{
              backgroundColor: "#ffffff",
            }}
            className="rounded-full p-1.5"
            whileHover={{
              backgroundColor: "#f5f5f5",
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <SettingsIcon />
          </motion.button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                className="absolute top-10 flex w-36 flex-col rounded bg-white p-1 shadow-md"
              >
                <button
                  onClick={handleDelete}
                  className="h-10 w-full rounded pl-2 text-left hover:bg-red-100"
                >
                  Delete
                </button>
                <Link
                  to="/new"
                  className="flex h-10 w-full items-center justify-start rounded pl-2 text-left hover:bg-blue-100"
                  target="_blank"
                >
                  New Project
                </Link>
                <a
                  href="https://github.com/jmalinkiewicz/project-management-app"
                  className="flex h-10 w-full items-center justify-start rounded pl-2 text-left hover:bg-slate-100"
                  target="_blank"
                >
                  GitHub
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
