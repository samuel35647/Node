const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: { type: String, required: true, unique: true },
});

//bcrypt hash password
let saltRounds = 10
userSchema.pre("save", function(next){
    bcrypt.hash(this.password, sal).then((hash)=>{
        this.password = hash
        console.log(hash);
        next()
    }).catch((err) =>console.log(err))
})


userSchema.methods.comparePassword = function(userPassword, callback) {
    // Use 'this.password' as the hashed password stored in the user schema
    bcrypt.compare(userPassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        } else {
            if (!isMatch) {
                return callback(null, isMatch); // Passwords don't match
            } else {
                return callback(null, true); // Passwords match
            }
        }
    });
};


let user = mongoose.model("user", userSchema)

module.exports = user 