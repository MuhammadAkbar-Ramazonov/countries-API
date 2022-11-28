const elBtn = document.querySelector('.header-darkmode');
const elTemp = document.querySelector(".countries-temp").content;
const elList = document.querySelector(".hero-section-list");
const elSelect = document.querySelector(".form-selects");

const elForm = document.querySelector(".site-search");
const elFormIput = document.querySelector(".site-search-input");

// modal
// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// darkMode
elBtn.addEventListener('click', () => {
    document.body.classList.toggle('theme-dars')
});

// render arr
function render(arr, node){
    node.innerHTML = "";
    arr.forEach(element => {
        const elCloneTemp = elTemp.cloneNode(true);
        elCloneTemp.querySelector(".hero-section-item-img").src = element.flags.svg;
        elCloneTemp.querySelector(".hero-section-item-img").alt = element.name.common;
        elCloneTemp.querySelector(".hero-section-item-wrapper-title").textContent = element.name.common;
        elCloneTemp.querySelector(".population-desc").textContent = element.population;
        elCloneTemp.querySelector(".region-desc").textContent = element.region;
        elCloneTemp.querySelector(".capital-desc").textContent = element.capital;
        node.appendChild(elCloneTemp);

    });
};

// get arr
async function getRegion(url) {
    const res = await fetch(url);
    const data = await res.json();
    
    render(data, elList);
};

getRegion("https://restcountries.com/v3.1/all");


elSelect.addEventListener("change", ()=> {
    elSelectValue = elSelect.value; 
    getRegion(`https://restcountries.com/v3.1/region/${elSelectValue}`);
});

elForm.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    
    const elFormIputValue = elFormIput.value; 
    getRegion(`https://restcountries.com/v3.1/name/${elFormIputValue}`);
    
});

// modal 



// When the user clicks on the button, open the modal
elList.addEventListener("click", evt =>{
    evt.preventDefault();
    if (evt.target.matches("#myBtn")) {
        document.body.style.overflow = "hidden"
        modal.style.display = "block";  
        modal.style.overflow = "hidden";        

    }
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "scroll"


};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "scroll"
    }
};
