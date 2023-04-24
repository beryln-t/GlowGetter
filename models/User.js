const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

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
      enum: ["Member", "Admin"],
    },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    analyserResponse: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: "Analyser",
        },
        answer: {
          type: Number,
          required: true,
          enum: ["0", "1"],
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

userSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
