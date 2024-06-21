import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/nav";
import { useProjects } from "../state/projects";
import { useEffect } from "react";

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
    <div className="h-screen w-screen">
      <Nav id={String(project?.id)} />
    </div>
  );
}
