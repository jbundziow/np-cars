const removeEmptyValuesFromObject = (obj: Record<string, any>): Record<string, any> => {
    const newObj: Record<string, any> = {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (
                value !== null &&
                value !== undefined &&
                value !== '' &&
                !(Array.isArray(value) && value.length === 0)
            ) {
                newObj[key] = value;
            }
        }
    }

    return newObj;
}


export default removeEmptyValuesFromObject;