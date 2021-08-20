import { drop, identical, is } from "ramda";

const strLib = {
  pk: "pack",
  data: "pack",
  PacketID: "pack",
  DataType: "pack",
  DateTime: "pack_dt",
  TimeStamp: "pack_dt",
  Latitude: "pack_lat",
  Longitude: "pack_lon",
  "gps.time": "stime",
  "gps.date": "sdate"
};

const toLower = (str = "") =>
  str
    .trim()
    .replace(/[A-Z]+/gm, (m) => {
      return `_${m.toLocaleLowerCase()}`;
    })
    .replace(/\d+/gm, (m) => {
      return `${m}`;
    })
    .replace(/\.+/gm, "_")
    .replace(/\_+/gm, "_")
    .replace(/^./gm, (m) => m.toLocaleLowerCase())
    .replace(/^\_/gm, "")
    .replace(/(\[+)|(\]+)/gm, "");

const renameV = (str) => (strLib[str] ? strLib[str] : toLower(str));

const prepTitles = (pack = []) => pack.map((el) => renameV(el));

export const prepCols = (pack = []) => [
  prepTitles(pack[0].split(/[\s]/gm).filter((el) => el))
    .filter((el) => identical(NaN, +el))
    .filter((el) => el !== "-"),
  pack[1].split("	")
];
