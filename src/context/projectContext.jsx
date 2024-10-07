import { createContext, useContext, useReducer, useEffect } from "react";

//  selectedProjectId:
//  - undefined: No project selected (renders NoProjectSelected).
//  - null: Adding a new project (renders NewProject).
//  - <project_id>: selected project (renders the respective project).
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
          (project) => project.id !== state.selectedProjectId // Remove selected project
        ),
        tasks: state.tasks.filter(
          (task) => task.projectId !== state.selectedProjectId // Remove tasks associated with deleted project
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

// Create context for project management
const ProjectContext = createContext();

// Custom hook for using the context
export function useProjectsContext() {
  return useContext(ProjectContext);
}

// Context provider component
export function ProjectProvider({ children }) {
  const [projectsState, dispatch] = useReducer(
    projectReducer,
    JSON.parse(localStorage.getItem("projectsState")) || initialProjectsState // Load state from localStorage or use initial state
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
