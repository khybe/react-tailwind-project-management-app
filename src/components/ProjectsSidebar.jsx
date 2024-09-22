import Button from "./Button";

export default function ProjectsSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
  isOpen,
  toggleSidebar,
}) {
  return (
    <>
      <Button
        className="md:hidden fixed top-4 left-4 p-2 text-stone-200 bg-stone-700 hover:text-stone-50 hover:bg-stone-950 rounded z-50"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close Sidebar" : "Open Sidebar"}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar} // Close sidebar on backdrop click
        />
      )}

      <aside
        className={`fixed inset-y-0 top-16 md:top-0 left-0 transform transition-transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0 bg-stone-900 text-stone-50 
          w-4/5 max-w-[340px] rounded-r-xl z-50`}
      >
        <div className="w-full px-8 py-16">
          <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
            Your Projects
          </h2>
          <div>
            <Button
              onClick={() => {
                onStartAddProject();
                toggleSidebar();
              }}
            >
              + Add Project
            </Button>
          </div>
          <ul className="mt-8">
            {projects.map((project) => {
              let cssClasses =
                "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

              if (project.id === selectedProjectId) {
                cssClasses += " bg-stone-800 text-stone-200";
              } else {
                cssClasses += " text-stone-400";
              }

              return (
                <li key={project.id}>
                  <button
                    className={cssClasses}
                    onClick={() => {
                      onSelectProject(project.id);
                      toggleSidebar(); // Toggle sidebar on project selection
                    }}
                  >
                    {project.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
