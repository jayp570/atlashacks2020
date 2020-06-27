let string1 = "A";
let string2 = "B";
let string3 = "C"
let ytbers = [string1, string2, string3];
console.log(ytbers);
for(let item of ytbers){
    let placeholder = document.getElementById("xyz");
    let x = document.createElement("input");
    x.type = "checkbox";
    x.id = "id";
    let label = document.createElement('label');
    label.htmlFor = "id"
    label.append(document.createTextNode(item));
    placeholder.appendChild(x);
    placeholder.appendChild(label);
    let brk = document.createElement("br");
    placeholder.appendChild(brk);
}
