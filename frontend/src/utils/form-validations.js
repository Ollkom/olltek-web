export function validation(value, t) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]+$/;
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const maxFileSize = 5 * 1024 * 1024;

  const validateField = (fieldName, errorKey) => {
    if (value[fieldName] === undefined) return;
    if (!value[fieldName]) {
      errors[fieldName] = t ? t(errorKey) : errorKey;
    }
  };

  const validateEmail = () => {
    if (value.email === undefined) return;
    if (value.email === "") {
      errors.email = t ? t("pleaseEnterYourEmail") : "Please enter your email";
    } else if (!emailPattern.test(value.email)) {
      errors.email = t ? t("invalidEmailFormat") : "Invalid email format";
    }
  };

  const validateNumber = () => {
    if (value.weight === undefined) return;
    if (value.weight === "") {
      errors.weight = t ? t("pleaseEnterWeightInNumber") : "Please enter weight in number";
    } else if (!phonePattern.test(value.weight)) {
      errors.weight = t ? t("shouldContainOnlyNumbers") : "should contain only numbers";
    }
  };

  const validatePhoneNumber = () => {
    if (value.phoneNumber === undefined) return;
    if (value.phoneNumber === "") {
      errors.phoneNumber = t ? t("pleaseEnterYourPhoneNumber") : "Please enter your phone number";
    } else if (!phonePattern.test(value.phoneNumber)) {
      errors.phoneNumber = t ? t("phoneNumberShouldContainOnlyNumbers") : "Phone number should contain only numbers";
    }
  };

  const validateResume = () => {
    if (value.resume === undefined) return;
    const fileExtension = value?.resume?.name?.split(".").pop().toLowerCase();
    const fileSize = value?.resume?.size || 0;

    if (!allowedExtensions.includes("." + fileExtension)) {
      errors.resume = t ? t("pleaseUploadAPdfDocOrDocxFile") : "Please upload a .pdf, .doc, or .docx file";
    } else if (fileSize > maxFileSize) {
      errors.resume = t ? t("fileSizeExceedsTheLimitOf5MB") : "File size exceeds the limit of 5 MB";
    }
  };

  const validateRadioField = (fieldName, errorKey) => {
    if (value[fieldName] === undefined) return;
    if (value[fieldName] === undefined || value[fieldName] === "") {
      errors[fieldName] = t ? t(errorKey) : errorKey;
    } else {
      delete errors[fieldName];
    }
  };

  validateField("firstName", "pleaseEnterFirstName");
  validateField("lastName", "pleaseEnterLastName");
  validateField("message", "pleaseEnterYourMessage");

  validateField("employmentStatus", "pleaseConfirmYourEmploymentStatus");
  validateField("resume", "pleaseUploadYourResume");
  validateField("department", "pleaseChooseTheDepartment");
  validateField("name", "pleaseEnterYourName");

  validateEmail();
  validatePhoneNumber();
  validateResume();
  validateNumber();

  return errors;
}
