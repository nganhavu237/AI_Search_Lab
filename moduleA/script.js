// =========================
// GOAL STATE
// =========================
const GOAL_STATE = [
    [1,2,3],
    [4,5,6],
    [7,8,0]
];

let startState = [
    [8,1,3],
    [4,0,2],
    [7,6,5]
];

// =========================
// IMAGE MODE
// =========================
let imageTiles = [];
let useImageMode = false;

// =========================
// HELPERS
// =========================
function stateToString(state){
    return state.flat().join(",");
}

function isGoal(state){
    return stateToString(state) === stateToString(GOAL_STATE);
}

function findBlank(state){
    for(let r=0;r<3;r++){
        for(let c=0;c<3;c++){
            if(state[r][c]===0) return [r,c];
        }
    }
}

function clone(state){
    return state.map(r=>[...r]);
}

// =========================
// NEIGHBORS
// =========================
function getNeighbors(state){
    const [r,c] = findBlank(state);

    let dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    let res = [];

    for(let [dr,dc] of dirs){
        let nr=r+dr,nc=c+dc;

        if(nr>=0&&nr<3&&nc>=0&&nc<3){
            let newState = clone(state);

            [newState[r][c],newState[nr][nc]] =
            [newState[nr][nc],newState[r][c]];

            res.push(newState);
        }
    }

    return res;
}

// =========================
// RENDER
// =========================
function renderPuzzle(state){

    let html="<table>";

    for(let r=0;r<3;r++){
        html+="<tr>";

        for(let c=0;c<3;c++){

            let val=state[r][c];
            let index=r*3+c;

            html+=`
                <td onclick="moveTile(${r},${c})">
                    ${
                        val===0
                        ? ""
                        : (useImageMode
                            ? `<div style="background-image:url(${imageTiles[index]})"></div>`
                            : val)
                    }
                </td>
            `;
        }

        html+="</tr>";
    }

    html+="</table>";

    document.getElementById("puzzle").innerHTML=html;
}

// =========================
// MOVE TILE
// =========================
function moveTile(r,c){

    let [br,bc]=findBlank(startState);

    if(Math.abs(r-br)+Math.abs(c-bc)!==1) return;

    [startState[r][c],startState[br][bc]] =
    [startState[br][bc],startState[r][c]];

    renderPuzzle(startState);

    if(isGoal(startState)) alert("Solved!");
}

// =========================
// DASHBOARD
// =========================
function updateDashboard(name,res,time){

    document.getElementById("algorithm").textContent=name;
    document.getElementById("nodes").textContent=res.nodesExpanded;
    document.getElementById("length").textContent=res.cost;
    document.getElementById("time").textContent=time;
}

// =========================
// BFS
// =========================
function bfs(start){

    let q=[{state:start,path:[start]}];
    let visited=new Set([stateToString(start)]);
    let nodes=0;

    while(q.length){

        let {state,path}=q.shift();
        nodes++;

        if(isGoal(state)){
            return {path,nodesExpanded:nodes,cost:path.length-1};
        }

        for(let n of getNeighbors(state)){
            let key=stateToString(n);

            if(!visited.has(key)){
                visited.add(key);
                q.push({state:n,path:[...path,n]});
            }
        }
    }
}

// =========================
// DIJKSTRA
// =========================
function dijkstra(start){

    let pq=[{state:start,path:[start],cost:0}];
    let visited=new Set();
    let nodes=0;

    while(pq.length){

        pq.sort((a,b)=>a.cost-b.cost);

        let {state,path,cost}=pq.shift();
        nodes++;

        let key=stateToString(state);
        if(visited.has(key)) continue;
        visited.add(key);

        if(isGoal(state)){
            return {path,nodesExpanded:nodes,cost};
        }

        for(let n of getNeighbors(state)){
            let key2=stateToString(n);

            if(!visited.has(key2)){
                pq.push({state:n,path:[...path,n],cost:cost+1});
            }
        }
    }
}

// =========================
// ASTAR
// =========================
function manhattan(state){

    let d=0;

    for(let r=0;r<3;r++){
        for(let c=0;c<3;c++){

            let v=state[r][c];
            if(v===0) continue;

            let gr=Math.floor((v-1)/3);
            let gc=(v-1)%3;

            d+=Math.abs(r-gr)+Math.abs(c-gc);
        }
    }

    return d;
}

function astar(start){

    let open=[{
        state:start,
        path:[start],
        g:0
    }];

    let visited=new Set();
    let nodes=0;

    while(open.length){

        open.sort((a,b)=>
            (a.g+manhattan(a.state))-(b.g+manhattan(b.state))
        );

        let {state,path,g}=open.shift();
        nodes++;

        let key=stateToString(state);
        if(visited.has(key)) continue;
        visited.add(key);

        if(isGoal(state)){
            return {path,nodesExpanded:nodes,cost:g};
        }

        for(let n of getNeighbors(state)){

            let k=stateToString(n);

            if(!visited.has(k)){
                open.push({
                    state:n,
                    path:[...path,n],
                    g:g+1
                });
            }
        }
    }
}

// =========================
// RUN
// =========================
function runBFS(){
    let t=performance.now();
    let r=bfs(startState);
    let t2=performance.now();

    updateDashboard("BFS",r,(t2-t).toFixed(2));
    renderPuzzle(r.path[r.path.length-1]);
}

function runDijkstra(){
    let t=performance.now();
    let r=dijkstra(startState);
    let t2=performance.now();

    updateDashboard("Dijkstra",r,(t2-t).toFixed(2));
    renderPuzzle(r.path[r.path.length-1]);
}

function runAStar(){
    let t=performance.now();
    let r=astar(startState);
    let t2=performance.now();

    updateDashboard("A*",r,(t2-t).toFixed(2));
    renderPuzzle(r.path[r.path.length-1]);
}

// =========================
// IMAGE PUZZLE
// =========================
function generateImagePuzzle(){

    let file=document.getElementById("imageUpload").files[0];
    if(!file) return alert("Upload image");

    let reader=new FileReader();

    reader.onload=function(e){

        let img=new Image();
        img.src=e.target.result;

        img.onload=function(){

            let canvas=document.createElement("canvas");
            let ctx=canvas.getContext("2d");

            canvas.width=300;
            canvas.height=300;

            ctx.drawImage(img,0,0,300,300);

            imageTiles=[];

            let size=100;

            for(let r=0;r<3;r++){
                for(let c=0;c<3;c++){

                    let temp=document.createElement("canvas");
                    temp.width=size;
                    temp.height=size;

                    let tctx=temp.getContext("2d");

                    tctx.drawImage(
                        canvas,
                        c*size,
                        r*size,
                        size,
                        size,
                        0,
                        0,
                        size,
                        size
                    );

                    imageTiles.push(temp.toDataURL());
                }
            }

            useImageMode=true;
            renderPuzzle(startState);

            alert("Image Ready!");
        };
    };

    reader.readAsDataURL(file);
}

// INIT
renderPuzzle(startState);