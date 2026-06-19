const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function formatBengaliNumber(amount: number): string {
  const rounded = Math.round(amount);
  const [intPart, fracPart] = Math.abs(rounded).toString().split(".");

  let lastThree = intPart.slice(-3);
  const otherDigits = intPart.slice(0, -3);
  if (otherDigits !== "") {
    lastThree = "," + lastThree;
  }
  const grouped =
    otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  const withSign = (rounded < 0 ? "-" : "") + grouped + (fracPart ? `.${fracPart}` : "");

  return withSign.replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)]);
}
