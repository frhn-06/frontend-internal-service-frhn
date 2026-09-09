import * as yup from 'yup'


const schemaMessageValidation = yup.object({
    content: yup.string().min(1).trim().required()
});


export {schemaMessageValidation}