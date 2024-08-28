import BottomWarning from "../Components/BottomWarning";
import Button from "../Components/Button";
import Heading from "../Components/Heading";
import InputComponents from "../Components/InputComponents";
import SubHeading from "../Components/SubHeading";

export default function Signup() {
  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="w-80 h-max rounded-lg text-center bg-white p-5">
            <Heading label="Sign Up" />
            <SubHeading label="Enter your information to create an account" />
            <div className="mb-2">
              <InputComponents title={"First Name"} placeholder={"John"} />
            </div>
            <div className="mb-2">
              <InputComponents title={"Last Name"} placeholder={"Doe"} />
            </div>
            <div className="mb-2">
              <InputComponents
                title={"Email"}
                placeholder={"johndoe@example.com"}
              />
            </div>
            <div className="mb-2">
              <InputComponents title={"Password"} placeholder={""} />
            </div>
            <div className="mt-5">
            <Button label={"Sign up"} />
            </div>
            <div>
                <BottomWarning label={"Already have an account?"} buttonText={"Signin"} to={"/signin"}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
