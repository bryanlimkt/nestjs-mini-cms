export function isValidAddress(address: string) {
  return /^[a-zA-Z0-9\s,'\-#]*$/.test(address);
}
