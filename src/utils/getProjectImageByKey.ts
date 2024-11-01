import { StaticImageData } from "next/image";
import deucesSolitaire from "../../public/images/deuces_solitaire.png";
import kabaSuji from "../../public/images/kaba_suji.gif";
import venetianBellTower from "../../public/images/venetian_bell_tower.png";
import globalTodo from "../../public/images/global_todo.png";
import veniceBells from "../../public/images/venice_bells.png";
import iosCalculator from "../../public/images/ios_calculator.jpeg";
import scifiSpaceOctopi from "../../public/images/sci-fi_spaceoctopi.png";
import javaCalculator from "../../public/images/java_calculator.png";
import tapTapWars from "../../public/images/taptap_wars.jpeg";
import distanceVector from "../../public/images/distance_vector.png";
import diceRoller from "../../public/images/dice_roller.png";
import personalWebsite from "../../public/images/personal_website.png";
import cinderRedesign from "../../public/images/cinder_redesign.png";

const projectImages: { [key: string]: StaticImageData } = {
    deucesSolitaire,
    kabaSuji,
    venetianBellTower,
    globalTodo,
    veniceBells,
    iosCalculator,
    scifiSpaceOctopi,
    javaCalculator,
    tapTapWars,
    distanceVector,
    diceRoller,
    personalWebsite,
    cinderRedesign,
};

export const getProjectImageByKey = (key: string) => {
    return projectImages[key];
};
