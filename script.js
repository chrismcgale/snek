function createGrid(num){
    const container = document.querySelector('#container');
    var i = 0;
    while (i < num){
        const row = document.createElement('div');
        row.setAttribute('class', 'row');
        var j = 0;
        while (j < num){
            const col = document.createElement('div');
            const px = Math.round(500 / num);

            col.style.height = px.toString(10)+'px';

            col.style.width = px.toString(10)+'px';
            col.style.borderTop = "thin solid black";
            col.style.borderLeft = "thin solid black";
            col.style.cssFloat = "left";
            col.setAttribute('class', 'cell');
            row.setAttribute('class', 'col');
            if (j === num -1){
                col.style.borderRight = "thin solid black";
            }
            if(i === num - 1){
                col.style.borderBottom="thin solid black";
            }
            row.appendChild(col);
            j++;




        }
        row.style.clear='left';
        container.appendChild(row);
        i++;
    }
    sketch();
}
