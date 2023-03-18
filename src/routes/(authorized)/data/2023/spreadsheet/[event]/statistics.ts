import { element } from "svelte/internal";

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
    Mobility_rate(team:number, data:any[]){
        let count = 0;
        let mobileCount = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            if(e.game.untimed.mobile) mobileCount++;
            count++;
        });
        return(mobileCount/count);
    },
    Dock_auto_rate(team:number, data:any[]){
        let count = 0;
        let mobileCount = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            if(e.game.untimed.dockedAuto) mobileCount++;
            count++;
        });
        return(mobileCount/count);
    },
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
    Dock_match_rate(team:number, data:any[]){
        let count = 0;
        let mobileCount = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            if(e.game.untimed.dockedMatch) mobileCount++;
            count++;
        });
        return(mobileCount/count);
    },
    Engaged_auto_rate(team:number, data:any[]){
        let count = 0;
        let mobileCount = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            if(e.game.untimed.engageAuto) mobileCount++;

            count++;
        });
        return(mobileCount/count);
    },
    Engaged_match_rate(team:number, data:any[]){
        let count = 0;
        let mobileCount = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            if(e.game.untimed.engageMatch) mobileCount++;
            count++;
        });
        return(mobileCount/count);
    },
    Cube_score_rate(team:number, data:any[]){
        let cubeNum = 0;
        let count = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            e.game.actions.forEach((a:any)=>{
                if(a.action === 'place'){
                    if(a.type=="cube") cubeNum++;
                    count++;
                }
            });
        });
        return(cubeNum/count);
    },
    // Avg_cycle_time(team:number, data:any[]){
    //     let cycleEngaged=false;
    //     let cycleTimes:any[]=[];
    //     let result=0;
    //     data.forEach(e=>{
    //         if(e.team!=team)return;
    //         e.game.actions.forEach((a:any)=>{
    //             let startTime;
    //             let endTime;
    //             if(a.action=="intake"&&a.time>0){
    //                 cycleEngaged=true;
    //                 startTime=a.time;
    //             }
    //             if(a.action=="place"){
    //                 cycleEngaged=false;
    //                 endTime=a.time;
    //                 cycleTimes.push(endTime-startTime);
    //             }

    //         });

    //     });
    //     cycleTimes.forEach(e=>{
    //         result+=e;
    //     });
    //     return result;

    // },
    // Pure_driver_skill(team:number, data:any[]){

    // },
    Loading_zone_intake_rate(team:number, data:any[]){
        let midField = 0;
        let total = 0;
        data.forEach(e=>{
            if(e.team!=team) return;
            e.game.actions.forEach((a:any)=>{
                if(a.action=="intake"){
                    if(a.location=="zone") midField++;
                    total++;
                }
            });
        });

        return(midField/total);
    },
    Average_auto_score_rate(team:number, data:any[]){
        let count = 0;
        let score = 0;
        data.forEach(e=>{
            if(e.team != team) return;
            score += autoScore(e);
            count++;
        });
        return(score/count);
    },
    Strategy(team:number, data:any[]){
        let stratIndex=0;
        let allStrat=[0, 0, 0, 0, 0, 0];
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
        // overallStrat=allStrat.reduce(function(accumulator:number, currentvalue:number){return accumulator+currentvalue})
        return result;
    },
}
export function teamScore(e:any){
    let count = 0;
    e.game.actions.forEach((a:any)=>{
        if(a.action === 'place') {
            switch(a.node.y){
                case 0: count+= 5; break;
                case 1: count+= 3; break;
                case 2: count+= 2; break;
            }
            if(a.time - e.game.start <= 18000) count++;
        }
        if(a.action === 'intake' && typeof a.location != "string"){
            switch(a.location.y){
                case 0: count-= 5; break;
                case 1: count-= 3; break;
                case 2: count-= 2; break;
            }
        }
    });

    if(e.game.untimed.mobile) count += 3;
    if(e.game.untimed.dockedAuto){
        count += 8;
        if(e.game.untimed.engageAuto) count += 4;
    }
    if(e.game.untimed.dockedMatch){
        count += 6;
        if(e.game.untimed.engageMatch) count += 4;
    }
    if(e.game.untimed.parked) count += 2;

    return(count);
}
function autoScore(e:any){
    let count = 0;
    e.game.actions.forEach((a:any)=>{
        if(a.time - e.game.start > 18000) return;
        if(a.action === 'place') {
            switch(a.node.y){
                case 0: count+= 6; break;
                case 1: count+= 4; break;
                case 2: count+= 3; break;
            }
        }
        if(a.action === 'intake' && typeof a.location != "string"){
            switch(a.location.y){
                case 0: count-= 5; break;
                case 1: count-= 3; break;
                case 2: count-= 2; break;
            }
        }
    });

    if(e.game.untimed.mobile) count += 3;
    if(e.game.untimed.dockedAuto){
        count += 8;
        if(e.game.untimed.engageAuto) count += 4;
    }
    if(e.game.untimed.dockedMatch){
        count += 6;
        if(e.game.untimed.engageMatch) count += 4;
    }
    if(e.game.untimed.parked) count += 2;

    return(count);
}
export function gridLayout(e:any){
    let out = [Array(9),Array(9),Array(9)]
    e.game.actions.forEach((a:any)=>{
        if(a.action === "place"){
            console.log(a.node.y);
            out[a.node.y][a.node.x-1] = a.type;
        }
    })

    return out;
}
/*function cycle(e){
    e.game.actions.forEach(a=>{
        if(a.action=="intake") inTime.push(a.time);
        if(a.action=="place") outTime.push(a.time);
    });
} */
