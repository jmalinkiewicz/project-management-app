import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/nav";
import { useProjects } from "../state/projects";
import { useEffect } from "react";
import List from "../components/list";

export default function ProjectPage() {
  const navigate = useNavigate();
  const params = useParams();
  const project = useProjects((state) =>
    state.projects.find((p) => p.slug === params.slug),
  );

  useEffect(() => {
    if (!project) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Nav id={String(project?.id)} />
      <div className="flex h-full w-full flex-nowrap items-start gap-8 overflow-x-auto overflow-y-scroll p-4">
        <List id={String(project?.id)} type="toDo" />
        <List id={String(project?.id)} type="inProgress" />
        <List id={String(project?.id)} type="done" />
      </div>
    </div>
  );
}
