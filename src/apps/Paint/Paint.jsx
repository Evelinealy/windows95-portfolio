import React, { useEffect, useRef, useState } from "react";
import { WindowContent, Button, Toolbar, Cutout, Panel } from "react95";
let observer;
import ColorPicker from "./ColorPicker";
import ToolsMune from "./ToolsMune";
export default function Paint(props) {
    const windowRef = useRef()

    const [windowHight, setWindowHight] = useState(0)

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
    }, [lineColor, lineWidth]);

    // Function for starting the drawing
    const startDrawing = (e) => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        );
        setIsDrawing(true);
    };

    // Function for ending the drawing
    const endDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = (e) => {
        if (!isDrawing) {
            return;
        }
        ctxRef.current.lineTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        );

        ctxRef.current.stroke();
    };


    const onresize = () => {
        if (windowRef.current) {
            setWindowHight(windowRef.current.offsetHeight - 190)

        }
    }
    useEffect(() => {
        if (windowRef.current) {
            observer = new ResizeObserver(onresize)
            observer.observe(windowRef.current)
        }
        return () => {

            if (observer) {

                observer.disconnect()
                observer = null
            }


        }
    }, [windowRef.current, windowHight])
    return (
        <div style={{ height: "100%" }} ref={windowRef}>
            <Toolbar>
                <Button variant="menu" size="sm">
                    File
                </Button>
                <Button variant="menu" size="sm">
                    Edit
                </Button>
                <Button variant="menu" size="sm">
                    Save
                </Button>
            </Toolbar>


            <WindowContent style={{ hight: "100%", width: "100%", padding: 0 }}>
                <div style={{ hight: "100%", width: "100%", display: "flex", gap: 5 }}>

                    <ToolsMune />
                    <Cutout style={{ backgroundColor: "gray", height: windowHight != 0 ? windowHight : "200px", width: "100%", overflow: "hidden", marginBottom: 10 }}>

                        <canvas
                            onMouseDown={startDrawing}
                            onMouseUp={endDrawing}
                            onMouseMove={draw}
                            ref={canvasRef}
                            width={`500px`}
                            height={`500px`}
                            style={{ backgroundColor: "white" }}
                        />
                    </Cutout>
                </div>
                <ColorPicker setLineColor={setLineColor} />
            </WindowContent>
            {/* <Panel variant="well" className="footer">
          Put some useful informations here
        </Panel> */}
        </div>

    );
}
