export const inputCpfMask = (cpf: string | null) => {
  if (cpf === null) return '';

  const noMask = cpf.replace(/\D/g, '');
  const { length } = noMask;

  if (length <= 3) {
    return noMask;
  }

  if (length <= 6) {
    return noMask.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  }

  if (length <= 9) {
    return noMask.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  }

  return noMask.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
};

// document example 99.999.999/9999-99 or 999.999.999-99

export const inputDocumentMask = (document: string | null) => {
  if (document === null) return '';

  const noMask = document.replace(/\D/g, '');
  const { length } = noMask;

  if (length <= 3) {
    return noMask;
  }

  if (length <= 6) {
    return noMask.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  }

  if (length <= 9) {
    return noMask.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  }

  if (length <= 11) {
    return noMask.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  }

  return noMask.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const inputPhoneMask = (phone: string | null) => {
  if (phone === null) return '';

  let noMask = phone.replace(/\D/g, '');
  const { length } = noMask;

  // Verifica se o número começa com "+"
  if (phone.startsWith('+')) {
    // Remove o "+" e aplica a máscara para números estrangeiros
    noMask = phone.replace(/\D/g, '').substring(1); // Remove o primeiro caractere '+' e todos os não-dígitos
    const { length: foreignLength } = noMask;

    if (foreignLength <= 2) {
      return `+${phone.replace(/\D/g, '').substring(0, foreignLength + 1)}`;
    }

    if (foreignLength <= 3) {
      return `+${phone.replace(/\D/g, '').substring(0, foreignLength + 1)}`;
    }

    if (foreignLength <= 7) {
      return `+${phone.replace(/\D/g, '').substring(0, foreignLength + 1)}`;
    }

    if (foreignLength <= 10) {
      return `+${phone.replace(/\D/g, '').substring(0, foreignLength + 1)}`;
    }

    return `+${phone.replace(/\D/g, '').substring(0, foreignLength + 1)}`;
  }
  // Se não começa com "+", assume que é um número brasileiro
  if (length <= 2) {
    return `+55 (${noMask}`;
  }

  if (length <= 3) {
    return `+55 (${noMask.substring(0, 2)}) ${noMask.substring(2)}`;
  }

  if (length <= 7) {
    return `+55 (${noMask.substring(0, 2)}) ${noMask.substring(2, 3)} ${noMask.substring(3, 7)}`;
  }

  if (length <= 10) {
    return `+55 (${noMask.substring(0, 2)}) ${noMask.substring(2, 6)}-${noMask.substring(6, 10)}`;
  }

  return `+55 (${noMask.substring(0, 2)}) ${noMask.substring(2, 3)} ${noMask.substring(3, 7)}-${noMask.substring(7, 11)}`;
};

// cep example 99999-999
export const inputCepMask = (cep: string | null) => {
  if (cep === null) return '';

  const noMask = cep.replace(/\D/g, '');
  const { length } = noMask;

  if (length <= 5) {
    return noMask;
  }

  return noMask.replace(/(\d{5})(\d{1,3})/, '$1-$2');
};

// just numbers
export const inputNumberMask = (number: string | null) => {
  if (number === null) return '';

  return number.replace(/\D/g, '');
};
