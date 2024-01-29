export function chooseRandomPasspharse() {
  let choosenWords: number[][] = [[], [], [], []];
  let postion: number[] = [];

  for (let i = 0; i < 4; i++) {
    let tempPostion = [];
    for (let j = 0; j < 4; j++) {
      while (true) {
        let randomWord = Math.floor(Math.random() * (12 - 0) + 0);

        if (choosenWords.length != 0 && choosenWords[i].includes(randomWord))
          continue;
        else {
          choosenWords[i].push(randomWord);
          tempPostion.push(randomWord);
          break;
        }
      }
    }
    while (true) {
      let randomPostion = Math.floor(Math.random() * (4 - 0) + 0);
      if (postion.includes(tempPostion[randomPostion])) continue;
      else {
        postion.push(tempPostion[randomPostion]);
        break;
      }
    }
  }

  return {
    choosenWords: choosenWords,
    postion: postion,
  };
}
