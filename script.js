let Title = document.getElementById('title')
let Price = document.getElementById('Price')
let Taxes = document.getElementById('Taxes')
let Ads = document.getElementById('Ads')
let Discount = document.getElementById('Discount')
let Total = document.getElementById('Total')
let Count = document.getElementById('Count')
let Category = document.getElementById('Category')
let Submit = document.getElementById('Submit')
let mood = 'create'
let tmp;

// Get Total
function GetTotal() {
    if (Price.value != '') {
        let Result = (+Price.value + +Taxes.value + +Ads.value) - +Discount.value
        Total.innerHTML = Result
        Total.style.background = "#00b400"
    } else {
        Total.innerHTML = ''
        Total.style.background = "#e30f00"
    }
}

// Create Product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = []
}

Submit.onclick = function() {
    let newPro = {
        title: Title.value,
        price: Price.value,
        taxes: Taxes.value,
        ads: Ads.value,
        discount: Discount.value,
        total: Total.innerHTML,
        count: Count.value,
        category: Category.value,
    }
    if (Title.value != '' && Price.value != '' && Category.value != '') {
        if (mood === 'create') {
            // Count
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro)
                clearData()
            }
        } else {
            dataPro[tmp] = newPro
            mood = 'create'
            Submit.innerHTML = "Create"
            Count.style.display = "block"
                // clearData()
        }
    }
    // Save Localstorage
    localStorage.setItem('product', JSON.stringify(dataPro))
    showData()
}

// Clear Input
function clearData() {
    Title.value = ''
    Price.value = ''
    Taxes.value = ''
    Ads.value = ''
    Discount.value = ''
    Total.innerHTML = ''
    Count.value = ''
    Category.value = ''
}

showData()

// Read
function showData() {
    GetTotal()
    let table = ''
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updataData(${i})" id="Update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table
    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    } else {
        btnDelete.innerHTML = ''
    }
}

// Delete
function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// Update
function updataData(i) {
    Title.value = dataPro[i].title
    Price.value = dataPro[i].price
    Taxes.value = dataPro[i].taxes
    Ads.value = dataPro[i].ads;
    Discount.value = dataPro[i].discount;
    GetTotal();
    Count.style.display = "none"
    Category.value = dataPro[i].category
    Submit.innerHTML = "Update"
    mood = "Update"
    tmp = i
    scroll({
        top: 0
    })
}
// Search
let searchMood = 'title'

function getSeacrchMood(id) {
    let search = document.getElementById("Scarch")
    if (id == "SearchTitle") {
        searchMood = 'title'
        search.placeholder = "Search By Title"
    } else {
        searchMood = 'category'
        search.placeholder = "Search By Category"
    }
    search.focus()
    search.value = '';
    showData()
    console.log(searchMood)
}

function SearchData(value) {
    let table = ''
    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value)) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updataData(${i})" id="Update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
                    </tr>
                `
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value)) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updataData(${i})" id="Update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
                    </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table
}

// Clean Data