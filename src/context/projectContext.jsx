import { createContext, useContext, useReducer, useEffect } from "react";

// SelectedProjectId set to undefined will render NoProjectSelected component
// SelectedProjectId set to null will render NewProject component
// SelectedProjectId set to a project id will render the respective project
const initialProjectsState = {
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
};

// Reducer function to manage state updates
function projectReducer(state, action) {
  switch (action.type) {
    case "START_ADD_PROJECT":
      return { ...state, selectedProjectId: null };
    case "CANCEL_ADD_PROJECT":
      return { ...state, selectedProjectId: undefined };
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
        selectedProjectId: undefined,
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        selectedProjectId: undefined,
        projects: state.projects.filter(
          (project) => project.id !== state.selectedProjectId
        ),
        tasks: state.tasks.filter(
          (task) => task.projectId !== state.selectedProjectId
        ),
      };
    case "SELECT_PROJECT":
      return { ...state, selectedProjectId: action.payload };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
}

// Context creation
const ProjectContext = createContext();

// Custom hook for using the context
export function useProjectsContext() {
  return useContext(ProjectContext);
}

// Context provider component
export function ProjectProvider({ children }) {
  const [projectsState, dispatch] = useReducer(
    projectReducer,
    JSON.parse(localStorage.getItem("projectsState")) || initialProjectsState
  );

  // Sync projectsState with localStorage
  useEffect(() => {
    localStorage.setItem("projectsState", JSON.stringify(projectsState));
  }, [projectsState]);

  return (
    <ProjectContext.Provider value={{ projectsState, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
}
