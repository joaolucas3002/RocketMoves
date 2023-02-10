import fastify from 'fastify';
import { signUp } from './routes/signUp';
import { newPost } from './routes/newPost';
import { home } from './routes/home';
import { signIn } from './routes/SignIn';

const app = fastify();

app.register(signIn);
app.register(signUp);
app.register(home);
app.register(newPost);

const port = 3333;

app.listen({
   port,
   host: '0.0.0.0',
}).then(() => {});

// import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
// import zod, { ZodSchema } from 'zod';
// import jwt from 'jsonwebtoken';

// interface UserValidateProps {
//   validation: ValidateProps
//   value: ValidateProps
// }

// interface ValidateProps {
//    email?: string
//    password?: string
// }

// function userValidate({validation ,value}:UserValidateProps) {

//   let obj:ValidateProps = {}

//   if (value?.email ===  validation?.email) {
//     obj = {...obj, email: "Email is not valid"}
//     }

//   if (value?.password ===  validation?.password) {
//   obj = {...obj, password: "Password is not valid"}
//     }

//     return obj
// }

// const userSchema = zod.object({
//   name: zod.string().trim().min(3).max(50),
//   email: zod.string().trim().email(),
//   password: zod.string().trim().min(6).max(50)
// });

// // Define the secret for signing the JWT
// const jwtSecret = 'secret-key';

// const app: FastifyInstance = fastify();

// // Route for user login
// app.post('/login', async (req, res) => {
//   // Parse the request body and validate it
//   const {name , email , password} = userSchema.parse(req.body);

//   // Validate the user credentials
//   // (for example, by checking against a database)

//   const  validation = {
//     email: 'johndoe@example.com',
//     password: 'secret'
//   }

//   if (email === validation.email && password === validation.password) {
//     // Generate the JWT
//     const token = jwt.sign({ name }, jwtSecret, { expiresIn: '1h' });

//     // Reply with the JWT

//     res.send({ token,  });
//   } else {
//     // Reply with unauthorized error
//     const ObjValide = {
//       validation,
//       value: {email , password},
//     }

//     res.status(401).send({ error: userValidate(ObjValide) });
//   }
// });

// // Start the server
// app.listen({port:3333, host: "0.0.0.0"}).then(()=>{
//   console.log(`Server running 3333`)
// });
