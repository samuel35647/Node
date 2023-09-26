const userModal = require("../models/user.model")
// const nodemailer = require("nodem")
const jwt = require("jsonwebtoken")

const showWelcome = (req, res) => {
    res.send("Hello World")
    console.log("welcome boss");
}

const showRegister = (req, res) => {
    console.log(req.body);

    // let newUser = new userModal(req.body)

    let newUser = new user (req.body)
    console.log(newUser);
    console.log("working now");
    console.log(req.body);
    newUser.save()
    .then((user)=>{
        console.log("user created");
        res.send({status:true, message: "user created"})
    })
    .catch((err) => {
        console.log("user not created");
        console.log(err);
        res.send({status:false, message:"user not created"})
    })
};

const signIn = (req, res) => {
    let {email, password} =req.body;
    userModal.findOne({email:req.body.email})
    .then((user)=> {
        user.comparedPassword(password, (err, isMatch) => {
            let schoolPortal = process.env.SECRET
            console.log(isMatch);
            if(isMatch) {
                jwt.sign({email}, schoolPortal, {expiresIn: '1h'}, (err, token)=> {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(token);
                        res.send({ status: true, message: "user found", token:token });
                    }
                })
            } else {
                res.send({status: false, message: "user not found"})
            }
        })
        console.log("user found");
    })
    .catch((err)=>{
        console.log(err, "wrong details");
    })
}
s
const getDashboard = (req,res)=>{
    let schoolPortal = process.env.SECRET
    token = req.hearders.authorization.split(" ")[1]

    jwt.verify(token,schoolPortal , (err,result) =>{
        if(err){
            console.log(err);
        
        }else{
            console.log(result);
        }
    })
}



module.exports = { showWelcome, showRegister, signIn , getDashboard };