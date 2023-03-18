import { element } from "svelte/internal";

export default {
    Avg_score(team:number, data:any[]){
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
            return(max);
        });
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
    Avg_cycle_time(team:number, data:any[]){
        let inTime:any[]=[];
        let outTime:any[]=[];
        let compiled:any[]=[];
        
        data.forEach(e=>{ //data=all scouting data
            if(e.team != team) return;
            e.game.actions.forEach((a:any)=>{
                if(a.action=="intake") inTime.push(a.time);
                if(a.action=="place" || a.action=="drop") outTime.push({time:a.time, action:a.action});
            });
        });
        for(let i=0; i<=inTime.length-1; i++){
            if(outTime[i].action=="place") compiled.push(outTime[i].time-inTime[i]);
        }

    },
    Loading_zone_intake_rate(team:number, data:any[]){
        let avgRaw:any[]=[];
        let midField = 2;
        let total = 3;
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
}
function teamScore(e:any){
    let count = 0;
    e.game.actions.forEach((a:any)=>{
        if(a.action === 'place') {
            switch(a.node.y){
                case 0: count+= 5;
                case 1: count+= 3;
                case 2: count+= 2;
            }
            if(a.time - e.game.start <= 18000) count++;
        }
        // if(a.action === 'intake' && typeof a.location != "string"){
        //     switch(a.location.node.y){
        //         case 0: count-= 5;
        //         case 1: count-= 3;
        //         case 2: count-= 2;
        //     }
        // }
    });
    return(count);
}
/*function cycle(e){
    e.game.actions.forEach(a=>{
        if(a.action=="intake") inTime.push(a.time);
        if(a.action=="place") outTime.push(a.time);
    });
} */