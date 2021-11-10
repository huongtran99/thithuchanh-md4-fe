let currentCity = JSON.parse(localStorage.getItem("currentCity"));

$(document).ready(function () {
    showDetailCity();
})

function showListCity() {
    location.href = "listCity.html";
}

function showDetailCity() {
    let content = `
        <h1>Thành Phố ${currentCity.name}</h1> 
        <br>
             <button onclick="showListCity()">Xem Danh Sách Thành Phố</button>
        <br> <br>
        <div>Tên: ${currentCity.name}</div> <br>
        <div>Quốc Gia: ${currentCity.country.name}</div> <br>
        <div>Diện Tích: ${currentCity.area}</div> <br>
        <div>Dân Số: ${currentCity.population}</div> <br>
        <div>GDP: ${currentCity.gdp}</div> <br>
        <div>Giới Thiệu: </div> <br>
        <div>${currentCity.description}</div> <br>
        <div>
             <button onclick="showCreateOrEdit(${currentCity.id})">Chỉnh Sửa</button>
             <button onclick="showDelete(${currentCity.id})">Xóa</button>
        </div>
    `;
    $("#detail").html(content);
}

