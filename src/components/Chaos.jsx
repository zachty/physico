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
                        chaos theory
                    </p>
                    <br />
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Deserunt corporis ratione animi repudiandae
                        nostrum aut voluptatem deleniti dignissimos itaque
                        provident, fugiat neque excepturi impedit similique
                        dolorum quaerat perspiciatis id nemo.
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
                    Describe the below heatmap being all points that do not
                    diverge to infinity. Describe how to use the form below to
                    generate interesting images (possibly offer random
                    selections of interesting spots).
                    <strong>
                        The graphic can take up to 30 seconds to load, be
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
