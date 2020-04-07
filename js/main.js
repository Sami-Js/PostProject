// func shortcat call id
var $ = element => document.getElementById(element);
// all container or main slide here 
var arrayElement = [$('container-form1'), $('container-form2'), $('container-form3'),
$('container-form4'), $('container-form5'), $('container-form6'),
$('container-form7'), $('container-form8')];
// main counter for switch slide 
let currentParent = 0;
// counter switch slide inside main slide 
let currentChild = 0;
// main variable to save child
let slide;




// btns switch next , previous 
const next = $('next');
const prev = $('prev');


// func slide forward 
function forwardSlide() {
    
    if (currentParent >= arrayElement.length - 1 && currentChild >= slide.length - 1) return;

    updateChildren();
    if (currentChild >= slide.length - 1) {
        ++currentParent;
        currentChild = 0;
        progress();
        updateClass(arrayElement, currentParent, 'd-none');
        updateClass(slide, currentChild, 'd-none');
        return;
    }

    // increament current 
    ++currentChild;
    // remove disabled inside prev
    if(currentChild == 1 && currentParent == 0 ) prev.classList.remove('disabled');
    // switch text btn 
    if(currentChild == slide.length - 1 && currentParent == arrayElement.length - 1 ) this.innerHTML = "Submit"
    // and set another element 
    updateClass(slide, currentChild, 'd-none');

}

next.addEventListener('click', forwardSlide);

//  func slide backwarde
function backwardSlide() {

    if (currentParent <= 0 && currentChild <= 0) return;

    if (currentChild == 0) {
        --currentParent;
        updateChildren();
        updateClass(steps , currentParent , 'edit' , false );
        currentChild = slide.length - 1;
        updateClass(arrayElement, currentParent, 'd-none');
        updateClass(slide, currentChild, 'd-none');
        return;
    }

    --currentChild;
    if(currentChild == 0 && currentParent == 0 ) this.classList.add('disabled');
     // switch text btn 
    if(currentChild < slide.length - 1 ) next.innerHTML = "Next"
    updateClass(slide, currentChild, 'd-none');
}

prev.addEventListener('click', backwardSlide);



// partision steps 
var steps = document.querySelectorAll('.list-group-item:not(:nth-child(1))');

function progress(){
  if(steps[currentParent].classList.contains('success')){
     updateClass(steps , currentParent , 'edit' , false);
     return 
  }else{
      steps[currentParent - 1].className = 'list-group-item success';
      steps[currentParent].classList.add('active')
  }
}




steps.forEach((element , index , arrayProgress) => element.addEventListener('click' , () => {

    
    if(element.classList.contains('success') || element.classList.contains('active'))
    {
    //  not doing any thing , only complete ;
    }else
    {
        return ;
    }

    currentParent = index ;
    currentChild = 0 ;
    updateChildren();
    updateClass(arrayElement , currentParent , 'd-none' , );
    updateClass(slide, currentChild, 'd-none' , );

    if(currentParent >= arrayElement.length - 1){
        next.innerHTML = 'Submit';
    }else{
        next.innerHTML = "Next"
    }

    if(currentChild == 0 && currentParent == 0 ){
        prev.classList.add('disabled');
    }else{
        prev.classList.remove('disabled');
    }

    if(element.classList.contains('active')){
        arrayProgress.forEach(e => e.classList.remove('edit'));
    }else{
        updateClass(steps , currentParent , 'edit' , false );
    }


    

    
   
}));





// main method to use for global program 
function updateChildren() {
    if (currentParent == 0) {
        slide = arrayElement[currentParent].querySelectorAll('form > section');
    } else {
        slide = arrayElement[currentParent].querySelectorAll('form');
    }
}

//  func to remove class and select class 
function updateClass(elm, current, nameClass, value = true) {
    if (value) {
        elm.forEach((e) => e.classList.add(nameClass));
        elm[current].classList.remove(nameClass);
    } else {
        elm.forEach((e) => e.classList.remove(nameClass));
        elm[current].classList.add(nameClass);
    }
}


// func add new Table 
const btns = document.querySelectorAll('.btn-add');

btns.forEach((btn) => btn.addEventListener('click' , function (e){
    e.preventDefault();
    const parentBtn = this.parentElement.parentElement ;
    // length table because select how many tables inside form 
    if(parentBtn.querySelectorAll('section').length == 0){
        var lengthChild = 2 ;
         // create element beacuse switch text to NewElem
        var innerParent = parentBtn.innerHTML ;
    }else{
        var lengthChild = parentBtn.querySelectorAll('section').length + 2 ;
        var innerParent = parentBtn.querySelectorAll('section')[0].innerHTML ;
    }
   
    let newElement = document.createElement('section');
    newElement.innerHTML = innerParent ;
    // address switch 
    let address = newElement.querySelector('.address');
    address.children[0].innerHTML = lengthChild + '. ' + address.children[0].innerHTML.substring(2);
    // btn remove 
    let button = address.children[1];
    button.className = 'btn-remove'
    button.children[0].innerHTML = `Remove`;
    button.children[1].src = '../assets/icon/remove.svg';


    parentBtn.appendChild(newElement);



}))






