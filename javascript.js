let input = document.querySelectorAll("input"),
    output = document.querySelectorAll(".tip"),
    buttons = document.querySelectorAll(".buttons button"),
    form = document.querySelector("form"),
    reset = document.querySelector("#reset"),
    error=document.querySelectorAll(".error"),
    bill = 0,
    tip = 0,
    person = 0,
    flag=true;
    const regexNum = /^(?!0\d*$)\d*\.?\d+$/;

const tipPercent = {
    0: 0.05,
    1: 0.1,
    2: 0.15,
    3: 0.25,
    4: 0.5
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
})
input[0].addEventListener("input", () => {
    bill = Number(input[0].value);
})
input[1].addEventListener("input", () => {
    person = Number(input[1].value);
})
buttons.forEach((element, index) => {
    element.addEventListener("click", () => {
    flag=true;
    errorChecker(0,input[0].value);
    errorChecker(1,input[1].value); 

        if(flag)
        {
            tip = tipPercent[index];
            tipCalculator(bill, tip, person);
        }
    });
});
function errorChecker(index,value){
    if(value.trim()==="")
    {
        flag=false;
        input[index].style.animationName="shaker";
        input[index].classList.add("shaker");
        error[index].innerHTML="can't be empty";
        output[0].innerHTML = "$0.00";
        output[1].innerHTML = "$0.00";
    }
    else if(!regexNum.test(value))
    {
        flag=false;
        input[index].style.color="red";
        input[index].style.animationName="shaker";
        input[index].classList.add("shaker");
        error[index].innerHTML="invalid input";
        output[0].innerHTML = "$0.00";
        output[1].innerHTML = "$0.00";
    }
    else{
        input[index].style.color="inherit";
        error[index].innerHTML=" ";
        input[index].classList.remove("shaker"); 

    }
    setTimeout(() => {
        input[index].style.color="inherit";
        input[index].style.animationName = "";
    }, 500);
    

}

function tipCalculator(bill, tip, person) {
    output[0].innerHTML = "$" + (bill * tip).toFixed(2);
    output[1].innerHTML = "$" + ((bill * tip) * person).toFixed(2);
    output[0].style.color= "var(---Strong--cyan)";
    output[1].style.color= "var(---Strong--cyan)";
    reset.disabled = false;
    reset.style.backgroundColor = "var(---Strong--cyan)";
}
reset.addEventListener("click", () => {
    if (!reset.disabled) {
        reset.disabled = true;
        form.reset();
        reset.style.backgroundColor = " hsla(183, 54%, 51%, 0.293)";
        output[0].innerHTML = "$0.00";
        output[1].innerHTML = "$0.00";
        output[0].style.color= "";
        output[1].style.color= "";
        input[0].style.color="inherit";
        error[0].innerHTML=" ";
        input[0].classList.remove("shaker"); 
        input[1].style.color="inherit";
        error[1].innerHTML=" ";
        input[1].classList.remove("shaker"); 
    }
})
