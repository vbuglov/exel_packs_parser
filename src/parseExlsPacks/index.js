import { pipe } from "ramda";
import { pack } from "./data";
import { prepCols } from "./prepTitles";
import calcsParser from "./calcsParser";

const pSplit = (pack = "") => pack.split("\n").filter((el) => el);

const pFloat = (pack = [""]) =>
  pack.includes("pack_lat") ? `\nfloat: ["pack_lat", "pack_lon"],` : "";

const pDate = (pack = [""]) =>
  pack.includes("pack_dt") ? `\n    datetime:  ["pack_dt"],` : "";

const pMinMax = (pack = [""]) =>
  pack.includes("pack_lat")
    ? `\n    min: russia_coord_min_112,
    max: russia_coord_max_112,
`
    : "";
const parseData = (pack = [[""], [""]]) => `
  %{
    raw_data_db_table: "",
    number: ${pack[1][0]},
    len: ${pack[0].length},
    pack_fields: "${pack[0].join(" ")}",
    ${calcsParser()}
    non_nilable: [${pack[0].map((el) => `"${el}"`).join(", ")}],${pFloat(
  pack[0]
)}${pDate(pack[0])}${pMinMax(pack[0])}
  }
`;

const parseExlsPacks = () => pipe(pSplit, prepCols, parseData)(pack);

export { parseExlsPacks };
