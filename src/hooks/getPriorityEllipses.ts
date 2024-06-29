import { blueEllipses, greenEllipses, redEllipses } from "../assets";

const getPriorityEllipses = (priority: string) => {
    switch (priority) {
        case "HIGH":
            return blueEllipses;
        case "LOW":
            return greenEllipses;
        case "MODERATE":
            return redEllipses

    }}

    export default getPriorityEllipses;