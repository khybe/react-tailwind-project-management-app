import { useState } from "react";

import { useProjectsContext } from "./context/projectContext";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const { projectsState } = useProjectsContext(); // Accessing project state from context
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setIsSidebarOpen((prevState) => !prevState);

  let content = <SelectedProject />; // Default content

  // Conditional rendering based on selected project id
  if (projectsState.selectedProjectId === null) {
    content = <NewProject />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        toggleSidebar={handleToggleSidebar}
        isOpen={isSidebarOpen}
      />
      {content}
    </main>
  );
}

export default App;
