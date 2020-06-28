let ytbers = [1,2,3,4];
console.log(ytbers);
for(let item of ytbers){
    let bigdiv = document.getElementById("bigdiv");
    bigdiv.setAttribute("style","display: inline-block");
    let placeholder = document.createElement("div")
    placeholder.setAttribute("style","display: inline-flex;")
    let x = document.createElement("input");
    x.type = "checkbox";
    x.name = "name";
    x.value = "value";
    x.id =  "id";
    let label = document.createElement('label');
    label.htmlFor = "id";
    label.append(document.createTextNode(item));
    placeholder.appendChild(x);
    placeholder.appendChild(label);
    bigdiv.appendChild(placeholder);
    let brk = document.createElement("br");
    bigdiv.appendChild(brk);
}