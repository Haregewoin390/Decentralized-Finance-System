export function shortenText(text: string | undefined): string {
  if (!text) return '';
  const shorten = text.slice(0, 6) + '....' + text.slice(text.length - 5);
  return shorten;
}
