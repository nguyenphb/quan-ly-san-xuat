import _ from "lodash";

export const createEmptyArray = (length:number)=> Array.from(new Array(length));
export const getDuplicateInArrayObj = <T>(params: { arr: T[]; groupBy: string | number }) => {
  const duplicates = _(params.arr)
    .groupBy(params.groupBy)
    .filter((group) => group.length > 1)
    .flatten()
    .value();

  return duplicates;
};
