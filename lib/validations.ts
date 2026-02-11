import { z } from "zod";

export const contactFormSchema = z.object({
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  file: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "File size must not exceed 5MB"
    )
    .refine(
      (file) =>
        !file ||
        [
          "application/pdf",
          "image/png",
          "image/jpeg",
          "image/webp",
        ].includes(file.type),
      "File must be PDF, PNG, JPG, or WEBP"
    ),
  // Honeypot field - should be empty
  website: z.string().max(0, "Spam detected").optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
