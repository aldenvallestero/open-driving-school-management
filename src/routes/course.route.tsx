import React, { Suspense } from "react";
const CoursePage = React.lazy(() => import("../pages/course-page"));

export default function CourseRoute() {
  return (
    <Suspense fallback="Course ...">
      <CoursePage />
    </Suspense>
  );
}
