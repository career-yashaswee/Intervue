const { z } = require("zod");

const registerSchema = z.object({
	body: z.object({
		username: z.string().regex(/^[a-z0-9-]{3,12}/),
		email: z.string().email(),
		password: z.string().min(6),
		firstName: z.string().min(1),
		lastName: z.string().min(1),
	}),
});

const loginSchema = z.object({
	body: z.object({
		username: z.string().min(3),
		password: z.string().min(6),
	}),
});

const verifyEmailSchema = z.object({
	body: z.object({
		email: z.string().email(),
		code: z.string().length(6, "Verification code must be 6 digits"),
	}),
});

const checkUserameSchema = z.object({
	params: z.object({
		username: z
			.string()
			.min(4, { message: "Username must be at least 4 characters long" })
			.regex(/^[a-zA-Z0-9-]+$/, {
				message: "Username can only contain letters, numbers, and hyphens",
			}),
	}),
});



module.exports = {
	registerSchema,
	loginSchema,
	verifyEmailSchema,
	checkUserameSchema,
};
