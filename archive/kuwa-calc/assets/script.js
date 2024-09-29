document.getElementById('minCpuCheck').addEventListener('change', function () {
    document.getElementById('minCpu').disabled = !this.checked;
});

document.getElementById('minRamCheck').addEventListener('change', function () {
    document.getElementById('minRam').disabled = !this.checked;
});

document.getElementById('minSsdCheck').addEventListener('change', function () {
    document.getElementById('minSsd').disabled = !this.checked;
});

function calcpriceunit(n) {
    return 60 * n + 50;
}

function calculatePrice() {
    const vCPU = parseInt(document.getElementById('vCPU').value);
    const RAM = parseInt(document.getElementById('RAM').value);
    const SSD = parseInt(document.getElementById('SSD').value);

    const vCPUCost = calcpriceunit(vCPU);
    const RAMCost = calcpriceunit(RAM);
    const SSDCost = calcpriceunit(SSD);

    const totalPrice = vCPUCost + RAMCost + SSDCost;
    document.getElementById('priceResult').innerText = `総合計: ${totalPrice}円/月`;
}

function displayConfigurations() {
    const priceMin = parseInt(document.getElementById('priceMin').value);
    const priceMax = parseInt(document.getElementById('priceMax').value);
    const minCpuCheck = document.getElementById('minCpuCheck').checked;
    const minRamCheck = document.getElementById('minRamCheck').checked;
    const minSsdCheck = document.getElementById('minSsdCheck').checked;

    const minCpu = minCpuCheck ? parseInt(document.getElementById('minCpu').value) : 1;
    const minRam = minRamCheck ? parseInt(document.getElementById('minRam').value) : 1;
    const minSsd = minSsdCheck ? parseInt(document.getElementById('minSsd').value) : 1;

    let configs = [];
    let tableHTML = "<table><tr><th onclick='sortTable(0)'>vCPU数</th><th onclick='sortTable(1)'>RAM (GB)</th><th onclick='sortTable(2)'>SSD (10GB単位)</th><th onclick='sortTable(3)'>料金 (円/月)</th></tr>";

    for (let vCPU = minCpu; vCPU <= 10; vCPU++) {
        for (let RAM = minRam; RAM <= 10; RAM++) {
            for (let SSD = minSsd; SSD <= 10; SSD++) {
                const totalPrice = calcpriceunit(vCPU) + calcpriceunit(RAM) + calcpriceunit(SSD);

                if (totalPrice >= priceMin && totalPrice <= priceMax) {
                    configs.push({ vCPU, RAM, SSD: SSD * 10, totalPrice });
                }
            }
        }
    }

    configs.forEach(config => {
        tableHTML += `<tr><td>${config.vCPU}</td><td>${config.RAM}</td><td>${config.SSD}GB</td><td>${config.totalPrice}</td></tr>`;
    });

    tableHTML += "</table>";
    document.getElementById('affradconf').innerHTML = tableHTML;
}

let ascending = true;

function sortTable(columnIndex) {
    const table = document.getElementById('affradconf').getElementsByTagName('table')[0];
    const rows = Array.from(table.rows).slice(1);

    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].innerText;
        const bText = b.cells[columnIndex].innerText;

        if (columnIndex === 3) { 
            return ascending ? parseInt(aText) - parseInt(bText) : parseInt(bText) - parseInt(aText);
        } else {
            return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
        }
    });

    ascending = !ascending; 

    for (const row of rows) {
        table.appendChild(row);
    }
}
