export function validation(value) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]+$/;
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const maxFileSize = 5 * 1024 * 1024;

  const validateField = (fieldName, errorMessage) => {
    if (value[fieldName] === undefined) return;
    if (!value[fieldName]) {
      errors[fieldName] = errorMessage;
    }
  };

  const validateEmail = () => {
    if (value.email === undefined) return;
    if (value.email === "") {
      errors.email = "Please enter your email";
    } else if (!emailPattern.test(value.email)) {
      errors.email = "Invalid email format";
    }
  };

  const validateNumber = () => {
    if (value.weight === undefined) return;
    if (value.weight === "") {
      errors.weight = "Please enter weight in number";
    } else if (!phonePattern.test(value.weight)) {
      errors.weight = "should contain only numbers";
    }
  };

  const validatePhoneNumber = () => {
    if (value.phoneNumber === undefined) return;
    if (value.phoneNumber === "") {
      errors.phoneNumber = "Plese enter your phone number";
    } else if (!phonePattern.test(value.phoneNumber)) {
      errors.phoneNumber = "Phone number should contain only numbers";
    }
  };

  const validateResume = () => {
    if (value.resume === undefined) return;
    const fileExtension = value?.resume?.name?.split(".").pop().toLowerCase();
    const fileSize = value?.resume?.size || 0;

    if (!allowedExtensions.includes("." + fileExtension)) {
      errors.resume = "Please upload a .pdf, .doc, or .docx file";
    } else if (fileSize > maxFileSize) {
      errors.resume = "File size exceeds the limit of 5 MB";
    }
  };

  const validateRadioField = (fieldName, errorMessage) => {
    if (value[fieldName] === undefined) return;
    if (value[fieldName] === undefined || value[fieldName] === "") {
      errors[fieldName] = errorMessage;
    } else {
      delete errors[fieldName];
    }
  };

  validateField("firstName", "Please enter first Name");
  validateField("lastName", "Please enter last Name");
  validateField("message", "Please enter your message");
  // validateField("dob", "Please select your date of birth");
  // validateField("graduationYear", "Please select year of graduation");
  validateField("employmentStatus", "Please confirm your employment status");
  // validateField("experience", "Please enter your total work experience");
  // validateField("gender", "Please select your gender");
  validateField("resume", "Please upload your resume");
  validateField("department", "Please choose the department");
  validateField("name", "Please enter your name");
  // validateField("position", "Please enter your current position");
  // validateField("company", "Please enter your current company");
  /* validateField(
    "highestDegree",
    "Please enter your highest educational degree"
  ); */
  // validateField("maritalStatus", "Please select your marital status");
  // validateField("nationality", "Please enter your nationality");
  // validateField("location", "Please enter your location");
  // validateField("major", "Please enter your major");

  // Shipping calculator form

  validateField("from", "Please enter pickup location");
  validateField("to", "Please enter drop location");
  validateField("weight", "Please enter package weight");

  // Shipping Tracking form

  validateField("track", "Please enter your tracking number");

  // Retail Application Form

  validateField("brandName", "Please enter your brand name");
  validateField("country", "Please enter your country or origin");
  validateField("productType", "Please enter your product type");
  validateRadioField(
    "qualityCertification",
    "Please select quality certifications availability"
  );

  validateEmail();
  validatePhoneNumber();
  validateResume();
  validateNumber();

  return errors;
}
