export default {
    Team_number(team:number, data:any[]){
        return team;
    },
    Average_score(team:number, data:any[]){
        let count = 0;
        let score = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            score += teamScore(e);
            count++;
        })
        return(score/count);
    },
    Max_score(team:number, data:any[]){
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
    Tele_speaker_score_rate(team:number, data:any[]){
        let speakerNum = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            if(e.time - e.game.start < 18000) return;
            e.game.actions.forEach((a:any)=>{
                if(a.action === 'score'){
                    if(a.type=="speaker") speakerNum++;
                    count++;
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
            if(e.time - e.game.start < 18000) return;
            e.game.actions.forEach((a:any)=>{
                if(a.action === 'score'){
                    if(a.type=="amp") ampNum++;
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
                if(a.action === 'score'){
                    if(a.type=="trap") trapNum++;
                    count++;
                }
            });
        });
        return(trapNum/count);
    },
    Auto_speaker_score_rate(team:number, data:any[]){
        let speakerNum = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            if(e.time - e.game.start > 18000) return;
            e.game.actions.forEach((a:any)=>{
                if(a.action === 'score'){
                    if(a.type=="speaker") speakerNum++;
                    count++;
                }
            });
        });
        return(speakerNum/count);
    },
    Auto_amp_score_rate(team:number, data:any[]){
        let ampNum = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            if(e.time - e.game.start > 18000) return;
            e.game.actions.forEach((a:any)=>{
                if(a.action === 'score'){
                    if(a.type=="amp") ampNum++;
                    count++;
                }
            });
        });
        return(ampNum/count);
    },
    Chain_park_rate(team:number, data:any[]){
        let park = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            e.game.untimed.forEach((a:any)=>{
                if(a.untimed.hangMatch) park++;
                count++;
            });
        });
        return(park/count);
    },
    Park_rate(team:number, data:any[]){
        let park = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            if(e.time - e.game.start > 18000) return;
            e.game.untimed.forEach((a:any)=>{
                if(a.untimed.parkMatch) park++;
                count++;
            });
        });
        return(park/count);
    },
    Average_stage_points_scored(team:number, data:any[]){
        let score = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            e.game.actions.forEach((a:any)=>{
                if(a.action === 'score'){
                    if(a.type=="trap") score+= 5;
                };
            });
            e.game.untimed.forEach((a:any)=>{
                if(a.untimed.harmony) score+= 2;
                if(a.untimed.parkMatch) score+= 1;
                if(a.untimed.hangMatch) switch(a.untimed.spotlight){
                    case true: score+= 4; break;
                    case false: score+= 4; break;
                };
            });
            count++;
        });
        return(score/count);
    },
    // Average_wing_cycle_time(team:number, data:any[]){
    //     let cycleStart = 0;
    //     let cycleStop = 0;
    //     let count = 0;
    //     let cycleTime = 0;
    //     data.forEach(e=>{
    //         if(e.team != team) return;
    //         e.game.actions.forEach((a:any)=>{
    //             if(a.action === 'intake' && 'wing'){
    //                 cycleStart = a.time;
    //                 if(a.action === 'drop'||'place'){ 
    //                     switch(a.action){
    //                         case 'place': cycleStop = a.time; count++; break;
    //                         case 'drop': cycleStart = 0; break;
    //                     }
    //                 }
    //                 else{
    //                     cycleStart = 0;
    //                 }
    //             cycleTime+= cycleStart - cycleStop;
    //         }});
    //     });
    //     return(cycleTime/count);
    // },
    Average_center_cycle_time(team:number, data:any[]){
        let cycleStart = 0;
        let cycleStop = 0;
        let count = 0;
        let cycleTime = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            e.game.actions.forEach((a:any)=>{
                if(a.action === 'intake' && 'center'){
                    cycleStart = a.time;
                    if(a.action === 'drop'||'score'){ 
                        switch(a.action){
                            case 'score': cycleStop = a.time; count++; break;
                            case 'drop': cycleStart = 0; break;
                        }
                    }
                    else{
                        cycleStart = 0;
                    }
                cycleTime+= cycleStart - cycleStop;
            }});
        });
        return(cycleTime/count);
    },
    Average_source_cycle_time(team:number, data:any[]){
        let cycleStart = 0;
        let cycleStop = 0;
        let count = 0;
        let cycleTime = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            e.game.actions.forEach((a:any)=>{
                if(a.action === 'intake' && 'source'){
                    cycleStart = a.time;
                    if(a.action === 'drop'||'score'){ 
                        switch(a.action){
                            case 'score': cycleStop = a.time; count++; break;
                            case 'drop': cycleStart = 0; break;
                        }
                    }
                    else{
                        cycleStart = 0;
                    }
                cycleTime+= cycleStart - cycleStop;
            }});
        });
        return(cycleTime/count);
    },
    Driver_skill(team:number, data:any[]){
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
    Standard_Score_Deviation(team:number, data:any[]){
        let scores:any[]=[];
        data.forEach(e=>{
            if(e.team != team) return;
            let score = teamScore(e);
            scores.push(score);
        });

        return stdDev(scores);
    },
    Matches_Scouted(team:number, data:any[]){
        let scouted=0;
        data.forEach(e=>{
            if(e.team!=team) return;
            scouted++;
        });
        return scouted;
    },
    // Mobility_rate(team:number, data:any[]){
    //     let count = 0;
    //     let mobileCount = 0;
    //     data.forEach(e=>{
    //         if(e.team != team) return;
    //         if(e.game.untimed.mobile) mobileCount++;
    //         count++;
    //     });
    //     return(mobileCount/count);
    // },
    // Dock_auto_rate(team:number, data:any[]){
    //     let count = 0;
    //     let mobileCount = 0;
    //     data.forEach(e=>{
    //         if(e.team != team) return;
    //         if(e.game.untimed.dockedAuto) mobileCount++;
    //         count++; 
    //     });
    //     return(mobileCount/count);
    // },
    // Alliance_engaged_auto_rate(team:number, data:any[]){
    //     let matches:any[] = [];
    //     let cache:any[] = [];
    //     let count = 0;
    //     data.forEach(e=>{    //data = all scouting data
    //         if(e.team != team) return;
    //         let event = e.event;
    //         let match = e.match;
    //         let alliance = e.alliance;
    //         matches.push({event, match, alliance}); //matches = event, match, and alliance of team in ever
    //     });
    //     data.forEach(e=>{ //iterate through scouting data (e)
    //         matches.forEach(a=>{ //iterate through possible matches (a)
    //             if(a.event==e.event && a.match==e.match && a.alliance == e.alliance){
    //                 let event = a.event;
    //                 let match = a.match;
    //                 let alliance = a.alliance;
    //                 let found = cache.includes(element);
    //                 if(found != undefined && e.game.untimed.engageAuto){ 
    //                     count++;
    //                     cache.push({event, match, alliance});
    //                 }
    //             }
    //         });
    //     });

    //     return(count/(matches.length));

    // },
    // Alliance_dock_auto_rate(team:number, data:any[]){
    //     let matches:any[] = [];
    //     let cache:any[] = [];
    //     let count = 0;
    //     data.forEach(e=>{    //data = all scouting data
    //         if(e.team != team) return;
    //         let event = e.event;
    //         let match = e.match;
    //         let alliance = e.alliance;
    //         matches.push({event, match, alliance}); //matches = event, match, and alliance of team in ever
    //     });
    //     data.forEach(e=>{ //iterate through scouting data (e)
    //         matches.forEach(a=>{ //iterate through possible matches (a)
    //             if(a.event==e.event && a.match==e.match && a.alliance == e.alliance){
    //                 let event = a.event;
    //                 let match = a.match;
    //                 let alliance = a.alliance;
    //                 let found = cache.includes(element);
    //                 if(found != undefined && e.game.untimed.dockedAuto){ 
    //                     count++;
    //                     cache.push({event, match, alliance});
    //                 }
    //             }
    //         });
    //     });

    //     return(count/(matches.length));
    // },
    // Dock_match_rate(team:number, data:any[]){
    //     let count = 0;
    //     let mobileCount = 0;
    //     data.forEach(e=>{
    //         if(e.team != team) return;
    //         if(e.game.untimed.dockedMatch) mobileCount++;
    //         count++;
    //     });
    //     return(mobileCount/count);
    // },
    // Engaged_auto_rate(team:number, data:any[]){
    //     let count = 0;
    //     let mobileCount = 0;
    //     data.forEach(e=>{
    //         if(e.team != team) return;
    //         if(e.game.untimed.engageAuto) mobileCount++;
    //         count++;
    //     });
    //     return(mobileCount/count);
    // },
    // Engaged_match_rate(team:number, data:any[]){
    //     let count = 0;
    //     let mobileCount = 0;
    //     data.forEach(e=>{
    //         if(e.team != team) return;
    //         if(e.game.untimed.engageMatch) mobileCount++;
    //         count++;
    //     });
    //     return(mobileCount/count);
    // },
    // Average_pieces_scored(team:number, data:any[]){
    //     let matches = 0;
    //     let count = 0;
    //     data.forEach(e=>{
    //         if(e.team != team) return;
    //         matches++;
    //         e.game.actions.forEach((a:any)=>{
    //             if(a.action === 'place')
    //                 count++;
    //             if(a.action === 'intake' && typeof a.location == "object")
    //                 count--;
    //         })
    //     })
    //     return count / matches;
    // },
    // Cube_score_rate(team:number, data:any[]){
    //     let cubeNum = 0;
    //     let count = 0;
    //     data.forEach(e=>{
    //         if(e.team != team) return;
    //         e.game.actions.forEach((a:any)=>{
    //             if(a.action === 'place'){
    //                 if(a.type=="cube") cubeNum++;
    //                 count++;
    //             }
    //         });
    //     });
    //     return(cubeNum/count);
    // },
    // Average_dead_time(team:number, data:any[]){
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
    // Average_element_placement(team:number, data:any[]){
    //     let resultIndex=0;
    //     let count=0;
    //     let array=[0, 0, 0]
    //     let result="";
    //     data.forEach(e=>{
    //         if(e.team!=team) return;
    //         e.game.actions.forEach((a:any)=>{
    //             if(a.action=="place"){
    //                 switch(a.node.y){
    //                     case 0: array[0]+=1; break;
    //                     case 1: array[1]+=1; break;
    //                     case 2: array[2]+=1; break;
    //                 }
    //                 count++;
    //             }
    //         });
    //     });
    //     resultIndex=array.indexOf(Math.max(...array));
    //     switch(resultIndex){
    //         case 0: result="high"; break;
    //         case 1: result="mid"; break;
    //         case 2: result="low"; break;
    //     }
    //     return(result);
    // },
    // Loading_zone_intake_rate(team:number, data:any[]){
    //     let loadZone = 0;
    //     let total = 0;
    //     data.forEach(e=>{
    //         if(e.team!=team) return;
    //         e.game.actions.forEach((a:any)=>{
    //             if(a.action=="intake"){
    //                 if(a.location=="zone") loadZone++;
    //                 total++;
    //             }
    //         });
    //     });
    //     return(loadZone/total);
    // },
}
export function teamScore(e:any){
    let count = 0;
    e.game.actions.forEach((a:any)=>{
        if(a.phase==="auto")return;
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

    count + autoScore(e);
    
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
// function links(e:any){
//     let grid = gridLayout(e);
//     let links = 0;
//     grid.forEach(row=>{
//         let consecutive = 0;
//         row.forEach(node=>{
//             if(node){
//                 consecutive++;
//                 if(consecutive == 3){
//                     links++;
//                     consecutive = 0;
//                 }
//             }
//         })
//     })

//     return links;
// }

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