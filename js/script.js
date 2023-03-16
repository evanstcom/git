//Global
const repoList = document.getElementById("repo-list");
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

//Attach events
/* document.addEventListener("DOMContentLoaded", initApp); */

//Basic logic

function printRepo({ html_url, description, name, owner }) {
    const a = document.createElement("a");
    a.className = "element";
    a.target = "_blank";
    a.href = `${ html_url }`;
    //name
    const h3 = document.createElement("h3");
    h3.className = "element__name";
    h3.innerHTML = `${description === null ? 'Нет описания': description}`;
    //fields name and language
    const fields = document.createElement("div");
    fields.className = "element__fields";
    fields.innerHTML = `<div class="element__field1">${name}</div>
    <div class="element__field2">${owner.login}</div>`;
    a.append(fields);
    a.append(h3);
    repoList.append(a);
}

function alertError(error) {
    alert(error.message);
}

// Event logic
function handleSubmit(event) {
    event.preventDefault();
    const search = document.getElementById("search");
    if (search.value === '') return alert('Пустая строка поиска')
    repoList.innerHTML = "";
    Promise.all([getRepo(search.value)]).then((value) => {
        [repo] = value;
        if (repo.length === 0) {
            repoList.innerHTML = "Ничего не найдено";
        } else {
            repo.forEach((el) => {
                printRepo(el);
            });
        }
    });
}

// Async logic
async function getRepo(search) {
    try {
        const response = await fetch(
            "https://api.github.com/search/repositories?q=" +
                search +
                "&per_page=10"
        );
        const data = await response.json();
        return data.items;
    } catch (error) {
        alertError(error);
    }
}
