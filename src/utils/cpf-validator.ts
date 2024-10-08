export function isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false; // Verifica se tem 11 dígitos e não é uma sequência repetida
    }
  
    // Cálculo do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += Number(cpf[i]) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== Number(cpf[9])) {
      return false;
    }
  
    // Cálculo do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += Number(cpf[i]) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== Number(cpf[10])) {
      return false;
    }
  
    return true; // CPF é válido
  }
  