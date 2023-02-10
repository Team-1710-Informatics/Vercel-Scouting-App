import Entry from "../Entry";

/**
 * Scouting Entry for 2023's game,
 * CHARGED UP
 */

export default class extends Entry{
    pregame?:Pre;
    game?:During;
    postgame?:Post;

    constructor(matchKey:string, team:number, alliance:"red"|"blue", scout:string){
        super(matchKey, team, alliance, scout);
    }
}

//Main types
type Pre = {
    coordinates:{ x:number, y:number },
    preload:Piece|null
}

type During = {
    /**
     * Unix timestamp of the time the scout presses the 'start match' button.
     * Used to retroactively account for human error.
     */
    startTime:number;
    actions:(PlaceAction|IntakeAction)[];
    untimed:any;
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
