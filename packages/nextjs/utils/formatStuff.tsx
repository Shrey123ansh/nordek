export function formatTx(inputString: string) {
  return inputString.substring(0, 3) + "..." + inputString.slice(-3);
}
