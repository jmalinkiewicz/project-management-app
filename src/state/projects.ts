import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Project {
  name: string;
  id: string;
  lists: {
    toDo: string[];
    inProgress: string[];
    done: string[];
  };
}

interface ProjectsState {
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateProject: (id: string, project: Project) => void;
}

export const useProjects = create<ProjectsState>()(
  persist(
    (set) => ({
      projects: [
        {
          name: "Project 1",
          id: "1",
          lists: {
            toDo: ["Task 1", "Task 2"],
            inProgress: ["Task 3"],
            done: ["Task 4"],
          },
        },
      ],
      addProject: (project) =>
        set((state) => ({ projects: [...state.projects, project] })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),
      updateProject: (id, project) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? project : p)),
        })),
    }),
    { name: "projects" },
  ),
);
