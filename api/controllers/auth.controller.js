// //  importing the bcrypt to do Encryption of the password.
// import bcrypt from "bcrypt";

// // The json web token is used to generate the token for the each user.
// import jwt from "jsonwebtoken";
// import prisma from "../lib/prisma.js";

// export const register = async (req, res) => {
//     const { username, email, password } = req.body;

//     try {

//         // Hash the password
//         const HashedPassword = await bcrypt.hash(password, 10);
//         console.log(HashedPassword);

//         // Create a new user and save on DB.
//         const newUser = await prisma.user.create({
//             data: {
//                 username,
//                 email,
//                 password: HashedPassword,
//             },
//         });
//         console.log(newUser);
//         res.status(201).json({ message: "User created Successfully!" });
//     } catch (err) {
//         console.log(err);
//         // if user failed to be created.
//         res.status(500).json({ message: "Failed to create user!" });
//     }
// };

// export const login = async (req, res) => {
//     const { username, password } = req.body;
//     //db operations
//     try{
//         // Check if the user Exists

//         const user = await prisma.user.findUnique({
//             where:{username},
//         });
//         if(!user) return res.status(400).json({message:"Invalid Credentials!"});

//         // Check if the password is correct

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if(!isPasswordValid) return res.status(400).json({message:"Invalid Credentials!"});

//         // Generate cookies token and send to the user
//         // res.setHeader("Set-Cookie","test="+"myValue").json("sucess");
        
//         // setting the time to expire after 1 week.
//         const age = 1000*60*60*24*7;
        
//         //adding the token key which is randomly generated and stored in .env file to generate the token.
//         const token = jwt.sign({
//             id:user.id,
//             isAdmin:false,
//         },process.env.JWT_SECRET_KEY,
//         {expiresIn:age}
//         ); 
        
//         // To Elimintate the password to share during the login we use the function below
//         const { password: userPassword, ...userInfo } = user;

//         // Passing the token into this as token.
//         res.cookie("token", token,{
//             httpOnly:true,
//             // During production mode we have to make sure it would be secure:true for post method.
//             //secure:true 
//             maxAge:age,
//         }).status(200).json(userInfo); 


//     }catch(err){
//         console.log(err)
//         res.status(500).json({message:"Failed to login!"})
//     }
// };

// export const logout = (req, res) => {
//     //db operations
//     // This operation will clear the generated cookie and do the logout successfully.
//     res.clearCookie("token").status(200).json({message:"Logout Successfully!"});
// }




import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // HASH THE PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // CHECK IF THE USER EXISTS

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
