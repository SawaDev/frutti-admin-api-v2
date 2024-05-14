export const updateObjectById = (array: any[], idToUpdate: string, newData: any) => {
  return array.map(obj => {
    if (obj.id === idToUpdate) {
      return { ...obj, ...newData };
    }
    return obj;
  });
}
