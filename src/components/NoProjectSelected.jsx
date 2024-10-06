import { useProjectsContext } from "../context/projectContext";
import noProjectImage from "../assets/no-projects.png";
import Button from "./Button";

export default function NoProjectSelected() {
  const { dispatch } = useProjectsContext();

  return (
    <div className="mt-24 text-center w-2/3 m-auto">
      <img
        src={noProjectImage}
        alt="An empty task list"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one
      </p>
      <p className="mt-8">
        <Button onClick={() => dispatch({ type: "START_ADD_PROJECT" })}>
          Create new project
        </Button>
      </p>
    </div>
  );
}
