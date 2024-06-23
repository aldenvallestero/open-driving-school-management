/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/Context";
import Input from "../components/input-component";
import { TRegister } from "../commons/type-common";
import Button from "../components/button-component";
import SchoolService from "../services/school-service";
import { useContext, useEffect, useState } from "react";
import StudentService from "../services/student-service";

export default function StudentRegisterPage() {
  const schoolService = new SchoolService();

  const navigate = useNavigate();

  const [, setUser] = useContext(UserContext);
  const [course, setCourse] = useState<any>();
  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [courses, setCourses] = useState<any>();
  const [gender, setGender] = useState<string>();
  const [branch, setBranch] = useState<string>();
  const [branches, setBranches] = useState<any>();
  const [address, setAddress] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [rePassword, setRePassword] = useState<string>();
  const [suffix, setSuffix] = useState<string | undefined>();
  const [marriageLastName, setMarriageLastName] = useState<string>();
  const [middleName, setMiddleName] = useState<string | undefined>();

  const handleRegister = async () => {
    if (password !== rePassword) {
      return alert("Incorrect Password!");
    }

    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phone ||
      !gender ||
      !branch ||
      !address ||
      !birthday
    ) {
      return alert("Complete All Required Information");
    }
    const studentService = new StudentService();
    const user: TRegister = {
      email,
      password,
      firstName,
      middleName,
      lastName,
      marriageLastName,
      suffix,
      gender,
      address,
      birthday,
      branch,
      school: "65f690bff6ffc0dbad940701",
      phone,
      course,
    };

    const token = await studentService.register(user);
    if (token) {
      setUser(token);
      navigate("/student");
    }
  };

  useEffect(() => {
    schoolService
      .getSchoolById("65f690bff6ffc0dbad940701")
      .then(({ courses, branches }) => {
        if (courses && branches) {
          setCourses(courses);
          setBranches(branches);
        }
      });
  }, []);

  return (
    <div className="container-fluid bg-slate-200 p-20">
      <h1 className="font-bold text-3xl mb-4 border-s-8 border-blue-800 ps-2">
        Enroll by creating a student account
      </h1>
      <p>
        Fill out personal information and choose your branch & course in order
        to proceed with the enrollment.
      </p>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          First Name
        </label>
        <Input type="text" placeholder="eg. Julia" callback={setFirstName} />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          Middle Name
        </label>
        <Input type="text" placeholder="eg. Marquez" callback={setMiddleName} />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          Last Name
        </label>
        <Input type="text" placeholder="eg. Dela Cruz" callback={setLastName} />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          Husband Last Name
        </label>
        <Input
          type="text"
          placeholder="eg. Mendoza"
          callback={setMarriageLastName}
        />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          Suffix
        </label>
        <Input type="text" placeholder="eg. Jr, Sr, III" callback={setSuffix} />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          Birthday
        </label>
        <Input type="text" placeholder="01/30/2000" callback={setBirthday} />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          Address
        </label>
        <Input
          type="text"
          placeholder="Present Address"
          callback={setAddress}
        />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          Phone
        </label>
        <Input type="text" placeholder="eg. 09xxxxxxxxx" callback={setPhone} />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          Email
        </label>
        <Input
          type="email"
          placeholder="eg. example@email.com"
          callback={setEmail}
        />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          Password
        </label>
        <Input
          type="password"
          placeholder="Create your password"
          callback={setPassword}
        />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          Repeat Password
        </label>
        <Input
          type="password"
          placeholder="Re-type your password"
          callback={setRePassword}
        />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          Gender
        </label>
        <Select
          className=""
          onChange={(e) => {
            setGender(e.target.value);
          }}
          required
        >
          <option>Select your gender</option>
          <option>Male</option>
          <option>Female</option>
        </Select>
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          Pick Your Branch
        </label>
        <Select
          className=""
          onChange={(e) => {
            setBranch(e.target.value);
          }}
          required
        >
          <option>Select a branch</option>
          {branches?.map((i: any) => (
            <option value={i._id}>{i.address}</option>
          ))}
        </Select>
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className="block">
          Courses
        </label>
        <Select
          className=""
          onChange={(e) => {
            setCourse(e.target.value);
          }}
          required
        >
          <option>Select a course</option>
          {courses?.map((i: any) => <option value={i._id}>{i.name}</option>)}
        </Select>
      </div>
      <div className="block mb-4">
        <Button placeholder="Register" callback={handleRegister} />
        <small className="block mt-1 text-gray-600">
          By clicking the register button, you agree to our data privacy and
          terms & conditions.
        </small>
        <br />

        <a href="/student/login" className="block text-blue-800">
          I have an account, login instead
        </a>
      </div>
    </div>
  );
}
