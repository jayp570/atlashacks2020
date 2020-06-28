let ytbers = [];
let ytber_id_list = [];
let passed_array = [];
let checkbox_check;
let submitbutton = document.getElementById("submitbtn");

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
        
        x.onchange = function(){

            if(x.checked == "true"){
                checkbox_check = true;
            }else{
                checkbox_check = false;
            }

            if(passed_array.includes())
            passed_array.push({name: ytber_name, id: ytber_id, checked: checkbox_check});
            console.log(passed_array);
            
        }
        
    }else{
        showtoast();
    }

    if(ytbers.length == 0) {
        document.getElementById("emptyMessage").innerHTML = "You have no creators in your feed!"
    } else {
        document.getElementById("emptyMessage").innerHTML = ""
    }
    
    
}

function showtoast() {
    // Get the snackbar DIV
    var t = document.getElementById("toast");
  
    // Add the "show" class to DIV
    t.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000);
  }
  

