const USER_DATA_LOCALSTORAGE_KEY: string = "user";

export const getUserFromLocalStorage = (
  isJson: boolean = false
): JSON | string => {
  const storageUser: string | null = localStorage.getItem(
    USER_DATA_LOCALSTORAGE_KEY
  );
  if (storageUser === null)
    throw new Error("There is no user in local storage");
  return isJson ? JSON.parse(storageUser) : storageUser;
};

export const getItemFromLocalStorage = (
  key: string,
  isJson: boolean = false
): any => {
  const storageItem: string | null = localStorage.getItem(key);

  if (!storageItem && storageItem === null) return {};
  return isJson ? JSON.parse(storageItem) : storageItem;
};

export const setItemInLocalStorage = (
  key: string,
  item: any,
  isStringify: boolean = false
): void => {
  const entry = isStringify ? JSON.stringify(item) : item;
  localStorage.setItem(key, entry);
};

export const removeItemFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = (): void => {
  localStorage.clear();
};
