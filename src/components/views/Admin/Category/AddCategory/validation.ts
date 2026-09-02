import * as yup from 'yup'

const schemaCategoryValidation = yup.object({
    name: yup.string().trim().required("Nama Category harus diisi"),
    departmentId: yup.string().required("Departmenr harus diisi"),
    description: yup.string().trim()
})

export default schemaCategoryValidation