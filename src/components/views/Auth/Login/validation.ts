import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
  identifier: yup.string().required("Email / Nama harus diisi"),
  password: yup.string().required("Password harus diisi"),
});

export default loginValidationSchema;