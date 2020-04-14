// func call element inside dom same jQuery
export var $ = (element) => document.getElementById(element);

//  pure func output element with name and class name
export function createElm(name, className) {
  let elm = document.createElement(name);
  elm.className = className;
  return elm;
}

// func callback to variable save childs in parentSlide
export function updateChildren(value) {
  // this func create because children in first slide is section and not first child is form
  if (value == 0) {
    return arrayElement[value].querySelectorAll("form > section");
  } else {
    return arrayElement[value].querySelectorAll("form");
  }
}

//  func to remove class and select class || or reverse this doing add and remove
export function updateClass(elm, current, nameClass, value = true) {
    if (value) {
        elm.forEach((e) => e.classList.add(nameClass));
        elm[current].classList.remove(nameClass);
    } else {
        elm.forEach((e) => e.classList.remove(nameClass));
        elm[current].classList.add(nameClass);
    }
}


// slides elements
export var arrayElement = [
    $("container-form1"),
    $("container-form2"),
    $("container-form3"),
    $("container-form4"),
    $("container-form5"),
    $("container-form6"),
    $("container-form7"),
    $("container-form8"),
];




// reset name Address 
export function resetAddress(count , elements , parentItem){
    for (let i = count ; i <= elements.length - 1; i++) {
        let mainAddress = elements[i].children[0].children[0];
        mainAddress.innerHTML = `
        ${i + 1}.${parentItem.querySelector(".address h4").innerHTML.substring(2)}`;
    }
}


// method add effect to parent slide
export function Effect(tag) {
    let element = createElm('div', '_opacity');
    tag.insertAdjacentElement("afterbegin", element);
    setTimeout(() => element.style.opacity = 0, 200);
    setTimeout(() => element.remove(), 500);
}


