
let youtubers = [
    {
        name: "markipliers",
        state: false
    },
    {
        name: "jack",
        state: false
    },
    {
        name: "pewdie",
        state: false
    }
]

console.log(youtubers);
let placeholder = document.getElementById("feedFilter");
for(let item of youtubers){
    let temp = document.createElement("div");
    temp.className = "checklist"
    let html = `
    <label>
        <input type="checkbox" checked>${item.name}
    </label>

    `
    temp.innerHTML = html;
    placeholder.appendChild(temp);
    
}