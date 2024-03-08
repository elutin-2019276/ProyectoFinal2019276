import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        //Solo puede existir un registro único.
        unique: true, 
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        minLenght: [8, 'Password must be 8 characters'],
        required: true
    },
    phone: {
        type: String,
        minLenght: 8,
        maxLenght: 8,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        //Solo los datos que están en el arreglo son válidos.
        enum: ['ADMIN', 'CLIENT'],
        required: true
    }

})


export default mongoose.model('user', userSchema)