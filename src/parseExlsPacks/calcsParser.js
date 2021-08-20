import { cond, drop, includes, T, slice } from "ramda";
import { prepData, calcs, pack } from "./exelParser";
import { lib } from "./data";

const withoutNums = (v) => `${v}`.replace(/[0-9]/gm, "");
const getVFromPack = (v) => {
  const index = pack()[0].findIndex((el) => el === withoutNums(v));
  return pack()[1][index];
};

const splitFormula = (str) =>
  str
    .replace(/\(|\/|\*|\-|\^|\)/gm, (v) => {
      return `__break__${v}__break__`;
    })
    .split("__break__")
    .filter((el) => el);

const isFormula = (str) => str && str[0] === "=";

const getVFromBook = (v, book) => {
  if (isFormula(v)) {
    return v.slice(1);
  }
  return v;
};

const getVFromLib = (v, bookName = null) => {
  let splitted = v.replace(/\$/gm, "").split(".");
  const book = lib[bookName || splitted[0]];
  const field = book[splitted[1]];
  if (isFormula(field)) {
    return `(${prepParamValue(field, bookName || splitted[0])})`;
  }
  return field;
};

const prepItem = (v, bookName = null) => {
  return cond([
    [() => !!lib[bookName] && !!lib[bookName][v], () => lib[bookName][v]],
    [() => !!bookName, () => getVFromBook(v, bookName)],
    [() => includes("$", v) && includes(".", v), () => getVFromLib(v)],
    [() => pack()[0].includes(withoutNums(v)), () => getVFromPack(v)],
    [T, () => v],
  ])(v);
};

const prepSplitted = (arr = [], bookName = null) =>
  arr.map((el) => prepItem(el, bookName));

const prepParamValue = (value = "", bookName = null) => {
  const splittedStr = splitFormula(value);
  return prepSplitted(splittedStr, bookName).join("");
};

const calcsParser = () => {
  const cols = calcs()[0];
  const calcsKeys = calcs()[1];
  const calcsValues = calcs()[2];
  return `calcs: [
  ${calcsKeys.map(
    (el, idx) =>
      `%{paramName: "${el}", paramValue: "${prepParamValue(
        calcsValues[idx]
      )}"},\n`
  )}]`;
};

export default calcsParser;
