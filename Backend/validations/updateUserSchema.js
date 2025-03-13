const z=require('zod');

const updateUserSchema=z.object({
    password : z.string().optional(),
    firstname : z.string().optional(),
    lastname : z.string().optional()
});

module.exports =updateUserSchema;