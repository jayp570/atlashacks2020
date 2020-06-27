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

console.log(youtubers);
let placeholder = document.getElementById("xyz");
for(let item of youtubers){
    let temp = document.createElement("div");
    let html = `
    <table style="width:100%">
        <tr>
            <th><input type="checkbox" checked></th>
            <th>${item.name}</th>
        </tr>
    </table>

    `
    temp.innerHTML = html;
    placeholder.appendChild(temp);
    
}