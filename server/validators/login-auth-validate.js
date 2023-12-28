const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(255, { message: "Email must at most 255 characters long" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must at least 6 characters long" })
    .max(32, { message: "Password must be at most 32 characters long" }),
});

module.exports = loginSchema;
