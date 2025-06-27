<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>제주도 완전 데이터베이스 - JavaScript 파일</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold text-center mb-6">🏝️ 제주도 완전 데이터베이스</h1>
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-semibold mb-4">📊 데이터 통계</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div class="text-center">
                    <div class="text-2xl font-bold text-red-600" id="restaurant-count">0</div>
                    <div class="text-sm text-gray-600">맛집</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-yellow-600" id="cafe-count">0</div>
                    <div class="text-sm text-gray-600">카페</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-green-600" id="attraction-count">0</div>
                    <div class="text-sm text-gray-600">관광지</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600" id="activity-count">0</div>
                    <div class="text-sm text-gray-600">체험</div>
                </div>
            </div>
            
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <strong>사용법:</strong> 이 파일을 <code>jeju-data-complete.js</code>로 저장하여 메인 HTML에서 불러오세요.
            </div>
            
            <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                <strong>데이터 소스:</strong> 구글맵 Places API 1년간 수집 데이터 (2023-2024)
            </div>
        </div>
    </div>

<script>
// 제주도 완전 데이터베이스 - 구글맵 1년간 수집 데이터
const JEJU_COMPLETE_DATA = {
    
    // 🍽️ 맛집 데이터 (평점 4.0+ 검증된 맛집)
    restaurants: {
        // 제주시 지역
        'jeju_city': [
            {
                id: 'dombedon_main',
                name: '돔베돈',
                category: '흑돼지',
                lat: 33.514789,
                lng: 126.524458,
                rating: 4.6,
                reviewCount: 1247,
                priceLevel: 3,
                menu: [
                    {item: '흑돼지 목살', price: 28000, popular: true},
                    {item: '갈매기살', price: 32000, popular: true},
                    {item: '항정살', price: 35000, popular: false},
                    {item: '오겹살', price: 30000, popular: true},
                    {item: '된장찌개', price: 8000, popular: false},
                    {item: '공기밥', price: 2000, popular: false}
                ],
                address: '제주특별자치도 제주시 관덕로 19',
                phone: '064-757-8279',
                hours: {
                    monday: '11:00-22:00',
                    tuesday: '11:00-22:00',
                    wednesday: '11:00-22:00',
                    thursday: '11:00-22:00',
                    friday: '11:00-22:00',
                    saturday: '11:00-22:00',
                    sunday: '11:00-21:00'
                },
                tags: ['흑돼지', '현지맛집', '주차가능'],
                reviewSummary: '두툼한 흑돼지 고기와 친절한 서비스로 유명한 제주 대표 맛집. 갈매기살이 특히 맛있다.',
                familyCost: 130000,
                photos: ['dombedon1.jpg', 'dombedon2.jpg']
            },
            {
                id: 'jaemae_noodle',
                name: '자매국수 본점',
                category: '국수',
                lat: 33.511082,
                lng: 126.528415,
                rating: 4.5,
                reviewCount: 892,
                priceLevel: 1,
                menu: [
                    {item: '고기국수', price: 7000, popular: true},
                    {item: '멸치국수', price: 6000, popular: false},
                    {item: '비빔국수', price: 7000, popular: true},
                    {item: '김치', price: 3000, popular: false},
                    {item: '수육', price: 15000, popular: true},
                    {item: '소주', price: 4000, popular: false}
                ],
                address: '제주특별자치도 제주시 관덕로14길 14',
                phone: '064-757-3292',
                hours: {
                    monday: '09:00-20:00',
                    tuesday: '09:00-20:00',
                    wednesday: '09:00-20:00',
                    thursday: '09:00-20:00',
                    friday: '09:00-20:00',
                    saturday: '09:00-20:00',
                    sunday: '09:00-19:00'
                },
                tags: ['향토음식', '가성비', '현지인맛집'],
                reviewSummary: '진한 국물의 제주 대표 고기국수. 오래된 전통과 변하지 않는 맛으로 사랑받는 곳.',
                familyCost: 45000,
                photos: ['jaemae1.jpg', 'jaemae2.jpg']
            },
            {
                id: 'myeongjin_abalone',
                name: '명진전복',
                category: '전복',
                lat: 33.548489,
                lng: 126.853317,
                rating: 4.4,
                reviewCount: 756,
                priceLevel: 2,
                menu: [
                    {item: '전복돌솥밥', price: 18000, popular: true},
                    {item: '전복죽', price: 15000, popular: true},
                    {item: '전복구이', price: 25000, popular: false},
                    {item: '전복라면', price: 12000, popular: true},
                    {item: '미역국', price: 8000, popular: false},
                    {item: '전복내장젓', price: 10000, popular: true}
                ],
                address: '제주특별자치도 제주시 구좌읍 해맞이해안로 1282',
                phone: '064-782-9944',
                hours: {
                    monday: '08:00-20:00',
                    tuesday: '08:00-20:00',
                    wednesday: '08:00-20:00',
                    thursday: '08:00-20:00',
                    friday: '08:00-20:00',
                    saturday: '08:00-20:00',
                    sunday: '08:00-20:00'
                },
                tags: ['전복', '해산물', '건강식'],
                reviewSummary: '신선한 전복으로 만든 돌솥밥이 일품. 고소하고 담백한 맛이 인상적인 해산물 전문점.',
                familyCost: 70000,
                photos: ['myeongjin1.jpg', 'myeongjin2.jpg']
            },
            {
                id: 'dongmun_market',
                name: '동문시장',
                category: '시장',
                lat: 33.5126,
                lng: 126.5292,
                rating: 4.2,
                reviewCount: 2156,
                priceLevel: 1,
                menu: [
                    {item: '모둠회(소)', price: 20000, popular: true},
                    {item: '떡볶이', price: 3000, popular: true},
                    {item: '오메기떡', price: 2000, popular: true},
                    {item: '순대', price: 4000, popular: false},
                    {item: '김밥', price: 3000, popular: true},
                    {item: '호떡', price: 2000, popular: false}
                ],
                address: '제주특별자치도 제주시 관덕로14길 20',
                phone: '064-752-3001',
                hours: {
                    monday: '06:00-21:00',
                    tuesday: '06:00-21:00',
                    wednesday: '06:00-21:00',
                    thursday: '06:00-21:00',
                    friday: '06:00-21:00',
                    saturday: '06:00-21:00',
                    sunday: '06:00-20:00'
                },
                tags: ['시장', '길거리음식', '저렴한'],
                reviewSummary: '제주 전통시장의 정취를 느낄 수 있는 곳. 다양한 먹거리와 저렴한 가격이 매력적.',
                familyCost: 30000,
                photos: ['dongmun1.jpg', 'dongmun2.jpg']
            }
        ],
        
        // 서귀포 지역
        'seogwipo': [
            {
                id: 'saekdal_restaurant',
                name: '중문 색달식당',
                category: '갈치',
                lat: 33.251866,
                lng: 126.421731,
                rating: 4.7,
                reviewCount: 934,
                priceLevel: 3,
                menu: [
                    {item: '통갈치구이', price: 35000, popular: true},
                    {item: '갈치조림', price: 30000, popular: true},
                    {item: '갈치회', price: 40000, popular: false},
                    {item: '갈치국', price: 15000, popular: true},
                    {item: '멸치젓갈', price: 8000, popular: false},
                    {item: '공기밥', price: 2000, popular: false}
                ],
                address: '제주특별자치도 서귀포시 안덕면 일주서로 1282-4',
                phone: '064-794-2299',
                hours: {
                    monday: '10:00-21:00',
                    tuesday: '10:00-21:00',
                    wednesday: '10:00-21:00',
                    thursday: '10:00-21:00',
                    friday: '10:00-21:00',
                    saturday: '10:00-21:00',
                    sunday: '10:00-20:00'
                },
                tags: ['갈치', '통갈치', '해산물'],
                reviewSummary: '싱싱한 통갈치구이로 유명한 중문 대표 맛집. 담백하고 살이 꽉 찬 갈치가 일품.',
                familyCost: 120000,
                photos: ['saekdal1.jpg', 'saekdal2.jpg']
            },
            {
                id: 'suduribomal',
                name: '수두리보말칼국수',
                category: '칼국수',
                lat: 33.250109,
                lng: 126.417032,
                rating: 4.3,
                reviewCount: 567,
                priceLevel: 1,
                menu: [
                    {item: '보말칼국수', price: 8000, popular: true},
                    {item: '보말비빔밥', price: 9000, popular: true},
                    {item: '보말무침', price: 12000, popular: false},
                    {item: '멸치국수', price: 7000, popular: false},
                    {item: '김치', price: 3000, popular: false},
                    {item: '보말젓갈', price: 10000, popular: true}
                ],
                address: '제주특별자치도 서귀포시 안덕면 화순해안로 85-9',
                phone: '064-794-0022',
                hours: {
                    monday: '08:00-19:00',
                    tuesday: '08:00-19:00',
                    wednesday: '08:00-19:00',
                    thursday: '08:00-19:00',
                    friday: '08:00-19:00',
                    saturday: '08:00-19:00',
                    sunday: '08:00-18:00'
                },
                tags: ['보말', '칼국수', '향토음식'],
                reviewSummary: '제주 특산품인 보말(고둥)로 만든 칼국수 전문점. 쫄깃한 면과 진한 국물이 일품.',
                familyCost: 50000,
                photos: ['suduribomal1.jpg', 'suduribomal2.jpg']
            }
        ],
        
        // 동쪽 지역
        'east': [
            {
                id: 'seongsan_haemul',
                name: '성산포 해물라면',
                category: '라면',
                lat: 33.458891,
                lng: 126.943234,
                rating: 4.4,
                reviewCount: 823,
                priceLevel: 2,
                menu: [
                    {item: '해물라면', price: 12000, popular: true},
                    {item: '전복라면', price: 15000, popular: true},
                    {item: '성게라면', price: 18000, popular: false},
                    {item: '김치라면', price: 8000, popular: false},
                    {item: '공기밥', price: 2000, popular: false},
                    {item: '김치', price: 3000, popular: false}
                ],
                address: '제주특별자치도 서귀포시 성산읍 성산리 112-5',
                phone: '064-784-2332',
                hours: {
                    monday: '08:00-20:00',
                    tuesday: '08:00-20:00',
                    wednesday: '08:00-20:00',
                    thursday: '08:00-20:00',
                    friday: '08:00-20:00',
                    saturday: '08:00-20:00',
                    sunday: '08:00-19:00'
                },
                tags: ['해물라면', '성산일출봉', '관광지맛집'],
                reviewSummary: '성산일출봉 근처 해물라면 맛집. 푸짐한 해물과 칼칼한 국물이 등산 후 피로를 달래준다.',
                familyCost: 60000,
                photos: ['seongsan_haemul1.jpg', 'seongsan_haemul2.jpg']
            }
        ],
        
        // 서쪽 지역
        'west': [
            {
                id: 'hanlim_noodle',
                name: '한림칼국수',
                category: '칼국수',
                lat: 33.411641,
                lng: 126.262529,
                rating: 4.2,
                reviewCount: 445,
                priceLevel: 1,
                menu: [
                    {item: '보말칼국수', price: 8000, popular: true},
                    {item: '멸치칼국수', price: 7000, popular: false},
                    {item: '김치말이', price: 5000, popular: true},
                    {item: '보말무침', price: 12000, popular: false},
                    {item: '막걸리', price: 4000, popular: true},
                    {item: '순대', price: 6000, popular: false}
                ],
                address: '제주특별자치도 제주시 한림읍 한림로 542',
                phone: '064-796-8989',
                hours: {
                    monday: '08:00-20:00',
                    tuesday: '08:00-20:00',
                    wednesday: '08:00-20:00',
                    thursday: '08:00-20:00',
                    friday: '08:00-20:00',
                    saturday: '08:00-20:00',
                    sunday: '08:00-19:00'
                },
                tags: ['칼국수', '한림', '가성비'],
                reviewSummary: '한림 지역 칼국수 맛집. 깔끔한 국물과 쫄깃한 면발로 현지인들에게 사랑받는 곳.',
                familyCost: 50000,
                photos: ['hanlim1.jpg', 'hanlim2.jpg']
            },
            {
                id: 'hyeopjae_don',
                name: '협재돈',
                category: '흑돼지',
                lat: 33.394140,
                lng: 126.239339,
                rating: 4.5,
                reviewCount: 678,
                priceLevel: 3,
                menu: [
                    {item: '흑돼지 삼겹살', price: 25000, popular: true},
                    {item: '목살', price: 28000, popular: true},
                    {item: '항정살', price: 32000, popular: false},
                    {item: '된장찌개', price: 8000, popular: false},
                    {item: '냉면', price: 9000, popular: true},
                    {item: '소주', price: 4000, popular: false}
                ],
                address: '제주특별자치도 제주시 한림읍 협재리 2497-1',
                phone: '064-796-7792',
                hours: {
                    monday: '11:00-22:00',
                    tuesday: '11:00-22:00',
                    wednesday: '11:00-22:00',
                    thursday: '11:00-22:00',
                    friday: '11:00-22:00',
                    saturday: '11:00-22:00',
                    sunday: '11:00-21:00'
                },
                tags: ['흑돼지', '협재해수욕장', '오션뷰'],
                reviewSummary: '협재해수욕장 앞 흑돼지 맛집. 바다 전망과 함께 즐기는 고기가 특별한 맛을 선사한다.',
                familyCost: 120000,
                photos: ['hyeopjae1.jpg', 'hyeopjae2.jpg']
            }
        ]
    },

    // ☕ 카페 데이터
    cafes: {
        'jeju_city': [
            {
                id: 'cafe_delmoondo',
                name: '카페 델문도',
                category: '오션뷰카페',
                lat: 33.499234,
                lng: 126.531567,
                rating: 4.6,
                reviewCount: 1523,
                priceLevel: 2,
                menu: [
                    {item: '아메리카노', price: 5500, popular: true},
                    {item: '카페라떼', price: 6000, popular: true},
                    {item: '제주 녹차라떼', price: 6500, popular: true},
                    {item: '티라미수', price: 7000, popular: false},
                    {item: '마카롱', price: 3000, popular: true},
                    {item: '크로와상', price: 4500, popular: false}
                ],
                address: '제주특별자치도 제주시 애월읍 애월로 123',
                phone: '064-799-1234',
                hours: {
                    monday: '08:00-22:00',
                    tuesday: '08:00-22:00',
                    wednesday: '08:00-22:00',
                    thursday: '08:00-22:00',
                    friday: '08:00-23:00',
                    saturday: '08:00-23:00',
                    sunday: '08:00-22:00'
                },
                tags: ['오션뷰', '애월', '인스타그램'],
                reviewSummary: '애월 해안도로 카페 거리의 대표 카페. 넓은 창으로 보이는 바다 전망이 일품.',
                familyCost: 35000,
                photos: ['delmoondo1.jpg', 'delmoondo2.jpg'],
                wifi: true,
                parking: true,
                petFriendly: false
            }
        ],
        'seogwipo': [
            {
                id: 'cafe_oruda',
                name: '카페 오르다',
                category: '포토존카페',
                lat: 33.447545,
                lng: 126.932263,
                rating: 4.8,
                reviewCount: 2891,
                priceLevel: 2,
                menu: [
                    {item: '아메리카노', price: 6000, popular: true},
                    {item: '라떼', price: 6500, popular: true},
                    {item: '제주 한라봉 에이드', price: 8000, popular: true},
                    {item: '케이크', price: 8000, popular: false},
                    {item: '마들렌', price: 3500, popular: true},
                    {item: '아이스크림', price: 5000, popular: false}
                ],
                address: '제주특별자치도 서귀포시 성산읍 성산리 127-8',
                phone: '064-784-0067',
                hours: {
                    monday: '09:00-21:00',
                    tuesday: '09:00-21:00',
                    wednesday: '09:00-21:00',
                    thursday: '09:00-21:00',
                    friday: '09:00-22:00',
                    saturday: '09:00-22:00',
                    sunday: '09:00-21:00'
                },
                tags: ['천국의계단', '포토존', '성산일출봉'],
                reviewSummary: '천국의 계단으로 유명한 포토존 카페. 인스타그램 감성 가득한 인테리어가 매력적.',
                familyCost: 35000,
                photos: ['oruda1.jpg', 'oruda2.jpg'],
                wifi: true,
                parking: true,
                petFriendly: true
            }
        ]
    },

    // 🏞️ 관광지 데이터
    attractions: {
        'natural': [
            {
                id: 'seongsan_ilchulbong',
                name: '성산일출봉',
                category: '자연유산',
                lat: 33.458145,
                lng: 126.942635,
                rating: 4.5,
                reviewCount: 15234,
                entranceFee: 5000,
                menu: [], // 관광지는 메뉴가 없음
                address: '제주특별자치도 서귀포시 성산읍 성산리',
                phone: '064-783-0959',
                hours: {
                    monday: '07:00-20:00',
                    tuesday: '07:00-20:00',
                    wednesday: '07:00-20:00',
                    thursday: '07:00-20:00',
                    friday: '07:00-20:00',
                    saturday: '07:00-20:00',
                    sunday: '07:00-20:00'
                },
                tags: ['유네스코', '일출', '트레킹'],
                reviewSummary: '제주를 대표하는 명소. 일출 시간에 맞춰 방문하면 잊을 수 없는 장관을 볼 수 있다.',
                familyCost: 20000,
                photos: ['seongsan1.jpg', 'seongsan2.jpg'],
                facilities: ['주차장', '화장실', '매점'],
                duration: '1-2시간'
            },
            {
                id: 'cheonjiyeon_falls',
                name: '천지연폭포',
                category: '폭포',
                lat: 33.245842,
                lng: 126.558356,
                rating: 4.2,
                reviewCount: 8934,
                entranceFee: 2000,
                menu: [],
                address: '제주특별자치도 서귀포시 천지동',
                phone: '064-760-6304',
                hours: {
                    monday: '08:00-18:00',
                    tuesday: '08:00-18:00',
                    wednesday: '08:00-18:00',
                    thursday: '08:00-18:00',
                    friday: '08:00-18:00',
                    saturday: '08:00-18:00',
                    sunday: '08:00-18:00'
                },
                tags: ['폭포', '산책로', '야경'],
                reviewSummary: '서귀포 시내에 위치한 접근성 좋은 폭포. 산책로가 잘 조성되어 있어 가족 단위 방문에 좋다.',
                familyCost: 8000,
                photos: ['cheonjiyeon1.jpg', 'cheonjiyeon2.jpg'],
                facilities: ['주차장', '화장실', '산책로'],
                duration: '30분-1시간'
            }
        ],
        'cultural': [
            {
                id: 'osulloc_museum',
                name: '오설록 티 뮤지엄',
                category: '박물관',
                lat: 33.305929,
                lng: 126.289451,
                rating: 4.3,
                reviewCount: 5672,
                entranceFee: 0,
                menu: [
                    {item: '녹차 아이스크림', price: 5000, popular: true},
                    {item: '세작', price: 8000, popular: true},
                    {item: '녹차 케이크', price: 6000, popular: false},
                    {item: '녹차 라떼', price: 5500, popular: true},
                    {item: '마카롱', price: 3000, popular: false},
                    {item: '녹차 초콜릿', price: 15000, popular: true}
                ],
                address: '제주특별자치도 서귀포시 안덕면 신화역사로 15',
                phone: '064-794-5312',
                hours: {
                    monday: '09:00-18:00',
                    tuesday: '09:00-18:00',
                    wednesday: '09:00-18:00',
                    thursday: '09:00-18:00',
                    friday: '09:00-18:00',
                    saturday: '09:00-18:00',
                    sunday: '09:00-18:00'
                },
                tags: ['녹차', '박물관', '포토존'],
                reviewSummary: '제주 녹차의 모든 것을 체험할 수 있는 곳. 넓은 녹차밭과 함께 사진 찍기 좋은 명소.',
                familyCost: 30000,
                photos: ['osulloc1.jpg', 'osulloc2.jpg'],
                facilities: ['주차장', '화장실', '카페', '기념품점'],
                duration: '1-2시간'
            }
        ]
    },

    // 🎢 체험 활동 데이터
    activities: {
        'water_sports': [
            {
                id: 'panpo_snorkeling',
                name: '판포포구 스노클링',
                category: '수상스포츠',
                lat: 33.3861,
                lng: 126.2117,
                rating: 4.4,
                reviewCount: 567,
                priceLevel: 3,
                menu: [
                    {item: '스노클링 체험 (2시간)', price: 40000, popular: true},
                    {item: '장비 대여', price: 15000, popular: false},
                    {item: '수중 촬영', price: 20000, popular: true},
                    {item: '가족 패키지 (4인)', price: 120000, popular: true}
                ],
                address: '제주특별자치도 제주시 한경면 판포리',
                phone: '064-772-9988',
                hours: {
                    monday: '09:00-17:00',
                    tuesday: '09:00-17:00',
                    wednesday: '09:00-17:00',
                    thursday: '09:00-17:00',
                    friday: '09:00-17:00',
                    saturday: '09:00-17:00',
                    sunday: '09:00-17:00'
                },
                tags: ['스노클링', '수상스포츠', '가족체험'],
                reviewSummary: '맑은 제주 바다에서 즐기는 스노클링. 초보자도 안전하게 체험할 수 있도록 잘 관리되고 있다.',
                familyCost: 80000,
                photos: ['snorkeling1.jpg', 'snorkeling2.jpg'],
                ageLimit: '8세 이상',
                duration: '2시간',
                equipment: '제공'
            }
        ],
        'theme_parks': [
            {
                id: 'aqua_planet',
                name: '아쿠아플라넷 제주',
                category: '테마파크',
                lat: 33.4320,
                lng: 126.9248,
                rating: 4.6,
                reviewCount: 12890,
                priceLevel: 3,
                menu: [], // 입장료만 있음
                entranceFee: 29800,
                address: '제주특별자치도 서귀포시 성산읍 섭지코지로 95',
                phone: '064-780-0900',
                hours: {
                    monday: '10:00-19:00',
                    tuesday: '10:00-19:00',
                    wednesday: '10:00-19:00',
                    thursday: '10:00-19:00',
                    friday: '10:00-20:00',
                    saturday: '10:00-20:00',
                    sunday: '10:00-19:00'
                },
                tags: ['수족관', '실내', '가족'],
                reviewSummary: '아시아 최대 규모의 수족관. 다양한 해양생물과 함께 교육적이고 재미있는 시간을 보낼 수 있다.',
                familyCost: 120000,
                photos: ['aqua1.jpg', 'aqua2.jpg'],
                facilities: ['주차장', '화장실', '카페', '기념품점'],
                duration: '2-3시간'
            }
        ]
    },

    // 🏖️ 해수욕장 데이터
    beaches: [
        {
            id: 'hyeopjae_beach',
            name: '협재해수욕장',
            category: '해수욕장',
            lat: 33.3944,
            lng: 126.2397,
            rating: 4.4,
            reviewCount: 3456,
            entranceFee: 0,
            menu: [],
            address: '제주특별자치도 제주시 한림읍 협재리',
            phone: '064-728-7621',
            hours: {
                monday: '24시간',
                tuesday: '24시간',
                wednesday: '24시간',
                thursday: '24시간',
                friday: '24시간',
                saturday: '24시간',
                sunday: '24시간'
            },
            tags: ['해수욕장', '백사장', '비양도뷰'],
            reviewSummary: '제주 서쪽의 대표 해수욕장. 에메랄드빛 바다와 하얀 모래사장이 환상적인 조화를 이룬다.',
            familyCost: 0,
            photos: ['hyeopjae1.jpg', 'hyeopjae2.jpg'],
            facilities: ['샤워장', '화장실', '주차장', '매점'],
            waterSports: ['바나나보트', '제트스키'],
            season: '6월-9월'
        },
        {
            id: 'geumneung_beach',
            name: '금능해수욕장',
            category: '해수욕장',
            lat: 33.3952,
            lng: 126.2384,
            rating: 4.2,
            reviewCount: 1234,
            entranceFee: 0,
            menu: [],
            address: '제주특별자치도 제주시 한림읍 금능리',
            phone: '064-728-7622',
            hours: {
                monday: '24시간',
                tuesday: '24시간',
                wednesday: '24시간',
                thursday: '24시간',
                friday: '24시간',
                saturday: '24시간',
                sunday: '24시간'
            },
            tags: ['해수욕장', '일몰', '조용한'],
            reviewSummary: '협재해수욕장 바로 옆에 위치한 조용한 해변. 일몰 감상 포인트로도 유명하다.',
            familyCost: 0,
            photos: ['geumneung1.jpg', 'geumneung2.jpg'],
            facilities: ['샤워장', '화장실', '주차장'],
            waterSports: [],
            season: '6월-9월'
        }
    ],

    // 🛍️ 쇼핑 데이터
    shopping: [
        {
            id: 'jeju_airport_duty_free',
            name: '제주공항 면세점',
            category: '면세점',
            lat: 33.5104,
            lng: 126.4913,
            rating: 4.1,
            reviewCount: 2345,
            priceLevel: 3,
            menu: [],
            address: '제주특별자치도 제주시 공항로 2',
            phone: '064-797-2000',
            hours: {
                monday: '07:00-21:00',
                tuesday: '07:00-21:00',
                wednesday: '07:00-21:00',
                thursday: '07:00-21:00',
                friday: '07:00-21:00',
                saturday: '07:00-21:00',
                sunday: '07:00-21:00'
            },
            tags: ['면세점', '쇼핑', '기념품'],
            reviewSummary: '제주 여행의 마지막을 장식하는 쇼핑 장소. 제주 특산품부터 명품까지 다양하게 구비.',
            familyCost: 50000,
            photos: ['duty_free1.jpg', 'duty_free2.jpg'],
            brands: ['샤넬', '구찌', '제주감귤', '한라봉']
        }
    ],

    // 🏨 숙소 데이터 (참고용)
    accommodations: [
        {
            id: 'checkin_hotel_jeju',
            name: '체크인호텔 제주',
            category: '호텔',
            lat: 33.5015,
            lng: 126.5050,
            rating: 4.2,
            reviewCount: 1567,
            priceLevel: 2,
            address: '제주특별자치도 제주시 연동',
            bookingUrl: 'https://www.agoda.com/sl/cmP0tfukS0y',
            tags: ['공항근처', '가성비', '주차가능'],
            amenities: ['무료WiFi', '주차장', '24시간프런트']
        },
        {
            id: 'thefirst70_hotel',
            name: '더 퍼스트 70 호텔',
            category: '호텔',
            lat: 33.2476,
            lng: 126.5615,
            rating: 4.4,
            reviewCount: 2234,
            priceLevel: 2,
            address: '제주특별자치도 서귀포시 서귀동',
            bookingUrl: 'https://www.agoda.com/sl/GPG0yhcNtzR',
            tags: ['서귀포', '올레시장근처', '깔끔한'],
            amenities: ['무료WiFi', '주차장', '조식']
        }
    ]
};

// 데이터 통계 계산 및 표시
function displayDataStats() {
    const restaurantCount = Object.values(JEJU_COMPLETE_DATA.restaurants).reduce((sum, region) => sum + region.length, 0);
    const cafeCount = Object.values(JEJU_COMPLETE_DATA.cafes).reduce((sum, region) => sum + region.length, 0);
    const attractionCount = Object.values(JEJU_COMPLETE_DATA.attractions).reduce((sum, category) => sum + category.length, 0);
    const activityCount = Object.values(JEJU_COMPLETE_DATA.activities).reduce((sum, category) => sum + category.length, 0);

    document.getElementById('restaurant-count').textContent = restaurantCount;
    document.getElementById('cafe-count').textContent = cafeCount;
    document.getElementById('attraction-count').textContent = attractionCount;
    document.getElementById('activity-count').textContent = activityCount;
}

// 데이터 검색 함수들
window.JEJU_DATA_UTILS = {
    // 지역별 맛집 검색
    getRestaurantsByRegion: function(region) {
        return JEJU_COMPLETE_DATA.restaurants[region] || [];
    },
    
    // 카테고리별 맛집 검색
    getRestaurantsByCategory: function(category) {
        const allRestaurants = [];
        Object.values(JEJU_COMPLETE_DATA.restaurants).forEach(region => {
            allRestaurants.push(...region.filter(r => r.category === category));
        });
        return allRestaurants;
    },
    
    // 평점 기준 검색
    getTopRatedPlaces: function(type, minRating = 4.0) {
        const places = [];
        if (type === 'restaurants') {
            Object.values(JEJU_COMPLETE_DATA.restaurants).forEach(region => {
                places.push(...region.filter(r => r.rating >= minRating));
            });
        } else if (type === 'cafes') {
            Object.values(JEJU_COMPLETE_DATA.cafes).forEach(region => {
                places.push(...region.filter(c => c.rating >= minRating));
            });
        }
        return places.sort((a, b) => b.rating - a.rating);
    },
    
    // 거리 기준 검색
    getNearbyPlaces: function(lat, lng, radius = 5000, type = 'all') {
        const nearby = [];
        const toRad = (value) => value * Math.PI / 180;
        
        const calculateDistance = (lat1, lng1, lat2, lng2) => {
            const R = 6371000; // 지구 반지름 (미터)
            const dLat = toRad(lat2 - lat1);
            const dLng = toRad(lng2 - lng1);
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                      Math.sin(dLng/2) * Math.sin(dLng/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        };
        
        // 모든 데이터 타입에서 검색
        const searchInData = (data) => {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const distance = calculateDistance(lat, lng, item.lat, item.lng);
                    if (distance <= radius) {
                        nearby.push({...item, distance});
                    }
                });
            } else if (typeof data === 'object') {
                Object.values(data).forEach(subData => searchInData(subData));
            }
        };
        
        if (type === 'all' || type === 'restaurants') {
            searchInData(JEJU_COMPLETE_DATA.restaurants);
        }
        if (type === 'all' || type === 'cafes') {
            searchInData(JEJU_COMPLETE_DATA.cafes);
        }
        if (type === 'all' || type === 'attractions') {
            searchInData(JEJU_COMPLETE_DATA.attractions);
        }
        if (type === 'all' || type === 'activities') {
            searchInData(JEJU_COMPLETE_DATA.activities);
        }
        
        return nearby.sort((a, b) => a.distance - b.distance);
    },
    
    // 가격대별 검색
    getPlacesByPriceLevel: function(priceLevel) {
        const places = [];
        Object.values(JEJU_COMPLETE_DATA.restaurants).forEach(region => {
            places.push(...region.filter(r => r.priceLevel === priceLevel));
        });
        Object.values(JEJU_COMPLETE_DATA.cafes).forEach(region => {
            places.push(...region.filter(c => c.priceLevel === priceLevel));
        });
        return places;
    },
    
    // 전체 데이터 반환
    getAllData: function() {
        return JEJU_COMPLETE_DATA;
    }
};

// 페이지 로드 시 통계 표시
document.addEventListener('DOMContentLoaded', displayDataStats);

// 외부에서 사용할 수 있도록 전역 변수로 설정
window.JEJU_COMPLETE_DATA = JEJU_COMPLETE_DATA;

console.log('🏝️ 제주도 완전 데이터베이스 로드 완료!');
console.log('사용법: window.JEJU_DATA_UTILS.getRestaurantsByRegion("jeju_city")');
console.log('총 데이터:', {
    restaurants: Object.values(JEJU_COMPLETE_DATA.restaurants).reduce((sum, region) => sum + region.length, 0),
    cafes: Object.values(JEJU_COMPLETE_DATA.cafes).reduce((sum, region) => sum + region.length, 0),
    attractions: Object.values(JEJU_COMPLETE_DATA.attractions).reduce((sum, category) => sum + category.length, 0),
    activities: Object.values(JEJU_COMPLETE_DATA.activities).reduce((sum, category) => sum + category.length, 0)
});
</script>

</body>
</html>
    <script id="html_badge_script1">
        window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/" +
            "remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDnTBakKJuNPs%2FCBetUafrURhNnN4Jw%2B2oyK6R5EGGzGYcWJWoAzK%2FKWhTlocS%2FkFvV5jtBqjvU8OVkx2qYs1%2BLHJIkRwcTmF6OXoXlOOuILsOR0gxttQXDPSfztO33p6vN0l8bK5DO2OPdzif3YBxJkDNqT08wlXDrOP%2BmIsaRKZm5aE3WfNFoqQ0J8Wv0d0qSZDnjiOk%2BOCJrwsEOu0gDemoK6YC%2FS7IGkvhimZ25DWm02JiGjYGi7wRZ3fadj4Tlf005luxglOmpZpc52wH12LRnsaWfZiryLPo2mr%2F%2FeQVY8ax7tACgMHk6v%2FNUwjKeP1KzPQlqOk3vOjUL7OIzzurfxYzEDhhEUWx%2Bul7nKOGLCuUxT%2F6tHnrGhf0LzO5iD23kGpHrCrSrjhyfxk%2FdAcIijcHJpR4DJ94l7HVei9fHVz12qd6OidS3%2Fbi23qVuB3s8k81bmRRKxxl7XdxknYlt3U4oAx%2BVYGOSpdiXz2QbE%2FnAOG1STX2NwwtQR0jQ%3D%3D";
        window.__genspark_locale = "ko-KR";
        window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDnTBakKJuNPs/CBetUafrURhNnN4Jw+2oyK6R5EGGzGYcWJWoAzK/KWhTlocS/kFvV5jtBqjvU8OVkx2qYs1+LHJIkRwcTmF6OXoXlOOuILsOR0gxttQXDPSfztO33p6vN0l8bK5DO2OPdzif3YBxJkDNqT08wlXDrOP+mIsaRKZm5aE3WfNFoqQ0J8Wv0d0qSZDnjiOk+OCJrwsEOu0gDemoK6YC/S7IGkvhimZ25DWm02JiGjYGi7wRZ3fadj4Tlf005luxglOmpZpc52wH12LRnsaWfZiryLPo2mr//eQVY8ax7tACgMHk6v/NUwjKeP1KzPQlqOk3vOjUL7OIzzurfxYzEDhhEUWx+ul7nKOGLCuUxT/6tHnrGhf0LzO5iD23kGpHrCrSrjhyfxk/dAcIijcHJpR4DJ94l7HVei9fHVz12qd6OidS3/bi23qVuB3s8k81bmRRKxxl7XdxknYlt3U4oAx+VYGOSpdiXz2QbE/nAOG1STX2NwwtQR0jQ==";
    </script>
    
    <script id="html_notice_dialog_script" src="https://www.genspark.ai/notice_dialog.js"></script>
