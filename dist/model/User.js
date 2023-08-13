"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minLength: 6 },
    jobs: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Job' }]
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
