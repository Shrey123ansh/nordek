/**
 * Parse USD numeric in appropriate dollar format
 * @param {number} value to parse
 * @returns {string} parsed
 */
export function parseUSD(value: number): string {
  return value.toLocaleString("us-en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatNumberWithKMB(number: number) {
  if (number < 1000) {
    return number.toFixed(2);
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number < 1000000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else {
    return (number / 1000000000).toFixed(1) + "B";
  }
}
