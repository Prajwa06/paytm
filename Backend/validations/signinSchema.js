const z=require('zod');

const signInSchema=z.object({
    username:z.string().min(1),
    password : z.string().min(1),
});

module.exports =signInSchema;