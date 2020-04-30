import {
  $,
  updateChildren,
  arrayElement,
  createElm,
  resetAddress,
  updateClass,
  Effect,
} from "./_moduler_func.js";

import { onClickNext, EnvSubmit } from "./DbActions.js";

// main counter for switch slide parent
let currentParent = 0;
//  counter child
let currentChild = 0;
//  this is children
let slide = arrayElement[currentParent].querySelectorAll("form > section");

function doingAction(value = false) {
  // update children in slide
  slide = updateChildren(currentParent);
  
  if(value){
      currentChild = slide.length - 1 ; 
  }
  // switch slide parent
  updateClass(arrayElement, currentParent, "d-none");
  // switch slide child in parent
  updateClass(slide, currentChild, "d-none");
  // add Effect
  Effect(slide[currentChild]);
}

// func slide forward
function forwardSlide() {
  console.log(slide[currentChild])
  if (
    currentParent >= arrayElement.length - 1 &&
    currentChild >= slide.length - 1
  ) {
    return;
  }
  
  onClickNext(currentParent, slide[currentChild])
  if (currentChild >= slide.length - 1) {
    // doingAction(++currentParent, 0);
    if (currentParent == 0)
    EnvSubmit()
    ++currentParent;
    currentChild = 0;
    doingAction();
    progress();
    return;
  }
  // increament current
  ++currentChild;
  // remove disabled inside prev
  if (currentChild == 1 && currentParent == 0) {
    prev.classList.remove("disabled");
  }
  // switch text btn
  if (
    currentChild == slide.length - 1 &&
    currentParent == arrayElement.length - 1
  ) {
    this.innerHTML = "Submit";
  }
  // add effect remove Effect
  Effect(slide[currentChild]);
  // and set another element
  updateClass(slide, currentChild, "d-none");
}

const next = $("next");
// btn fire next func
next.addEventListener("click", forwardSlide);

//  func slide backwarde
function backwardSlide() {
  if (currentParent <= 0 && currentChild <= 0) return;

  if (currentChild == 0) {
    // decrement current main slide
    --currentParent;
    // update value
    doingAction(true);
    updateClass(steps, currentParent, "edit", false);
    return;
  }

  // decreament current
  --currentChild;
  // add disabled inside prev if parent and child == 0
  if (currentChild == 0 && currentParent == 0) this.classList.add("disabled");
  // switch text btn
  if (currentChild < slide.length - 1) next.innerHTML = "Next";

  // add effect
  Effect(slide[currentChild]);
  // and set another element
  updateClass(slide, currentChild, "d-none");
}

// btns switch next , previous
const prev = $("prev");
// btn fire previous func
prev.addEventListener("click", backwardSlide);

// func to success progress required or not
function progress() {
  if (steps[currentParent].classList.contains("success")) {
    updateClass(steps, currentParent, "edit", false);
    return;
  } else {
    steps[currentParent - 1].className = "list-group-item success";
    steps[currentParent].classList.add("active");
  }
}

// partion steps
var steps = document.querySelectorAll(".list-group-item:not(:nth-child(1))");

steps.forEach((element, index, arrayProgress) =>
  element.addEventListener("click", () => {
    if (
      element.classList.contains("success") ||
      element.classList.contains("active")
    ) {
      //  not doing any thing , only complete ;
    } else {
      return;
    }
    currentParent = index;
    currentChild = 0;

    doingAction();

    if (currentParent >= arrayElement.length - 1) {
      next.innerHTML = "Submit";
    } else {
      next.innerHTML = "Next";
    }

    if (currentChild == 0 && currentParent == 0) {
      prev.classList.add("disabled");
    } else {
      prev.classList.remove("disabled");
    }

    if (element.classList.contains("active")) {
      arrayProgress.forEach((e) => e.classList.remove("edit"));
    } else {
      updateClass(steps, currentParent, "edit", false);
    }
  })
);

//all button inside parent slide add new Table
const btns = document.querySelectorAll(".btn-add");
// btn save element clicked remove
let elementRemove;

function actionTable(e) {
  e.preventDefault();
  const parentBtn = this.parentElement.parentElement;
  // length table because select how many tables inside this container
  if (parentBtn.querySelectorAll(".new_table").length == 0) {
    var lengthChild = 2;
    // create element beacuse switch text to NewElem
    var innerParent = parentBtn.innerHTML;
  } else {
    var lengthChild = parentBtn.querySelectorAll("section").length + 2;
    var innerParent = parentBtn.querySelectorAll("section")[0].innerHTML;
  }

  let newElement = createElm("section", "new_table");
  newElement.innerHTML = innerParent;

  // address switch
  let address = newElement.querySelector(".address");
  address.children[0].innerHTML = `${lengthChild}.${parentBtn
    .querySelector(".address:nth-child(1) h4")
    .innerHTML.substring(2)}`;
  // btn remove
  let button = address.children[1];
  button.className = "btn-remove";
  button.children[0].innerHTML = `Remove`;
  button.children[1].className = "fas fa-trash add";

  parentBtn.appendChild(newElement);

  let btnsRemove = document.querySelectorAll(".btn-remove");
  for (let i = 0; i < btnsRemove.length; i++) {
    btnsRemove[i].onclick = function (e) {
      e.preventDefault();
      $("Modal").classList.remove("d-none");
      // save this in global value ;
      elementRemove = this.parentElement.parentElement;
    };
  }
}

// loop through to btns and listen add
for (var y = 0; y < btns.length; y++) {
  btns[y].addEventListener("click", actionTable);
}

// btns save change for remove table
$("save").onclick = function () {
  // first save main parent because reset address numbers
  let parentElm = elementRemove.parentElement;
  // call all new tables
  let Tables = [...parentElm.querySelectorAll(".new_table")];
  // index element Removed because reset num next tables
  let indexElmRemove = Tables.findIndex((e) => e == elementRemove);
  // remove element
  elementRemove.remove();
  // hide modal
  $("Modal").classList.add("d-none");
  // reset name address
  resetAddress(indexElmRemove, Tables, parentElm);
};

$("close").onclick = function () {
  $("Modal").classList.add("d-none");
};
