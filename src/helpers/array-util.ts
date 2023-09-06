export const remove = (arr: number[], item: number) => {
    const newArr = [...arr];
    newArr.splice(newArr.findIndex(i => i === item), 1);
    return newArr;
};