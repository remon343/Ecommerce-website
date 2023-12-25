const { z } = require("zod");

const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "Fullname is required" })
    .min(3, { message: "Fullname must be at least 3 characters long" })
    .max(255, { message: "Fullname must be at most 255 characters long" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(255, { message: "Email must at most 255 characters long" }),
    address: z
    .string()
    .trim()
    .min(1, { message: "Address is required" })
    .max(255, { message: "Address must be at most 255 characters long" }),
    phone: z
    .string()
    .trim()
    .min(1, { message: "Phone is required" })
    .min(10, { message: "Phone must at least 10 characters long" }),
    gender: z
    .string()
    .trim()
    .min(1, { message: "Gender is required" })
    .refine(
      (data) =>
      [
        "Male",
        "Female",
        "Transgender man",
        "Transgender woman",
        "Prefer not to say",
        "Otherss",
      ].includes(data),
      {message: "Gender doesn't match"}
      ),
      password: z
        .string()
        .trim()
        .min(1, { message: "Password is required" })
        .min(6, { message: "Password must at least 6 characters long" })
        .max(32, { message: "Password must be at most 32 characters long" }),
});

module.exports = registerSchema;
