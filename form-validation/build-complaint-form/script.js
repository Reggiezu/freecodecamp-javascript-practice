
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");

const orderNo = document.getElementById("order-no");
const productCode = document.getElementById("product-code");
const quantity = document.getElementById("quantity");

const complaintDescription = document.getElementById("complaint-description");

const solutionDescription = document.getElementById("solution-description");


function validateForm() {
const form = document.getElementById("form");
const complaintsGroup = [...form.querySelectorAll('input[type="checkbox"]:checked')].map(cG =>cG.value);
   const solutionsGroup = form.querySelector('input[name="solutions"]:checked')?.value??"";
  const orderPattern=/^2024\d{6}$/;
  const productPattern=/[a-zA-Z]{2}\d{2}\-[a-zA-Z]{1}\d{3}\-[a-zA-Z]{2}\d{1}/;
  return {
    "full-name": fullName.value !== "",
    email: (email.checkValidity(email.value) && !!email.value),
    "order-no": orderPattern.test(orderNo.value),
    "product-code": productPattern.test(productCode.value),
    quantity: (quantity.value>0),
    "complaints-group": (complaintsGroup.length>0),
    "complaint-description": (!complaintsGroup.includes("other")||complaintDescription.value.length>20),
    "solutions-group": solutionsGroup!=="",
    "solution-description": (solutionsGroup!=="other"||solutionDescription.value.length>20)
  };
}

//checks that the data is valid
function isValid(resultsObj) {
  return Object.values(resultsObj).every(value=> value == true)
}
form.addEventListener('change', (e) => {
const fieldset = e.target.closest('fieldset');
 

if(e.target.name ==="full-name"){
  return (validateForm()["full-name"])? fullName.style.borderColor="green":fullName.style.borderColor="red"
}

    else if (e.target.name ==="email") {
      return ( validateForm()["email"])? email.style.borderColor="green":email.style.borderColor="red"
    } 
     else if (e.target.name ==="order-no") {
      return (validateForm()["order-no"])? orderNo.style.borderColor="green":orderNo.style.borderColor="red";
    } 
    else if (e.target.name ==="product-code") {
      return ( validateForm()["product-code"])? productCode.style.borderColor="green":productCode.style.borderColor="red";
    } 
    else if (e.target.name ==="quantity") {
      console.log("what am I doing")
      return (validateForm()["quantity"])? quantity.style.borderColor="green":quantity.style.borderColor="red";
    } 
    else if (fieldset.id ==="complaints-group") {
      return (validateForm()["complaints-group"] )? fieldset.style.borderColor="green":fieldset.style.borderColor="red";
    } 
    else if (fieldset.id ==="complaint-description-container") {
      return (validateForm()["complaint-description"])? complaintDescription.style.borderColor="green":complaintDescription.style.borderColor="red";
    } 
    else if (fieldset.id ==="solutions-group") {
      return (validateForm()["solutions-group"])? fieldset.style.borderColor="green":fieldset.style.borderColor="red";
    } 
    else if (fieldset.id ==="solution-description-container") {
      return (validateForm()["solution-description"])? solutionDescription.style.borderColor="green":solutionDescription.style.borderColor="red";
    } 
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  isValid(validateForm());
 
});