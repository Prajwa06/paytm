const z=require('zod');

const signupSchema=z.object({
    username:z.string().min(1),
    password : z.string().min(1),
    firstname : z.string().min(1),
    lastname : z.string().min(1)
});

module.exports =signupSchema;