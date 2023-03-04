console.log("**Cамостоятельная оценка работы:**\n1.Вёрстка соответствует макету. Ширина экрана 768px +24\n2.Вёрстка соответствует макету. Ширина экрана 380px +24\n3.Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n4.На ширине экрана 380рх и меньше реализовано адаптивное меню +22\nИтого: 75 баллов");

//START Hamburger Menu
const hamb = document.getElementById('hamb');
const popup = document.querySelector("#popup");
const body = document.body;

const menu = document.querySelector("#nav-list").cloneNode(1);

hamb.addEventListener("click", hambHandler);


function hambHandler() {
  // Переключаем стили элементов при клике
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();
};

document.addEventListener('click', (e) => {
  const click = e.composedPath().includes(popup);
  const click1 = e.composedPath().includes(hamb);
  if ( !click && !click1 ) {
    closeOnClick();
  }
})

// Здесь мы рендерим элементы в наш попап
function renderPopup() {
  popup.appendChild(menu);
}

// Код для закрытия меню при нажатии на ссылку
const links = Array.from(menu.children);

// Для каждого элемента меню при клике вызываем ф-ию
links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

// Закрытие попапа при клике на меню
function closeOnClick() {
  popup.classList.remove("open");
  hamb.classList.remove("active");
  body.classList.remove("noscroll");
}

// Закрытие попапа при увеличении экрана больше 380
window.addEventListener('resize', checkForWindowResize);
function checkForWindowResize() {
  if (window.innerWidth > 380 && popup.classList.contains('open')) {
    closeOnClick();
  };
};
//END Hamburger Menu

//START Service buttons
let servicebtns = document.querySelectorAll(".servise-btn");
let servicecards = document.querySelectorAll(".service-box");

function checkBtns(btnarray) {
  const result = btnarray.filter(e=>e.classList.contains('active'));
    const example = btnarray.filter(e=>!e.classList.contains('active'));
    if(result.length>=2){
      example.forEach(e => e.classList.toggle('btn'));
      example.forEach(e => e.disabled = true);
    }else{
      example.forEach(e => e.disabled = false);
      const btnwithouthover = btnarray.filter(e=>!e.classList.contains('btn'));
      btnwithouthover.forEach(e => e.classList.add('btn'));
    }
};

servicebtns.forEach((elem)=>{
	elem.addEventListener('click',()=>{
    elem.classList.toggle('active');
    const btnarray = [...document.querySelectorAll('.servise-btn')];
    checkBtns(btnarray);
    servicecards.forEach(e => e.style.filter = 'blur(2px)');
    if(servicebtns[0].classList.contains('active')){
      servicecards[0].style.filter = 'unset';
      servicecards[4].style.filter = 'unset';
    }
    if(servicebtns[1].classList.contains('active')){
      servicecards[2].style.filter = 'unset';
    }
    if(servicebtns[2].classList.contains('active')){
      servicecards[1].style.filter = 'unset';
      servicecards[3].style.filter = 'unset';
      servicecards[5].style.filter = 'unset';
    }
    if(!(btnarray.some(e=>e.classList.contains('active')))){
      servicecards.forEach(e => e.style.filter = 'unset');
    }
  })
 })
//END Service buttons

//START accordeon price menu
const accordionTitles = document.querySelectorAll(".label");
const accordionCards = Array.from(document.querySelectorAll('.prices-option'));

accordionTitles.forEach(accordionTitle => {
  accordionTitle.addEventListener("click", () => {
    if(accordionCards.some(e=>e.classList.contains('active')) && !(accordionTitle.parentElement.classList.contains("active"))) {
      accordionCards.forEach(e => e.classList.remove('active'));
      accordionTitle.parentElement.classList.toggle("active");
    } else {
      accordionTitle.parentElement.classList.toggle("active");
    }
  })
})
//END accordeon price menu

//START city select
const cityName = document.getElementById("city-name");
const cityPhone = document.getElementById("city-phone");
const cityAdress = document.getElementById("city-adress");
const cityCard = document.getElementById("city-card");

var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.setAttribute("id", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
      var selectInput = document.getElementById("select-selected");
      var btnCall = document.getElementById("btn-to-call");
      if (document.getElementById("contact-city").value == 1) {
        cityCard.style.display = "block";
        selectInput.classList.add("choosed");
        cityName.innerHTML = "Canandaigua, NY";
        cityPhone.innerHTML = "+1	585	393 0001";
        cityAdress.innerHTML = "151 Charlotte Street";
        btnCall.href = 'tel:+15853930001';
      } else if (document.getElementById("contact-city").value == 2) {
        cityCard.style.display = "block";
        selectInput.classList.add("choosed");
        cityName.innerHTML = "New York City";
        cityPhone.innerHTML = "+1	212	456 0002";
        cityAdress.innerHTML = "9 East 91st Street";
        btnCall.href = 'tel:+12124560002';
      } else if (document.getElementById("contact-city").value == 3) {
        cityCard.style.display = "block";
        selectInput.classList.add("choosed");
        cityName.innerHTML = "Yonkers, NY";
        cityPhone.innerHTML = "+1	914	678 0003";
        cityAdress.innerHTML = "511 Warburton Ave";
        btnCall.href = 'tel:+19146780003';
      } else if (document.getElementById("contact-city").value == 4) {
        cityCard.style.display = "block";
        selectInput.classList.add("choosed");
        cityName.innerHTML = "Sherrill, NY";
        cityPhone.innerHTML = "+1	315	908 0004";
        cityAdress.innerHTML = "14 WEST Noyes BLVD";
        btnCall.href = 'tel:+13159080004';
      }

    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);