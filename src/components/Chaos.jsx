import React, { useState } from 'react';
import dataGenerator, { yMaxForm, mandIterations } from '../algos/mandelbrot';

//size of canvas
const HEIGHT = 800;
const WIDTH = 1200;

export default function Chaos() {
    const [yMax, setYMax] = useState(yMaxForm(HEIGHT, WIDTH, -2, 1, -1));
    const [start, setStart] = useState(false);
    const [real, setReal] = useState(0);
    const [imaginary, setImaginary] = useState(0);

    function handleMouse(event) {
        const canvas = document.getElementById('mouseover-mandel');
        if (!canvas.getContext) return;

        const [real, imaginary] = mandIterations(
            event.clientX,
            event.clientY,
            canvas
        );
        setReal(real);
        setImaginary(imaginary);
    }

    function generateMand(event) {
        event.preventDefault();
        const start = Date.now();
        const canvas = document.getElementById('mandel');
        if (!canvas.getContext) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        const [
            { value: color1 },
            { value: color2 },
            { value: xMin },
            { value: xMax },
            { value: yMin },
        ] = event.target;
        //TODO: allow user to save heatmap
        setYMax(yMaxForm(HEIGHT, WIDTH, xMin, xMax, yMin));
        dataGenerator(HEIGHT, WIDTH, xMin, xMax, yMin, ctx, color1, color2);
        console.log('Fininshed in: ', Date.now() - start);
    }

    return (
        <div className="main">
            <div>
                <h1>Chaos</h1>
                <hr />
            </div>
            <div className="columns">
                <div>
                    <div className="mouseover-mandel">
                        {start ? (
                            <canvas
                                id="mouseover-mandel"
                                height={400}
                                width={400}
                                onMouseMove={handleMouse}
                            ></canvas>
                        ) : (
                            <div onClick={() => setStart(true)}>Play</div>
                        )}
                    </div>
                    <div className="mouse-location">
                        Real axis: {real.toFixed(3)}, Imaginary axis:{' '}
                        {imaginary.toFixed(3)}i
                    </div>
                </div>
                <div>
                    <p>
                        Write a description of of how the left canvas relates to
                        chaos theory. This page makes use of the 'f(z) = z^2 +
                        c' equation to display the Mandelbrot Set. Picture an
                        x-axis through the middle going from -3 to 1
                        representing real numbers. A y-axis going vertically
                        through center from -2 to 2, represents the imaginary
                        numbers. Combined, every point on this picture forms a
                        complex number 'c = a + ib'. Starting with z = 0 and
                        each iteration becoming the next z, we can see how the
                        function jumps around. Some points are stable,
                        particularly around -1. Others diverge to infinity
                        quickly, near the edges of the map. See if you can find
                        some stable points with interesting patterns!
                        Bifurcation stuff. How even a small change in the
                        initial state (like c) can drastically change the
                        outcome of the equation.
                    </p>
                    <br />
                    <p>
                        Mouse over the box to the left after clicking play. You
                        will see the first 100 iterations of
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Iusto perspiciatis velit rem tenetur eius accusantium
                        quisquam blanditiis nemo, quae quod! Nostrum beatae
                        dolorum vitae ad quasi cum amet! Qui, libero.
                    </p>
                </div>
            </div>
            <div id="m-set-describe">
                <p>
                    What happens if we plot all the points that do not diverge
                    to infinity? Better yet, what if we plot the number of
                    iterations each point takes to diverge and color contrast
                    that with points that don't diverge? Click submit below to
                    see the Mandelbrot set! Describe how to use the form below
                    to generate interesting images (possibly offer random
                    selections of interesting spots). Try: x-min=0.33,
                    x-max=0.39, y-min=-0.6{' '}
                    <strong>
                        The graphic can take up to 2 minutes to load, be
                        patient!
                    </strong>
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Harum nemo ab optio ullam ut, voluptates quidem dignissimos.
                    Maxime tenetur, rem aperiam dicta neque explicabo fugit
                    dignissimos et, quis exercitationem voluptates!
                </p>
            </div>
            <form onSubmit={generateMand}>
                <label htmlFor="color">Heatmap Color: </label>
                <input type="color" name="color1" />
                <input type="color" name="color2" defaultValue={'#ffffff'} />
                <label htmlFor="xMin">x-min: </label>
                <input
                    type="number"
                    defaultValue="-2"
                    step={0.0000001}
                    name="xMin"
                />
                <label htmlFor="xMax">x-max: </label>
                <input
                    type="number"
                    defaultValue="1"
                    step={0.0000001}
                    name="xMax"
                />
                <label htmlFor="yMin">y-min: </label>
                <input
                    type="number"
                    defaultValue="-1"
                    step={0.0000001}
                    name="yMin"
                />
                <span>y-max: {Number(yMax).toFixed(7)}</span>
                <button type="submit">Submit</button>
            </form>
            <canvas id="mandel" height={HEIGHT} width={WIDTH}></canvas>
        </div>
    );
}
