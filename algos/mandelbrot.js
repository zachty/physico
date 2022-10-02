const math = require('mathjs');
// //image size
// const x = 1200;
// const y = 800;

// //location: change these to move the image/zoom in
// const xMin = -6;
// const xMax = 6;
// const yMin = -4;
// const yMax = yMin + ((xMax - xMin) * y) / x; //uses formula to properly size image

//spacing
function stepArr(min, max, arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = min + ((max - min) * i) / arr.length;
    }
    return arr;
}

//setup points
function heatmapGenerator(x, y, heat) {
    return { x, y, heat };
}

//mandelbrot calculation constants: if n reaches iterations before z goes over limit it is in the set
const iterations = 250;
const limit = 2; //anything over this will diverge to infinity eventually

//funciton to determine if complex number is in the mandelbrot set
//input: complex number z = a + bi in the form of a, b
//output: numer of iterations n to pass limit for proof of divergence of 0 if number is in the set
function inMandSet(x, y) {
    const c = math.complex(x, y);
    let z = math.complex(0, 0);

    //formula for mandelbrot set with n=0->iterations; if z_(n+1) = z_n^2 + c > limit the loop breaks
    for (let n = 0; n < iterations; n++) {
        z = math.add(math.multiply(z, z), c);
        if (math.abs(z) > limit) return n + 1;
    }

    return 0; //return 0 if number is in set
}

//plot the heat map below
export default function generateData(width, height, xMin, xMax, yMin) {
    const yMax = yMin + ((xMax - xMin) * height) / width; //uses formula to properly size image
    const data = [];

    const xSpace = stepArr(xMin, xMax, Array(width));
    const ySpace = stepArr(yMin, yMax, Array(height));

    //get value for each point
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            data.push(
                heatmapGenerator(
                    xSpace[i],
                    ySpace[j],
                    inMandSet(xSpace[i], ySpace[j])
                )
            );
        }
    }

    return data;
}
