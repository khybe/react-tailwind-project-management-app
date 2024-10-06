import { useProjectsContext } from "../context/projectContext";
import NewTask from "./NewTask";

export default function Tasks() {
  const { projectsState, dispatch } = useProjectsContext();

  const projectSpecificTasks = projectsState.tasks.filter(
    (task) => task.projectId === projectsState.selectedProjectId
  );

  const handleDeleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />
      {projectSpecificTasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {projectSpecificTasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {projectSpecificTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-end  py-1 my-4 border-b-2 border-stone-250 "
            >
              <span className="pr-4">{task.text}</span>
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => handleDeleteTask(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
