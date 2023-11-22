import * as yup from "yup";

const positiveIntegerRule = /^[1-9]\d*$/;

export const editSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must not exceed 20 characters")
    .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
    .required("Name is required"),

  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Phone number should be a 10-digit number")
    .required("Phone number is required"),

  age: yup
    .number("Invalid age")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required"),

  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),
});
