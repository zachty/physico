import React, { useState } from 'react';
import dataGenerator, { yMaxForm, mandIterations } from '../algos/mandelbrot';

//size of canvas
const HEIGHT = 800;
const WIDTH = 1200;

export default function Chaos() {
    const [yMax, setYMax] = useState(yMaxForm(HEIGHT, WIDTH, -2, 1, -1));

    function handleMouseOver(event) {
        console.dir(event.target);
    }

    function generateMand(event) {
        event.preventDefault();
        const start = Date.now();
        const canvas = document.getElementById('mandel');
        if (!canvas.getContext) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        const [
            { value: color },
            { value: xMin },
            { value: xMax },
            { value: yMin },
        ] = event.target;
        //TODO: get color as rgb and allow user to change heatmap by sending it to generator
        // console.dir(event.target.color);
        // console.log(color);
        setYMax(yMaxForm(HEIGHT, WIDTH, xMin, xMax, yMin));
        dataGenerator(HEIGHT, WIDTH, xMin, xMax, yMin, ctx, color);
        console.log('Fininshed in: ', Date.now() - start);
        //TODO: generate mandelbrot set
    }

    return (
        <div className="main">
            <div>
                <h1>Chaos</h1>
                <hr />
            </div>
            <div className="columns">
                <canvas
                    id="mouseover-mandel"
                    height={400}
                    width={400}
                    onMouseOver={handleMouseOver}
                ></canvas>
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
                        The graphic can tak up to 30 seconds to load, be
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
                <input type="color" name="color" />
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
