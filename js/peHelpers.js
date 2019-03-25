let zeroPadIntArray = function(intArray, arrayLength) {
    let zeroPad = new Array(arrayLength - intArray.length);
    zeroPad = zeroPad.fill(0);
    return intArray.concat(zeroPad);
};

let peHelpers = {
    "getDivisors": function(integerToFactor, primeArray) {
        let integerDivisors = new Set([1]);

        if (!primeArray.includes(integerToFactor)) {
            let testNumber = integerToFactor;
            let primeFactors = [];
            let testPrime;
            let divisorArray;

            for (let j = 0; j < primeArray.length; j++) {
                if (testNumber === 1)
                    break;
                testPrime = primeArray[j];
                while (testNumber % testPrime === 0)  {
                    primeFactors.push(testPrime);
                    testNumber /= testPrime;
                }
            }

            for (let j = 0; j < primeFactors.length; j++) {
                divisorArray = Array.from(integerDivisors);
                for (let k = 0; k < divisorArray.length; k++) {
                    integerDivisors.add(primeFactors[j] * divisorArray[k]);
                }
            }

            if (integerToFactor !== 1)
                integerDivisors.delete(integerToFactor);
        }

        return Array.from(integerDivisors);
    },

    "getPrimes": function(maxPrime, seedPrimes) {
        if (seedPrimes == null)
            seedPrimes = [2, 3, 5, 7];
        let lastPrimeIndex;
        let lastPrime;
        let start;
        let end;
        let isPrime;
        let sqRoot;
        let gettingPrimes = true;

        while (gettingPrimes) {
            lastPrimeIndex = seedPrimes.length - 1;
            lastPrime = seedPrimes[lastPrimeIndex];
            start = lastPrime + 1;
            end = lastPrime * lastPrime;

            for (let i = start; i < end; i++) {
                if (!gettingPrimes)
                    break;

                isPrime = true;
                sqRoot = Math.pow(i, 0.5);
                for (let j = 0; j <= lastPrimeIndex; j++) {
                    if (!isPrime)
                        break;
                    if (i % seedPrimes[j] === 0)
                        isPrime = false;
                    if (seedPrimes[j] > sqRoot)
                        break;
                }
                if (isPrime)
                    seedPrimes.push(i);

                gettingPrimes = (i < maxPrime);
            }
        }

        return seedPrimes;
    },

    "addStringsAsIntegers": function(intStringOne, intStringTwo) {
        // Convert strings to arrays and reverse so lowest "end" has lowest index
        let intOne = intStringOne.split("");
        intOne = intOne.map(x => Number.parseInt(x));
        intOne.reverse();
        let intTwo = intStringTwo.split("");
        intTwo = intTwo.map(x => Number.parseInt(x));
        intTwo.reverse();

        // Balance array lengths
        if (intOne.length !== intTwo.length) {
            if (intOne.length > intTwo.length)
                intTwo = zeroPadIntArray(intTwo, intOne.length);
            else
                intOne = zeroPadIntArray(intOne, intTwo.length);
        }

        // Add arrays
        let carry = 0;
        let sumArray = [];
        let tempSum;
        for (let i = 0; i < intOne.length; i++) {
            tempSum = intOne[i] + intTwo[i] + carry;
            if (tempSum > 9) {
                carry = 1;
                tempSum -= 10;
            }
            else
                carry = 0;
            sumArray[i] = tempSum;
        }
        if (carry === 1)
            sumArray.push(1);

        // Return new string
        sumArray.reverse();
        return sumArray.join("");
    },

    // Accepts denominator, returns object with "result" string and "repeatingPortion" string properties
    "longDivideUnitFraction": function (denominator) {
        let numerator = 1;
        let numerators = [];
        let isCrunching = true;
        let result = "0.";
        let repeatingPortion = "";
        let resultDigit;

        while (isCrunching) {
            numerator *= 10;
            if (numerators.includes(numerator)) {
                let startIndex = numerators.findIndex(x => x === numerator);
                repeatingPortion = result.slice(startIndex - numerators.length);
                isCrunching = false;
            }
            else {
                numerators.push(numerator);
                resultDigit = Math.trunc(numerator / denominator);
                result += resultDigit;
                numerator -= resultDigit * denominator;
                if (numerator === 0)
                    isCrunching = false;
            }
        }

        return {
            "result": result,
            "repeatingPortion": repeatingPortion
        };
    }
};

function getPeHelpers () { return peHelpers; }