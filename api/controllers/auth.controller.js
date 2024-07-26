import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';


export const register = async(req, res)=>{
    
    const { username, password, email } = req.body;
try{
    // Hash the password 
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Create a new user and save to db.
    const newUser = await prisma.user.create({
        data : {
            username,
            email,
            password : hashedPassword,
        }
    })
    
    // console.log("newUser : ", newUser );
    res.status(201).json({message : "User Created Successfully"});
}catch(err){
    // console.log("error : ", err);
    res.status(400).json({ message : "Failed to create new user!" })
}

}
export const login = async(req, res)=>{
    
    const { username, password } = req.body;

    try{

        // check if the user exist 
        const user = await prisma.user.findUnique({
            where : { username }
        })
        if(!user) return res.status(401).json({ message : "Invalid Credentials!"});
        // check if the password is correct 
        const isPasswordValid = await bcrypt.compare( password, user.password );
        if(!isPasswordValid) return res.status(401).json({ message : "Invalid Credentials!"});
        // generate cookie token and send to the user

        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign({
            id : user.id,
            isAdmin : false,
        }, process.env.JWT_SECRETE_KEY, { expiresIn : age } );

        const { password : userPassword , ...userInfo } = user;

        res.cookie("token", token, {
            httpOnly : true,
            // secure : true,
            maxAge : age, 
        }).status(200).json(userInfo);


    }catch(err){
        console.log( "error : ", err );
        res.status(500).send({ message : "Failed to login!"})
    }
}
export const logout = (req, res)=>{
    
    res.clearCookie("token").status(200).json({ message : "Logout successfully."})

}