import { defineRule } from "vee-validate";
import { required, min, max, email } from "@vee-validate/rules";
import {
  validateCPF,
  validateCep,
  validatePhone,
  validateEmail,
  validateCNPJ,
} from "validations-br";

defineRule("required", required);
defineRule("min", min);
defineRule("max", max);
defineRule("email", email);

defineRule("cpf", (value: string) => {
  if (!value || !validateCPF(value)) {
    return "CPF inválido";
  }
  return true;
});

defineRule("cep", (value: string) => {
  if (!value) {
    return true;
  }

  if (!validateCep(value)) {
    return "CEP inválido";
  }
  return true;
});

defineRule("phone", (value: string) => {
  if (!value || !validatePhone(value)) {
    return "Telefone inválido";
  }
  return true;
});

defineRule("email", (value: string) => {
  if (!value) {
    return true;
  }

  if (!validateEmail(value)) {
    return "Email inválido";
  }
  return true;
});

defineRule("cnpj", (value: string) => {
  if (!value || !validateCNPJ(value)) {
    return "CNPJ inválido";
  }
  return true;
});

defineRule("notFuture", (value: string) => {
  if (!value) {
    return true;
  }

  const inputDate = new Date(value);
  const today = new Date();

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (inputDate > today) {
    return "A data está invcorreta.";
  }
  return true;
});