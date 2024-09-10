import { atom } from "recoil";

export const loggedInUseratom = atom({
  key: "loggedInUseratom",
  default: {
    firstName: "",
    lastName: "",
    username: "",
  },
});
