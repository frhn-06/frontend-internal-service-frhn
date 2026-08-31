import * as yup from 'yup';

const schemaDepartment = yup.object({
    name: yup.string().required("Nama department harus diisi")
})

export {schemaDepartment}