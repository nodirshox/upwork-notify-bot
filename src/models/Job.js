const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: ""
        },
        link: {
            type: String,
            default: ""
        },
        published_at: {
            type: Date
        },
        body: {
            type: String,
            default: ""
        },
        is_published: {
            type: Boolean,
            default: false
        },
        updated_at: {
            type: Date
        },
        created_at: {
            type: Date
        }
    }
);

module.exports = mongoose.model("Job", JobSchema);
