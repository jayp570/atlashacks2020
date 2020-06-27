let string1 = "A";
let string2 = "B";
let string3 = "C"
let ytbers = new Array(string1, string2, string3);
let arlen = ytbers.length;

for(let i = 0; i < arlen; i++ ){
    let placeholder = document.getElementById("xyz");
    let x = document.createElement("input");
    x.type = "checkbox";
    let label = document.createElement('label');
    label.htmlFor = "id"
    label.append(document.createTextNode(ytbers[i].toString()));
    placeholder.appendChild(x);
    placeholder.appendChild(label);
    let brk = document.createElement("br");
    placeholder.appendChild(brk);
}