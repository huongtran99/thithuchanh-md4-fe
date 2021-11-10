
$(document).ready(function () {
    showList();
})

function getCity(city) {
    return `<tr>
                <td>${city.id}</td>
                <td><a href="#" onclick="detailCity(${city.id})">${city.name}</a></td>
                <td>${city.country.name}</td>
                <td><button onclick="showDelete(${city.id})">Delete</button></td>
                <td><button onclick="showCreateOrEdit(${city.id})">Update</button></td>
            </tr>`;
}

function detailCity(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/city/${id}`,
        success: function (city) {
            localStorage.setItem("currentCity", JSON.stringify(city));
            location.href ="detailCity.html";
        }
    });
    event.preventDefault();
}

function showList() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/city`,
        success: function (city) {
            let content = "";
            for (let i = 0; i < city.length; i++) {
                content += getCity(city[i]);
            }
            $("#showAll").html(content);
        }
    });
}

function showCountry(category) {
    return `<option value="${category.id}">${category.name}</option>`
}

function showCountries() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/countries`,
        success: function (country) {
            let content = "";
            for (let i = 0; i < country.length; i++) {
                content += showCountry(country[i]);
            }
            $("#country").html(content);
        }
    });
}

function showCreateOrEdit(id) {
    if (id === -1) {
        let myModal = new bootstrap.Modal(document.getElementById('modalCreate'));
        showCountries();
        myModal.show();
    } else {
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/city/${id}`,
            success: function (data) {
                let myModal = new bootstrap.Modal(document.getElementById('modalCreate'));
                $('#name').val(data.name);
                $('#id').val(data.id);
                $('#area').val(data.area);
                $('#population').val(data.population);
                $('#gdp').val(data.gdp);
                $('#description').val(data.description);
                showCountries();
                myModal.show();
            }
        });
        event.preventDefault();
    }
}

function createOrEdit(id) {
    let name = $('#name').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val()
    let description = $('#description').val()
    let country = $('#country').val()
    if (id === "") {
        let city = {
            name: name,
            area: area,
            population: population,
            gdp: gdp,
            description: description,
            country: {
                id: country
            }
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "Post",
            url: `http://localhost:8080/city`,
            data: JSON.stringify(city),
            success: function () {
                showList();
                alert("Create Success")
            }
        });
    } else {
        let city = {
            id: id,
            name: name,
            area: area,
            population: population,
            gdp: gdp,
            description: description,
            country: {
                id: country
            }
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "PUT",
            url: `http://localhost:8080/city/${id}`,
            data: JSON.stringify(city),
            success: function () {
                showList();
                alert("update Success")
            }
        });
    }
}
function showDelete(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/city/${id}`,
        success: function (data) {
            let myModal = new bootstrap.Modal(document.getElementById('modalDelete'));
            $('#idDelete').val(data.id);
            myModal.show();
        }
    });
    event.preventDefault();
}

function deleteProduct(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/city/${id}`,
        success: function () {
            showList();
            alert("Delete Success")
        }
    });
}
