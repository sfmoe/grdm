

const showData = async ()=>{
    const spinner = document.querySelector(".usage .spinner-border");
    spinner.style.display = "block";
    const url = "/api/meters";

    const apiFetch = await fetch(url);
    let usageGet = await apiFetch.json();
    let data = usageGet.data;
    spinner.style.display = "none";
      new Chart(
        document.getElementById('usageDetails'),
        {
          type: 'bar',
          data: {
            labels: data.map(row => row[0]),
            datasets: [
              {
                label: 'Usage in kw',
                data: data.map(row => row[1])
              }
            ]
          }
        }
      );

}

const tableDataCell = (data)=>{
  const td = document.createElement("td");
  let text = document.createTextNode(data);
  td.appendChild(text);
  return td;
}

const showBilling = async ()=>{
 
  const table = document.querySelector(".billing-table");
  const spinner = document.querySelector(".billing-table .table-loading");
  spinner.style.display = "table-cell";
  const url = "/api/services";

  const apiFetch = await fetch(url);
  let billingGet = await apiFetch.json();
  let data = billingGet.data.data; 
  spinner.style.display = "none";
  data.forEach(el => {
  // create table row
      const tr = document.createElement("tr");
      tr.appendChild(tableDataCell(el.attributes.start))
      tr.appendChild(tableDataCell(el.attributes.end))
      tr.appendChild(tableDataCell(`${el.attributes.use}${el.attributes.useUnit}`))
      let formatCurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(el.attributes.cost)
      tr.appendChild(tableDataCell(formatCurrency));
      let download = tableDataCell("");
        let button = document.createElement("a");
        button.classList.add("btn")
        button.classList.add("btn-primary")
        button.href = el.attributes.fileUrl;
        button.innerText = "download";
      download.appendChild(button);
      tr.appendChild(download)
    // append row
      table.querySelector("tbody").appendChild(tr)
    
  });
}

window.addEventListener("load", ()=>{
  showData();
  showBilling();
});