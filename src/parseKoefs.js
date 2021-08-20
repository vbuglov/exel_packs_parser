const parseKoefs = () =>
  "a1_last_v	a2_last_v	a3_last_v	a4_last_v	a5_last_v	a6_last_v	a7_last_v	a8_last_v	a9_last_v	a10_last_v	a1_cur_v	a2_cur_v	a3_cur_v	a4_cur_v	a5_cur_v	a6_cur_v	a7_cur_v	a8_cur_v	a9_cur_v	a10_cur_v"
    .split("	")
    .map((el) => `%{param_name: "${el}", param_value: -13.7419413919414}`)
    .join(",\n");

export { parseKoefs };
