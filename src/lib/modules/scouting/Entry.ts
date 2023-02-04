/**
 * Abstract class representation of a scouting entry
 * for theoretically any FRC game
 */

const matchKeyRegExp = /([0-9]{4})([\w\d][^_]+)_([A-z]+\d?)m(\d+)/;
const scoutKeyRegExp = /([0-9]{4})([\w\d][^_]+)_([A-z]+\d?)m(\d+)_(r|b)(\d+)/;

export default abstract class Entry {
    private _scoutKey:string;
    get scoutKey():string { return this._scoutKey} 
    set scoutKey(s:string){
        let res = scoutKeyRegExp.exec(s);
        if(!res) throw new Error(`${s} is not a valid scout key!`);
        this._scoutKey = s;
    }
    private get a() { return scoutKeyRegExp.exec(this._scoutKey) }

    // Match info
    get matchKey():string | null { return this.a?`${this.a[1]+this.a[2]}_${this.a[3]}m${this.a[4]}`:null }
    get year():number | null { return this.a?+this.a[1]:null }
    get event():string | null { return this.a?this.year + this.a[2]:null }
    get matchlevel():string | null { return this.a?this.a[3]:null }
    get matchNumber():number | null { return this.a?+this.a[4]:null }

    // Robot info
    get team():number|null { return this.a?+this.a[6]:null }
    get alliance():"red"|"blue"|null {
        if(!this.a) return null;
        return this.a[5] == 'r' ? 'red' : 'blue';
    }

    // Scout info
    scout:string;

    // Data
    abstract pregame:any;
    abstract game:any;
    abstract postgame:any;

    constructor(matchKey:string, team:number, alliance:"red"|"blue", scout:string){
        this.scoutKey = `${matchKey}_${alliance.charAt(0)}${team}`;
        this.scout = scout;
    }
}