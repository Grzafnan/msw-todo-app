import { z } from 'zod';

// Tag schema: each tag must have id and name
const tagSchema = z.object({
  id: z.string().min(1, 'Tag ID is required'),
  name: z.string().min(1, 'Tag name is required').max(50, 'Tag name must be less than 50 characters'),
});

export const todoSchema = z.object({
  id: z.number().optional(), // you can also add an id for todo itself if needed
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  description: z
    .string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional(),
  status: z.enum(['todo', 'in_progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  tags: z
    .array(tagSchema)
    .max(10, 'Maximum 10 tags allowed')
    .optional(),
  dueDate: z
    .string()
    .refine(
      (date) => {
        if (!date) return true;
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()) && parsedDate > new Date();
      },
      'Due date must be in the future'
    )
    .optional(),
    userId: z.number().optional(), // Add userId to the schema
});

export const todoUpdateSchema = todoSchema.partial();

export type TodoFormData = z.infer<typeof todoSchema>;
export type TodoUpdateFormData = z.infer<typeof todoUpdateSchema>;
export type Tag = z.infer<typeof tagSchema>;
