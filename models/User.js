const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 100 },
    email: {
      type: String,
      maxLength: 150,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 4,
      maxLength: 30,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["member", "admin"],
    },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product", unique: true }],
    analyserResponse: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: "Analyser",
        },
        answer: {
          type: String,
          required: true,
          enum: ["Yes", "No"],
        },
      },
    ],
    analyserScore: {
      type: Number,
      min: 0,
      max: 10,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} must be an integer",
      },
    },
    skintype: { type: Schema.Types.ObjectId, ref: "Skintype" },
  },

  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
