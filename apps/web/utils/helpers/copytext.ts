export function copyToClipBoard(text: string | string[]) {
  try {
    if (typeof text != 'string') {
      navigator.clipboard.writeText(text.join(' '));
      return true;
    } else {
      navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    return false;
  }
}
