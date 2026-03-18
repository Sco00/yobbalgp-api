import { z } from 'zod';
export const CreateDepartureSchema = z.object({
    departureDate: z.coerce.date(),
    arrivalDate: z.coerce.date(),
    deadline: z.coerce.date(),
    price: z.number().positive(),
    priceGp: z.number().positive(),
    currencyId: z.string().uuid(),
    departureAddressId: z.string().uuid(),
    destinationAddressId: z.string().uuid(),
    personId: z.string().uuid().optional(),
    insurancePrice: z.number().nonnegative().optional(),
});
export const DepartureFiltersSchema = z.object({
    departureCountry: z.string().optional(),
    destinationCountry: z.string().optional(),
    currencyId: z.string().uuid().optional(),
    isClosed: z.coerce.boolean().optional(),
    departureDateFrom: z.coerce.date().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
});
//# sourceMappingURL=departure.validator.js.map