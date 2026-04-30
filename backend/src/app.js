import express from 'express';

const app = express();   //create an express application

app.use(express.json());  //middleware to parse JSON bodies

//import routes
import userRouter from "../routes/user.route.js";
import postRouter from "../routes/post.routes.js";
//use routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/post", postRouter);


//example route: http://localhost:4000/api/v1/users/register

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        // Only show the stack trace in development mode
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
});

export default app;