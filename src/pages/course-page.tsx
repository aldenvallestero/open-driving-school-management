import QRCode from "react-qr-code";
import pic from "../media/pic-media.jpeg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/Context";
import Button from "../components/button-component";
import CourseService from "../services/course-service";
import { useContext, useEffect, useState } from "react";
import StudentService from "../services/student-service";
import EnrollmentService from "../services/enrollment-service";

export default function CoursePage() {
  const courseService = new CourseService();
  const studentService = new StudentService();
  const enrollmentService = new EnrollmentService();
  const [user] = useContext(UserContext);
  const navigate = useNavigate();

  const [courses, setCourses] = useState<any>();

  useEffect(() => {
    if (!user) {
      navigate("/student/login");
      return;
    }
    courseService.getAllCoursesBySchoolId(user).then((result) => {
      if (result) {
        setCourses(result);
      }
    });
  }, []);

  const handleEnrollment = (course: any) => {
    enrollmentService.createEnrollment(user, course);
  };

  return (
    <div className="container-fluid bg-slate-200 p-6">
      <h1>Available Courses</h1>
      {courses?.map((course: any) => (
        <div className="block shadow-md border-s-8 border-blue-800 rounded-md p-4 mb-4">
          <span className="block mb-2">{course.name}</span>
          <p>{course.description}</p>
          <span className="block mb-2">{course.price}</span>
          <Button
            placeholder="Enroll"
            callback={() => handleEnrollment(course)}
          />
        </div>
      ))}
    </div>
  );
}
