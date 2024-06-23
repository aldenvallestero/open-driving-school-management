import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/input-component";
import { UserContext } from "../contexts/Context";
import Button from "../components/button-component";
import StudentService from "../services/student-service";

export default function StudentLoginPage() {
  const studentService = new StudentService();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useContext(UserContext);

  const handleLogin = async () => {
    const token: string = await studentService.login(email, password);

    if (!token) {
      alert("Student not found!");
      return;
    }

    setUser(token);
    navigate("/student");
  };

  const handleRegister = async () => {
    navigate("/student/register");
  };

  useEffect(() => {
    if (user) {
      navigate("/student");
    }
  });

  return (
    <div className="container-fluid flex bg-slate-200 justify-center align-middle items-center min-h-screen">
      <div className="shadow-2xl rounded-md p-20">
        <h1 className="font-bold text-3xl mb-4">Student Login</h1>
        <div className="block mb-4">
          <label htmlFor="" className="block">
            Email or Username
          </label>
          <Input
            type="text"
            placeholder="eg. juandelacruz"
            callback={setEmail}
          />
        </div>
        <div className="block mb-4">
          <label htmlFor="" className="block">
            Password
          </label>
          <Input type="password" callback={setPassword} />
        </div>
        <div className="block mb-4">
          <Button placeholder="Login" callback={handleLogin} />
        </div>
        <div className="block mb-4">
          <Button placeholder="Create an account" callback={handleRegister} />
        </div>
      </div>
    </div>
  );
}
