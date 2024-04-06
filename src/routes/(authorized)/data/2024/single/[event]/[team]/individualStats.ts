export default {
    AverageScore(data:any[]){
        let count = 0;
        let score = 0;
        data.forEach(e=>{
            score += teamScore(e);
            count++;
        });
        return(score/count);
    },
    StartPosition(data:any[]){
        let positions:any[] = [];
        data.forEach(e=>{
            let attempt = 0;
            let center = 0;
            let wing = 0;
            let time = 0;
            let intaken = false;
            e.game.actions.forEach((a:any)=>{
                if(a.phase!="auto")return;
                if(a.action=="score")attempt++;
                if(a.action=="intake"){
                    if(a.location=="center"){
                        center++;
                        if(!intaken){
                            time += (153 - a.time);
                            intaken=true;
                        }
                    }
                    if(a.location=="trap"||a.location=="amp"||a.location=="speaker")wing++;
                }
            });
            positions.push({
                position:e.pregame.startPosition,
                alliance:e.alliance,
                match:e.match,
                style:'',
                auto:autoScore(e),
                attempt,
                center,
                wing,
                centerTime:time,
            });
        });
        return positions;
    },
    AutoScore(data:any[]){
        let count = 0;
        let score = 0;
        data.forEach(e=>{
            score += autoScore(e);
            count++;
        });
        return(score/count);
    },
    TeleScore(data:any[]){
        let count = 0;
        let score = 0;
        data.forEach(e=>{
            score += teamScore(e);
            score -= autoScore(e);
            count++;
        });
        return(score/count);
    },
    TotalAccuracy(data:any[]){
        let score = 0;
        let miss = 0;
        data.forEach(e=>{
            e.game.actions.forEach(a=>{
                if(a.action=="score")score++;
                if(a.action=="miss")miss++;
            });
        });
        return(score/(score+miss));
    },
    TeleAccuracy(data:any[]){
        let score = 0;
        let miss = 0;
        data.forEach(e=>{
            e.game.actions.forEach(a=>{
                if(a.phase!=="teleOp")return;
                if(a.action=="score")score++;
                if(a.action=="miss")miss++;
            });
        });
        return(score/(score+miss));
    },
    AutoAccuracy(data:any[]){
        let score = 0;
        let miss = 0;
        data.forEach(e=>{
            e.game.actions.forEach(a=>{
                if(a.phase!=="auto")return;
                if(a.action=="score")score++;
                if(a.action=="miss")miss++;
            });
        });
        return(score/(score+miss));
    },
    TotalShot(data:any[]){
        let matches = 0;
        let shots = 0;
        data.forEach(e=>{
            e.game.actions.forEach(a=>{
                if(a.action=="score"||a.action=="miss")shots++;
            });
            matches++;
        });
        return(shots/matches);
    },
    AutoShot(data:any[]){
        let matches = 0;
        let shots = 0;
        data.forEach(e=>{
            e.game.actions.forEach(a=>{
                if(a.phase!="auto")return;
                if(a.action=="score"||a.action=="miss")shots++;
            });
            matches++;
        });
        return(shots/matches);
    },
    TeleShot(data:any[]){
        let matches = 0;
        let shots = 0;
        data.forEach(e=>{
            e.game.actions.forEach(a=>{
                if(a.phase!="teleOp")return;
                if(a.action=="score"||a.action=="miss")shots++;
            });
            matches++;
        });
        return(shots/matches);
    },
    AmpScore(data:any[]){
        let score = 0;
        let match = 0;
        data.forEach(e=>{
            e.game.actions.forEach(a=>{
                if(a.action=="score"&&a.location=="amp")score++;
            });
            match++;
        });
        return(score/match)
    },
    SpeakerScore(data:any[]){
        let score = 0;
        let match = 0;
        data.forEach(e=>{
            e.game.actions.forEach(a=>{
                if(a.action=="score"&&a.location=="speaker")score++;
            });
            match++;
        });
        return(score/match)
    },
    AmpAccuracy(data:any[]){
        let score = 0;
        let miss = 0;
        data.forEach(e=>{
            e.game.actions.forEach(a=>{
                if(a.location!="amp")return;
                if(a.action=="score")score++;
                if(a.action=="miss")miss++;
            });
        });
        return(score/(score+miss));
    },
    SpeakerAccuracy(data:any[]){
        let score = 0;
        let miss = 0;
        data.forEach(e=>{
            e.game.actions.forEach(a=>{
                if(a.location!="speaker")return;
                if(a.action=="score")score++;
                if(a.action=="miss")miss++;
            });
        });
        return(score/(score+miss));
    },
    StdDevScore(data:any[]){
        let scores:any[] = [];
        data.forEach(e=>{
            scores.push(teamScore(e));
        });
        const returnVal = stdDev(scores);
        return(returnVal);
    },
    SourceCycleTime(data:any[]){
        let cycleTimes:any[] = [];
        data.forEach(e=>{
            let cycleStart = false;
            let time = 0;
            e.game.actions.forEach(a=>{
                if(a.action=="intake"&&a.phase=="teleOp"&&cycleStart==false&&a.location=="source"){
                    cycleStart=true;
                    time=a.time;
                }
                else if((a.action=="score"||a.action=="miss")&&a.phase=="teleOp"&&cycleStart==true){
                    cycleTimes.push((time - a.time));
                    cycleStart=false;
                }
                else if(a.action=="drop"&&a.phase=="teleOp"&&cycleStart==true){
                    cycleStart=false;
                }
            });
        });
        let cycles = 0;
        let times = 0;
        cycleTimes.forEach(e=>{
            cycles++;
            times+=e;
        });
        return(times/cycles);
    },
    CenterCycleTime(data:any[]){
        let cycleTimes:any[] = [];
        data.forEach(e=>{
            let cycleStart = false;
            let time = 0;
            e.game.actions.forEach(a=>{
                if(a.action=="intake"&&a.phase=="teleOp"&&cycleStart==false&&a.location=="center"){
                    cycleStart=true;
                    time=a.time;
                }
                else if((a.action=="score"||a.action=="miss")&&a.phase=="teleOp"&&cycleStart==true&&a.location=="speaker"){
                    cycleTimes.push((time - a.time));
                    cycleStart=false;
                }
                else if((a.action=="drop"||(a.action=="score"&&a.location!="speaker"))&&a.phase=="teleOp"&&cycleStart==true){
                    cycleStart=false;
                }
            });
        });
        let cycles = 0;
        let times = 0;
        cycleTimes.forEach(e=>{
            cycles++;
            times+=e;
        });
        return(times/cycles);
    },
    SourceDropCycle(data:any[]){
        let cycleTimes:any[] = [];
        data.forEach(e=>{
            if(!e.postgame.strategy.includes("transport"))return;
            let cycleStart = false;
            let time = 0;
            e.game.actions.forEach(a=>{
                if(a.action=="intake"&&a.phase=="teleOp"&&cycleStart==false&&a.location=="source"){
                    cycleStart=true;
                    time=a.time;
                }
                else if((a.action=="drop")&&a.phase=="teleOp"&&cycleStart==true&&(a.location=="speaker"||a.location=="amp"||a.location=="trap")){
                    cycleTimes.push((time - a.time));
                    cycleStart=false;
                }
                else if((a.action=="score"||a.action=="miss")&&a.phase=="teleOp"&&cycleStart==true){
                    cycleStart=false;
                }
            });
        });
        let cycles = 0;
        let times = 0;
        cycleTimes.forEach(e=>{
            cycles++;
            times+=e;
        });
        return(times/cycles);
    },
    Strategy(data:any[]){
        let stratIndex=0;
        let allStrat=[0, 0, 0, 0, 0, 0, 0];
        let result = "";
        data.forEach(e=>{
            e.postgame.strategy.forEach((a:any)=>{
                switch(a){
                    case "cycle": allStrat[0]++; break;
                    case "place": allStrat[1]++; break;
                    case "transport": allStrat[2]++; break;
                    case "defense": allStrat[3]++; break;
                    case "moral": allStrat[4]++; break;
                    case "breakdown": allStrat[5]++; break;
                    case "noShow": allStrat[6]++; break;
                }
            });
        });
        stratIndex=allStrat.indexOf(Math.max(...allStrat));
        if(stratIndex==0)result="full cycle";
        if(stratIndex==1)result="place";
        if(stratIndex==2)result="transport";
        if(stratIndex==3)result="defense";
        if(stratIndex==4)result="moral support";
        if(stratIndex==5)result="breakdown";
        if(stratIndex==6)result="no show";
        return result;
    },
    BreakdownRate(data:any[]){
        let matches = 0;
        let breakdown = 0;
        data.forEach(e=>{
            e.postgame.strategy.forEach(a=>{
                if(a == "breakdown")breakdown++;
            });
            matches++;
        });
        return(breakdown/matches)
    },
    TimeToCenter(data:any[]){
        let times = 0;
        let cycles = 0;
        data.forEach(e=>{
            let intaken = false; //intaken to measure only first time they intake from center
            e.game.actions.forEach(a=>{
                if(a.action=="intake"&&a.location=="center"&&a.phase=="auto"&&intaken==false){
                    times+=(153 - a.time); //adds together all times for average time
                    intaken=true;
                    cycles++;
                }
            });
        });
        return(times/cycles) //returns all times over amount of times
    }
}

function teamScore(e:any){ //input a match, output overall score
    let count = 0;
    e.game.actions.forEach((a:any)=>{
        if(a.phase=="auto") return;
        if(a.action === 'score') {
            switch(a.location){
                case "amp": count+= 1; break;
                case "trap": count+= 5; break;
                case "speaker": switch(a.amplified){
                    case true: count+= 5; break;
                    case false: count+= 2; break;
                } break;
            }
        }
    });
    count+=e.game.untimed.harmony;
    if(e.game.untimed.parkMatch){
        count+= 1;
    }
    if(e.game.untimed.hangMatch){
        switch(e.game.untimed.spotlight) {
            case true: count+= 4; break;
            case false: count+= 3; break;
        }
    }

    count += autoScore(e);
    
    return(count);
}
function autoScore(e:any){ //input a match, output auto score
    let count = 0;
    e.game.actions.forEach((a:any)=>{
        if(a.phase!=="auto") return;
        if(a.action === 'score') {
            switch(a.location){
                case "amp": count+= 2; break;
                case "speaker": count+= 5; break;
            }
        }
    });
    if(e.game.untimed.exitAuto){
        count+= 2;
    }

    return(count);
}
function stdDev(arr:any[]){
    let mean = arr.reduce((acc:any, curr:any)=>{
        return acc + curr;
    }, 0) / arr.length;

    arr = arr.map((k:any)=>{
        return(k-mean)**2;
    });
    
    let sum = arr.reduce((acc:any, curr:any)=> acc + curr, 0);

    let variance = (sum / arr.length);

    return Math.sqrt(sum/arr.length);
}