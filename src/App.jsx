import { lazy, useState, Suspense } from "react";

import { useProjectsContext } from "./context/projectContext";
import ProjectsSidebar from "./components/ProjectsSidebar";

const NewProject = lazy(() => import("./components/NewProject"));
const NoProjectSelected = lazy(() => import("./components/NoProjectSelected"));
const SelectedProject = lazy(() => import("./components/SelectedProject"));

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
      <Suspense fallback={<p className="mx-auto my-32 text-3xl">Loading...</p>}>
        <ProjectsSidebar
          toggleSidebar={handleToggleSidebar}
          isOpen={isSidebarOpen}
        />
        {content}
      </Suspense>
    </main>
  );
}

export default App;
