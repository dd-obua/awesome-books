export const updateStorage = (label, data) => {
  return localStorage.setItem(label, JSON.stringify(data));
};
