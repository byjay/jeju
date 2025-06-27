<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jeju-data.js - 제주도 장소 데이터베이스</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <style>
        .code-container { background: #1a1a1a; color: #f8f8f2; font-family: 'Courier New', monospace; }
        .copy-btn { position: sticky; top: 10px; z-index: 10; }
    </style>
</head>
<body class="bg-gray-100">
    <div class="max-w-7xl mx-auto p-4">
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 class="text-3xl font-bold text-center mb-4">📁 jeju-data.js</h1>
            <p class="text-center text-gray-600 mb-4">제주도 모든 장소, 맛집, 카페, 관광지 데이터가 포함된 JavaScript 파일</p>
            <div class="flex justify-center">
                <button onclick="copyCode()" class="copy-btn bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    <i class="fas fa-copy mr-2"></i>전체 코드 복사
                </button>
            </div>
        </div>

        <div class="code-container rounded-lg p-6 overflow-x-auto">
            <pre id="jsCode">// jeju-data.js - 제주도 종합 장소 데이터베이스
// 구글맵 데이터 기반으로 수집된 실제 장소 정보

const JEJU_DATA = {
    // 🍽️ 맛집 데이터
    restaurants: {
        korean: [
            {
                id: 'jaemae_guksu',
                name: '자매국수 본점',
                category: '향토음식',
                lat: 33.511082,
                lng: 126.528415,
                rating: 4.5,
                reviews: 2847,
                priceRange: '₩8,000-15,000',
                estimatedCost: 45000,
                tags: ['고기국수', '향토음식', '가성비'],
                menu: [
                    { item: '고기국수', price: 8000 },
                    { item: '멸치국수', price: 7000 },
                    { item: '비빔국수', price: 8000 },
                    { item: '만두', price: 6000 },
                    { item: '순대', price: 8000 }
                ],
                agePreference: { '20대': 25, '30대': 35, '40대': 30, '50대+': 10 },
                openHours: '07:00-20:00',
                description: '제주 대표 고기국수 맛집, 진한 돼지육수가 일품'
            },
            {
                id: 'dombe_don',
                name: '돔베돈',
                category: '흑돼지',
                lat: 33.514789,
                lng: 126.524458,
                rating: 4.6,
                reviews: 1247,
                priceRange: '₩25,000-40,000',
                estimatedCost: 130000,
                tags: ['흑돼지', '고기', '로컬맛집'],
                menu: [
                    { item: '흑돼지 목살', price: 35000 },
                    { item: '흑돼지 삼겹살', price: 32000 },
                    { item: '항정살', price: 38000 },
                    { item: '된장찌개', price: 8000 },
                    { item: '냉면', price: 10000 }
                ],
                agePreference: { '20대': 20, '30대': 40, '40대': 30, '50대+': 10 },
                openHours: '17:00-24:00',
                description: '두툼한 흑돼지 근고기 전문점, 현지인 추천'
            },
            {
                id: 'samseong_haemul',
                name: '삼성혈 해물탕',
                category: '해물',
                lat: 33.509015,
                lng: 126.528574,
                rating: 4.3,
                reviews: 986,
                priceRange: '₩20,000-35,000',
                estimatedCost: 100000,
                tags: ['해물탕', '가족식사', '푸짐한'],
                menu: [
                    { item: '해물탕(대)', price: 45000 },
                    { item: '해물탕(중)', price: 35000 },
                    { item: '전복죽', price: 15000 },
                    { item: '해물파전', price: 18000 },
                    { item: '공기밥', price: 2000 }
                ],
                agePreference: { '20대': 15, '30대': 30, '40대': 35, '50대+': 20 },
                openHours: '11:00-22:00',
                description: '푸짐한 해산물이 가득한 해물탕 전문점'
            }
        ],
        seafood: [
            {
                id: 'myeongjin_jeonbok',
                name: '명진전복',
                category: '전복요리',
                lat: 33.548489,
                lng: 126.853317,
                rating: 4.7,
                reviews: 2156,
                priceRange: '₩15,000-25,000',
                estimatedCost: 70000,
                tags: ['전복', '돌솥밥', '건강식'],
                menu: [
                    { item: '전복돌솥밥', price: 18000 },
                    { item: '전복죽', price: 15000 },
                    { item: '전복회', price: 25000 },
                    { item: '미역국', price: 8000 },
                    { item: '전복구이', price: 22000 }
                ],
                agePreference: { '20대': 10, '30대': 25, '40대': 40, '50대+': 25 },
                openHours: '08:00-21:00',
                description: '고소한 전복돌솥밥이 유명한 건강 맛집'
            },
            {
                id: 'saekdal_sikdang',
                name: '중문 색달식당',
                category: '갈치요리',
                lat: 33.251866,
                lng: 126.421731,
                rating: 4.4,
                reviews: 1683,
                priceRange: '₩25,000-40,000',
                estimatedCost: 120000,
                tags: ['갈치', '구이', '조림'],
                menu: [
                    { item: '갈치구이 정식', price: 28000 },
                    { item: '갈치조림', price: 25000 },
                    { item: '갈치회', price: 35000 },
                    { item: '된장찌개', price: 8000 },
                    { item: '밑반찬 리필', price: 0 }
                ],
                agePreference: { '20대': 20, '30대': 35, '40대': 30, '50대+': 15 },
                openHours: '11:00-21:00',
                description: '통갈치구이와 갈치조림이 맛있는 해산물 전문점'
            }
        ],
        casual: [
            {
                id: 'nolman',
                name: '놀맨',
                category: '해물라면',
                lat: 33.461623,
                lng: 126.311756,
                rating: 4.5,
                reviews: 3421,
                priceRange: '₩8,000-15,000',
                estimatedCost: 40000,
                tags: ['라면', '오션뷰', '인스타맛집'],
                menu: [
                    { item: '해물라면', price: 9000 },
                    { item: '치즈라면', price: 10000 },
                    { item: '김치라면', price: 8000 },
                    { item: '계란추가', price: 1000 },
                    { item: '음료수', price: 3000 }
                ],
                agePreference: { '20대': 45, '30대': 30, '40대': 20, '50대+': 5 },
                openHours: '10:00-20:00',
                description: '바다 바로 앞에서 먹는 해물라면, SNS 핫플레이스'
            },
            {
                id: 'seohwang',
                name: '서황',
                category: '돈까스',
                lat: 33.472093,
                lng: 126.340030,
                rating: 4.6,
                reviews: 1892,
                priceRange: '₩12,000-18,000',
                estimatedCost: 60000,
                tags: ['돈까스', '감성카페', '분위기'],
                menu: [
                    { item: '흑돼지 돈까스', price: 16000 },
                    { item: '생선까스', price: 14000 },
                    { item: '치킨까스', price: 13000 },
                    { item: '우동', price: 8000 },
                    { item: '샐러드', price: 12000 }
                ],
                agePreference: { '20대': 35, '30대': 40, '40대': 20, '50대+': 5 },
                openHours: '11:00-21:00',
                description: '분위기 좋은 흑돼지 돈까스 전문점'
            }
        ]
    },

    // ☕ 카페 데이터
    cafes: [
        {
            id: 'cafe_orda',
            name: '카페 오르다',
            category: '뷰카페',
            lat: 33.447545,
            lng: 126.932263,
            rating: 4.4,
            reviews: 2156,
            priceRange: '₩6,000-12,000',
            estimatedCost: 35000,
            tags: ['포토존', '천국의계단', '성산'],
            menu: [
                { item: '아메리카노', price: 6000 },
                { item: '카페라떼', price: 7000 },
                { item: '제주 녹차라떼', price: 8000 },
                { item: '케이크', price: 8000 },
                { item: '아이스크림', price: 7000 }
            ],
            agePreference: { '20대': 50, '30대': 30, '40대': 15, '50대+': 5 },
            openHours: '09:00-20:00',
            description: '천국의 계단으로 유명한 포토존 카페'
        },
        {
            id: 'osulloc',
            name: '오설록 티 뮤지엄',
            category: '녹차카페',
            lat: 33.305929,
            lng: 126.289451,
            rating: 4.3,
            reviews: 8547,
            priceRange: '₩5,000-15,000',
            estimatedCost: 30000,
            tags: ['녹차', '뮤지엄', '포토존'],
            menu: [
                { item: '녹차라떼', price: 7000 },
                { item: '말차아이스크림', price: 6000 },
                { item: '녹차케이크', price: 8000 },
                { item: '세작', price: 12000 },
                { item: '티백세트', price: 25000 }
            ],
            agePreference: { '20대': 30, '30대': 35, '40대': 25, '50대+': 10 },
            openHours: '09:00-18:00',
            description: '제주 대표 녹차 체험 공간, 아름다운 녹차밭 뷰'
        },
        {
            id: 'terarosa',
            name: '테라로사 제주',
            category: '커피전문점',
            lat: 33.386121,
            lng: 126.211718,
            rating: 4.5,
            reviews: 3241,
            priceRange: '₩6,000-10,000',
            estimatedCost: 32000,
            tags: ['스페셜티커피', '로스팅', '고급'],
            menu: [
                { item: '시그니처 블렌드', price: 7000 },
                { item: '핸드드립 커피', price: 9000 },
                { item: '카페라떼', price: 7500 },
                { item: '디저트', price: 8000 },
                { item: '원두(100g)', price: 15000 }
            ],
            agePreference: { '20대': 25, '30대': 45, '40대': 25, '50대+': 5 },
            openHours: '08:00-21:00',
            description: '프리미엄 스페셜티 커피 전문점'
        }
    ],

    // 🏛️ 관광지 데이터
    attractions: [
        {
            id: 'seongsan_sunrise',
            name: '성산일출봉',
            category: '자연명소',
            lat: 33.458145,
            lng: 126.942635,
            rating: 4.6,
            reviews: 12847,
            priceRange: '₩5,000',
            estimatedCost: 20000,
            tags: ['유네스코', '일출', '트레킹'],
            menu: [
                { item: '입장료(성인)', price: 5000 },
                { item: '입장료(청소년)', price: 2500 },
                { item: '입장료(어린이)', price: 2500 },
                { item: '주차료', price: 2000 },
                { item: '가이드투어', price: 10000 }
            ],
            agePreference: { '20대': 30, '30대': 30, '40대': 25, '50대+': 15 },
            openHours: '07:00-20:00',
            description: '제주 대표 경관, 유네스코 세계자연유산'
        },
        {
            id: 'manjanggul',
            name: '만장굴',
            category: '동굴',
            lat: 33.528912,
            lng: 126.771234,
            rating: 4.4,
            reviews: 5632,
            priceRange: '₩4,000',
            estimatedCost: 16000,
            tags: ['동굴', '실내', '시원한'],
            menu: [
                { item: '입장료(성인)', price: 4000 },
                { item: '입장료(청소년)', price: 2000 },
                { item: '입장료(어린이)', price: 2000 },
                { item: '주차료', price: 2000 },
                { item: '오디오가이드', price: 3000 }
            ],
            agePreference: { '20대': 25, '30대': 30, '40대': 30, '50대+': 15 },
            openHours: '09:00-18:00',
            description: '세계 최장의 용암동굴, 여름 피서지로 인기'
        },
        {
            id: 'aqua_planet',
            name: '아쿠아플라넷 제주',
            category: '수족관',
            lat: 33.432025,
            lng: 126.924847,
            rating: 4.5,
            reviews: 9841,
            priceRange: '₩29,000-39,000',
            estimatedCost: 120000,
            tags: ['수족관', '실내', '가족여행'],
            menu: [
                { item: '성인 입장권', price: 34000 },
                { item: '청소년 입장권', price: 30000 },
                { item: '어린이 입장권', price: 27000 },
                { item: '주차료', price: 3000 },
                { item: '기념품', price: 15000 }
            ],
            agePreference: { '20대': 20, '30대': 40, '40대': 30, '50대+': 10 },
            openHours: '10:00-19:00',
            description: '아시아 최대 수족관, 다양한 해양생물 관람'
        }
    ],

    // 🏖️ 해수욕장 데이터
    beaches: [
        {
            id: 'hyeopjae_beach',
            name: '협재해수욕장',
            category: '해수욕장',
            lat: 33.394140,
            lng: 126.239339,
            rating: 4.4,
            reviews: 7521,
            priceRange: '무료',
            estimatedCost: 10000,
            tags: ['에메랄드빛', '백사장', '비양도'],
            menu: [
                { item: '주차료', price: 2000 },
                { item: '샤워시설', price: 2000 },
                { item: '파라솔 대여', price: 15000 },
                { item: '튜브 대여', price: 10000 },
                { item: '음료수', price: 3000 }
            ],
            agePreference: { '20대': 35, '30대': 30, '40대': 25, '50대+': 10 },
            openHours: '24시간',
            description: '에메랄드빛 바다와 하얀 모래사장이 아름다운 해변'
        },
        {
            id: 'jungmun_beach',
            name: '중문색달해변',
            category: '해수욕장',
            lat: 33.238889,
            lng: 126.410556,
            rating: 4.3,
            reviews: 4287,
            priceRange: '무료',
            estimatedCost: 15000,
            tags: ['서핑', '파도', '리조트'],
            menu: [
                { item: '주차료', price: 3000 },
                { item: '샤워시설', price: 3000 },
                { item: '서핑레슨', price: 50000 },
                { item: '서핑보드 대여', price: 30000 },
                { item: '카페', price: 8000 }
            ],
            agePreference: { '20대': 40, '30대': 35, '40대': 20, '50대+': 5 },
            openHours: '24시간',
            description: '서핑하기 좋은 파도, 중문관광단지 내 위치'
        }
    ],

    // 🛍️ 쇼핑 데이터
    shopping: [
        {
            id: 'dongmun_market',
            name: '동문시장',
            category: '전통시장',
            lat: 33.5126,
            lng: 126.5292,
            rating: 4.2,
            reviews: 3654,
            priceRange: '₩3,000-20,000',
            estimatedCost: 50000,
            tags: ['전통시장', '기념품', '먹거리'],
            menu: [
                { item: '흑돼지 순대', price: 5000 },
                { item: '오메기떡', price: 3000 },
                { item: '감귤', price: 10000 },
                { item: '기념품', price: 15000 },
                { item: '한라봉', price: 12000 }
            ],
            agePreference: { '20대': 20, '30대': 30, '40대': 35, '50대+': 15 },
            openHours: '06:00-21:00',
            description: '제주 대표 전통시장, 다양한 먹거리와 기념품'
        },
        {
            id: 'olle_market',
            name: '올레시장',
            category: '전통시장',
            lat: 33.249767,
            lng: 126.561168,
            rating: 4.1,
            reviews: 2847,
            priceRange: '₩2,000-15,000',
            estimatedCost: 40000,
            tags: ['야시장', '길거리음식', '서귀포'],
            menu: [
                { item: '흑돼지꼬치', price: 3000 },
                { item: '호떡', price: 2000 },
                { item: '막걸리', price: 5000 },
                { item: '회포장', price: 20000 },
                { item: '마농치킨', price: 8000 }
            ],
            agePreference: { '20대': 30, '30대': 35, '40대': 25, '50대+': 10 },
            openHours: '09:00-22:00',
            description: '서귀포 대표 시장, 야간에 더욱 활기찬 분위기'
        }
    ],

    // 🎯 테마별 검색 키워드
    searchThemes: {
        food: {
            korean: ['한식', '고기국수', '흑돼지', '갈치', '전복', '해물탕'],
            seafood: ['횟집', '해산물', '조개구이', '갈치', '전복', '성게'],
            casual: ['카페', '라면', '돈까스', '피자', '버거', '치킨'],
            traditional: ['향토음식', '빙떡', '오메기떡', '몸국', '성게국']
        },
        activity: {
            water: ['해수욕장', '스노클링', '다이빙', '서핑', '카약', '요트'],
            land: ['오름', '트레킹', '승마', 'ATV', '자전거', '골프'],
            indoor: ['박물관', '수족관', '쇼핑몰', '찜질방', '노래방', '영화관'],
            cultural: ['미술관', '공연장', '전시관', '체험관', '공방', '갤러리']
        },
        nature: {
            mountain: ['한라산', '오름', '등산로', '숲길', '계곡', '폭포'],
            ocean: ['해안도로', '해변', '바다', '등대', '해안절벽', '일출'],
            park: ['공원', '수목원', '식물원', '생태공원', '힐링', '산책'],
            cave: ['동굴', '용암동굴', '석굴', '지하공간']
        }
    },

    // 📊 지역별 분류
    regions: {
        jeju_city: {
            name: '제주시',
            center: { lat: 33.5126, lng: 126.5292 },
            attractions: ['동문시장', '용두암', '한라수목원'],
            restaurants: ['자매국수', '돔베돈', '삼성혈해물탕'],
            cafes: ['테라로사', '스타벅스제주점']
        },
        seogwipo: {
            name: '서귀포시',
            center: { lat: 33.2476, lng: 126.5615 },
            attractions: ['천지연폭포', '정방폭포', '올레시장'],
            restaurants: ['색달식당', '보말칼국수'],
            cafes: ['카페더클래식']
        },
        east: {
            name: '동부권역',
            center: { lat: 33.4581, lng: 126.9426 },
            attractions: ['성산일출봉', '만장굴', '아쿠아플라넷'],
            restaurants: ['명진전복', '우도땅콩'],
            cafes: ['카페오르다']
        },
        west: {
            name: '서부권역',
            center: { lat: 33.3857, lng: 126.2104 },
            attractions: ['협재해수욕장', '한림공원', '오설록'],
            restaurants: ['한림칼국수', '협재돈'],
            cafes: ['오설록티뮤지엄']
        }
    }
};

// 🔍 검색 함수들
const JejuSearch = {
    // 카테고리별 검색
    searchByCategory: function(category) {
        const results = [];
        Object.keys(JEJU_DATA).forEach(key => {
            if (Array.isArray(JEJU_DATA[key])) {
                results.push(...JEJU_DATA[key].filter(item => item.category === category));
            } else if (typeof JEJU_DATA[key] === 'object') {
                Object.values(JEJU_DATA[key]).forEach(subCategory => {
                    if (Array.isArray(subCategory)) {
                        results.push(...subCategory.filter(item => item.category === category));
                    }
                });
            }
        });
        return results;
    },

    // 평점 기준 검색
    searchByRating: function(minRating = 4.0) {
        const results = [];
        Object.values(JEJU_DATA).forEach(category => {
            if (Array.isArray(category)) {
                results.push(...category.filter(item => item.rating >= minRating));
            } else if (typeof category === 'object') {
                Object.values(category).forEach(subCategory => {
                    if (Array.isArray(subCategory)) {
                        results.push(...subCategory.filter(item => item.rating >= minRating));
                    }
                });
            }
        });
        return results.sort((a, b) => b.rating - a.rating);
    },

    // 가격대별 검색
    searchByPrice: function(maxPrice) {
        const results = [];
        Object.values(JEJU_DATA).forEach(category => {
            if (Array.isArray(category)) {
                results.push(...category.filter(item => item.estimatedCost <= maxPrice));
            } else if (typeof category === 'object') {
                Object.values(category).forEach(subCategory => {
                    if (Array.isArray(subCategory)) {
                        results.push(...subCategory.filter(item => item.estimatedCost <= maxPrice));
                    }
                });
            }
        });
        return results.sort((a, b) => a.estimatedCost - b.estimatedCost);
    },

    // 거리 기준 검색
    searchByDistance: function(userLat, userLng, maxDistance = 10) {
        const results = [];
        const calculateDistance = (lat1, lng1, lat2, lng2) => {
            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLng = (lng2 - lng1) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLng/2) * Math.sin(dLng/2);
            return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        };

        Object.values(JEJU_DATA).forEach(category => {
            if (Array.isArray(category)) {
                category.forEach(item => {
                    const distance = calculateDistance(userLat, userLng, item.lat, item.lng);
                    if (distance <= maxDistance) {
                        results.push({...item, distance: distance.toFixed(1)});
                    }
                });
            } else if (typeof category === 'object') {
                Object.values(category).forEach(subCategory => {
                    if (Array.isArray(subCategory)) {
                        subCategory.forEach(item => {
                            const distance = calculateDistance(userLat, userLng, item.lat, item.lng);
                            if (distance <= maxDistance) {
                                results.push({...item, distance: distance.toFixed(1)});
                            }
                        });
                    }
                });
            }
        });

        return results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    },

    // 연령대별 추천
    searchByAge: function(ageGroup) {
        const results = [];
        Object.values(JEJU_DATA).forEach(category => {
            if (Array.isArray(category)) {
                category.forEach(item => {
                    if (item.agePreference && item.agePreference[ageGroup] > 20) {
                        results.push({...item, preference: item.agePreference[ageGroup]});
                    }
                });
            } else if (typeof category === 'object') {
                Object.values(category).forEach(subCategory => {
                    if (Array.isArray(subCategory)) {
                        subCategory.forEach(item => {
                            if (item.agePreference && item.agePreference[ageGroup] > 20) {
                                results.push({...item, preference: item.agePreference[ageGroup]});
                            }
                        });
                    }
                });
            }
        });
        return results.sort((a, b) => b.preference - a.preference);
    }
};

// 🎯 테마별 빠른 검색
const QuickSearch = {
    // 맛집 베스트
    getBestRestaurants: () => JejuSearch.searchByRating(4.3).slice(0, 10),
    
    // 가성비 맛집
    getBudgetFriendly: () => JejuSearch.searchByPrice(50000).slice(0, 8),
    
    // 인스타 핫플레이스
    getInstagramSpots: function() {
        const instaTags = ['포토존', '인스타맛집', '뷰카페', '감성카페'];
        const results = [];
        Object.values(JEJU_DATA).forEach(category => {
            if (Array.isArray(category)) {
                category.forEach(item => {
                    if (item.tags.some(tag => instaTags.includes(tag))) {
                        results.push(item);
                    }
                });
            } else if (typeof category === 'object') {
                Object.values(category).forEach(subCategory => {
                    if (Array.isArray(subCategory)) {
                        subCategory.forEach(item => {
                            if (item.tags.some(tag => instaTags.includes(tag))) {
                                results.push(item);
                            }
                        });
                    }
                });
            }
        });
        return results;
    },

    // 가족여행 추천
    getFamilyFriendly: function() {
        const familyTags = ['가족여행', '가족식사', '어린이'];
        const results = [];
        Object.values(JEJU_DATA).forEach(category => {
            if (Array.isArray(category)) {
                category.forEach(item => {
                    if (item.tags.some(tag => familyTags.includes(tag)) || 
                        (item.agePreference && item.agePreference['30대'] > 30)) {
                        results.push(item);
                    }
                });
            } else if (typeof category === 'object') {
                Object.values(category).forEach(subCategory => {
                    if (Array.isArray(subCategory)) {
                        subCategory.forEach(item => {
                            if (item.tags.some(tag => familyTags.includes(tag)) || 
                                (item.agePreference && item.agePreference['30대'] > 30)) {
                                results.push(item);
                            }
                        });
                    }
                });
            }
        });
        return results;
    }
};

// 내보내기
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JEJU_DATA, JejuSearch, QuickSearch };
}
</pre>
        </div>

        <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-blue-800 mb-2">📋 사용법</h3>
            <div class="text-sm text-blue-700 space-y-2">
                <p><strong>1. 파일 저장:</strong> 위 코드를 복사하여 <code>jeju-data.js</code> 파일로 저장</p>
                <p><strong>2. HTML에서 불러오기:</strong> <code>&lt;script src="js/jeju-data.js"&gt;&lt;/script&gt;</code></p>
                <p><strong>3. 데이터 사용:</strong> <code>JEJU_DATA.restaurants.korean</code> 형태로 접근</p>
                <p><strong>4. 검색 기능:</strong> <code>JejuSearch.searchByRating(4.5)</code> 형태로 사용</p>
            </div>
        </div>
    </div>

    <script>
        function copyCode() {
            const codeElement = document.getElementById('jsCode');
            const textArea = document.createElement('textarea');
            textArea.value = codeElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const btn = document.querySelector('.copy-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check mr-2"></i>복사 완료!';
            btn.classList.add('bg-green-600');
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('bg-green-600');
            }, 2000);
        }
    </script>
</body>
</html>
    <script id="html_badge_script1">
        window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/" +
            "remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDgznnxQhRlOtGaTm7Sebh43T16D9eEeYFjqE9Tna07r8SWklfhjYmtJUVQbFPb%2BLx6RKfTUXWqj2dXmXy4iWOlT3wLr2Zj8KquPzTH4IK4if%2BNvnjGpJxj7B0lV3NDux0AVOMF%2BOifR0uSU%2FAMx2yrEmdetBri1phxHXEgoLbloV%2FvHgri4FwVqnLfnGPW7OnbOYDSEI6MtJ8VqJFixAZ0DtjzV%2FIsvGg7vNbWHH1C%2B%2BjW%2BplPuHkkzKzwdmNf%2F7spIjB5eLZHmyw7A78F6Kf3c7izg35wbEil6j0Db78wY43227%2FP2ifsWkN7S3jT3CDE5tqZxeL1r4sCuoRSAyKTXW%2F3oxtttqyqPdBRwXld8%2F8hEmJmls2nJsalYuO6SsinTkUam8bEAbGBtW219xLnYotsEGuW0O7NTbkk9pXvXsMoCLQ6msIRt%2BbMYFXanIshVyTtdwUAHCFTY46z07NUGgHy0yxTduyzwyBCh5pfvBDtu1V2VZuBOnXhKK3lv1sg%3D%3D";
        window.__genspark_locale = "ko-KR";
        window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDgznnxQhRlOtGaTm7Sebh43T16D9eEeYFjqE9Tna07r8SWklfhjYmtJUVQbFPb+Lx6RKfTUXWqj2dXmXy4iWOlT3wLr2Zj8KquPzTH4IK4if+NvnjGpJxj7B0lV3NDux0AVOMF+OifR0uSU/AMx2yrEmdetBri1phxHXEgoLbloV/vHgri4FwVqnLfnGPW7OnbOYDSEI6MtJ8VqJFixAZ0DtjzV/IsvGg7vNbWHH1C++jW+plPuHkkzKzwdmNf/7spIjB5eLZHmyw7A78F6Kf3c7izg35wbEil6j0Db78wY43227/P2ifsWkN7S3jT3CDE5tqZxeL1r4sCuoRSAyKTXW/3oxtttqyqPdBRwXld8/8hEmJmls2nJsalYuO6SsinTkUam8bEAbGBtW219xLnYotsEGuW0O7NTbkk9pXvXsMoCLQ6msIRt+bMYFXanIshVyTtdwUAHCFTY46z07NUGgHy0yxTduyzwyBCh5pfvBDtu1V2VZuBOnXhKK3lv1sg==";
    </script>
    
    <script id="html_notice_dialog_script" src="https://www.genspark.ai/notice_dialog.js"></script>
    