const mainSelect = document.getElementById("ck-select-action");
const seeDiv = document.getElementById("ck-see-ranking");
const addDiv = document.getElementById("ck-add");
const currentRankingDiv = document.getElementById('ck-ranking-current')
const btAdd = document.getElementById("ck-bt-add");
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};
const API_URL = 'https://ranking-git-master-javirro.vercel.app'

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
    th1.innerHTML = "CHEESECAKES RANKING";
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
    currentRankingDiv.append(table);
};


const searchCheesecakes = async() => {
    currentRankingDiv.innerHTML = "";
    const response = await fetch(`${API_URL}/cheesecake`);
    const ckPromise = response.json();
    ckPromise.then((data) => showData(data));
};

searchCheesecakes();

btAdd.addEventListener("click", async() => {
    const numberRes = await fetch(`${API_URL}/cheesecake/number`);
    const number = await numberRes.json();
    const where = document.getElementById("ck-where").value;
    const position = document.getElementById("ck-position").value;
    if (position > number + 1)
        alert(`You only have ${number} cheesecakes in the ranking.`);
    else {
        const bodyData = JSON.stringify({
            where: where,
            position: position,
        });
        const response = await fetch(`${API_URL}/cheesecake`, {
            method: "POST",
            headers: headers,
            body: bodyData,
        });
    }
});