import {ClientRect} from "@dnd-kit/core";

const areRectanglesOverlapping = (rect1: ClientRect, rect2: ClientRect) => {
    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

export const findOverlappingKeys = (rectanglesObj: {[key: string]: ClientRect}) => {
    const keys = Object.keys(rectanglesObj);
    const overlappingKeys: string[] = [];

    for (let i = 0; i < keys.length; i++) {
        for (let j = i + 1; j < keys.length; j++) {
            const key1 = keys[i];
            const key2 = keys[j];
            const rect1 = rectanglesObj[key1];
            const rect2 = rectanglesObj[key2];

            if (areRectanglesOverlapping(rect1, rect2)) {
                if (!overlappingKeys.includes(key1)) {
                    overlappingKeys.push(key1);
                }
                if (!overlappingKeys.includes(key2)) {
                    overlappingKeys.push(key2);
                }
            }
        }
    }
    return overlappingKeys;
}
