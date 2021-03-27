export const localstorageTools = {
  setItem: <T>({ name, content }: { name: string; content: T }) => {
    localStorage.setItem(name, JSON.stringify(content));
  },

  getItem: <T>(name: string) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name) as string) as T;
    }

    return undefined;
  },
};
