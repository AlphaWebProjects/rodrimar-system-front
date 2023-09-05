import { useState } from 'react';

export const useValidation = (validations) => {
    const [errors, setErrors] = useState({});

    const validate = (data) => {
        let isValid = true;
        const newErrors = {};

        for (const key in validations) {
            const value = data[key];
            const validation = validations[key];

            if (validation?.required?.value && !value) {
                isValid = false;
                newErrors[key] = validation?.required?.message;
            }

            const pattern = validation?.pattern;
            if (pattern?.value && !RegExp(pattern.value).test(value)) {
                isValid = false;
                newErrors[key] = pattern.message;
            }

            const custom = validation?.custom;
            if (custom?.isValid && !custom.isValid(value)) {
                isValid = false;
                newErrors[key] = custom.message;
            }
        }

        setErrors(newErrors);
        return { isValid, errors: newErrors };
    };

    return { errors, validate };
};
