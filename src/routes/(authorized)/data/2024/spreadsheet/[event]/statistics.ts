export default {
    TeamNumber(team:number, data:any[]){
        return team;
    },
    AverageScore(team:number, data:any[]){
        let count = 0;
        let score = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            score += teamScore(e);
            count++;
        })
        return(score/count);
    },
    MaxScore(team:number, data:any[]){
        let max = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            let score = teamScore(e);
            if(score > max){
                max = score;
            }
        });
        return(max);
    },
    AutoMobilityRate(team:number, data:any[]){
        let count = 0;
        let mobileCount = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            if(e.game.untimed.exitAuto) mobileCount++;
            count++;
        });
        return(mobileCount/count);
    },

    Driver_Skill(team:number, data:any[]){
        let count = 0;
        let total = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            if(e.postgame?.driverSkill){
                count++;
                total += e.postgame.driverSkill;
            }
        });
        return(total/count);
    },
    Average_Pieces_Scored(team:number, data:any[]){
        let matches = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            matches++;
            e.game.actions.forEach((a:any)=>{
                if(a.action === 'score'){
                    count++;
                }
            })
        })
        return count / matches;
    },
    // AverageCycleTime(team:number, data:any[]){
    //     let cycleTimes:any[]=[];
    //     let result=0;
    //     data.forEach(e=>{
    //         let cycleEngaged=false;
    //         if(e.team!=team)return;
    //         let startTime=0;
    //         let endTime=0;
    //         let cycles=0;
    //         e.game.actions.forEach((a:any)=>{
    //             if(a.action=="intake"&&a.time>0&&cycleEngaged==false){
    //                 cycleEngaged=true;
    //                 startTime=a.time;
    //             }

    //             if(a.action=="place"&&cycleEngaged){
    //                 cycleEngaged=false;
    //                 endTime=a.time;
    //                 cycleTimes.push(endTime-startTime);
    //                 cycles++;
    //             }
    //         });
    //         if(cycles==0) cycleTimes.push(153000);
    //     });
        
        
    //     cycleTimes.forEach(e=>{
    //         result+=e;
    //     });

    //     return(result/(cycleTimes.length*1000));
    // },
    // AverageDeadTime(team:number, data:any[]){
    //     let cycleTimes:any[]=[];
    //     let result=0;
    //     data.forEach(e=>{
    //         let cycleEngaged=false;
    //         if(e.team!=team)return;
    //         let startTime=0;
    //         let endTime=0;
    //         let cycles=0;
    //         e.game.actions.forEach((a:any)=>{
    //             if(a.action=="place"&&a.time>0&&cycleEngaged==false){
    //                 cycleEngaged=true;
    //                 startTime=a.time;
    //             }

    //             if(a.action=="intake"&&cycleEngaged){
    //                 cycleEngaged=false;
    //                 endTime=a.time;
    //                 cycleTimes.push(endTime-startTime);
    //                 cycles++;
    //             }
    //         });
    //         if(cycles==0) cycleTimes.push(153000);
    //     });
        
        
    //     cycleTimes.forEach(e=>{
    //         result+=e;
    //     });

    //     return(result/(cycleTimes.length*1000));
    // },
    Average_auto_points_scored(team:number, data:any[]){
        let count = 0;
        let score = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            score += autoScore(e);
            count++;
        });
        return(score/count);
    },
    Average_tele_points_scored(team:number, data:any[]){
        let count = 0;
        let score = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            score += (teamScore(e) - autoScore(e));
            count++;
        });
        return(score/count);
    },
    Average_stage_points_scored(team:number, data:any[]){
        let score = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            e.game.actions.forEach((a:any)=>{
                if(a.action === 'score'){
                    if(a.location=="trap") score+=5;
                };
            });
            if(e.game.untimed.harmony) score+= e.game.untimed.harmony;
            if(e.game.untimed.parkMatch) score+= 1;
            if(e.game.untimed.hangMatch) switch(e.game.untimed.spotlight){
                case true: score+= 4; break;
                case false: score+= 3; break;
            };
            count++;
        });
        return(score/count);
    },
    Speaker_Score(team:number, data:any[]){
        let score = 0;
        let match = 0;
        data.forEach(e=>{
            if(e.team!=team)return;
            e.game.actions.forEach(a=>{
                if(a.action=="score"&&a.location=="speaker"&&a.phase=="teleOp")score++;
            });
            match++;
        });
        return(score/match)
    },
    Amp_Score(team:number, data:any[]){
        let score = 0;
        let match = 0;
        data.forEach(e=>{
            if(e.team!=team)return;
            e.game.actions.forEach(a=>{
                if(a.action=="score"&&a.location=="amp"&&a.phase=="teleOp")score++;
            });
            match++;
        });
        return(score/match)
    },
    Tele_speaker_score_rate(team:number, data:any[]){
        let speakerNum = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            e.game.actions.forEach((a:any)=>{
                if(a.phase=="teleOp"){
                    if(a.action === 'score'){
                        if(a.location=="speaker") speakerNum++;
                        count++;
                    }
                }
            });
        });
        return(speakerNum/count);
    },
    Tele_amp_score_rate(team:number, data:any[]){
        let ampNum = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            e.game.actions.forEach((a:any)=>{
                if(a.phase!=="teleOp")return;
                if(a.action === 'score'){
                    if(a.location=="amp") ampNum++;
                    count++;
                }
            });
        });
        return(ampNum/count);
    },
    Tele_trap_score_rate(team:number, data:any[]){
        let trapNum = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            e.game.actions.forEach((a:any)=>{
                if(a.phase!=="teleOp")return;
                if(a.action === 'score'){
                    if(a.location=="trap") trapNum++;
                    count++;
                }
            });
        });
        return(trapNum/count);
    },
    Tele_Speaker_Avg_Score(team:number, data:any[]){
        let trapNum = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            e.game.actions.forEach((a:any)=>{
                if(a.phase!=="teleOp")return;
                if(a.action === 'score'){
                    if(a.location=="speaker"){
                        trapNum+=2;
                        // switch(a.amplified){
                        //     case true:trapNum+=5;
                        //     case false:trapNum+=2;
                        // }
                    }
                }
            });
            count++;
        });
        return(trapNum/count);
    },
    Tele_Amp_Avg_Score(team:number, data:any[]){
        let ampNum = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            e.game.actions.forEach((a:any)=>{
                if(a.phase!=="teleOp")return;
                if(a.action === 'score'){
                    if(a.location=="amp") ampNum+=1;
                }
            });
            count++;
        });
        return(ampNum/count);
    },
    // Auto_speaker_score_rate(team:number, data:any[]){
    //     let speakerNum = 0;
    //     let count = 0;
    //     data.forEach(e=>{
    //         if(e.team != team) return;
    //         e.game.actions.forEach((a:any)=>{
    //             if(a.phase!=="auto")return;
    //             if(a.action === 'score'){
    //                 if(a.location=="speaker") speakerNum++;
    //                 count++;
    //             }
    //         });
    //     });
    //     let final:any = speakerNum/count;
    //     if(!final)final="no score";
    //     return(final);
    // },
    // Auto_amp_score_rate(team:number, data:any[]){
    //     let ampNum = 0;
    //     let count = 0;
    //     data.forEach(e=>{
    //         if(e.team != team) return;
    //         e.game.actions.forEach((a:any)=>{
    //             if(a.phase!=="auto")return;
    //             if(a.action === 'score'){
    //                 if(a.location=="amp") ampNum++;
    //                 count++;
    //             }
    //         });
    //     });
    //     let final:any = ampNum/count;
    //     if(!final)final="no score";
    //     return(final);
    // },
    SourceIntakeRate(team:number, data:any[]){
        let loadZone = 0;
        let total = 0;
        data.forEach(e=>{
            if(e.team!=team) return;
            e.game.actions.forEach((a:any)=>{
                if(a.action=="intake"){
                    if(a.location=="source") loadZone++;
                    total++;
                }
            });
        });
        return(loadZone/total);
    },
    StandardScoreDeviation(team:number, data:any[]){
        let scores:any[]=[];
        data.forEach(e=>{
            if(e.team != team) return;
            let score = teamScore(e);
            scores.push(score);
        });

        return stdDev(scores);
    },
    Strategy(team:number, data:any[]){
        let stratIndex=0;
        let allStrat=[0, 0, 0, 0, 0, 0, 0];
        let result = "";
        data.forEach(e=>{
            if(e.team!=team) return;
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
    MatchesScouted(team:number, data:any[]){
        let scouted=0;
        data.forEach(e=>{
            if(e.team!=team) return;
            scouted++;
        });
        return scouted;
    },
}
function teamScore(e:any){
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

function autoScore(e:any){
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
// export function gridLayout(e:any){
//     let out = [Array(9),Array(9),Array(9),Array(9)]
//     e.game.actions.forEach((a:any)=>{
//         if(a.action === "place"){
//             if(out[a.node.y] && !out[a.node.y][a.node.x]) out[a.node.y][a.node.x] = {
//                 auto: (a.time - e.game.start <= 18000),
//                 type:a.type,
//                 supercharged:"none",
//             };
//             else if(out[a.node.y] && out[a.node.y][a.node.x] && out[a.node.y][a.node.x]) out[a.node.y][a.node.x].supercharged = a.type;
//         }
//         if(a.action === "intake" && typeof a.location == "object" && out[a.location.y][a.location.x]?.supercharged=="none"){ //if taken from grid and not supercharged
//             out[a.location.y][a.location.x]=undefined;
//         }
//         if(a.action === "intake" && typeof a.location == "object" && out[a.location.y][a.location.x]?.supercharged!="none" && out[a.location.y][a.location.x]){ //if taken from grid and supercharged
//             out[a.location.y][a.location.x].supercharged="none";
//         }
//     });

//     return out;
// }

// function findMode(array:any[]){
//     let object:any = {};
//     for(let i=0; i<array.length; i++){
//         if(object[array[i]]){
//             object[array[i]] += 1;
//         } else {
//             object[array[i]] = 1;
//         }
//     }
//     let biggestValue = -1;
//     let biggestValuesKey = -1;

//     Object.keys(object).forEach((key:any)=>{
//         let value = object[key];
//         if(value > biggestValue) {
//             biggestValue = value;
//             biggestValuesKey = key;
//         }

//     });
//     return biggestValuesKey;
// }

function stdDev(arr:any){
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