import { z } from 'zod';
export declare const CreateDepartureSchema: z.ZodObject<{
    departureDate: z.ZodCoercedDate<unknown>;
    deadline: z.ZodCoercedDate<unknown>;
    price: z.ZodNumber;
    priceGp: z.ZodNumber;
    currencyId: z.ZodString;
    departureAddressId: z.ZodString;
    destinationAddressId: z.ZodString;
    personId: z.ZodOptional<z.ZodString>;
    insurancePrice: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const DepartureFiltersSchema: z.ZodObject<{
    departureCountry: z.ZodOptional<z.ZodString>;
    destinationCountry: z.ZodOptional<z.ZodString>;
    currencyId: z.ZodOptional<z.ZodString>;
    isClosed: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    departureDateFrom: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    departureDateTo: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type CreateDepartureDTO = z.infer<typeof CreateDepartureSchema>;
export type DepartureFiltersDTO = z.infer<typeof DepartureFiltersSchema>;
//# sourceMappingURL=departure.validator.d.ts.map