import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
    {
        song: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        }, 
        views: {
            type: Number,
            required: true
        }
    },
    {
        collection: "Song"
    }
);

const Song = mongoose.model("Song", songSchema);

export default Song;
