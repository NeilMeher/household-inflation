const {test}=require("node:test");
const assert=require("node:assert/strict");
const {calculate,categories,households}=require("./calculator");
test("hand calculation and scale invariance",()=>{
 const x=calculate([20,60],[10,-2]);
 assert.deepEqual(x.shares,[0.25,0.75]);
 assert.deepEqual(x.contributions,[2.5,-1.5]);
 assert.equal(x.inflation,1);
 assert.deepEqual(calculate([1,3],[10,-2]),x);
});
test("rejects invalid weights",()=>{
 for(const weights of [[0,0],[-1,3],[Infinity,3],[NaN,2]])assert.throws(()=>calculate(weights,[2,3]));
});
test("switching baskets reverses the comparison",()=>{
 const rates=categories.map(x=>x[1]);
 const [a,b,c]=Object.values(households).map(x=>calculate(x,rates).inflation);
 assert.ok(a<b&&c>b);
});
