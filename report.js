const {calculate,categories,households}=require("./calculator");
const rows=Object.entries(households).map(([name,weights])=>({name,...calculate(weights,categories.map(x=>x[1]))}));
const report=JSON.stringify(rows,null,2)+"\n";
require("node:fs").writeFileSync("results.json",report);
console.log(rows.map(x=>x.name+": "+x.inflation.toFixed(2)+"%").join("\n"));
