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

    "getPrimes": function(maxPrime) {
        let seedPrimes = [2, 3, 5, 7];
        let lastPrimeIndex;
        let lastPrime;
        let start;
        let end;
        let isPrime;
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
                for (let j = 0; j <= lastPrimeIndex; j++) {
                    if (!isPrime)
                        break;
                    if (i % seedPrimes[j] === 0)
                        isPrime = false;
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
    }
};

function getPeHelpers () { return peHelpers; }