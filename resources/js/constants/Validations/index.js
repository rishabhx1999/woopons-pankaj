import PropTypes from "prop-types";
import messages from "./defaultMessages";
import rules from "./defaultRules";
let errors = [];
let state = { error: false };
let deviceLocale = "en";
let labels = {};

// Reset error fields
const _resetErrors = () => {
    errors = [];
    state.error = false;
};

// Method to check rules on a spefific field
const _checkRules = (fieldName, rules1) => {
    const { value, required } = rules1;

    if (!value && !required) {
        return; // if value is empty AND its not required by the rules, no need to check any other rules
    }
    for (const key of Object.keys(rules1)) {
        const isRuleFn = typeof rules[key] == "function";
        const isRegExp = rules[key] instanceof RegExp;
        if (
            (isRuleFn && !rules[key](rules1[key], value)) ||
            (isRegExp && !rules[key].test(value))
        ) {
            _addError(fieldName, key, rules1[key], isRuleFn);
        }
    }
};

// Method to check if the field is in error
const isFieldInError = (fieldName) => {
    return errors.filter((err) => err.fieldName === fieldName).length > 0;
};

// Add error [{ fieldName: "name", messages: ["The field name is required."] }]
const _addError = (fieldName, rule, value, isFn) => {
    console.log("resources js constants Validations index.js" + value);
    let _nameArray = fieldName.split(/(?=[A-Z])/),
        _name = "";
    for (var i = 0; i < _nameArray.length; i++) {
        if (i > 0) {
            _name = _name + " " + _nameArray[i].toString().toLocaleLowerCase();
        } else {
            _name = _nameArray[i].toString().toLocaleLowerCase();
        }
    }

    const name = labels[fieldName];
    console.log("resources js constants Validations index.js" + name);
    value = rule == "minlength" ? value - 1 : value;
    const errMsg = messages[deviceLocale][rule]
        .replace("{0}", name || _name)
        .replace("{1}", value);
    let [error] = errors.filter((err) => err._name === _name);
    // error already exists
    if (error) {
        // Update existing element
        const index = errors.indexOf(error);
        error.messages.push(errMsg);
        error.failedRules.push(rule);
        errors[index] = error;
    } else {
        // Add new item
        errors.push({
            fieldName,
            failedRules: [rule],
            messages: [errMsg],
        });
    }

    state.error = true;
};

// Return an object where the keys are the field names and the value is an array with the rules that failed validation
const getFailedRules = () => {
    let failedRulesPerField = {};
    for (let index = 0; index < errors.length; index++) {
        let error = errors[index];
        failedRulesPerField[error.fieldName] = error.failedRules;
    }
    return failedRulesPerField;
};

// Return the rules that failed validation for the given field
const getFailedRulesInField = (fieldName) => {
    const foundError = errors.find((err) => err.fieldName === fieldName);
    if (!foundError) {
        return [];
    }
    return foundError.failedRules;
};

// Concatenate each error messages
const ListErrorMessages = (errorList = [], separator = ", ") => {
    let _err = {};
    for (var i = 0; i < errorList.length; i++) {
        let val = errorList[i];
        _err[val.fieldName] =
            val.messages && val.messages[0] ? val.messages[0] : "";
        // _err[val.fieldName] = val.messages.join(separator);
    }

    return _err;
};

// Method to return errors on a specific field
const getErrorsInField = (fieldName) => {
    const foundError = errors.find((err) => err.fieldName === fieldName);
    if (!foundError) {
        return [];
    }
    return foundError.messages;
};

const isFormValid = () => {
    let obj = {
        status: state.error,
        errors: [],
    };
    if (errors.length > 0) {
        obj.errors = errors;
    }

    return obj;
};

const validate = (fields) => {
    // Reset errors
    _resetErrors();

    // Iterate over inner state
    for (const key of Object.keys(fields)) {
        // Check if child name is equals to fields array set up in parameters
        const rules1 = fields[key];
        console.log("resources js constants Validations index.js" + rules1);
        if (rules1) {
            // Check rule for current field
            _checkRules(key, rules1);
        }
    }
    return isFormValid();
};

export { validate, ListErrorMessages };
