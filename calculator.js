"use strict";
const source = "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2213736&lang=2&reg=3";
const categories = [
  ["Food and beverages", -1.05], ["Pan, tobacco and intoxicants", 3.63],
  ["Clothing and footwear", 1.70], ["Housing", 2.86],
  ["Fuel and light", 2.76], ["Miscellaneous", 5.60]
];
const households = {
  "Food-heavy household": [62,0,5,17,6,10],
  "Rent-heavy household": [27,0,6,45,5,17],
  "Health and services household": [29,0,6,18,6,41]
};

function calculate(weights, rates) {
  if (!weights.length || weights.length !== rates.length ||
      weights.some(x => !Number.isFinite(x) || x < 0) || rates.some(x => !Number.isFinite(x))) {
    throw Error("Enter finite, non-negative weights for every category.");
  }
  const total = weights.reduce((a,b) => a+b,0);
  if (!Number.isFinite(total) || total <= 0) throw Error("At least one weight must be positive.");
  const shares = weights.map(weight => weight / total);
  const contributions = shares.map((share,i) => share * rates[i]);
  return {shares, contributions, inflation: contributions.reduce((a,b)=>a+b,0)};
}
if (typeof module !== "undefined") module.exports = {calculate, categories, households, source};
if (typeof document !== "undefined") {
  const table=document.querySelector("tbody");
  for (const [category,rate] of categories) {
    const row=table.insertRow();
    const title=document.createElement("th");
    title.scope="row";
    title.textContent=category;
    row.append(title);
    row.insertCell().textContent=rate.toFixed(2)+"%";
    for (const side of ["A","B"]) {
      const weight=document.createElement("input");
      weight.type="number";weight.min="0";weight.step="any";weight.required=true;
      weight.setAttribute("aria-label", category+" spending weight for "+side);
      weight.dataset.side=side;
      row.insertCell().append(weight);
      row.insertCell();
    }
  }
  const rows=[...table.rows], rates=categories.map(row=>row[1]);
  const inputs=side=>rows.map(row=>row.querySelector("input[data-side="+side+"]"));
  const output=document.querySelector("#result");
  document.querySelector("#source").href=source;
  function show(){
    try{
      const sides=["A","B"].map(side=>calculate(inputs(side).map(input=>input.valueAsNumber),rates));
      for (const [n,side] of sides.entries()) {
        rows.forEach((row,i)=>{row.cells[3+n*2].textContent=side.contributions[i].toFixed(2);});
      }
      const [a,b]=sides.map(x=>x.inflation);
      const gap=a-b;
      output.textContent="A "+a.toFixed(2)+"% · B "+b.toFixed(2)+"% · "+
        (Math.abs(gap)<0.005 ? "Equal at shown precision" : (gap>0?"A":"B")+" is higher by "+Math.abs(gap).toFixed(2)+" percentage points");
    } catch(error) { output.textContent=error.message; }
  }
  for(const side of ["A","B"]){
    const select=document.querySelector("#preset"+side);
    for(const name of Object.keys(households))select.add(new Option(name,name));
    select.selectedIndex=side==="A"?0:1;
    const apply=()=>{inputs(side).forEach((input,i)=>{input.value=households[select.value][i];});show();};
    select.addEventListener("change",apply);
    apply();
  }
  table.addEventListener("input",show);
}
