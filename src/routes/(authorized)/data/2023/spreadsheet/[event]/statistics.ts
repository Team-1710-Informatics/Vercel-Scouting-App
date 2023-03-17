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
        
    //     data.forEach(e=>{
    //         if(e.team != team) return;
    //         let match = e.match;
    //         let alliance = e.alliance;
    //     });
    //     data.forEach(e=>{
    //         if(e.alliance==alliance)
    //     })
    // },
    // Alliance_dock_auto_rate(){

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
        data.forEach(e=>{

        })
    }
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
export function gridLayout(e:any){
    let out = [Array(9),Array(9),Array(9)]
    e.game.actions.forEach((a:any)=>{
        if(a.action === "place"){
            out[a.node.y][a.node.x-1] = a.type;
        }
    })

    return out;
}