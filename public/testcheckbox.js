let ytbers = [];
let ytber_id_list = [];
let checkboxid = [];
let final_passed_array = [];
let checkbox_check = false;
let submitbutton = document.getElementById("submitbtn");
let counter = 1;
let x = document.createElement("input");
x.type = "checkbox";
x.name = "name";
x.value = "value";



if(ytbers.length == 0) {
    document.getElementById("emptyMessage").innerHTML = "You have no creators in your feed!"
} else {
    document.getElementById("emptyMessage").innerHTML = ""
}

function printchecklist(ytber_name, ytber_id){

    if(ytber_id_list.indexOf(ytber_id) == -1){
        ytbers.push(ytber_name)
        ytber_id_list.push(ytber_id)
        let bigdiv = document.getElementById("bigdiv");
        bigdiv.setAttribute("style","display: inline-block");
        let placeholder = document.createElement("div")
        placeholder.setAttribute("style","display: inline-flex;")
        x.id = ("id"+counter).toString();
        let label = document.createElement('label');
        label.htmlFor = ("id"+counter).toString();
        label.append(document.createTextNode(ytber_name));
        placeholder.appendChild(x);
        placeholder.appendChild(label);
        bigdiv.appendChild(placeholder);
        let brk = document.createElement("br");
        bigdiv.appendChild(brk);
        checkboxid.push(x.id);
        counter++;
        x = document.createElement("input");
        x.type = "checkbox"

    }else{
        showtoast();
    }

    if(ytbers.length == 0) {
        document.getElementById("emptyMessage").innerHTML = "You have no creators in your feed!"
    } else {
        document.getElementById("emptyMessage").innerHTML = ""
    }
}

submitbutton.onclick = function(){
    for(let k = 1; k <= ytbers.length; k++){
        let stringid = ("id"+k).toString();
        if(document.getElementById(stringid).checked == true){
            final_passed_array[k-1,k-1] = [[ytbers[k-1],true]]
        }else{
            final_passed_array[k-1,k-1] = [[ytbers[k-1],false]]
        }
    }
    console.log(checkboxid);
    console.log(ytbers);
    console.log(final_passed_array)
}


function showtoast() {
    var t = document.getElementById("toast");
    t.className = "show";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000);
  }
  

