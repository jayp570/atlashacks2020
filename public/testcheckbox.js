let string1 = "A";
let string2 = "B";
let string3 = "C"
let ytbers = [string1, string2, string3];
console.log(ytbers);
let placeholder = document.getElementById("xyz");
for(let item of ytbers){
    let temp = document.createElement("div");
    let html = `
        <label> ${item}
            <input type="checkbox" checked>
        </label>
    `
    temp.innerHTML = html;
    placeholder.appendChild(temp);
}