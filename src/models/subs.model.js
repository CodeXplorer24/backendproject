import moongose from "mongoose";

const subscriptionSchema = new moongose.Schema({
    subscriber: {
        type: moongose.Schema.Types.ObjectId,
        ref: "User"
    },
    channel: {
        type: moongose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

export const Subscription = moongose.model("Subscription", subscriptionSchema);