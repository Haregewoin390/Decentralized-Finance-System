const { getRandomBytesSync } = require("ethereum-cryptography/random");
import { getItemFromLocalStorage } from "utils/helpers/localStorage";

export type File = {
  settings: {};
  contacts: [];
  sendHistory: [];
};

export function importSettingFromFile() {}

export function exportSettingsToFile() {
  try {
    const settings = getItemFromLocalStorage("settings", true);
    const contacts = getItemFromLocalStorage("contacts", true);
    const send = getItemFromLocalStorage("send", true);
    let json: File = {
      contacts: [],
      sendHistory: [],
      settings: {},
    };
    if (Object.keys(settings).length != 0) {
      json.settings = settings;
    }
    if (Object.keys(contacts).length != 0) {
      json.contacts = contacts;
    }
    if (Object.keys(send).length != 0) {
      json.sendHistory = send;
    }

    const jsonData = JSON.stringify(json);

    const element = document.createElement("a");
    const file = new Blob([jsonData], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    const random = getRandomBytesSync(5);
    const changeToEng = (num: number) => 97 + num / 26;

    const newEngArray = random.map(changeToEng);
    const randomString = String.fromCharCode(...newEngArray);
    element.download = "anodata_" + randomString + ".json";
    document.body.appendChild(element);
    element.click();
    return true;
  } catch (err) {
    return false;
  }
}
