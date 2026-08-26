import * as yup from "yup";

const registerValidationSchema = yup.object().shape({
  name: yup.string().required("Nama harus diisi"),
  email: yup.string().email("Invalid email").required("Email harus diisi"),
  password: yup.string().min(6, "Password minimal 6 karakter").required("Password harus diisi"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Password tidak cocok")
    .required("Konfirmasi password harus diisi"),
});

export default registerValidationSchema;