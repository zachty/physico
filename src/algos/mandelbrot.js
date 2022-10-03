const math = require('mathjs');
// //image size
// const x = 1200;
// const y = 800;

// //location: change these to move the image/zoom in
// const xMin = -6;
// const xMax = 6;
// const yMin = -4;
// const yMax = yMin + ((xMax - xMin) * y) / x; //uses formula to properly size image

//uses formula to properly size image - exported for initial val
export const yMaxForm = (y, x, xMin, xMax, yMin) =>
    Number(yMin) + ((Number(xMax) - Number(xMin)) * y) / x;

//spacing
function stepArr(min, max, arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = min + ((max - min) * i) / arr.length;
    }
    return arr;
}

//convert hex string to rgb numbers
function hexToRGB(hexString) {
    let rgb = [];
    for (let i = 0; i < 6; i += 2) {
        rgb.push(parseInt(hexString.slice(i + 1, i + 3), 16));
    }
    return rgb;
}

//color transistions
function transistion(start, end, step, it) {
    return start - ((start - end) * step) / it;
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

//plot the mandelbrot set with user specified parameters
export default function generateData(
    height,
    width,
    xMin,
    xMax,
    yMin,
    ctx,
    colorStart,
    colorEnd
) {
    xMin = Number(xMin);
    xMax = Number(xMax);
    yMin = Number(yMin);
    const [rStart, gStart, bStart] = hexToRGB(colorStart);
    const [rEnd, gEnd, bEnd] = hexToRGB(colorEnd);

    const yMax = yMaxForm(height, width, xMin, xMax, yMin); //uses formula to properly size image

    const xSpace = stepArr(xMin, xMax, Array(width));
    const ySpace = stepArr(yMin, yMax, Array(height));

    //get value for each point
    for (let i = 0; i < xSpace.length; i++) {
        for (let j = 0; j < ySpace.length; j++) {
            const heat = inMandSet(xSpace[i], ySpace[j]);
            ctx.fillStyle = `rgb(${transistion(
                rStart,
                rEnd,
                heat,
                iterations
            )}, ${transistion(gStart, gEnd, heat, iterations)}, ${transistion(
                bStart,
                bEnd,
                heat,
                iterations
            )})`;
            ctx.fillRect(i, ySpace.length - j - 1, 1, 1);
        }
    }
}

/***** PLOT 100 POINTS ON MOUSEOVER *****/
//array used for changing color of squares
const fillArr = [];
for (let i = 0; i < iterations; i++) {
    fillArr.push(`rgb(${255 - i}, 0, 0)`);
}

function changeToReal(pixel, size, range, min) {
    return (range * pixel) / size + min;
}

function changeToScreen(num, size, range, min) {
    return ((num - min) * size) / range;
}

export function mandIterations(x, y, canvas) {
    //clear canvas and get top left pixel
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const { top, left } = canvas.getBoundingClientRect();

    //convert mouse position to "real" position on 4x4 board
    const range = 4;
    const minX = -3;
    const minY = -2;
    const size = 400;
    //x: -3 -> 1; y: -2 -> 2
    let a = changeToReal(Math.ceil(x - left), size, range, minX);
    let b = changeToReal(y - top, size, range, minY);
    const real = a;
    const imaginary = b;

    for (let n = 0; n < iterations; n++) {
        ctx.fillStyle = fillArr[n];
        ctx.beginPath();
        ctx.arc(
            changeToScreen(a, size, range, minX) - 2.5,
            changeToScreen(b, size, range, minY) - 2,
            5,
            0,
            2 * Math.PI
        );
        ctx.fill();

        a = a ** 2 + b ** 2 + real;
        b = 2 * a * b + imaginary;
    }
    return [real, -imaginary];
}
