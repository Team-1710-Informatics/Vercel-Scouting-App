import GeneralEntry from "../Entry";

/**
 * Scouting Entry for 2023's game,
 * CHARGED UP
 */

export default class Entry extends GeneralEntry{
    pregame:Pre;
    game:During;
    postgame:Post;
}

//Main types
type Pre = {
    startPosition:{ x:number, y:number },
    preload:Piece|null
}

type During = {
    /**
     * Unix timestamp of the time the scout presses the 'start match' button.
     * Used to retroactively account for human error.
     */
    startTime:number;
    actions:(PlaceAction|IntakeAction)[];
}

type Post = {
    strategy:"FULL_CYCLE"|"TRANSPORT"|"PLACEMENT"|"DEFENSE"|"TOAST_BREAD";
    rating:number;
    thoughts:string;
}

//Secondary types
type Piece = "cone" | "cube";

type PlaceAction = {
    action: "place"
    time:number;
    type:Piece;
    node: { x:number, y:number };
}

type DropAction = {
    action: "drop"
    time:number;
    type:Piece;
}

type IntakeAction = {
    action:"intake"
    time:number;
    type:Piece;
    location:"zone"|"midfield"|{x:number,y:number};
}
