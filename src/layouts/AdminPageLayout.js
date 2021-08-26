import react from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const AdminPageLayout = (props) => {
  console.log(props);
  return (
    <div className="fullHeight">
      <Navbar {...props} />
      {props.children}
    </div>
  );
};

export default AdminPageLayout;
