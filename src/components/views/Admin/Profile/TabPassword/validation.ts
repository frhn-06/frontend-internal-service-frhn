import * as yup from 'yup';

const schemaPassword = yup.object({
    oldPassword: yup.string().trim().min(4, "Password minimal 4 karakter").max(100, "Password maksimal 100 karakter").required("Password lama wajib diisi"),
    newPassword: yup.string().trim().min(4, "Password minimal 4 karakter").max(100, "Password maksimal 100 karakter").required("Password baru wajib diisi"),
    confirmPassword: yup.string().oneOf([yup.ref("newPassword")], "Konfirmasi password tidak sesuai").required("Konfirmasi password b diisi")
})

export default schemaPassword;