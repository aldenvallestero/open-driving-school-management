import React, { Suspense, useContext, useEffect } from "react";
import { UserContext } from "../contexts/Context";
import { useNavigate } from "react-router-dom";
const SchoolLoginPage = React.lazy(() => import("../pages/school-login-page"));

export default function SchoolLoginRoute() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate("/school");
    }
  }, []);

  return (
    <Suspense fallback="School Login ...">
      <SchoolLoginPage />
    </Suspense>
  );
}
