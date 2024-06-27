import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ListKey = "toDo" | "inProgress" | "done";

export interface Project {
  name: string;
  id: string;
  lists: {
    toDo: string[];
    inProgress: string[];
    done: string[];
  };
  slug: string;
  tasks: Task[];
}

export interface Task {
  name: string;
  id: string;
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
            toDo: ["1", "2"],
            inProgress: ["3"],
            done: ["4"],
          },
          slug: "project-1",
          tasks: [
            { name: "Task 1", id: "1" },
            { name: "Task 2", id: "2" },
            { name: "Task 3", id: "3" },
            { name: "Task 4", id: "4" },
          ],
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
