import { useProjectsContext } from "../context/projectContext";
import Tasks from "./Tasks";

export default function SelectedProject() {
  const { projectsState, dispatch } = useProjectsContext();

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  const formattedDate = new Date(selectedProject.dueDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  function handleDeleteProject() {
    dispatch({ type: "DELETE_PROJECT" });
  }

  return (
    <div className="w-full max-w-[35rem] mx-auto md:mx-0 mt-16 px-8">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {selectedProject.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={handleDeleteProject}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {selectedProject.description}
        </p>
      </header>
      <Tasks />
    </div>
  );
}
