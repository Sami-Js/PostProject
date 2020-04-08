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
let slide = arrayElement[currentParent].querySelectorAll('form > section'); 




// btns switch next , previous 
const next = $('next');
const prev = $('prev');


// func slide forward 
function forwardSlide() {
    
    if (currentParent >= arrayElement.length - 1 && currentChild >= slide.length - 1) return;

    if (currentChild >= slide.length - 1) {
        ++currentParent;
        updateChildren();
        currentChild = 0;
        progress();
        updateClass(arrayElement, currentParent, 'd-none');
        Effect(slide[currentChild]);
        updateClass(slide, currentChild, 'd-none');
        console.log(slide)
        return;
    }

    // increament current 
    ++currentChild;
    // remove disabled inside prev
    if(currentChild == 1 && currentParent == 0 ) prev.classList.remove('disabled');
    // switch text btn 
    if(currentChild == slide.length - 1 && currentParent == arrayElement.length - 1 ) this.innerHTML = "Submit"
    // add effect remove Effect 
    Effect(slide[currentChild]);
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
        Effect(slide[currentChild]);
        updateClass(slide, currentChild, 'd-none');
        return;
    }

    --currentChild;
    if(currentChild == 0 && currentParent == 0 ) this.classList.add('disabled');
     // switch text btn 
    if(currentChild < slide.length - 1 ) next.innerHTML = "Next";
    // add effect
    Effect(slide[currentChild]);
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
    Effect(slide[currentChild]);

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

// method effect
function Effect(name){
    name.insertAdjacentHTML('afterbegin' , '<div class="_opacity"></div>');
    let elm = name.querySelector('._opacity');
    setTimeout(() => elm.style.opacity = 0 , 200 );
    setTimeout(() => elm.remove(), 500 );
}



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
// btn save element clicked remove 
let elementRemove ;

btns.forEach((btn) => btn.addEventListener('click' , function (e){
    e.preventDefault();
    const parentBtn = this.parentElement.parentElement ;
    // length table because select how many tables inside form 
    if(parentBtn.querySelectorAll('.new_table').length == 0){
        var lengthChild = 2 ;
         // create element beacuse switch text to NewElem
        var innerParent = parentBtn.innerHTML ;
    }else{
        var lengthChild = parentBtn.querySelectorAll('section').length + 2 ;
        var innerParent = parentBtn.querySelectorAll('section')[0].innerHTML ;
    }
   
    let newElement = document.createElement('section');
    newElement.className = "new_table";
    newElement.innerHTML = innerParent ;
    // address switch 
    let address = newElement.querySelector('.address');
    address.children[0].innerHTML = `${lengthChild}.${parentBtn.querySelector('.address:nth-child(1) h4').innerHTML.substring(2)}`;
    // btn remove 
    let button = address.children[1];
    button.className = 'btn-remove'
    button.children[0].innerHTML = `Remove`;
    button.children[1].src = '../assets/icon/remove.svg';

    parentBtn.appendChild(newElement);
    
   let btnsRemove = document.querySelectorAll('.btn-remove');
   for(let i = 0 ; i < btnsRemove.length ; i++ ){
       btnsRemove[i].onclick = function (e){
           e.preventDefault();
           $('Modal').classList.remove('d-none');
           // save this in global value ;
           elementRemove = this.parentElement.parentElement ;

       }
   }
}));


// btns save change for remove table 
$('save').onclick = function (){
    // first save main parent because reset address numbers
    let parentElm = elementRemove.parentElement;
    // call all new tables
    let Tables = [...parentElm.querySelectorAll('.new_table')];
    // index element Removed because reset num next tables
    let indexElmRemove = Tables.findIndex((e) => e == elementRemove );
    // remove element
    elementRemove.remove();
    // hide modal 
    $('Modal').classList.add('d-none');
    for(let i = indexElmRemove ; i <= Tables.length -  1 ; i++ ){
        let address =  Tables[i].children[0].children[0]; 
        address.innerHTML = `
        ${i + 1}.${document.querySelector('.address h4').innerHTML.substring(2)}`;
    }
    

}


$('close').onclick = function (){
    $('Modal').classList.add('d-none')
}






