import { useParams } from "react-router-dom";
import Nav from "../components/nav";

export default function ProjectPage() {
  const params = useParams();

  const id = params.id;

  return (
    <div className="h-screen w-screen">
      <Nav />
    </div>
  );
}
