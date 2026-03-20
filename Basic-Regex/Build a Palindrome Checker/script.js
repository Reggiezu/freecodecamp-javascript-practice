const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const result = document.getElementById("result");

button.addEventListener("click",(e)=>{
e.preventDefault();
if (!input.value){
  alert("Please input a value");
}if (input.value.length === 1){
  result.innerText = `${input.value} is a palindrome`
}else{
  result.innerText = palindromeCheck(input.value);
}});

const palindromeCheck = (str) => {
const letterOnly = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
const reversed = letterOnly.split('').reverse().join('');


  if(letterOnly === reversed){
   return `${str} is a palindrome`
  }else{
    return `${str} is not a palindrome`;
  }
 

}