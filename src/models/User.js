import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        tracks: [
            {
                song: {
                    type: String
                },
                artist: {
                    type: String
                }
            }
        ]
});

const User = mongoose.model("User", userSchema);

export default User;
