"use strict";

const tabElement = document.querySelectorAll("[data-tabname]");

let tabs = [];

for (let i = 0; i < tabElement.length; i++) {
    tabs.push(tabElement[i]);
}

function asTabs(node) {
    const buttonList = document.createElement("div");

    tabs.forEach((tab, index) =>{
        const button = document.createElement("button");
        button.textContent = document.querySelectorAll("div")[index].getAttribute("data-tabname");
        buttonList.appendChild(button);
        console.log(button);  
        
        button.addEventListener('click', () => {
            selectTab(index);
        });
    });
    node.insertBefore(buttonList, node.firstChild);

    function selectTab(index) {
        tabs.forEach(function(tab, i) {
        if (index == i) {
            tab.style.display = '';
        } else {
            tab.style.display = 'none';
        }
        });
    };
    selectTab(0); 
};

asTabs(document.querySelector("tab-panel"));
