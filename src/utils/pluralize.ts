export function getKissString(count: number): string {
  const lastTwoDigits = count % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} поцелуев`;
  }
  const lastDigit = count % 10;
  if (lastDigit === 1) {
    return `${count} поцелуй`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} поцелуя`;
  } else {
    return `${count} поцелуев`;
  }
}
