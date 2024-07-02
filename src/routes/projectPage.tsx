import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/nav";
import { ListKey, Project, useProjects } from "../state/projects";
import { useEffect } from "react";
import List from "../components/list";
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";

export default function ProjectPage() {
  const navigate = useNavigate();
  const params = useParams();
  const project: Project | undefined = useProjects((state) =>
    state.projects.find((p) => p.slug === params.slug),
  ) as Project;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const { updateProject } = useProjects();

  useEffect(() => {
    if (!project) {
      navigate("/");
    }
  }, []);

  function handleDragEnd(event: any) {
    const taskID = event.active.id;
    const source = findTaskSource(taskID);
    const target: ListKey = event.over.id || "";

    console.log(target);

    if (!source || source === target) {
      return;
    }

    if (
      project === undefined ||
      project.lists === undefined ||
      project.lists[source] === undefined
    ) {
      return;
    }

    const updatedProject: Project = {
      ...project,
      lists: {
        ...project?.lists,
        [source]: project?.lists[source].filter((id) => id !== taskID),
        [target]: [...(project?.lists[target] || []), taskID],
      },
    };

    updateProject(project.id, updatedProject);
  }

  function findTaskSource(taskID: string) {
    if (project?.lists.toDo.includes(taskID)) {
      return "toDo";
    }
    if (project?.lists.inProgress.includes(taskID)) {
      return "inProgress";
    }
    if (project?.lists.done.includes(taskID)) {
      return "done";
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Nav id={String(project?.id)} />
      <div className="flex h-full w-full flex-nowrap items-start gap-8 overflow-x-auto overflow-y-scroll p-4">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <List id={String(project?.id)} type="toDo" />
          <List id={String(project?.id)} type="inProgress" />
          <List id={String(project?.id)} type="done" />
        </DndContext>
      </div>
    </div>
  );
}
