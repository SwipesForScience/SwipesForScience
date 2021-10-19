import { defineRule } from "vee-validate";
import AllRules from "@vee-validate/rules";

const defineValidationRules = () => {
  Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
  });
  defineRule("required", value => {
    if (!value || !value.length) {
      return `This field is required`;
    }
    return true;
  });
  defineRule("min_length", (value, [limit]) => {
    if (!value || !value.length) {
      return true;
    }
    if (value.length < limit) {
      return `This field must be at least ${limit} characters`;
    }
    return true;
  });
  defineRule("max_length", (value, [limit]) => {
    if (!value || !value.length) {
      return true;
    }
    if (value.length > limit) {
      return `This field must be less than ${limit} characters`;
    }
    return true;
  });
  defineRule("min_value", (value, [limit]) => {
    if (parseInt(value) < limit) {
      return `Value must be greater than ${limit}`;
    }
    return true;
  });
  defineRule("max_value", (value, [limit]) => {
    if (parseInt(value) > limit) {
      return `Value must be less than ${limit}`;
    }
    return true;
  });
  defineRule("email", value => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }
    // basic email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "This field must be a valid email";
    }
    return true;
  });
  defineRule("truthy", value => {
    if (value) {
      return true;
    }
    return "This field must be checked";
  });
};

export default defineValidationRules;
