import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
// const SecertKey="akhielshsaxenaaaritsaxenaandoursonisthebest";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 1
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 1
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    list: [
        {
            title: {
                type: String,
            },
            content: {
                type: String,
            },
            complete:{
                type:Boolean,
                value:false
            }
        }
    ]
})


// we hasing password 
UserSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next();
})



// genreate token for authectation 
UserSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {

    }
}


// creating model 
const userDb = mongoose.model("User", UserSchema);


export default userDb;