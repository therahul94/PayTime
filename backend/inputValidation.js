const zod = require("zod");

const userValidation = ({ firstName, lastName, username, password }) => {
  const userSchema = zod.object({
    firstName: zod
      .string({
        required_error: "First name is required!",
        invalid_type_error: "First name must be a string!",
      })
      .trim()
      .min(3, {message: "First name must be more than 2 characters long"})
      .max(50, { message: "First name must be 50 or fewer characters long" }),
    lastName: zod
      .string({
        required_error: "Last name is required!",
        invalid_type_error: "Last name must be a string!",
      })
      .trim()
      .min(3, {message: "Last name must be more than 2 characters long"})
      .max(50, { message: "Last name must be 50 or fewer characters long" }),
    username: zod
      .string({
        required_error: "Username is required!",
        invalid_type_error: "Username must be a string!",
      })
      .trim()
      .email()
      .min(3, {
        message: "Username length must be greater than 3 character",
      })
      .toLowerCase(),
    password: zod
      .string({
        required_error: "Password is required!",
        invalid_type_error: "Password must be a string!",
      })
      .min(6, { message: "Password must be 6 or more characters long" }),
  });

  const res = userSchema.safeParse({ firstName, lastName, username, password });
  return res;
};

const userSigninValidation = ({ username, password }) => {
  const userSigninSchema = zod.object({
    username: zod
      .string({
        required_error: "Username is required!",
        invalid_type_error: "Username must be a string!",
      })
      .trim()
      .email()
      .min(3, {
        message: "Username length must be between 3 to 10 characters long",
      })
      .toLowerCase(),
    password: zod
      .string({
        required_error: "Password is required!",
        invalid_type_error: "Password must be a string!",
      })
      .min(6, { message: "Password must be 6 or more characters long" }),
  });

  const res = userSigninSchema.safeParse({ username, password });
  console.log("res: ", res)
  return res;
};

const updateUserValidation = ({ firstName, lastName, password }) => {
  const updateuserSchema = zod.object({
    firstName: zod
      .string({
        invalid_type_error: "First name must be a string!",
      })
      .trim()
      .max(50, { message: "First name must be 50 or fewer characters long" })
      .optional(),
    lastName: zod
      .string({
        invalid_type_error: "Last name must be a string!",
      })
      .trim()
      .max(50, { message: "Last name must be 50 or fewer characters long" })
      .optional(),
    password: zod
      .string({
        invalid_type_error: "Password must be a string!",
      })
      .min(6, { message: "Password must be 6 or more characters long" })
      .optional(),
  });
  const res = updateuserSchema.safeParse({ firstName, lastName, password });
  return res;
};

const searching = (filter)=>{
  const filterSchema = zod.string().trim();
  const res = filterSchema.safeParse(filter);
  return res;
}

const transferMoneyValidation = (amount)=>{
  const transferSchema = zod.number({
    required_error: "amount is required",
    invalid_type_error: "amount must be an number"
  }).gte(0);
  const res = transferSchema.safeParse(amount);
  console.log("res: ", res);
  return res;
}

module.exports = { userValidation, userSigninValidation,updateUserValidation,searching, transferMoneyValidation };
