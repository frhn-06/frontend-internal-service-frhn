import * as yup from 'yup'


const schemaTicketValidation = yup.object({
    title: yup.string().required("Subjek harus diisi"),
    description: yup.string().required("Deskripsi harus diisi"),
    priority: yup.string().required("Prioritas harus diisi"),
    departmentId: yup.string().required("Department harus diisi"),
    categoryId: yup.string().required("Kategori harus diisi")
})

export {schemaTicketValidation}