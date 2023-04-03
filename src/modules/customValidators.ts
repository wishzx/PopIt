import { body } from "express-validator";

export const isArrayOfMinLengtOneAndOfStringMaxLength16 = (
    field: string,
    is = { optional: false }
) =>
    body(field)
        .optional(is.optional)
        .isArray({ min: 1 })
        .custom((array: unknown[]) => {
            if (
                !array.every(
                    (tag: unknown) =>
                        typeof tag === "string" && tag.length <= 16
                )
            ) {
                throw new Error(
                    `{field} must be an array of strings of max length of 16`
                );
            }
            return true;
        });
