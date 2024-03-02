var current_id = document.getElementById("Kelvin");
var inputCount = 0;
var b1, b2, p1, p2, t1, t2;
var answer_id = "";
var check = true;
var deleteCount = 0;

function clearAll(){
    document.getElementById("takeInputs").reset();
    check = true;
    if(answer_id.length > 0) document.getElementById(answer_id).classList.remove("answerKey");

}

function calculate(u1,u2,u3,l1,l2){
    return (u1 * u2 * u3)/ (l1 * l2);
}

function checkToCalc(){
    if(!check){
        document.querySelectorAll(".inputs").forEach(inp =>{
            if(inp.value.length === 0){
                deleteCount++;
            }
        })
        if(deleteCount>=2){
            check = true;
            if(answer_id.length > 0) document.getElementById(answer_id).classList.remove("answerKey");
            deleteCount = 0;
        }
    }
}

function ftoK(fah) {
    if(!(fah > 0)){
        return 0;
    }
    return ((fah - 32) * (5/9)) + 273.15 ;
}

function ctoK(cel) {
    if(!(cel > 0)) return 0;
    return (273.15 + parseFloat(cel));
}

function ktoF(kel){
    return ((kel - 273.15) * (9/5)) + 32;
}

function ktoC(kel){
    return kel - 273.15;
}

function inputChange(){

    checkToCalc();

    document.querySelectorAll(".inputs").forEach(inp =>{
        if(inp.value.length !== 0){
            inputCount++;
        }
    })

    if(inputCount === 5 && check ){
        b1 = parseFloat(document.getElementById("b1").value);
        b2 = parseFloat(document.getElementById("b2").value);
        p1 = parseFloat(document.getElementById("p1").value);
        p2 = parseFloat(document.getElementById("p2").value);
        t1 = parseFloat(document.getElementById("t1").value);
        t2 = parseFloat(document.getElementById("t2").value);

        if(current_id === "Fahrenheit"){
            if(t1 > 0) {
                var f1 = t1; 
                t1 = ftoK(t1); 
                document.getElementById("t1").value = parseFloat(f1).toFixed(1) + "F (" + t1.toFixed(1) + "K)";
            } 
            if(t2 > 0){
                var f2 = t2;
                t2 = ftoK(t2);
                document.getElementById("t2").value = parseFloat(f2).toFixed(1) + "F (" + t2.toFixed(1) + "K)";
            } 
        }

        else if(current_id === "Celsius"){
            if(t1 > 0) {
                var c1 = t1;
                t1 = ctoK(t1);
                console.log(c1);
                console.log(t1);
                console.log(c1.toFixed(1) + "C");
                console.log(t1.toFixed(1) + "K");
                document.getElementById("t1").value = (parseFloat(c1).toFixed(1)) + "C (" + t1.toFixed(1) + "K)";
            }
            if(t2 > 0) {
                var c2 = t2;
                t2 = ctoK(t2);
                document.getElementById("t2").value = (parseFloat(c2).toFixed(1) )+ "C (" + t2.toFixed(1) + "K)";
            }
        }

        check = false;
        if(!(b1 > 0)){
            document.getElementById("b1").value = calculate(b2,p2,t1,t2,p1).toFixed(2);
            answer_id = "b1";
        }
        else if(!(b2 > 0)){
            document.getElementById("b2").value = calculate(b1,p1,t2,t1,p2).toFixed(2);
            answer_id = "b2";
        }
        else if(!(p1 > 0)){
            document.getElementById("p1").value = calculate(b2,p2,t1,t2,b1).toFixed(2);
            answer_id = "p1";
        }
        else if(!(p2 > 0)){
            document.getElementById("p2").value = calculate(b1,p1,t2,t1,b2).toFixed(2);
            answer_id = "p2";
        }
        else if(!(t1 > 0)){
            t1 = calculate(b1,p1,t2,b2,p2).toFixed(2) ;
            if(current_id === "Fahrenheit") {
                var f1 = ktoF(t1);
                document.getElementById("t1").value = f1.toFixed(1) + "F (" + t1 + "K)";
            }
            else if(current_id === "Celsius") {
                console.log(t1);
                var f1 = ktoC(t1);
                console.log(f1);
                document.getElementById("t1").value = f1.toFixed(1) + "C (" + t1 + "K)";
            }
            else {
                document.getElementById("t1").value = t1;
            }
            answer_id = "t1";
        }
        else if(!(t2 > 0)){
            t2 = calculate(b2,p2,t1,p1,b1).toFixed(2);
            if(current_id === "Fahrenheit") {
                var f2 = ktoF(t2);
                document.getElementById("t2").value = f2.toFixed(1) + "F (" + t2 + "K)";
            }
            else if(current_id === "Celsius") {
                var f2 = ktoC(t2);
                document.getElementById("t2").value = f2.toFixed(1) + "C (" + t2 + "K)";
            }
            else {
                document.getElementById("t2").value = t2;
            }
            answer_id = "t2";
        }

        document.getElementById(answer_id).classList.add("answerKey");
        document.querySelectorAll(".inputs").forEach(inpt => {
            if(inpt.id !== answer_id){
                document.getElementById(inpt.id).classList.remove("answerKey");
            }
        })

    }
    inputCount = 0;
}

function changeCurrent(){
    clearAll();
    var clicked_id = event.target.id;
    document.querySelectorAll("button").forEach((btn) => {
        if(clicked_id === btn.id){
            btn.classList.add("selected");
            btn.classList.remove("normal");
            current_id = btn.id;
        }
        else{
            btn.classList.remove("selected");
            btn.classList.add("normal");
        }
    })

    if(current_id === "Kelvin"){
        document.getElementById("t1").placeholder = "kelvins";
        document.getElementById("t2").placeholder = "kelvins";
        document.getElementById("tUnit1").innerHTML = "(Kelvins(K))";
        document.getElementById("tUnit2").innerHTML = "(Kelvins(K))";
    }
    else if(current_id === "Celsius"){
        document.getElementById("t1").placeholder = "celsius";
        document.getElementById("t2").placeholder = "celsius";
        document.getElementById("tUnit1").innerHTML = "(Celsius(C))";
        document.getElementById("tUnit2").innerHTML = "(Celsius(C))";
    }
    else if(current_id === "Fahrenheit"){
        document.getElementById("t1").placeholder = "fahrenheit";
        document.getElementById("t2").placeholder = "fahrenheit";
        document.getElementById("tUnit1").innerHTML = "(Fahrenheit)";
        document.getElementById("tUnit2").innerHTML = "(Fahrenheit)";
    }

}
