<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>menu-data.js - 제주도 메뉴 데이터베이스</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <style>
        pre { font-family: 'Courier New', monospace; }
        .code-container { background: #1a1a1a; color: #f8f8f2; }
    </style>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">
                <i class="fas fa-utensils mr-3 text-orange-500"></i>
                menu-data.js
            </h1>
            <p class="text-gray-600">제주도 맛집별 메뉴, 가격, 추천 조합 데이터베이스</p>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 code-container">
            <pre class="text-sm overflow-x-auto"><code>// menu-data.js - 제주도 맛집 메뉴 데이터베이스
// 사용법: 이 파일을 다운로드하여 .js 확장자로 저장하세요

const JEJU_MENU_DATA = {
    // 흑돼지 전문점
    "돔베돈": {
        id: "dombe_don",
        name: "돔베돈",
        category: "흑돼지",
        rating: 4.6,
        priceRange: "₩₩₩",
        agePreference: { "20s": 25, "30s": 35, "40s": 30, "50s": 10 },
        menu: [
            { item: "흑돼지 목살구이", price: 18000, recommended: true, description: "부드럽고 담백한 목살" },
            { item: "흑돼지 삼겹살", price: 16000, recommended: true, description: "제주 대표 흑돼지" },
            { item: "갈비살", price: 22000, recommended: false, description: "마블링이 좋은 갈비살" },
            { item: "항정살", price: 20000, recommended: true, description: "쫄깃한 식감의 항정살" },
            { item: "된장찌개", price: 8000, recommended: false, description: "고기와 잘 어울리는 찌개" }
        ],
        recommendedCombo: {
            name: "4인 가족 세트",
            items: ["흑돼지 목살구이 2인분", "흑돼지 삼겹살 2인분", "된장찌개", "공기밥 4개"],
            totalPrice: 76000,
            savings: 4000
        }
    },

    "자매국수": {
        id: "jamae_guksu",
        name: "자매국수 본점",
        category: "국수",
        rating: 4.5,
        priceRange: "₩",
        agePreference: { "20s": 20, "30s": 30, "40s": 35, "50s": 15 },
        menu: [
            { item: "고기국수", price: 9000, recommended: true, description: "제주 대표 향토음식" },
            { item: "멸치국수", price: 8000, recommended: false, description: "깔끔한 멸치 육수" },
            { item: "비빔국수", price: 8500, recommended: true, description: "매콤달콤한 비빔국수" },
            { item: "만두", price: 6000, recommended: true, description: "손으로 빚은 만두" },
            { item: "김치", price: 3000, recommended: false, description: "제주식 김치" }
        ],
        recommendedCombo: {
            name: "가족 든든 세트",
            items: ["고기국수 3개", "비빔국수 1개", "만두 2접시"],
            totalPrice: 45500,
            savings: 2500
        }
    },

    "명진전복": {
        id: "myeongjin_jeonbok",
        name: "명진전복",
        category: "전복",
        rating: 4.4,
        priceRange: "₩₩",
        agePreference: { "20s": 15, "30s": 25, "40s": 40, "50s": 20 },
        menu: [
            { item: "전복돌솥밥", price: 18000, recommended: true, description: "고소한 전복과 밥의 조화" },
            { item: "전복죽", price: 15000, recommended: true, description: "부드러운 전복죽" },
            { item: "전복구이", price: 25000, recommended: false, description: "통전복 구이" },
            { item: "전복라면", price: 12000, recommended: true, description: "전복이 들어간 라면" },
            { item: "전복미역국", price: 20000, recommended: false, description: "영양만점 미역국" }
        ],
        recommendedCombo: {
            name: "전복 만족 세트",
            items: ["전복돌솥밥 2개", "전복죽 1개", "전복라면 1개"],
            totalPrice: 63000,
            savings: 0
        }
    },

    "오설록": {
        id: "osulloc",
        name: "오설록 티 뮤지엄",
        category: "카페",
        rating: 4.3,
        priceRange: "₩₩",
        agePreference: { "20s": 40, "30s": 35, "40s": 20, "50s": 5 },
        menu: [
            { item: "녹차 아이스크림", price: 5500, recommended: true, description: "오설록 시그니처" },
            { item: "녹차 라떼", price: 6500, recommended: true, description: "부드러운 녹차 라떼" },
            { item: "세작 티", price: 8000, recommended: false, description: "프리미엄 녹차" },
            { item: "녹차 케이크", price: 7000, recommended: true, description: "달콤한 녹차 케이크" },
            { item: "아메리카노", price: 5000, recommended: false, description: "기본 커피" }
        ],
        recommendedCombo: {
            name: "가족 디저트 세트",
            items: ["녹차 아이스크림 2개", "녹차 라떼 2개", "녹차 케이크 1개"],
            totalPrice: 30500,
            savings: 2500
        }
    },

    "협재돈": {
        id: "hyeopjae_don",
        name: "협재돈",
        category: "흑돼지",
        rating: 4.7,
        priceRange: "₩₩₩",
        agePreference: { "20s": 30, "30s": 40, "40s": 25, "50s": 5 },
        menu: [
            { item: "특수부위 세트", price: 35000, recommended: true, description: "다양한 부위 맛보기" },
            { item: "삼겹살", price: 18000, recommended: true, description: "비양도 뷰와 함께" },
            { item: "목살", price: 20000, recommended: true, description: "부드러운 목살" },
            { item: "갈비", price: 28000, recommended: false, description: "마블링 좋은 갈비" },
            { item: "냉면", price: 9000, recommended: false, description: "시원한 냉면" }
        ],
        recommendedCombo: {
            name: "오션뷰 세트",
            items: ["특수부위 세트", "삼겹살 1인분", "목살 1인분", "냉면 2개"],
            totalPrice: 91000,
            savings: 10000
        }
    },

    "카페오르다": {
        id: "cafe_order",
        name: "카페 오르다",
        category: "카페",
        rating: 4.5,
        priceRange: "₩₩",
        agePreference: { "20s": 45, "30s": 30, "40s": 20, "50s": 5 },
        menu: [
            { item: "시그니처 라떼", price: 7500, recommended: true, description: "천국의 계단 뷰" },
            { item: "아메리카노", price: 6000, recommended: true, description: "바다 전망" },
            { item: "크로플", price: 8500, recommended: true, description: "바삭한 크로플" },
            { item: "티라미수", price: 9000, recommended: false, description: "수제 티라미수" },
            { item: "스무디", price: 8000, recommended: true, description: "상큼한 스무디" }
        ],
        recommendedCombo: {
            name: "포토존 세트",
            items: ["시그니처 라떼 2개", "아메리카노 1개", "크로플 2개"],
            totalPrice: 38000,
            savings: 3000
        }
    },

    "놀맨": {
        id: "nolman",
        name: "놀맨",
        category: "라면",
        rating: 4.4,
        priceRange: "₩",
        agePreference: { "20s": 50, "30s": 30, "40s": 15, "50s": 5 },
        menu: [
            { item: "해물라면", price: 12000, recommended: true, description: "바다 앞 해물라면" },
            { item: "치즈라면", price: 10000, recommended: true, description: "고소한 치즈라면" },
            { item: "김치라면", price: 9000, recommended: false, description: "매콤한 김치라면" },
            { item: "계란라면", price: 8000, recommended: false, description: "기본 계란라면" },
            { item: "음료수", price: 3000, recommended: false, description: "시원한 음료" }
        ],
        recommendedCombo: {
            name: "애월 바다 세트",
            items: ["해물라면 2개", "치즈라면 2개", "음료수 4개"],
            totalPrice: 56000,
            savings: 0
        }
    },

    "색달식당": {
        id: "saekdal_restaurant",
        name: "중문 색달식당",
        category: "갈치",
        rating: 4.6,
        priceRange: "₩₩₩",
        agePreference: { "20s": 20, "30s": 35, "40s": 35, "50s": 10 },
        menu: [
            { item: "갈치조림 대", price: 35000, recommended: true, description: "제주 대표 갈치요리" },
            { item: "갈치구이", price: 30000, recommended: true, description: "고소한 갈치구이" },
            { item: "갈치회", price: 40000, recommended: false, description: "신선한 갈치회" },
            { item: "갈치국", price: 25000, recommended: true, description: "시원한 갈치국" },
            { item: "밑반찬", price: 5000, recommended: false, description: "제주식 밑반찬" }
        ],
        recommendedCombo: {
            name: "갈치 맛집 세트",
            items: ["갈치조림 대", "갈치구이", "갈치국", "밑반찬 세트"],
            totalPrice: 95000,
            savings: 0
        }
    }
};

// 카테고리별 메뉴 검색 함수
function getMenuByCategory(category) {
    return Object.values(JEJU_MENU_DATA).filter(restaurant => 
        restaurant.category.toLowerCase().includes(category.toLowerCase())
    );
}

// 가격대별 메뉴 검색 함수
function getMenuByPriceRange(priceRange) {
    return Object.values(JEJU_MENU_DATA).filter(restaurant => 
        restaurant.priceRange === priceRange
    );
}

// 추천 메뉴 조합 계산 함수
function calculateFamilyPrice(restaurantId, persons = 4) {
    const restaurant = JEJU_MENU_DATA[restaurantId];
    if (!restaurant) return null;
    
    const recommendedItems = restaurant.menu.filter(item => item.recommended);
    const totalPrice = recommendedItems.reduce((sum, item) => sum + item.price, 0);
    
    return {
        restaurant: restaurant.name,
        items: recommendedItems,
        pricePerPerson: totalPrice,
        totalPrice: totalPrice * persons,
        savings: restaurant.recommendedCombo ? restaurant.recommendedCombo.savings : 0
    };
}

// 연령대별 선호도 분석 함수
function getAgePreferenceAnalysis() {
    const ageData = { "20s": 0, "30s": 0, "40s": 0, "50s": 0 };
    const restaurants = Object.values(JEJU_MENU_DATA);
    
    restaurants.forEach(restaurant => {
        Object.keys(ageData).forEach(age => {
            ageData[age] += restaurant.agePreference[age] || 0;
        });
    });
    
    const total = Object.values(ageData).reduce((sum, val) => sum + val, 0);
    Object.keys(ageData).forEach(age => {
        ageData[age] = Math.round((ageData[age] / total) * 100);
    });
    
    return ageData;
}

// 내보내기 (Node.js 환경에서 사용 시)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        JEJU_MENU_DATA,
        getMenuByCategory,
        getMenuByPriceRange,
        calculateFamilyPrice,
        getAgePreferenceAnalysis
    };
}</code></pre>
        </div>

        <div class="mt-6 bg-blue-50 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-blue-800 mb-3">
                <i class="fas fa-info-circle mr-2"></i>
                사용 방법
            </h3>
            <div class="space-y-2 text-sm text-blue-700">
                <p><strong>1.</strong> 이 페이지의 코드를 복사하여 <code>menu-data.js</code> 파일로 저장</p>
                <p><strong>2.</strong> HTML에서 <code>&lt;script src="menu-data.js"&gt;&lt;/script&gt;</code>로 포함</p>
                <p><strong>3.</strong> <code>JEJU_MENU_DATA</code> 객체로 메뉴 데이터 접근</p>
                <p><strong>4.</strong> 제공된 함수들로 데이터 분석 및 활용</p>
            </div>
        </div>

        <div class="mt-6 bg-green-50 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-green-800 mb-3">
                <i class="fas fa-chart-bar mr-2"></i>
                포함된 기능
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
                <div>
                    <p><strong>• 8개 대표 맛집 데이터</strong></p>
                    <p><strong>• 메뉴별 상세 정보</strong></p>
                    <p><strong>• 가격 및 추천도</strong></p>
                </div>
                <div>
                    <p><strong>• 연령대별 선호도</strong></p>
                    <p><strong>• 추천 조합 세트</strong></p>
                    <p><strong>• 카테고리별 검색</strong></p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    <script id="html_badge_script1">
        window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/" +
            "remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDsxRXbpeucW9J%2BcCeojMPY2SMbtFot1eA7hzKyUGA96i%2BU0LRyAzdErNVJY3VpIkiVqve370cmM8H4U9tpFIUA%2FuGuMWx9x6YrK0jwkrbdiPw%2FqhbOjJSmZHZBmBx%2BGot6chGkk2x3845Pus6rRZE1z3C8pRGtKgEOCXLPFr4EMNLwZmwXyvE%2FA2ET6qjrjqrYNyhIFY%2F%2FBNVZajTDFKg3l4jlSTmR1AYYqbqEwO8vAV1ctvlnueo49xjgU2NFH4hYWzAUbgTi1X8oVhSwe5Q54r1HZx5KlY26Zrd6GXkyhZhcgSVriLEuIml37%2Fu0Q3S1VMGZs2rs5Ms%2BBSR%2FJW9T8bSyoKPmTEokFUeNwmBDjcYjnuIV0ZKr1wdlZg5sI%2FqIZ6GAHfzD%2B4jCkuPRg3VlKq%2BPfyZ%2FtBNJIN6spz1E4ORkxpdTzIBkJhivaPdZbSPqG%2BSmC3s6ZErtHA1q1iTUJTjbwq5dLtX5pKF%2F1unZGXzu3HLw8RzE6PYs8PoywRcA%3D%3D";
        window.__genspark_locale = "ko-KR";
        window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDsxRXbpeucW9J+cCeojMPY2SMbtFot1eA7hzKyUGA96i+U0LRyAzdErNVJY3VpIkiVqve370cmM8H4U9tpFIUA/uGuMWx9x6YrK0jwkrbdiPw/qhbOjJSmZHZBmBx+Got6chGkk2x3845Pus6rRZE1z3C8pRGtKgEOCXLPFr4EMNLwZmwXyvE/A2ET6qjrjqrYNyhIFY//BNVZajTDFKg3l4jlSTmR1AYYqbqEwO8vAV1ctvlnueo49xjgU2NFH4hYWzAUbgTi1X8oVhSwe5Q54r1HZx5KlY26Zrd6GXkyhZhcgSVriLEuIml37/u0Q3S1VMGZs2rs5Ms+BSR/JW9T8bSyoKPmTEokFUeNwmBDjcYjnuIV0ZKr1wdlZg5sI/qIZ6GAHfzD+4jCkuPRg3VlKq+PfyZ/tBNJIN6spz1E4ORkxpdTzIBkJhivaPdZbSPqG+SmC3s6ZErtHA1q1iTUJTjbwq5dLtX5pKF/1unZGXzu3HLw8RzE6PYs8PoywRcA==";
    </script>
    
    <script id="html_notice_dialog_script" src="https://www.genspark.ai/notice_dialog.js"></script>
    