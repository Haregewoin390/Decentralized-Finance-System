const { getRandomBytesSync } = require("ethereum-cryptography/random");

export function downloadFile(
  content: string | string[],
  name: string,
  appendrandom: boolean
): boolean {
  try {
    if (typeof content != "string") {
      content = content.join(" ");
    }
    const link = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    if (appendrandom) {
      const random = getRandomBytesSync(5);
      const changeToEng = (num: number) => 97 + num / 26;
      const newEngArray = random.map(changeToEng);
      const randomString = String.fromCharCode(...newEngArray);
      link.download = name + randomString + ".txt";
    } else {
      link.download = name + ".txt";
    }
    link.click();
    URL.revokeObjectURL(link.href);
    return true;
  } catch (error) {
    return false;
  }
}
