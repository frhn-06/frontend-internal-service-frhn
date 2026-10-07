import * as yup from 'yup';

const schemaProfile = yup.object({
    name: yup.string().trim().min(2).max(100)
})

export default schemaProfile;