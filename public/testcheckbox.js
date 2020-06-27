let string1 = "A";
let string2 = "B";
let string3 = "C"
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
let placeholder = document.getElementById("xyz");
for(let item of youtubers){
    let temp = document.createElement("div");
    let html = `
    <button onclick="toggleButton('${item.name}')" class="filterButton" id="${item.name}Button">${item.name}</button>

    `
    temp.innerHTML = html;
    placeholder.appendChild(temp);
    
}