import { drop } from "ramda";
import { addNoData, cols } from "./exelParser";

const startPackCol = "E";
const finishPackCol = "AK";

const startCalcsCol = "AQ";
const finishCalcsCol = "BJ";

const rawData = `
id	dt	imei	key	pk	DateTime	Latitude	Longitude	Speed	SupplyVoltage	a1_last	a2_last	a3_last	a4_last	a5_last	a6_last	a7_last	a8_last	a9_last	a10_last	a1_cur	a2_cur	a3_cur	a4_cur	a5_cur	a6_cur	a7_cur	a8_cur	a9_cur	a10_cur	d1_last	d2_last	d3_last	d1_cur	d2_cur	d3_cur	Parameters				Date	Time	a1_last_v	a2_last_v	a3_last_v	a4_last_v	a5_last_v	a6_last_v	a7_last_v	a8_last_v	a9_last_v	a10_last_v	a1_cur_v	a2_cur_v	a3_cur_v	a4_cur_v	a5_cur_v	a6_cur_v	a7_cur_v	a8_cur_v	a9_cur_v	a10_cur_v
				112	0	0	1921784061			3200	2285	2084	1712	1715	1712	1713	2487	1972	1705	3200	2285	2084	1712	1715	1712	1713	2487	1972	1705	255	255	255	255	255	255	0				ROUNDDOWN(F2/86400000,0)	TIME(MOD(F2/1000,86400)/3600+3,MOD(MOD(F2/1000,86400)/60,60),MOD(MOD(MOD(F2/1000,86400)/60,60),1)*60)	(K2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(L2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(M2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(N2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(O2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(P2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(Q2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(R2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(S2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(T2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(U2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(V2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(W2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(X2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(Y2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(Z2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(AA2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(AB2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(AC2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6	(AD2/$Simple.$B$11*$Simple.$B$4-$Simple.$B$5)*$Simple.$B$6

`;

const pack = `
data	gps.time	gps.date	gps.lat	gps.lon	mdt.gps.speed	gps.alt	gps.course	gps.hdop	gps.sats	bat_level	ingnition	eng_run_time	in1	in2	gsm_level	temper	in3	in4	d1	d2	d3	d4	d5	d6
1	11500000	300419	59752592	30977254	16	5330	7447	155	5	4092	0	27	1579	1221	0	3086	1274	1177	4095	4095	4095	4095	4095	4095
`;

const prepExelToObj = (data) => {
  const prepedData = addNoData(data)
    .split("\n")
    .filter((el) => el)
    .map((el) => el.split("\t"))
    .map((el) => el.map((el) => (el === "__empty__" ? "" : el)))
    .map((list, indexField) =>
      list.map((el, idx) => ({
        [`${cols[idx]}${indexField + 1}`]: el,
      }))
    )
    .reduce((acc, cur) => [...acc, ...cur], [])
    .map((el) => Object.entries(el)[0])
    .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});
  return prepedData;
};

const lib = {
  Simple: prepExelToObj(`
Параметр	Значение	Ед. измерения
Исходные данные		
Разрядность АЦП	12	бит
Напряжение питания контроллера (АЦП)	3.3000	В
Напряжение питания при 0В на входе платы	1.3750	В
Делитель напряжения	10	раз
Значение напряжения на входе	11.37	В
Значение, считанное с АЦП	4095	
		
Расчеты		
Максимальное значение, выдаваемое АЦП	=2^B3-1	
Значение напряжения на входе	=(B8/B11*B4-B5)*B6	В
Отклонение от расчетного значения	=(B12-B7)/B7	
		
Расчет коэффициентов для формулы Val = a*x^2 + b*x + c		
a	0	
b	=B6/B11*B4	
c	=-B5*B6	
Проверка	=B16*(B8^2)+B17*B8+B18	
	=B12=B19	
	`),
};

export {
  pack,
  rawData,
  startCalcsCol,
  startPackCol,
  finishCalcsCol,
  finishPackCol,
  lib,
};
