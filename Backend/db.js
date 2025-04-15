import mongoose from 'mongoose'

export const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    console.log('connected to database')
}
