import { curry, cond, T } from "ramda";
// const exls = [
//   {col: "AA", field: "a10_cur"},
//   {col: "AB", field: "d1_last"},
//   {col: "AC", field: "d2_last"},
//   {col: "AD", field: "d3_last"},
//   {col: "AE", field: "d1_cur"},
//   {col: "AF", field: "d2_cur"},
// ]

// const exls = {
//   AB: "d1_last",
//   AC: "d2_last",
//   AD: "d3_last",
//   AE: "d1_cur",
//   AF: "d2_cur"
// };

const bb = curry((a, b) => a > b);

const exls = ["d1_last", "d2_last", "d3_last", "d1_cur", "d2_cur"];

const parseBit = () =>
  "din1_last	din2_last	din3_last	din4_last	din5_last	din6_last	din7_last	din8_last	din9_last	din10_last	din11_last	din12_last	din1_cur	din2_cur	din3_cur	din4_cur	din5_cur	din6_cur	din7_cur	din8_cur	din9_cur	din10_cur	din11_cur	din12_cur"
    .split("	")
    .map((el, idx) =>
      cond([
        [
          bb(8),
          () =>
            ` %{param_name: "${el}", param_value: "(d1_last >>> ${idx}) &&& 1"}`
        ],
        [
          bb(11),
          () =>
            ` %{param_name: "${el}", param_value: "(d2_last >>> ${
              idx - 8
            }) &&& 1"}`
        ],
        [
          bb(12),
          () =>
            ` %{param_name: "${el}", param_value: "(d1_last >>> ${
              idx - 8
            }) &&& 1"}`
        ],
        [
          bb(20),
          () =>
            ` %{param_name: "${el}", param_value: "(${exls[3]} >>> ${
              idx - 12
            }) &&& 1"}`
        ],
        [
          bb(25),
          () =>
            ` %{param_name: "${el}", param_value: "(${exls[4]} >>> ${
              idx - 20
            }) &&& 1"}`
        ]
      ])(idx)
    )
    .filter((el) => el)
    .join(",\n");

export { parseBit };
