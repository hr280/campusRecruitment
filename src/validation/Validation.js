import { ValidatorForm } from "react-material-ui-form-validator";

const authValidations = () => {
  ValidatorForm.addValidationRule("isNameLongEnough", value => {
    if (value.trim().length < 3) return false;
    return true;
  });

  ValidatorForm.addValidationRule("isAddressLongEnough", value => {
    if (value.trim().length < 10) return false;
    return true;
  });

  ValidatorForm.addValidationRule("isPhoneLengthOk", value => {
    const length = value.trim().length
    if (length !== 0 && length !== 11) return false;
    return true;
  });

  ValidatorForm.addValidationRule("isURL", value => {
    value = value.trim();
    var patt = new RegExp(
      "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
    );
    return value.length === 0 || patt.test(value);
  });

  ValidatorForm.addValidationRule("isPasswordLongEnough", value => {
    if (value.trim().length < 6) return false;
    return true;
  });

  ValidatorForm.addValidationRule("lessThan10Chars", value => {
    const length = value.trim().length
    if (length < 10 && length > 0) return false;
    return true;
  });

  ValidatorForm.addValidationRule("lessThan5Chars", value => {
    const length = value.trim().length
    if (length < 5 && length > 0) return false;
    return true;
  });

  ValidatorForm.addValidationRule("inGpaRange", value => {
    if (value.trim().length !== 0 && (value < 1 || value > 4)) return false;
    return true;
  });

  ValidatorForm.addValidationRule("moreThanMinSal", value => {
    if (value < 15000) return false;
    return true;
  });
};

export const signinValidations = () => {
  ValidatorForm.addValidationRule("isPasswordLongEnough", value => {
    if (value.trim().length < 6) return false;
    return true;
  });
};

export default authValidations;
