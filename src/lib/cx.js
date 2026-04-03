export function cx(...inputs) {
  return inputs.flat(Infinity).filter(Boolean).join(" ");
}
