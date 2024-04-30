import * as Yup from "yup";
const phoneRegExp = /^\d{10}$/;

class ValidationSchema {
  static email = Yup.string().email("Invalid email").required("Required");
}

class Schemas extends ValidationSchema {
  static signupSchema = Yup.object().shape({
    // firstName: Yup.string()
    //   .min(2, "Too Short!")
    //   .max(50, "Too Long!")
    //   .required("Required"),
    // lastName: Yup.string()
    //   .min(2, "Too Short!")
    //   .max(50, "Too Long!")
    //   .required("Required"),
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    // phoneNumber: Yup.string()
    //   .matches(phoneRegExp, "Phone number is not valid")
    //   .required("Required"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Other"], "Invalid gender")
      .required("Required"),
    location: Yup.string().required("Required"),
    governmentId: Yup.object().shape({
      type: Yup.string()
        .oneOf(["PAN", "Aadhar"], "Invalid government ID type")
        .required("Required"),
      value: Yup.string().required("Required"),
    }),
  });
}

export default Schemas;
