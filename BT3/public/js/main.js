// define
const actionAPI = 'http://localhost:3000/action'
const listTask = document.getElementById('area-list-task');
const addAction = document.getElementById('btn-toggle-form');
const areaForm = document.getElementById('area-form');
const nameElement = document.getElementById('input-name');
const levelElement = document.getElementById('input-status');
const submitElement = document.getElementById('btn-submit');
const sortDisplay = document.getElementById('sort-display');
const sortValue = document.querySelectorAll('.sort-value');
const btnCancel = document.querySelector('#btn-cancel');

// Cotroller
const main = ()=>{
    // code
    getAction(renderAction);
    handleAddAction();
    handleCancel();
    sortClick();
}
main()

// model
// get API
function getAction(cb){ 
    fetch(actionAPI)
        .then(res => res.json())
        .then(cb);
}

// render 
function renderAction (action){
    let sort = sortDisplay.innerText.split(' - ');
    handleSort(action, sort[0], sort[1]);
    var html = action.map((value, index) =>{
        let level = (value.level === 'high') ? 'bg-danger': ((value.level === 'medium') ? 'bg-info': 'bg-dark');
        return `
            <tr>
                <td>${index + 1}</th>
                <td>${value.name}</td>
                <td><span class="badge ${level}">${value.level}</span></td>
                <td>
                    <button class="btn btn-warning" onclick="handleEdit(${value.id}, '${value.name}', '${value.level}')">Edit</button>
                    <button class="btn btn-danger" onclick="handleDelete(${value.id})">Delete</button>
                </td>
            </tr>
        `
    })
    listTask.innerHTML = html.join('');
}
//cancel btn click
function handleCancel() {
    btnCancel.onclick = () => {
        areaForm.classList.toggle('d-none');
    }    
}

//click sort options
function sortClick() {
    sortValue.forEach(value => {
        value.onclick = () => {
            sortDisplay.innerText = value.innerText.toUpperCase();
            getAction(renderAction);
        }
    })
}

//add task
function handleAddAction() {
    addAction.onclick = () => {
        if(!areaForm.classList.toggle('d-none')){
            handleSubmitForm();
        }
    }
}

// get data to form
function handleSubmitForm(){
    submitElement.onclick = function(){
        let data = {
            name: nameElement.value,
            level: levelElement.value
        }
        saveAction(data,function(){
            getAction(renderAction)
        })
    }
}

// save data 
function saveAction (data,cb){
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(actionAPI,option)
    .then(res => res.json())
    .then(cb)
}

//delete
function handleDelete(id, cb) {
    if(confirm("Bạn có muốn xóa không?")){
        let option = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        fetch(actionAPI + "/" + id, option).then(res => res.json()).then(getAction(renderAction));
    }
}

//Edit
function handleEdit(id, name, level){
    if(areaForm.classList.contains('d-none')){
        areaForm.classList.remove('d-none');
    }
    nameElement.value = name;
    levelElement.value = level;
    submitElement.innerText = 'Save';
    submitElement.onclick = () => {
        let data = {
            name: `${nameElement.value}`,
            level: `${levelElement.value}`
        };
        let option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }
        fetch(actionAPI + "/" + id, option).then(res => res.json()).then(getAction(renderAction));
        areaForm.classList.toggle('d-none');
    }
} 

//sort 
function handleSort(data, key, asc) {
    key = key.toLowerCase();
    if(asc === 'ASC') 
        data = sortAsc(data, key);
    else
        data = sortDesc(data, key);
}

//sort asc
function sortAsc(data, key) {
    for (let i = 0; i < data.length - 1; i++) 
        for(let y = i + 1; y < data.length; y++)
            if(data[i][key] > data[y][key]) {
                let temp = data[i];
                data[i] = data[y];
                data[y] = temp;
            }
}

//sort desc
function sortDesc(data, key) {
    for (let i = 0; i < data.length - 1; i++) 
        for(let y = i + 1; y < data.length; y++)
            if(data[i][key] < data[y][key]) {
                let temp = data[i];
                data[i] = data[y];
                data[y] = temp;
            }
} 

// ---> URL parameters
//http://localhost:3000/action?_sort=<...>&_order=<...>
//http://localhost:3000/action?name=<...>
//http://localhost:3000/action?id=<...>
//http://localhost:3000/action?level=<...>