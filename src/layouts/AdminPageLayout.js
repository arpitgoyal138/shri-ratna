import React from "react";

import AdminNavbar from "./../components/adminNavbar";
import Footer from "./../components/footer";

const AdminPageLayout = (props) => {
  return (
    <div className="adminLayout">
      <AdminNavbar {...props} />
      <div className="controlPanel">
        <div className="content">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPageLayout;
