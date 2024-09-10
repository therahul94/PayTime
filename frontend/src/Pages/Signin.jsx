import { useState } from "react";
import BottomWarning from "../Components/BottomWarning";
import Button from "../Components/Button";
import Heading from "../Components/Heading";
import InputComponents from "../Components/InputComponents";
import SubHeading from "../Components/SubHeading";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate();
  const signinFn = async () => {
    try {
      const config = {
        url: "/user/signin",
        method: "post",
        baseURL: "http://localhost:8000/api/v1",
        // baseURL: "http://192.168.191.214:8000/api/v1",
        headers: {
          "content-type": "application/json",
        },
        data: {
          username,
          password,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        setusername("");
        setPassword("");
        localStorage.setItem("token", response.data.token);
        Swal.fire({
          icon: "success",
          title: "Signin successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard");
        return ;
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 411) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message
            .map((val) => val.message)
            .join(". "),
        });
      }
      else if (error.response.status === 401) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message
        });
      }
    }
  };

  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="w-80 h-max rounded-lg text-center bg-white p-5">
            <Heading label="Sign In" />
            <SubHeading label="Enter your credentials to access your account" />

            <div className="mb-2">
              <InputComponents
                title={"Email"}
                placeholder={"johndoe@example.com"}
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <InputComponents
                title={"Password"}
                placeholder={""}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <Button label={"Sign In"} onClick={signinFn} />
            </div>
            <div>
              <BottomWarning
                label={"Don't have an account?"}
                buttonText={"Signup"}
                to={"/signup"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
