import { t } from 'i18next'

export const validateEmail =(email) =>{
  const errors = {};
  if (!email) {
    errors.email = "Nhập email của bạn";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = t("validate.emailError")
  } else {
    delete errors.email;
  }
  return errors
}

export const validate = (data) => {
  const errors = {};

  if (data.firstName && data.firstName.trim()) {
  } else {
    errors.firstName = "Không thể bỏ trống";
  }

  if (data.lastName && data.lastName.trim()) {
  } else {
    errors.lastName = "Không thể bỏ trống";
  }

  if (data.email) {
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = t("validate.emailError")
    }
  } else {
    errors.email = "Nhập email của bạn";
  }

  // Validate Password
  if (data.password) {
    if (data.password.length < 8) {
      errors.password = t("validate.passwordMinError")
    } else if (!data.password.match(/[A-Z]/)) {
      errors.password = t("validate.passwordUpperCaseError");
    } else if (!data.password.match(/[a-z]/)) {
      errors.password = t("validate.passwordLowerCaseError");
    } else if (!data.password.match(/[0-9]/)) {
      errors.password = t("validate.passwordNumberError");
    } else if (!data.password.match(/[!@#$%^&?*]/)) {
      errors.password = t("validate.passwordSpecialCharError");
    }
  } else {
    errors.password = t("validate.passwordRequire");
  }
  return errors;
};
