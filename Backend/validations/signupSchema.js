const z=require('zod');

const signupSchema=z.object({
    username:z.string(),
    password : z.string(),
    firstname : z.string(),
    lastname : z.string()
});

module.exports =signupSchema;