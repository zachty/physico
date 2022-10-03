const math = require('mathjs');
// //image size
// const x = 1200;
// const y = 800;

// //location: change these to move the image/zoom in
// const xMin = -6;
// const xMax = 6;
// const yMin = -4;
// const yMax = yMin + ((xMax - xMin) * y) / x; //uses formula to properly size image
//uses formula to properly size image
export const yMaxForm = (y, x, xMin, xMax, yMin) =>
    Number(yMin) + ((Number(xMax) - Number(xMin)) * y) / x;

//spacing
function stepArr(min, max, arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = min + ((max - min) * i) / arr.length;
    }
    return arr;
}

//setup points - could be used with anychart module?
// function heatmapGenerator(x, y, heat) {
//     return { x, y, heat };
// }

//mandelbrot calculation constants: if n reaches iterations before z goes over limit it is in the set
const iterations = 100;
const limit = 2; //anything over this will diverge to infinity eventually

//funciton to determine if complex number is in the mandelbrot set
//input: complex number z = a + bi in the form of a, b
//output: numer of iterations n to pass limit for proof of divergence of 0 if number is in the set
function inMandSet(x, y) {
    const c = math.complex(x, y);
    let z = math.complex(0, 0);

    //formula for mandelbrot set with n=0->iterations; if z_(n+1) = z_n^2 + c > limit the loop breaks
    for (let n = 0; n < iterations; n++) {
        z = math.add(math.multiply(z, z), c); //a^2 + b^2 + 2abi + c(x + yi)
        if (math.abs(z) > limit) return n + 1; //|z| = z * z-bar
    }

    return 0; //return 0 if number is in set
}

//export the data [r,g,b,o] every set of 4 is one pixel
export default function generateData(
    height,
    width,
    xMin,
    xMax,
    yMin,
    ctx,
    color
) {
    xMin = Number(xMin);
    xMax = Number(xMax);
    yMin = Number(yMin);
    //TODO: convert color to rgb values

    const yMax = yMaxForm(height, width, xMin, xMax, yMin); //uses formula to properly size image

    const xSpace = stepArr(xMin, xMax, Array(width));
    const ySpace = stepArr(yMin, yMax, Array(height));

    const colorScale = 255 / iterations;
    //get value for each point
    for (let i = 0; i < xSpace.length; i++) {
        for (let j = 0; j < ySpace.length; j++) {
            const rgb = inMandSet(xSpace[i], ySpace[j]) * colorScale;
            ctx.fillStyle = `rgb(${rgb}, ${rgb}, ${rgb})`;
            ctx.fillRect(i, ySpace.length - j - 1, 1, 1);
        }
    }
}

const fillArr = [];
for (let i = 0; i < iterations; i++) {
    fillArr.push(`rgb(${255 - i / iterations}, 0, 0)`);
}

export function mandIterations(x, y, ctx) {
    console.log(x, y);
    const c = math.complex(x, y);
    let z = math.complex(0, 0);

    for (let n = 0; n < iterations; n++) {
        z = math.add(math.multiply(z, z), c);
        ctx.fillStyle = fillArr[n];
        ctx.fillRect(x, y, 5, 5);
    }
}
