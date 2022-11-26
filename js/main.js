const elBtn = document.querySelector('.header-darkmode');
const elTemp = document.querySelector(".countries-temp").content;
const elList = document.querySelector(".hero-section-list");
const elSelect = document.querySelector(".form-selects");

const elForm = document.querySelector(".site-search");
const elFormIput = document.querySelector(".site-search-input");

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