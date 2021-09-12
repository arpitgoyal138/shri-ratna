import { useAdminAuth } from "./../customHooks";

const WithAdminAuth = (props) => {
  return useAdminAuth(props) && props.children;
};

export default WithAdminAuth;
