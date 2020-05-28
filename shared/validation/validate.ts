import validatejs from "validate.js";
import registerFormValidate from "./registerFormValidate";

export type FieldNameTypes = "firstName" | "secondName" | "email" | "password" | "confirmPassword";

type FieldType = {
    name: FieldNameTypes,
    value: string,
    error?: string
}

type ValidateInputType = {
    name: FieldNameTypes,
    value: string
}

function validateInput({ name, value }: ValidateInputType): string {
    const result = validatejs(
        { [name]: value },
        { [name]: registerFormValidate[name] }
    );

    return !!result ? result[name][0] : "";
};

type ValidationStateType = (data: { input: FieldType, value: string }) => FieldType;

export const getInputValidationState: ValidationStateType = ({ input, value }) => {
    return {
        ...input,
        value,
        error: validateInput({ name: input.name, value })
    };
};
//