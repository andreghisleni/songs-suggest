export function generateRandomString(length: number): string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let string = '';

  for (let i = 0; i < length; i++) {
    string += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  return string;
}
