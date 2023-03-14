let formName = document.querySelector("#name");
let formDate = document.querySelector("#date");
date.value = getToday();
function getToday() {
    let today = new Date();
    let day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    let month = today.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    return today.getFullYear() + "-" + month + "-" + day;
}
console.log(date.value);
let formMessage = document.querySelector("#message");
let commentList = document.querySelector("#comments");
let form = document
    .querySelector("#form")
    .addEventListener("keydown", formKeydown);
let comments = [];
loadComments();

document.querySelector("#submit").addEventListener("click", addComment);

function formKeydown(e) {
    if (e.code == "enter") {
        form.submit();
    }
}

function handleLikeChange() {
    comments[this.parentElement.parentElement.dataset.id].like =
        !comments[this.parentElement.parentElement.dataset.id].like;
    saveComments();
    showComments();
}

function removeComment() {
    this.parentElement.remove();
    comments.splice(this.parentElement.dataset.id, 1);
    saveComments();
}
//добавление комментариев
function addComment(event) {
    event.preventDefault();
    if (formName.value === "") {
        return (error.style.display = "block");
        /*         return alert("Введите имя!"); */
    }
    if (formMessage.value === "") {
        return (error.style.display = "block");
        /*         return alert("Сообщение слишком короткое!"); */
    }
    if (new Date() < new Date(formDate.valueAsDate)) {
        return alert("Введите корректную дату!");
    }

    let comment = {
        name: formName.value,
        message: formMessage.value,
        date: getDate(),
        like: false,
    };
    comments.push(comment);
    formName.value = "";
    formMessage.value = "";
    formDate.value = getToday();
    saveComments();
    showComments();
}
//сохраняем комменты
function saveComments() {
    localStorage.setItem("comments", JSON.stringify(comments));
}
//загрузка комментариев
function loadComments() {
    if (localStorage.getItem("comments"))
        comments = JSON.parse(localStorage.getItem("comments"));
    showComments();
}
//показать комментарии
function showComments() {
    commentList.innerHTML = "";
    comments.forEach(function (item, index) {
        let comment = document.createElement("div");
        comment.className = "comment";
        comment.dataset.id = index;
        comment.innerHTML = `
        <div class="comment__info">
            <h3 class="comment__name">${item.name}</h3>
            <h3 class="comment__date">${item.date}</h3>
        </div>
        <p class="comment__message">${item.message}</p>
    </div>`;
        let buttonRemove = document.createElement("div");
        buttonRemove.className = "comment__remove";
        buttonRemove.addEventListener("click", removeComment);
        buttonRemove.innerHTML = `<svg width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"/></svg>`;
        let buttonLike = document.createElement("label");
        buttonLike.className = "comment__like";
        let checkbox = document.createElement("input");
        checkbox.className = "comment__checkbox";
        checkbox.type = "checkbox";
        checkbox.checked = item.like;
        checkbox.addEventListener("change", handleLikeChange);
        buttonLike.append(checkbox);
        let div = document.createElement("div");
        div.className = `comment__like-style ${
            item.like ? "comment__like_active" : ""
        }`;
        div.innerHTML = `<svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="32px"
        height="32px"
        viewBox="0 0 32 32"
        style="enable-background: new 0 0 32 32"
        xml:space="preserve"
    >
        <path
            d="M14.708,15.847C14.252,14.864,14,13.742,14,12.5s0.252-2.489,0.708-3.659c0.455-1.171,1.114-2.266,1.929-3.205
c0.814-0.938,1.784-1.723,2.86-2.271C20.574,2.814,21.758,2.5,23,2.5s2.426,0.252,3.503,0.707c1.077,0.456,2.046,1.115,2.86,1.929
c0.813,0.814,1.474,1.784,1.929,2.861C31.749,9.073,32,10.258,32,11.5s-0.252,2.427-0.708,3.503
c-0.455,1.077-1.114,2.047-1.929,2.861C28.55,18.678,17.077,29.044,16,29.5l0,0l0,0C14.923,29.044,3.45,18.678,2.636,17.864
c-0.814-0.814-1.473-1.784-1.929-2.861C0.252,13.927,0,12.742,0,11.5s0.252-2.427,0.707-3.503C1.163,6.92,1.821,5.95,2.636,5.136
C3.45,4.322,4.42,3.663,5.497,3.207C6.573,2.752,7.757,2.5,9,2.5s2.427,0.314,3.503,0.863c1.077,0.55,2.046,1.334,2.861,2.272
c0.814,0.939,1.473,2.034,1.929,3.205C17.748,10.011,18,11.258,18,12.5s-0.252,2.364-0.707,3.347
c-0.456,0.983-1.113,1.828-1.929,2.518"
        />
    </svg> `;
        buttonLike.append(div);
        comment.append(buttonRemove);
        comment.append(buttonLike);
        commentList.append(comment);
    });
}
//преобразование даты
function getDate() {
    let today = new Date();
    let minutes =
        today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    let hours =
        today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
    if (formDate.value === "") {
        return "Сегодня " + hours + ":" + minutes;
    }
    let newDate = new Date(formDate.valueAsDate);
    let day =
        newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    let month = newDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    if (
        today.getDate() === newDate.getDate() &&
        today.getMonth() === newDate.getMonth() &&
        today.getFullYear() === newDate.getFullYear()
    ) {
        return "Сегодня " + hours + ":" + minutes;
    }
    if (
        today.getDate() - 1 === newDate.getDate() &&
        today.getMonth() === newDate.getMonth() &&
        today.getFullYear() === newDate.getFullYear()
    ) {
        return "Вчера " + hours + ":" + minutes;
    }
    return (
        day +
        "." +
        month +
        "." +
        newDate.getFullYear() +
        " " +
        hours +
        ":" +
        minutes
    );
}

//регируем на изменения в форме
function changeInput() {
    return (error.style.display = "none");
}
