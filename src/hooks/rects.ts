import {ClientRect} from "@dnd-kit/core";
import {Windows} from "../models";

const areRectanglesOverlapping = (rect1: ClientRect, rect2: ClientRect) => {
    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

export const findCoveredWindows = (rectanglesObj: {[key: string]: ClientRect}, windows: Windows[]): Windows[] => {
    if (windows.length < 2) return [];
    const overlappingKeys: Set<Windows> = new Set();

    for (let i = 0; i < windows.length; i++) {
        const key1 = windows[i];
        const rect1 = rectanglesObj[key1];

        for (let j = i + 1; j < windows.length; j++) {
            const key2 = windows[j];
            const rect2 = rectanglesObj[key2];

            // Only check for overlaps with elements in front, ignoring ones behind
            if (areRectanglesOverlapping(rect1, rect2)) {
                // Since windows is ordered back to front,
                // key1 is the key of the rectangle in the back
                overlappingKeys.add(key1);
                // Do not check for key2 since it's in front of key1
                break; // We found the overlap we care about, no need to check more
            }
        }
    }

    return Array.from(overlappingKeys);
}
