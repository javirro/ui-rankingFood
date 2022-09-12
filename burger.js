const mainSelect = document.getElementById("bg-select-action");
const seeDiv = document.getElementById("bg-see-ranking");
const addDiv = document.getElementById("bg-add");
const resultDiv = document.getElementById("bg-ranking-current");
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};
const API_URL = 'https://ranking-git-master-javirro.vercel.app'
const searchBurgers = async() => {
    resultDiv.innerHTML = ""
    const response = await fetch(`${API_URL}/burger`);
    const bgPromise = response.json();
    bgPromise.then((data) => showData(data))
};


searchBurgers()
const showData = (data) => {
    const number = data.length;
    const table = document.createElement("table");
    table.setAttribute("class", "myTable");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const trH = document.createElement("tr");
    const th1 = document.createElement("th");
    th1.setAttribute("colSpan", "2");
    th1.style.textAlign = "center";
    trH.style.backgroundColor = "#12f037";
    trH.append(th1);
    th1.innerHTML = "BURGER RANKING";
    thead.appendChild(trH);
    for (let i = 0; i < number; i++) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        td1.innerHTML = `<b>${ i + 1}</b>`;
        td1.style.width = "60px"
        td1.style.textAlign = "center";
        td2.innerHTML = data[i];
        td2.style.marginLeft = "5px"
        tr.append(td1, td2);
        tbody.append(tr);
    }
    table.append(thead, tbody);
    resultDiv.append(table);
};

const btAdd = document.getElementById("bg-bt-add");
btAdd.addEventListener("click", async() => {
    const numberRes = await fetch(`${API_URL}/burger/number`);
    const number = await numberRes.json();
    const position = document.getElementById("bg-position").value;
    const where = document.getElementById("bg-where").value;
    if (position > number + 1) alert(`You only have ${number} burgers in the ranking.`);
    else {
        const bodyData = JSON.stringify({
            where: where,
            position: position,
        });
        const response = await fetch(`${API_URL}/burger`, {
            method: "POST",
            headers: headers,
            body: bodyData,
        });
    }
});