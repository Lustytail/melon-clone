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
                    type: String,
                    required: true
                },
                artist: {
                    type: String,
                    required: true
                },
                id: {
                    type: String,
                    required: true
                }
            }
        ]
});

const User = mongoose.model("User", userSchema);

export default User;
