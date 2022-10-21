import { checkSchema } from "express-validator"

export default {
    editAction: checkSchema({
        token: {
            notEmpty: true,
        },
        name: {
            trim: true,
            optional: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: "Nome precisa ter pelo menos dois caracteres"
        }
        ,
        email: {
            trim: true,
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail invalido'
        },
        passworld: {
            optional: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Senha precisa ter pelo menos 2 caracteres'
        },
        state: {
            errorMessage: 'Estado não preenchido'
        }
    }),

} 