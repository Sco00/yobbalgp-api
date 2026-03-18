import { z } from 'zod';
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const CreateAccountSchema: z.ZodIntersection<z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    roleId: z.ZodString;
    personId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    mobile: z.ZodOptional<z.ZodString>;
    personTypeId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>>;
export type LoginDTO = z.infer<typeof LoginSchema>;
export type CreateAccountDTO = z.infer<typeof CreateAccountSchema>;
//# sourceMappingURL=account.validator.d.ts.map