import jwt from 'jsonwebtoken';

const shouldBeLoggedIn = async( req, res )=>{
    console.log('userId : ', req.userId );
    res.status(200).json({ message : "You are Authenticated."})
};


const shouldBeAdmin = async( req, res )=>{

    const token = req.cookies.token;

    if(!token) return res.status(401).json({ message : "Not Authenticated!"});

    jwt.verify(token, process.env.JWT_SECRETE_KEY, async( err, payload )=>{
        if(err) return res.status(403).json({ message : "Token is not valid!"});

        if(!payload.isAdmin) return res.status(403).json({ message : "Not Authorized!"});

        res.status(200).json({ message : "You are Authenticated."})
    });

};

export { shouldBeLoggedIn, shouldBeAdmin };