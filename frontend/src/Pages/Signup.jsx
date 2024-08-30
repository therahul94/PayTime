import { useState } from "react";
import BottomWarning from "../Components/BottomWarning";
import Button from "../Components/Button";
import Heading from "../Components/Heading";
import InputComponents from "../Components/InputComponents";
import SubHeading from "../Components/SubHeading";
import Swal from "sweetalert2";
import axios from "axios";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const signupFn = async () => {
    try {
      const config = {
        url: "/user/signup",
        method: "post",
        baseURL: "http://localhost:8000/api/v1",
        headers: {
          "content-type": "application/json",
        },
        data: {
          firstName,
          lastName,
          username,
          password,
        },
      };

      const response = await axios(config);
     
      if (response.status === 201) {
        setFirstName("");
        setLastName("");
        setusername("");
        setPassword("");
        return Swal.fire({
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
     
    } catch (error) {
      console.log(error);
      if (error.response.status === 411) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message.map((val)=>val.message).join(". "),
        });
      }
  
    }
  };

  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="w-80 h-max rounded-lg text-center bg-white p-5">
            <Heading label="Sign Up" />
            <SubHeading label="Enter your information to create an account" />
            <div className="mb-2">
              <InputComponents
                title={"First Name"}
                placeholder={"John"}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <InputComponents
                title={"Last Name"}
                placeholder={"Doe"}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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
              <Button label={"Sign up"} onClick={signupFn} />
            </div>
            <div>
              <BottomWarning
                label={"Already have an account?"}
                buttonText={"Signin"}
                to={"/signin"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
