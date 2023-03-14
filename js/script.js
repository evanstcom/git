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
        let buttonRemove = document.createElement("button");
        buttonRemove.className = "comment__remove";
        buttonRemove.addEventListener("click", removeComment);
        buttonRemove.innerHTML = `<svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="729.837px"
        height="729.838px"
        viewBox="0 0 729.837 729.838"
        style="
            enable-background: new 0 0 729.837
                729.838;
        "
        xml:space="preserve"
    >
        <path
            d="M589.193,222.04c0-6.296,5.106-11.404,11.402-11.404S612,215.767,612,222.04v437.476c0,19.314-7.936,36.896-20.67,49.653
c-12.733,12.734-30.339,20.669-49.653,20.669H188.162c-19.315,0-36.943-7.935-49.654-20.669
c-12.734-12.734-20.669-30.313-20.669-49.653V222.04c0-6.296,5.108-11.404,11.403-11.404c6.296,0,11.404,5.131,11.404,11.404
v437.476c0,13.02,5.37,24.922,13.97,33.521c8.6,8.601,20.503,13.993,33.522,13.993h353.517c13.019,0,24.896-5.394,33.498-13.993
c8.624-8.624,13.992-20.503,13.992-33.498V222.04H589.193z"
        ></path>
        <path
            d="M279.866,630.056c0,6.296-5.108,11.403-11.404,11.403s-11.404-5.107-11.404-11.403v-405.07
c0-6.296,5.108-11.404,11.404-11.404s11.404,5.108,11.404,11.404V630.056z"
        ></path>
        <path
            d="M376.323,630.056c0,6.296-5.107,11.403-11.403,11.403s-11.404-5.107-11.404-11.403v-405.07
c0-6.296,5.108-11.404,11.404-11.404s11.403,5.108,11.403,11.404V630.056z"
        ></path>
        <path
            d="M472.803,630.056c0,6.296-5.106,11.403-11.402,11.403c-6.297,0-11.404-5.107-11.404-11.403v-405.07
c0-6.296,5.107-11.404,11.404-11.404c6.296,0,11.402,5.108,11.402,11.404V630.056L472.803,630.056z"
        ></path>
        <path
            d="M273.214,70.323c0,6.296-5.108,11.404-11.404,11.404c-6.295,0-11.403-5.108-11.403-11.404
c0-19.363,7.911-36.943,20.646-49.677C283.787,7.911,301.368,0,320.73,0h88.379c19.339,0,36.92,7.935,49.652,20.669
c12.734,12.734,20.67,30.362,20.67,49.654c0,6.296-5.107,11.404-11.403,11.404s-11.403-5.108-11.403-11.404
c0-13.019-5.369-24.922-13.97-33.522c-8.602-8.601-20.503-13.994-33.522-13.994h-88.378c-13.043,0-24.922,5.369-33.546,13.97
C278.583,45.401,273.214,57.28,273.214,70.323z"
        ></path>
        <path
            d="M99.782,103.108h530.273c11.189,0,21.405,4.585,28.818,11.998l0.047,0.048c7.413,7.412,11.998,17.628,11.998,28.818
v29.46c0,6.295-5.108,11.403-11.404,11.403h-0.309H70.323c-6.296,0-11.404-5.108-11.404-11.403v-0.285v-29.175
c0-11.166,4.585-21.406,11.998-28.818l0.048-0.048C78.377,107.694,88.616,103.108,99.782,103.108L99.782,103.108z
M630.056,125.916H99.782c-4.965,0-9.503,2.02-12.734,5.274L87,131.238c-3.255,3.23-5.274,7.745-5.274,12.734v18.056h566.361
v-18.056c0-4.965-2.02-9.503-5.273-12.734l-0.049-0.048C639.536,127.936,635.021,125.916,630.056,125.916z"
        ></path>
    </svg>`;
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
