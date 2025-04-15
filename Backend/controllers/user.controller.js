import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.model.js'

export async function register(req, res) {
    let { name, email, password } = req.body

    try {
        const alreadyUser = await User.findOne({ email })
        if (alreadyUser) {
            return res.status(500).json({ success: false, message: "User already exists" })
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const user = await User.create({
                    name,
                    email,
                    password: hash
                })

                let token = jwt.sign({ email: user.email, id: user._id }, 'secret')
                res.status(200).json({ success: true, message: "User Created Successfully", token })
            })
        })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export async function login(req, res) {
    let { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(500).json({ success: false, message: "Something went wrong!" })
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email: user.email, id: user._id }, 'secret')
                res.status(200).json({ success: true, message: "User Logged In successfully", token })
            } else {
                res.status(500).json({ success: false, message: "Something went wrong!" })
            }
        })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}