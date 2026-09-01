import * as yup from "yup";

const schemaAgent = yup.object({
    name: yup.string().required("Nama agent harus diisi"),
    email: yup.string().email("Email tidak valid").required("Email harus diisi"),
    departmentId: yup.string().required("Departemen harus dipilih"),
})



export default schemaAgent;