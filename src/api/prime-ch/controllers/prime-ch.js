'use strict';

/**
 * prime-ch controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const calculateBestOptions = (primes, yearOfBirth, canton, regionPrime, montantFranchise) => {
    const filteredPrimes = primes.filter(prime => {
        // Filter by classeAge
        let classeAge;
        if (yearOfBirth >= 0 && yearOfBirth <= 18) {
            classeAge = "AKL-KIN";
        } else if (yearOfBirth >= 19 && yearOfBirth <= 25) {
            classeAge = "AKL-JUG";
        } else {
            classeAge = "AKL-ERW";
        }
        if (prime.attributes.classeAge !== classeAge) {
            // console.log("age")
            return false;
        }
        //console.log(classeAge)

        // Filter by canton
        if (canton && prime.attributes.canton !== canton) {
            // console.log("canton")
            return false;
        }

        // Filter by regionPrime
        // if (regionPrime && prime.attributes.regionPrime !== regionPrime) {
        //     //console.log("region prime")
        //     return false;
        // }

        // Filter by montantFranchise
        // if (montantFranchise) {
        //     const franchise = `FRA-${montantFranchise}`;
        //     if (prime.attributes.montantFranchise < franchise) {
        //         return false;
        //     }
        // }
        console.log(prime.attributes)
        return true;
    });

    // Sort filteredPrimes by prime value
    filteredPrimes.sort((a, b) => a.attributes.prime - b.attributes.prime);

    // Return the best options
    return filteredPrimes.slice(0, 5);
};


module.exports = createCoreController('api::prime-ch.prime-ch', ({ strapi }) => ({
    async calculMeilleuresPrimes(ctx) {
        // const {
        //     yearOfBirth,
        //     canton,
        //     regionPrime,
        //     montantFranchise,
        // } = ctx.query;

        const yearOfBirth = 23;
        const canton = 'GE';
        const regionPrime = 'PR-REG CH3';
        const montantFranchise = 1500;

        const { data, meta } = await super.find(ctx);

        const primes = data;
        //  strapi.query('prime-ch.prime-ch').find(ctx);
        const resultatMeilleuresPrimes = calculateBestOptions(
            primes,
            yearOfBirth,
            canton,
            regionPrime,
            montantFranchise
        );
        try {
            ctx.body = resultatMeilleuresPrimes;
        } catch (error) {
            ctx.body = error
        }

    }
})
);
