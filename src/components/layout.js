import Sidebar from "./sideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
