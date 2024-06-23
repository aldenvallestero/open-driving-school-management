import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/input-component";
import { UserContext } from "../contexts/Context";
import Button from "../components/button-component";
import SchoolService from "../services/school-service";

export default function SchoolLoginPage() {
  const schoolService = new SchoolService();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [, setUser] = useContext(UserContext);

  const handleLogin = async () => {
    const token: string = await schoolService.login(email, password);

    if (!token) {
      alert("School not found!");
      return;
    }

    setUser(token);
    navigate("/school");
  };

  const handleRegister = async () => {
    navigate("/school/register");
  };

  return (
    <div className="container-fluid grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 auto-rows-max bg-slate-200 min-h-screen">
      <div className="p-10">
        <h1 className="text-6xl font-bold text-amber-800 mb-1">
          Driving School Powerhouse.
        </h1>
        <p className="text-4xl font-bold text-gray-800">
          A software that can automate 90% of the job.
        </p>
      </div>

      <div className="p-10">
        <div className="block mb-10">
          <label htmlFor="" className="block">
            Email Address
          </label>
          <Input
            type="text"
            placeholder="eg. example@email.com"
            callback={setEmail}
          />
        </div>
        <div className="block mb-10">
          <label htmlFor="" className="block">
            Password
          </label>
          <Input type="password" callback={setPassword} />
        </div>
        <div className="block mb-10">
          <Button placeholder="Login" callback={handleLogin} />
        </div>
        <div className="block mb-10">
          <Button placeholder="Create an account" callback={handleRegister} />
        </div>
      </div>
    </div>
  );
}
