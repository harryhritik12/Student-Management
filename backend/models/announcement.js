import mongoose from 'mongoose';


const announcementSchema = new mongoose.Schema({

    staffID: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now // Set the default value to the current date
    },
    filePath: { type: [String] , default: []},

}, { timestamps: true });

const AnnouncementModel = mongoose.model('announcement', announcementSchema);
export default AnnouncementModel;