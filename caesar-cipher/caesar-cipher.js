const alphabet = [...Array(26)].map((_, y) => String.fromCharCode(y + 97));

const useCaesarCipher = (str, shift) => {
  const _shift = Math.abs(shift) > 26 ? shift % 26 : shift;
  return str
    .split('')
    .map(s => {
      const index = alphabet.indexOf(s.toLowerCase());
      if (index < 0) return s;

      const res = alphabet[index + _shift];
      return s === s.toUpperCase() ? res.toUpperCase() : res;
    })
    .join('');
};

exports.useCaesarCipher = useCaesarCipher;
