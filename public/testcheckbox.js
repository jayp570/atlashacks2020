let string1 = "markipliers";
let string2 = "jack";
let string3 = "pewdie"
let youtubers = [
    {
        name: string1,
        state: false
    },
    {
        name: string2,
        state: false
    },
    {
        name: string3,
        state: false
    }
]

function toggleButton(creator) {
    for(let item of youtubers) {
        if(item.name == creator) {
            item.state = !item.state;
        }
        document.getElementById(creator+"Button").style.backgroundColor = "#111";
        document.getElementById(creator+"Button").style.color = "white";
        if(item.state) {
            document.getElementById(creator+"Button").style.backgroundColor = "white";
            document.getElementById(creator+"Button").style.color = "#111";
        }
    }
}


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