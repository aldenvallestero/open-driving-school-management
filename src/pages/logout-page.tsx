import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/Context";

export default function StudentPage() {
  const navigate = useNavigate();
  const [, setUser] = useContext(UserContext);

  useEffect(() => {
    localStorage.removeItem("token");
    setUser(undefined);
    navigate("/");
  });

  return <></>;
}
