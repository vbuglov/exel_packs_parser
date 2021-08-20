import { range } from "ramda";
import {
  rawData,
  startPackCol,
  finishPackCol,
  startCalcsCol,
  finishCalcsCol,
} from "./data";

const alpabet = range(65, 91).map((el) => String.fromCharCode(el));

const withA = alpabet.map((el) => `A${el}`);
const withB = alpabet.map((el) => `B${el}`);
const withC = alpabet.map((el) => `C${el}`);
const withD = alpabet.map((el) => `D${el}`);

const cols = [...alpabet, ...withA, ...withB, ...withC, ...withD];

export const addNoData = (workData) =>
  workData.replace(/\t\t/gm, "\t__empty__\t");

const prepData = (workData) => {
  const prepedData = addNoData(workData)
    .split("\n")
    .filter((el) => el)
    .map((el) => el.split("\t"))
    .map((el) => el.map((el) => (el === "__empty__" ? "" : el)));
  return [cols, ...prepedData];
};

const pack = () => {
  const startIdnex = cols.findIndex((el) => el === startPackCol);
  const fisnishIdnex = cols.findIndex((el) => el === finishPackCol);
  return prepData(rawData).map((el = []) => el.slice(startIdnex, fisnishIdnex));
};

const calcs = () => {
  const startIdnex = cols.findIndex((el) => el === startCalcsCol);
  const fisnishIdnex = cols.findIndex((el) => el === finishCalcsCol);
  return prepData(rawData).map((el = []) => el.slice(startIdnex, fisnishIdnex));
};

export { prepData, cols, pack, calcs };
