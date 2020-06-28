let ytbers = [];
let ytber_id_list = [];

function printchecklist(ytber_name, ytber_id){
    
    if(ytber_id_list.indexOf(ytber_id) == -1){
        ytbers.push(ytber_name)
        ytber_id_list.push(ytber_id)
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
        label.append(document.createTextNode(ytber_name));
        placeholder.appendChild(x);
        placeholder.appendChild(label);
        bigdiv.appendChild(placeholder);
        let brk = document.createElement("br");
        bigdiv.appendChild(brk);
    }else{
        alert("You already added this youtuber. Try another one!");
    }
    
    
}