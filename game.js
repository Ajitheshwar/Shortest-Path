m = 0, n = 0
si = -1, sj = -1
ei = -1, ej = -1
g=[];

function getRowsCols(event){
    document.getElementById("btn").style.display="block"
    let h = document.getElementById("textAnimate")
    if(h!==null)
        h.remove()
    m = Number(document.getElementById("rows").value);
    n = Number(document.getElementById("cols").value);
    si=sj=ei=ej=-1

    let grid = document.getElementById("grid");
    if(grid!==null)
        grid.remove()
    
    let a = m*n;
    g = new Array(m+1)
    for(let i =0;i<m+1;i++){
        g[i] = new Array(n+1).fill(a);
    }

    event.preventDefault()

    let dg = document.getElementById("displayGrid")
    grid = document.createElement("table")
    grid.id = "grid";
    dg.append(grid);
    textAnimate = document.createElement("h2")
    textAnimate.id="textAnimate"
    textAnimate.textContent="Click on Starting cell"
    textAnimate.classList.add("textAnimate")
    dg.append(textAnimate)
    setTimeout(()=>{textAnimate.remove()},5100)
    let textAnimate1,textAnimate3
    
    let x = Math.floor(Math.min(screen.width/(n+1),(screen.height-120)/(m+1)));
    if(x<20){
        x=20;
    }
    else if(x>60){
        x=60
    }
    x = x.toString()+"px"

    for(let i=0;i<m+1;i++){
        let tr = document.createElement("tr")
        
        tr.id= i.toString();
        for(let j=0;j<n+1;j++){
            let ele = document.createElement("td")
            ele.style.width = x;
            ele.style.height = x;
            ele.id = i.toString() +"/"+ j.toString()
            
            if(i==0){
                ele.classList.add('border-td')
                ele.textContent = j;
                if(j==0){
                    ele.style.borderBottom = "none"
                }
            }
            else if(j==0){
                ele.classList.add('border-td')
                ele.innerHTML = i;
            }
            else{
                ele.classList.add('bg-white')
                ele.addEventListener('click',(e)=>{
                    let id = e.target.id
                    let a = id.split('/');
                    let x = Number(a[0]);
                    let y = Number(a[1]);

                    if(si===-1){
                        console.log("Hi")
                        si = x;
                        sj = y
                        let id = x.toString()+"/"+y.toString()
                        let ele = document.getElementById(id)
                        ele.style.backgroundColor = "blue"
                        textAnimate.remove()
                        textAnimate1 = document.createElement("h2")
                        textAnimate1.textContent="Click on Ending cell"
                        textAnimate1.classList.add("textAnimate")
                        dg.append(textAnimate1)
                        setTimeout(()=>{textAnimate1.remove()},5100)
                    }
                    else if(ei===-1){
                        ei = x;
                        ej = y
                        let id = x.toString()+"/"+y.toString()
                        let ele = document.getElementById(id)
                        ele.style.backgroundColor = "red"
                        textAnimate1.remove()
                        let textAnimate3 = document.createElement("h2")
                        textAnimate3.innerHTML="Click on cells to add Walls<br>Click on START to find shortest path"
                        textAnimate3.classList.add("textAnimate")
                        textAnimate3.style.textAlign = "center"
                        textAnimate3.style.animationDuration = "8s"
                        dg.append(textAnimate3)   

                        setTimeout(()=>{textAnimate3.remove()},8000)             
                    }
                    else{
                        
                        document.getElementById(id).classList.remove('bg-route');
                        if(g[x][y]===-1){
                            g[x][y] = m*n;
                            document.getElementById(id).classList.add('bg-white');
                            document.getElementById(id).classList.remove('bg-dark');
                        }
                        else{
                            g[x][y] = -1;
                            document.getElementById(id).classList.remove('bg-white');
                            document.getElementById(id).classList.remove('bg-secondary');
                            document.getElementById(id).classList.add('bg-dark')
                        }
                    }
                })
                ele.addEventListener('mouseover',(e)=>{
                    let id = e.target.id
                    let a = id.split('/');
                    let x = Number(a[0]);
                    let y = Number(a[1]);
                    for(let i=0;i<m+1;i++){
                        let ele = document.getElementById(i.toString()+"/"+y.toString());
                        if(ele.classList.contains('bg-white')){
                            ele.classList.add('bg-secondary')
                        }
                    }
                    for(let i=0;i<n+1;i++){
                        let ele = document.getElementById(x.toString()+"/"+i.toString());
                        if(ele.classList.contains('bg-white')){
                            ele.classList.add('bg-secondary')
                        }
                    }
                })

                ele.addEventListener('mouseout',(e)=>{
                    let id = e.target.id
                    let a = id.split('/');
                    let x = Number(a[0]);
                    let y = Number(a[1]);
                
                    for(let i=0;i<n+1;i++){
                    for(let i=0;i<m+1;i++){
                        let ele = document.getElementById(i.toString()+"/"+y.toString());
                        if(ele.classList.contains('bg-secondary')){
                        }
                            ele.classList.remove('bg-secondary')
                        }
                        let ele = document.getElementById(x.toString()+"/"+i.toString());
                        if(ele.classList.contains('bg-secondary')){
                            ele.classList.remove('bg-secondary')
                        }
                    }
                })
            }
            tr.append(ele)
        }
        grid.append(tr);
    }
}

let form = document.getElementById("form1")
form.addEventListener('submit',getRowsCols)

function findRoute(){
    for(let i=1;i<=m;i++){
        for(let j=1;j<=n;j++){
            let ele = document.getElementById(i.toString()+"/"+j.toString())
            ele.classList.remove('bg-route')
            ele.textContent="";
        }
    }
    let g1 = g.map(arr=>[...arr])
    
    g1[ei][ej]=0
    g1[si][sj]=m*n
    let flag = true;
    while(flag){
        flag = false;
        for(let i=m;i>0;i--){
            for(let j=n;j>0;j--){
                if(i+1<=m && g1[i+1][j]!=-1 && g1[i][j]>g1[i+1][j]+1){
                    g1[i][j]=g1[i+1][j]+1; 
                    flag = true;
                }
                if(i-1>=0 && g1[i-1][j]!=-1 && g1[i][j]>g1[i-1][j]+1){
                    g1[i][j]=g1[i-1][j]+1;
                    flag = true;
                }
                if(j+1<=n && g1[i][j+1]!=-1&& g1[i][j]>g1[i][j+1]+1){
                    g1[i][j]=g1[i][j+1]+1;
                    flag = true;
                    flag=true;
                }
                if(j-1>=0 && g1[i][j-1]!=-1 && g1[i][j]>g1[i][j-1]+1){
                    g1[i][j]=g1[i][j-1]+1;
                }
                
            }
        }
    }
    let ele = document.getElementById("displayError")
    if(g1[si][sj]==m*n){
        ele.innerHTML='<h3 style="text-align : center;color : red">You cannot reach the end</h3>'
    }
    else{
        ele.innerHTML=''
    }
    this.setPath(g1,m,n,si,sj,0)
}

function setRoute(x,y,c){
    let id = x.toString()+"/"+y.toString()
    let ele = document.getElementById(id)
    ele.classList.add('bg-route')
    ele.textContent = c.toString();
}
function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 500);
    });
  }
async function setPath(g,m,n,i,j,x){
    setRoute(i,j,x)
    let result = await resolveAfter2Seconds()
    let a = g[i][j]
    if(i==ei && j==ej){
        console.log(g)
        return ;
    }
    if(i+1<=m && g[i+1][j]!==-1 &&g[i][j]-g[i+1][j]===1){
        await this.setPath(g,m,n,i+1,j,x+1)
    }
    if(i-1>0 && g[i-1][j]!==-1 && g[i][j]-g[i-1][j]===1){
        await this.setPath(g,m,n,i-1,j,x+1)
    }
    if(j+1<=n && g[i][j+1]!==-1 && g[i][j]-g[i][j+1]===1){
        await this.setPath(g,m,n,i,j+1,x+1)
    }
    if(j-1>0 && g[i][j-1]!==-1 && g[i][j]-g[i][j-1]===1){
        await this.setPath(g,m,n,i,j-1,x+1)
    }
    g[i][j]= -1;
    return new Promise(resolve => {
      resolve('resolved')
    });
}