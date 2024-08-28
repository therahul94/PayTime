import BottomWarning from "../Components/BottomWarning";
import Button from "../Components/Button";
import Heading from "../Components/Heading";
import InputComponents from "../Components/InputComponents";
import SubHeading from "../Components/SubHeading";

export default function Signin(){
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
                  />
                </div>
                <div className="mb-2">
                  <InputComponents title={"Password"} placeholder={""} />
                </div>
                <div className="mt-5">
                <Button label={"Sign up"} />
                </div>
                <div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Signup"} to={"/signup"}/>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}