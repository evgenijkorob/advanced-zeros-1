module.exports = function getZerosCount(number, base) {
  let basePrimaries = calcPrimaries(base);
  let maxDividersPowers = calcMaxPowers(number, basePrimaries);
  let quotients = calcPowersQuotients(basePrimaries, maxDividersPowers);
  let zeros = Math.floor(quotients[0]);
  for (let i = 1; i < quotients.length; i++) {
    zeros = Math.min(zeros, Math.floor(quotients[i]));
  }
  return zeros;
}

function calcPrimaries(number) {
  let currDivider = 2, numOfDivides = 0, result = {};
  while (number > 1) {
    numOfDivides = 0;
    while (isInteger(number / currDivider)) {
      number /= currDivider;
      numOfDivides++;
    }
    if (numOfDivides) {
      result[currDivider] = numOfDivides;
    }
    currDivider++;
  }
  return result;
}

function isInteger(num) {
  return (num ^ 0) === num;
}

function calcMaxPowers(number, dividers) {
  let result = {};
  for (let primary in dividers) {
    let maxPower = 0, power = 1, quotient;
    while (1) {
      quotient = Math.floor(number / Math.pow(primary, power));
  	  if (quotient != 0) {
    		maxPower += quotient;
    		power++;
  	  }
  	  else
  		  break;
    }
    result[primary] = maxPower;
  }
  return result;
}

function calcPowersQuotients(basePrimaries, primariesPowers) {
  let result = [];
  for (let currPrim in basePrimaries) {
    result.push(primariesPowers[currPrim] / basePrimaries[currPrim]);
  }
  return result;
}
