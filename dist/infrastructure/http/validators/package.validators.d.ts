import { z } from 'zod';
import { PackageStates } from '../../../domain/enums/PackageStates.js';
export declare const PackageNatureSchema: z.ZodObject<{
    natureId: z.ZodString;
    quantity: z.ZodNumber;
}, z.core.$strip>;
export declare const CreatePackageSchema: z.ZodObject<{
    weight: z.ZodNumber;
    departureGpId: z.ZodString;
    personId: z.ZodString;
    relayId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    packageNatures: z.ZodArray<z.ZodObject<{
        natureId: z.ZodString;
        quantity: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const UpdatePackageStatusSchema: z.ZodObject<{
    state: z.ZodEnum<typeof PackageStates>;
}, z.core.$strip>;
export declare const PackageFiltersSchema: z.ZodObject<{
    state: z.ZodOptional<z.ZodEnum<typeof PackageStates>>;
    departureDateFrom: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    departureCountry: z.ZodOptional<z.ZodCoercedString<unknown>>;
    destinationCountry: z.ZodOptional<z.ZodCoercedString<unknown>>;
    currencyId: z.ZodOptional<z.ZodCoercedString<unknown>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type CreatePackageDTO = z.infer<typeof CreatePackageSchema>;
export type UpdatePackageStatusDTO = z.infer<typeof UpdatePackageStatusSchema>;
export type PackageFiltersDTO = z.infer<typeof PackageFiltersSchema>;
//# sourceMappingURL=package.validators.d.ts.map