import express from 'express';
import verifyAuthToken from '../middlewares/auth';
import {JWT_SECRET} from '../utils/constatns';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import {User, UserController} from '../models/users';
import bcrypt from "bcrypt";
import { PEPPER, SALT_ROUNDS } from "../utils/constatns";

const usersRoutes = (app: express.Application) => {
    app.get("/users", verifyAuthToken , show);
    app.get("/users/login", login);
    app.post("/users", create);
};

const userController = new UserController();

const show = async (
    req: express.Request,
    res: express.Response
) => {
    
    // Request Body
    const token = req.query.token as JwtPayload;

    if(
        token == undefined
        ){
        res.status(500)
        .json({error: "Server Error: This one is on us"});
        return;
    }
    
    let userId : number = token.user.id;

    try {
        // Search user
        const foundUser = await userController.show(userId);

        if(foundUser != null)
            res.json({user: foundUser});
        else
            res.json({message: "User does not exist"});

    } catch (error) {
        res.status(400)
        .json(error);
    }
};

const login = async (
    req: express.Request,
    res: express.Response
) => {

    // Request Body
    let email : string = req.body.email as string;
    let password : string = req.body.password as string;

    if(email == undefined ||
        email.replace(/ /g, "").length == 0
    ){
        res.status(400)
        .json({error: "Bad Request: email Name Can't be empty"});
        return;
    }
    if(

     password == undefined ||
     password.replace(/ /g, "").length == 0 
     ){
        res.status(400)
        .json({error: "Bad Request: Password Can't be empty"});
        return;
    }

    try {
     // Validate as required here
        email = email.replace(/ /g, "");
        password =  password.replace(/ /g, "");
      // Prepare data
      const hash = bcrypt.hashSync(
        password + PEPPER,
        parseInt(SALT_ROUNDS as string)
      );
        // Get user
        const foundUser = await userController.getUserByEmail(email);
             if(foundUser != null){
                if(
                    bcrypt.compareSync(
                        `${password}${PEPPER}`,
                        foundUser['password_digest']
                      )
                ){
                    const token = jwt.sign({user: getUserTokenObject(foundUser)}, JWT_SECRET as string);
                    res.status(200)
                    .json({token: token});
                }else{
                    res.status(403)
                    .json({"message": "Email or Password is incorrect"});
                }
             }else{
                res.json({message: "User does not exist"});
             }

    } catch (error) {
        console.log("Error loggin user in ");
        console.log(error);
        res.status(400)
        .json(error);
    }
};

const create = async (
    req: express.Request,
    res: express.Response
) => {

    // Request Body
    let firstName : string = req.body.firstname as string;
    let lastName : string = req.body.lastname as string;
    let password : string = req.body.password as string;
    let email : string = req.body.email as string;

    if(firstName == undefined ||
    firstName.replace(/ /g, "").length == 0
    ){
        res.status(400)
        .json({error: "Bad Request: First Name Can't be empty"});
        return;
    }

    if( 
        lastName == undefined ||
        lastName.replace(/ /g, "").length == 0 
    ){
        res.status(400)
        .json({error: "Bad Request: Last Name Can't be empty"});
        return;
    }

    if(
     password == undefined ||
     password.replace(/ /g, "").length == 0 
     ){
        res.status(400)
        .json({error: "Bad Request: Password Can't be empty"});
        return;
    }
    
    if(
        email == undefined ||
        email.replace(/ /g, "").length == 0 ||
        !email.includes("@")
        ){
           res.status(400)
           .json({error: "Bad Request: Email is invalid or missing"});
           return;
       }
   
    try {
        // Validate as required here
        email =  email.replace(/ /g, "");
        firstName = firstName.replace(/ /g, "");
        lastName =  lastName.replace(/ /g, "");
        password =  password.replace(/ /g, "");
        
     // Prepare data
      const hash = bcrypt.hashSync(
        password + PEPPER,
        parseInt(SALT_ROUNDS as string)
      );
        // Create user
        const createdUser = await userController.create(email, firstName, lastName, hash);
        if(createdUser!= null){
            const token = jwt.sign({user: getUserTokenObject(createdUser)}, JWT_SECRET as string);
            res.status(200)
            .json({token: token});
        }else{
            res.status(401)
            .json({
                "message": "Email Already exisits"
            });
        }
    } catch (error) {
        console.log("Error crating user");
        console.log(error);
        res.status(400)
        .json(error);
    }
};


function getUserTokenObject(user: User) {
    return {
         "email": user.email,
         "firstname": user.firstname,
         "lastname": user.lastname
        }
 }
 
export default usersRoutes;
