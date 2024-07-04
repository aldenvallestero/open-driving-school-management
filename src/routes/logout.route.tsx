import React, { Suspense } from "react";
const LogoutPage = React.lazy(() => import("../pages/logout-page"));

export default function LogoutRoute() {
  return (
    <Suspense fallback="Logout ...">
      <LogoutPage />
    </Suspense>
  );
}
