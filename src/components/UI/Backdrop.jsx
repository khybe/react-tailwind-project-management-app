const Backdrop = ({ toggleSidebar }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      onClick={toggleSidebar} // Close sidebar on backdrop click
    />
  );
};

export default Backdrop;
