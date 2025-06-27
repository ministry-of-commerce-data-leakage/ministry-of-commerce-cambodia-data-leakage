import { z } from "zod";

export const getQRCodeSchema = z.object({
  contact_name: z.string().nonempty("Contact Name is required"),
  tel: z.string().min(9, "Tel must be at least 9 characters long"),
});

export type GetQRCodeFormData = z.infer<typeof getQRCodeSchema>;
