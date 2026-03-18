import { z } from 'zod';
export declare const CreatePersonSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    mobile: z.ZodString;
    personTypeId: z.ZodString;
}, z.core.$strip>;
export declare const UpdatePersonSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    mobile: z.ZodOptional<z.ZodString>;
    personTypeId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreatePersonDTO = z.infer<typeof CreatePersonSchema>;
export type UpdatePersonDTO = z.infer<typeof UpdatePersonSchema>;
//# sourceMappingURL=person.validator.d.ts.map