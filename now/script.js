// script.js

function convertToEra(year, month, day) {
    const date = new Date(year, month - 1, day);
    if (date >= new Date(2019, 4, 1)) {  // 令和時代
        return `令和${year - 2018}年${month}月${day}日`;
    } else if (date >= new Date(1989, 0, 8)) {  // 平成時代
        return `平成${year - 1988}年${month}月${day}日`;
    } else if (date >= new Date(1926, 11, 25)) {  // 昭和時代
        return `昭和${year - 1925}年${month}月${day}日`;
    } else if (date >= new Date(1912, 6, 30)) {  // 大正時代
        return `大正${year - 1911}年${month}月${day}日`;
    } else if (date >= new Date(1868, 8, 8)) {  // 明治時代
        return `明治${year - 1867}年${month}月${day}日`;
    } else {
        return "該当なし";
    }
}

function updateDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const gregorian = `西暦: ${year}年${month}月${day}日 ${hours}時${minutes}分${seconds}秒`;

    // 令和6年を基準に計算
    const reiwaYear = year >= 2019 ? year - 2018 : null;
    const heiseiYear = reiwaYear !== null ? reiwaYear + 30 : null;
    const showaYear = reiwaYear !== null ? reiwaYear + 93 : null;
    const taishoYear = reiwaYear !== null ? reiwaYear + 108 : null;
    const meijiYear = reiwaYear !== null ? reiwaYear + 151 : null;

    const reiwa = reiwaYear !== null ? `令和: ${reiwaYear}年${month}月${day}日 ${hours}時${minutes}分${seconds}秒` : "令和: 該当なし";
    const heisei = heiseiYear !== null ? `平成: ${heiseiYear}年${month}月${day}日 ${hours}時${minutes}分${seconds}秒` : "平成: 該当なし";
    const showa = showaYear !== null ? `昭和: ${showaYear}年${month}月${day}日 ${hours}時${minutes}分${seconds}秒` : "昭和: 該当なし";
    const taisho = taishoYear !== null ? `大正: ${taishoYear}年${month}月${day}日 ${hours}時${minutes}分${seconds}秒` : "大正: 該当なし";
    const meiji = meijiYear !== null ? `明治: ${meijiYear}年${month}月${day}日 ${hours}時${minutes}分${seconds}秒` : "明治: 該当なし";

    document.getElementById('gregorian').textContent = gregorian;
    document.getElementById('reiwa').textContent = reiwa;
    document.getElementById('heisei').textContent = heisei;
    document.getElementById('showa').textContent = showa;
    document.getElementById('taisho').textContent = taisho;
    document.getElementById('meiji').textContent = meiji;
}

setInterval(updateDateTime, 1000);
updateDateTime();
