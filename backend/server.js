import express from 'express'; //Main framework to build your backend API
import cors from 'cors';       //Allows your React frontend to make API calls to this backend
import dotenv from 'dotenv';   // Loading environment variables from .env
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();  //it reads .env file and loads it into process.env 
// Ex: if in env has PORT=5000  then after this part process.env.port=5000

const app=express(); // creates an instances of the express application
//think of this as we are creating a new web serve lets call it app
connectDB();

app.use(cors());  //Allows your frontend (running on a different port) to access your backend.
app.use(express.json());  //This tells Express: “If a request sends JSON data (like in POST), parse it and give it to me in req.body.”
app.use('/api/users', userRoutes);

app.get('/',(req,res)=>{
    res.send('API is running');  //testing the route are connected or not 
});

//Starting the server 
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on https://localhost:${PORT}`); //Starts the backend server on a specific port
});

/*| Line      | Purpose                                                                                                                                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `express` | Express is a Node.js **web framework** — it gives you tools to build an API quickly without writing everything from scratch. Think of it like the foundation of your backend.                               |
| `cors`    | Stands for **Cross-Origin Resource Sharing**. Your frontend (React) runs on one port (like 5173), and your backend runs on another (like 5000). Browsers block this by default. `cors` allows them to talk. |
| `dotenv`  | Used to **load sensitive configuration** from a `.env` file (like database passwords, API keys, port numbers) into `process.env` securely.                                                                  |
 */