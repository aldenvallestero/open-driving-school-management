import React, { Suspense } from "react";
const BranchPage = React.lazy(() => import("../pages/branch-page"));

export default function BranchRoute() {
  return (
    <Suspense fallback="Branch ...">
      <BranchPage />
    </Suspense>
  );
}
