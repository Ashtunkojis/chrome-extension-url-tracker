let myLeads = []

// var currentURL = window.location.href
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))



if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


function render(leads) {
    let listItems = ''
    for (let i = 0; i < leads.length; i++) {
        // ulEl.innerHTML += '<li>' + myLeads[i] + '</li>'
        //or
        // const li = document.createElement('li')
        // li.textContent = myLeads[i]
        // ulEl.append(li)
        // listItems += "<li><a target = '_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItems += `<li><a target='_blank' href ='${leads[i]}'>${leads[i]}
        </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })


})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener('click', function() {
    myLeads.push(inputEl.value)
        // myLeads.push(currentURL)
    inputEl.value = ''
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

})