// 1. 시트 ID (그대로 유지)
const sheetId = "1c9QcpPbATp2R3Jxf9f7tq5BZe-KYGuXMGtnBUZ4Fhdc";

// 2. 구글 시트 데이터 주소
const originalUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;


// 3. [중요] CORS 에러를 해결해주는 우회 주소 입히기
// 이 주소를 통하면 구글 보안 정책을 우회해서 데이터를 가져올 수 있습니다.
const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(originalUrl);

const container = document.getElementById('wishlist-container');

// 4. 우회 주소(proxyUrl)를 사용하여 데이터 불러오기
Papa.parse(proxyUrl, {
    download: true,
    header: true,

    complete: function (results) {
        const data = results.data;
        console.log("데이터 가져오기 성공:", data);

        container.innerHTML = "";

        data.forEach(row => {
            // item 열에 데이터가 있는 경우에만 표시
            if (!row.item || row.item.trim() === "") return;

            // 이 줄을 추가해서 콘솔창(F12)에 데이터가 몇 개 찍히는지 보세요!
            console.log("불러온 총 아이템 개수:", data.length);
            console.log("아이템 리스트:", data);

            const li = document.createElement('li');
            li.className = 'item';
            li.innerHTML = `
                <div class="info">
                    <div class="item-name">${row.item}</div>
                    <div class="price">${row.price + '₩'}</div>
                    <div class="size">${row.option || '-'}</div>
                    <div class="link">
                        <a href="${row.link}" target="_blank">link↗</a>
                    </div>
                    <div class="img">
                         <a href="${row.link}" target="_blank">
                            <img src="${row.img}" alt="${row.item}" style="width:100%; height:auto;">
                         </a>
                    </div>
                </div>
            `;
            container.appendChild(li);
        });
    },
    error: function (err) {
        console.error("데이터 로딩 에러:", err);
    }
});