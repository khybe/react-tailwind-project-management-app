const Backdrop = ({ toggleSidebar }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      onClick={toggleSidebar} // Closes sidebar when backdrop is clicked
    />
  );
};

export default Backdrop;
