//* VIEWS
let usersView = document.querySelector('#users-view')
let newRentView = document.querySelector('#add-rent-view')
let editDeleteView = document.querySelector('#edit-delete-view')
let editRentView = document.querySelector('#edit-rent-view')
let usersTbody = usersView.querySelector('tbody')
let editDeleteTbody = editDeleteView.querySelector('tbody')
//* BUTTONS
let usersTableBtn = document.querySelector('#users-view-btn')
let newRentBtn = document.querySelector('#new-rent-view-btn')
let saveBtn = document.querySelector("#save-btn")
let editSaveBtn = document.querySelector("#edit-save-btn")
let editDeleteBtn = document.querySelector("#edit-delete-btn")
//* FORMS
let phoneSelect = document.querySelector('#phone-select')
let tariffSelect = document.querySelector('#tariff-select')
let inputId = document.querySelector('[name="input-id"]')
let  inputUser= document.querySelector('[name="user"]')
let  startDate= document.querySelector("#startDate")
let  endDate= document.querySelector("#endDate")
//*EDIT FORMS
let editPhoneSelect = document.querySelector('#edit-phone-select')
let editTariffSelect = document.querySelector('#edit-tariff-select')
let editInputId = document.querySelector('[name="edit-input-id"]')
let  editInputUser= document.querySelector('[name="edit-user"]')
let  editStartDate= document.querySelector("#edit-startDate")
let  editEndDate= document.querySelector("#edit-endDate")
//* LISTENERS
newRentBtn.addEventListener('click',displayNewRentView)
usersTableBtn.addEventListener('click',displayUsersView)
saveBtn.addEventListener('click',saveNewRent)
editSaveBtn.addEventListener('click', editRent)
editDeleteBtn.addEventListener('click',displayEditDeleteView)

//* SAVE and EDIT RENT
function saveNewRent ()  {
let newRent =     {
    id: inputId.value,
    user: inputUser.value,
    phone:phoneSelect.value,
    tariff: tariffSelect.value,
    startDate: startDate.value,
    endDate: endDate.value
}
dataBase.push(newRent)
    createUsersTable()
    displayUsersView()
    resetInputForm()
}

function editRent () {
let currentUser = dataBase.find(user => user.id === this.getAttribute('data-id'))
    currentUser.user = editInputUser.value
    currentUser.phone = editPhoneSelect.value
    currentUser.tariff = editTariffSelect.value
    currentUser.startDate = editStartDate.value
    currentUser.endDate = editEndDate.value

    createUsersTable()
    displayUsersView()
}


//* RESET INPUT FORM FUNCTION
function resetInputForm() {
    inputId.value = ''
    inputUser.value = ''
    phoneSelect.value = ''
    tariffSelect.value = ''
    startDate.value = ''
    endDate.value = ''
}

//* FUNCTION FOR DISPLAYING
function displayNewRentView(e) {
    e.preventDefault()
    createPhoneOptions()
    createTariffOptions()

    newRentView.style.display = 'block'
    usersView.style.display = 'none'
    editDeleteView.style.display = 'none'
    editRentView.style.display = 'none'
}
function displayUsersView(e) {
    if (e){
        e.preventDefault()
    }
    usersView.style.display = 'block'
    newRentView.style.display = 'none'
    editDeleteView.style.display = 'none'
    editRentView.style.display = 'none'
}

function displayEditDeleteView(e) {
    if (e){
        e.preventDefault()
    }
    createEditDeleteTable()
    editDeleteView.style.display = 'block'
    usersView.style.display = 'none'
    newRentView.style.display = 'none'
    editRentView.style.display = 'none'
}



function displayEditView () {
    let id = this.getAttribute('data-id')
    editSaveBtn.setAttribute('data-id', id)
let currentUser = dataBase.find(user => user.id === id);
    
fillEditForm(currentUser)

    editRentView.style.display= 'block'
    usersView.style.display = 'none'
    newRentView.style.display = 'none'
    editDeleteView.style.display = 'none'

}

//* CREATE PHONE AND TARIFF OPTIONS FUNCTION
function createPhoneOptions() {
let text = ``
    allPhones.forEach(phone => {
        text += `
<option value="${phone}">${phone}</option>
`.trim()
    })
    phoneSelect.innerHTML = text
}
function createTariffOptions() {
    let text = ``
    allTariffs.forEach(tariff => {
        text += `
        <option value="${tariff}">${tariff} </option>
        `.trim()
    })
    tariffSelect.innerHTML = text
}

//* CREATE EDIT PHONE AND TARIFF OPTIONS FUNCTION
function createEditPhoneOptions(currentPhone) {
    let text = ``
    allPhones.forEach(phone => {
        text += `
<option value="${phone}"${(phone === currentPhone) ? "selected" : ""}>${phone}</option>
`.trim()
    })
    editPhoneSelect.innerHTML = text
}
function createEditTariffOptions(currentTariff) {
    let text = ``
    allTariffs.forEach(tariff => {
        text += `
        <option value="${tariff}" ${(tariff === currentTariff) ? "selected" : ""}>${tariff} </option>
        `.trim()
        })
    editTariffSelect.innerHTML = text
}

createUsersTable()

function createUsersTable() {
    let text = ''
dataBase.forEach (user => {
    text += `
    <tr>
    <td>${user.id}</td>
    <td>${user.user}</td>
    <td>${user.phone}</td>
    <td>${user.tariff}</td>
    <td>${user.startDate}</td>
    <td>${user.endDate}</td>
    </tr>
`.trim()

})
        usersTbody.innerHTML = text
}
function createEditDeleteTable() {
    let text = ''
    dataBase.forEach ((user,index) => {
        text += `
    <tr>
    <td>${user.id}</td>
    <td>${user.user}</td>
    <td>${user.phone}</td>
    <td>${user.tariff}</td>
    <td>${user.startDate}</td>
    <td>${user.endDate}</td>
    <td><button id="delete-btn" class="btn btn-sm btn-danger" data-id="${user.id}">Delete</button></td>
    <td><button id="edit-btn" class="btn btn-sm btn-warning"  data-id="${user.id}">Edit</button></td>
    </tr>
`.trim()

    })
    //! DELETE BUTTON
    editDeleteTbody.innerHTML = text
let allDeleteBtns = document.querySelectorAll('#delete-btn')
    allDeleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click',deleteUser)
        //! EDIT BUTTON
        let allEditBtns = document.querySelectorAll('#edit-btn')
        allEditBtns.forEach(editBtn => {
            editBtn.addEventListener('click',displayEditView)
        })
    })
}




//* DELETE SELECT USER FUNCTION
function deleteUser() {
let id = this.getAttribute('data-id');
dataBase = dataBase.filter(user => user.id!== id)
    createUsersTable()
    displayUsersView()
    displayEditDeleteView()
}
//* FILL EDIT FUNCTION
function fillEditForm(currentUser) {

    editInputId.value = currentUser.id
    editInputUser.value = currentUser.user
    // editPhoneSelect.value = currentUser.phone
    createEditPhoneOptions(currentUser.phone)
    // editTariffSelect.value = currentUser.tariff
    createEditTariffOptions(currentUser.tariff)
    editStartDate.value = currentUser.startDate
    editEndDate.value = currentUser.endDate

}






