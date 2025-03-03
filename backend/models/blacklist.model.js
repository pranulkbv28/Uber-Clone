import { model, Schema } from "mongoose";

const blacklistSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400, // 24 hours in seconds
    },
});

const Blacklist = model("Blacklist", blacklistSchema);
export default Blacklist;
