import React, { useState } from 'react';
import ResizableReact from 'react-resizable-rotatable-draggable';

export const AnswerZone = () => {

    const [area, setArea] = useState({
        top: 0,
        width: 100,
        height: 100,
        left: 0,
        rotateAngle: 0
    });

    const [sides, setSides] = useState({
        sideA: area.top,
        sideB: area.width + area.left,
        sideC: area.height + area.top,
        sideD: area.left
    });

    const { sideA, sideB, sideC, sideD } = sides;

    const { width, height, top, left, rotateAngle } = area;

    const handleDrag = (deltaX, deltaY) => {

        let elem = document.querySelector('#AnswerImage');
        let imageAnswer = elem.getBoundingClientRect();

        setSides({
            ...sides,
            sideA: area.top,
            sideB: area.width + area.left,
            sideC: area.height + area.top,
            sideD: area.left
        });

        if (sideA >= 0 && sideD >= 0) {
            setArea({
                ...area,
                top: top + deltaY,
                left: left + deltaX
            });//ok
        }

        //para cuando sea ladoA menor a 0 en esquina 1
        if (sideA < 0) {
            setArea({ ...area, top: 0 });//ok
        }

        //para cuando ladoB sea mayor al width de la imagen
        if (sideB > imageAnswer.width) {
            setArea({ ...area, left: imageAnswer.width - width });//ok
        }

        if (sideC > imageAnswer.height) {
            setArea({ ...area, top: imageAnswer.height - area.height });//ok
        }

        if (sideD < 0) {
            setArea({ ...area, left: 0 });//ok
        }

    }

    const handleDragStart = () => {
        console.log("handleDragStart");
        // console.log("Área antes: "+JSON.stringify(area));
        // console.log("Lados antes: "+JSON.stringify(sides));
    }

    const handleDragEnd = () => {
        console.log("handleDragEnd");
        // console.log("Área después: "+JSON.stringify(area));
        // console.log("Lados después: "+JSON.stringify(sides));
    }

    const handleResize = (style, isShiftKey, type) => {

        let elem = document.querySelector('#AnswerImage');
        let imageAnswer = elem.getBoundingClientRect();

        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style;

        top = Math.round(top);
        left = Math.round(left);
        width = Math.round(width);
        height = Math.round(height);

        setArea({
            // ...area,
            top,
            left,
            width,
            height
        });

        setSides({
            // ...sides,
            sideA: top, // top 
            sideB: area.left + area.width, // rigth
            sideC: area.top + area.height, // bottom
            sideD: left // left
        });

        if (sideA < 0) {
            //returns answer.top in 0 pixels
            setArea({ ...area, top: 0 });
        }

        if (sideB > imageAnswer.width && sideC > imageAnswer.height) {
            setTimeout(() => {
                setArea({ ...area, left: sideD, width: imageAnswer.width-sideD, top: sideA, height: imageAnswer.height-sideA });
                setSides({ ...sides, sideB: imageAnswer.width-left, sideC: imageAnswer.height-top });
                console.log("validando esquina 3");
            }, 2000);
        } else if (sideB > imageAnswer.width) {
            //returns answer.width with imageAnswer.width pixels
            setTimeout(() => {
                setArea({ ...area, left: sideD, width: imageAnswer.width-sideD });
                setSides({ ...sides, sideB: imageAnswer.width-left });
                console.log(2);
            }, 2000);
            // setArea({ ...area, width: imageAnswer.width, left: 0 });
            // setSides({ ...sides, sideB: imageAnswer.width });
        }else if (sideC > imageAnswer.height) {
            //returns answer.height with imageAnswer.height pixels
            setTimeout(() => {
                setArea({ ...area,  top: sideA, height: imageAnswer.height-sideA });
                setSides({ ...sides, sideC: imageAnswer.height-top });
                console.log(1);
            }, 2000);
            // setArea({ ...area, height: imageAnswer.height, top: 0 });
            // setSides({ ...sides, sideC: imageAnswer.height });
        }

        if (sideD < 0) {
            //returns answer.top in 0 pixels
            setArea({ ...area, left: 0 });//ok
        }
    }

    return (
        <>
            <ResizableReact
                left={left}
                top={top}
                width={width}
                height={height}
                rotateAngle={rotateAngle}
                aspectRatio={false}
                minWidth={50}
                minHeight={50}
                zoomable='n, w, s, e, nw, ne, se, sw'
                // onRotate={handleRotate}
                rotatable={false}
                // onRotateStart={this.handleRotateStart}
                // onRotateEnd={this.handleRotateEnd}
                // onResizeStart={this.handleResizeStart}
                onResize={handleResize}
                // onResizeEnd={this.handleUp}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
            />
        </>
    )
}
