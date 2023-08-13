"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jobSchema = new mongoose_1.Schema({
    companyName: { type: String, required: true },
    CompanyLocation: { type: String, required: true },
    JobRole: { type: String, required: true },
    PostingDate: { type: String, required: true },
    JobType: { type: String, required: true },
    Experience: { type: String, required: true },
    JobDescription: { type: String, required: true },
    HrEmail: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }
});
exports.default = (0, mongoose_1.model)("Job", jobSchema);
