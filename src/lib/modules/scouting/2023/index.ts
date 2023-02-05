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
    time:number;
    actionName: "place";
    type:Piece;
    region: "grid" | "floor";
    node?: { x:number, y:number };
}

type IntakeAction = {
    time:number;
    actionName: "intake";
    type:Piece;
    substation:boolean;
    method: "shelf" | "chute" | "floor" | "grid";
}
