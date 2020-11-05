// algorith

export const dfst = (a, matrix) => {
    console.log(a,matrix)
    const n = matrix.length;
    const t = [];
    const e = [];
    let v = [];
    matrix.forEach(() => {
        const tmp = {status: 0, parent: 0}
        v.push(tmp);
    })

    v[a].status = 1;
    v[a].parent = a;

    let x = a
    while(v[x].status === 1){
        let isExplore = false;
        for(let y = 0; y < n; y++){
            let isFind = false;
            e.forEach(val => {
                if(val.from === x && val.to === y)
                    isFind = true;
            })
            if(y !== v[x].parent && +matrix[x][y] === 1 && !isFind) {
                isExplore = true;
                e.push({from:x, to:y})
                if(v[y].status === 0) {
                    t.push({from:x, to:y});
                    v[y].parent = x;
                    v[y].status = 1;
                    x = y;
                    break;
                }
            }
        }
        if(!isExplore){
            v[x].status = 2;
            x = v[x].parent;
        }
    }
    return t;
}

