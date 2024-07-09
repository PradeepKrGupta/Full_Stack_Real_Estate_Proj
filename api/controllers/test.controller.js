import jwt from "jsonwebtoken";
export const shouldBeLoggedIn = async (req, res) =>{
    // using the below code we can able to verify the token for the authentication and all so, but we don't need it so we use middleware where we pass the id of this the user and verify the token of it and verify it.
    // const token = req.cookies.token;
    // if(!token) return res.status(401).json({message:"Not Authenticated!"});

    // jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    //     if(err) return res.status(401).json({message:"Token is Invalid!"});
    // });


    // once you get authenticated user id will be displayed over here and we gonna use it futher into the profile and all.
    console.log(req.userId);
    res.status(200).json({message:"You are Authenticated!"});
}

export const shouldBeAdmin = async (req, res)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message:"Not Authenticated!"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if(err) return res.status(401).json({message:"Token is Invalid!"});
        if(!payload.isAdmin) return res.status(403).json({message:"Not Authorized"});

    res.status(200).json({message:"You are Authenticated!"});
    });
};