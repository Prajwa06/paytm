const z=require('zod');

const signInSchema=z.object({
    username:z.string(),
    password : z.string(),
});

module.exports =signInSchema;