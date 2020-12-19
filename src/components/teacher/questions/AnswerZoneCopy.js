import React, { useState } from 'react';
import ResizableReact from 'react-resizable-rotatable-draggable';

export const AnswerZoneCopy = () => {

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

        // setArea({
        //     ...area,
        //     top: top + deltaY,
        //     left: left + deltaX
        // });

        setSides({
            ...sides,
            sideA: area.top,
            sideB: area.width + area.left,
            sideC: area.height + area.top,
            sideD: area.left
        });

        ////////////empieza esquina 1
        //esquina 1
        if (sideA >= 0 && sideD >= 0) {
            setArea({
                ...area,
                top: top + deltaY,
                left: left + deltaX
            });//ok
        }

        //para cuando ladoD sea menor a 0 en esquina 1
        if (sideD < 0) {
            setArea({ ...area, left: 0 });//ok
        }

        //para cuando sea ladoA menor a 0 en esquina 1
        if (sideA < 0) {
            setArea({ ...area, top: 0 });//ok
        }
        ////////////termina esquina 1

        ////////////empieza esquina 2
        //esquina 2
        // if (sideA >= 0 && sideB <= imageAnswer.width) {
        //     setArea({
        //         ...area,
        //         top: top + deltaY,
        //         left: left + deltaX
        //     });//ok
        //     console.log("validando esquina 2");
        // }

        // //para cuando sea ladoA menor a 0 en esquina 1
        // if (sideA < 0) {
        //     setArea({ ...area, top: 0 });//ok
        //     console.log("SideA menor a 0");
        // }

        //para cuando ladoB sea mayor al width de la imagen
        if (sideB > imageAnswer.width) {
            setArea({ ...area, left: imageAnswer.width - width });//ok
            console.log("SideB mayor al imageAnswer.width");
        }
        ////////////termina esquina 2

        ////////////empieza esquina 3
        //esquina 3
        // if (sideC <= imageAnswer.height && sideB <= imageAnswer.width) {
        //     setArea({
        //         ...area,
        //         top: top + deltaY,
        //         left: left + deltaX
        //     });//ok
        //     console.log("validando esquina 3");
        // }

        // if (sideB > imageAnswer.width) {
        //     setArea({ ...area, left: imageAnswer.width-width});
        //     console.log("SideB mayor al imageAnswer.width");
        // }

        if (sideC > imageAnswer.height) {
            setArea({ ...area, top: imageAnswer.height - area.height });//ok
            console.log("SideC mayor al imageAnswer.height");
        }
        ////////////termina esquina 3

        ////////////empieza esquina 4
        //esquina 4
        // if (sideD >= 0) {
        //     setArea({
        //         ...area,
        //         top: top + deltaY,
        //         left: left + deltaX
        //     });//ok
        //     console.log("Validando esquina 4");
        // }

        // if (sideC > imageAnswer.height) {
        //     setArea({ ...area, top: imageAnswer.height - area.height });//ok
        //     console.log("SideC mayor al imageAnswer.height");
        // }

        if (sideD < 0) {
            setArea({ ...area, left: 0 });//ok
            console.log("SideD menor a 0");
        }
        ////////////termina esquina 4

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
            ...area,
            top,
            left,
            width,
            height
        });

        setSides({
            ...sides,
            sideA: top,
            sideB: area.left + area.width,
            sideC: area.top + area.height,
            sideD: left
        });

        if (sideA < 0) {
            //returns answer.top in 0 pixels
            setArea({ ...area, top: 0 });
        }

        if (sideB > imageAnswer.width) {
            //returns answer.width with imageAnswer.width pixels
            setArea({ ...area, width: imageAnswer.width - area.left });
            setSides({...sides, sideB:(imageAnswer.width-area.left)});
        }

        if (sideC > imageAnswer.height) {
            //returns answer.height with imageAnswer.height pixels
            setArea({ ...area, height: imageAnswer.height - area.top });
        }

        if (sideD < 0) {
            //returns answer.top in 0 pixels
            setArea({ ...area, left: 0 });
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