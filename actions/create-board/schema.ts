import { z } from "zod";

export const CreateBoard = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required",
  }).min(3, {
    message: "Title is too short."
  }),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description is required",
  }).min(3, {
    message: "Description is too short."
  }),
  orgId: z.string({
    required_error: "orgId is required",
    invalid_type_error: "orgId is required",
  }).min(3, {
    message: "Please Referesh and try again"
  }),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is required",
  }),
});