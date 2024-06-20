import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/nav";
import { useProjects } from "../state/projects";
import { useEffect } from "react";

export default function ProjectPage() {
  const navigate = useNavigate();
  const params = useParams();
  const project = useProjects((state) =>
    state.projects.find((p) => p.id === params.id),
  );

  useEffect(() => {
    if (!project) {
      navigate("/");
    }
  }, []);

  const id = params.id;

  return (
    <div className="h-screen w-screen">
      <Nav />
    </div>
  );
}
