import React, { useState } from 'react';
import ResizableReact from 'react-resizable-rotatable-draggable';
import { showAlertWindow } from '../../../helpers/resizeAnswerZone';

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
            });
        }

        //when SideA is < than 0 on the top
        if (sideA < 0) {
            setArea({ ...area, top: 0 });//ok
        }

        //when SideB is > than image's width
        if (sideB > imageAnswer.width) {
            setArea({ ...area, left: imageAnswer.width - width });
        }

        //when SideC is > than image's height
        if (sideC > imageAnswer.height) {
            setArea({ ...area, top: imageAnswer.height - area.height });//ok
        }

        //when SideD is < than image's left
        if (sideD < 0) {
            setArea({ ...area, left: 0 });//ok
        }

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
            showAlertWindow();
            setTimeout(() => {
                setArea({ ...area, left: sideD, width: imageAnswer.width - sideD, top: sideA, height: imageAnswer.height - sideA });
                setSides({ ...sides, sideB: imageAnswer.width - left, sideC: imageAnswer.height - top });
            }, 2000);
            setArea({ ...area, left: sideD, width: imageAnswer.width - sideD, top: sideA, height: imageAnswer.height - sideA });
            setSides({ ...sides, sideB: imageAnswer.width - left, sideC: imageAnswer.height - top });
        } else if (sideB > imageAnswer.width || imageAnswer.width - sideB <= 10) {
            //returns answer.width with imageAnswer.width pixels
            showAlertWindow();
            setArea({ ...area, left: sideD, width: imageAnswer.width - sideD });
            setSides({ ...sides, sideB: imageAnswer.width - left });
            setTimeout(() => {
                if (sideB > imageAnswer.width) {
                    setArea({ ...area, left: sideD, width: imageAnswer.width - sideD });
                    setSides({ ...sides, sideB: imageAnswer.width - left });
                }
            }, 2000);
            setArea({ ...area, left: sideD, width: imageAnswer.width - sideD });
            setSides({ ...sides, sideB: imageAnswer.width - left });
        } else if (sideC > imageAnswer.height || imageAnswer.height - sideC <= 10 ) {
            //returns answer.height with imageAnswer.height pixels
            showAlertWindow();
            setTimeout(() => {
                setArea({ ...area, top: sideA, height: imageAnswer.height - sideA });
                setSides({ ...sides, sideC: imageAnswer.height - top });
            }, 2000);
            setArea({ ...area, top: sideA, height: imageAnswer.height - sideA });
            setSides({ ...sides, sideC: imageAnswer.height - top });
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
                rotatable={false}
                onResize={handleResize}
                onDrag={handleDrag}
            />
        </>
    )
}
