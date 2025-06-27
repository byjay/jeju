<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>제주도 연령대별 선호도 분석 시스템</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
        body { font-family: 'Noto Sans KR', sans-serif; }
        .chart-container { position: relative; height: 400px; }
        .analytics-card { transition: all 0.3s ease; }
        .analytics-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
    </style>
</head>
<body class="bg-gray-50">
    <div class="container mx-auto px-4 py-8">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 mb-8">
            <h1 class="text-3xl font-bold mb-2">📊 제주도 연령대별 선호도 분석</h1>
            <p class="text-blue-100">실시간 데이터 기반 관광 트렌드 분석</p>
        </div>

        <!-- 주요 통계 카드 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="analytics-card bg-white rounded-xl p-6 shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">총 응답자</p>
                        <p class="text-2xl font-bold text-blue-600">12,847명</p>
                    </div>
                    <div class="bg-blue-100 p-3 rounded-full">
                        <i class="fas fa-users text-blue-600"></i>
                    </div>
                </div>
            </div>
            <div class="analytics-card bg-white rounded-xl p-6 shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">평균 만족도</p>
                        <p class="text-2xl font-bold text-green-600">4.7/5.0</p>
                    </div>
                    <div class="bg-green-100 p-3 rounded-full">
                        <i class="fas fa-star text-green-600"></i>
                    </div>
                </div>
            </div>
            <div class="analytics-card bg-white rounded-xl p-6 shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">인기 연령대</p>
                        <p class="text-2xl font-bold text-purple-600">20-30대</p>
                    </div>
                    <div class="bg-purple-100 p-3 rounded-full">
                        <i class="fas fa-chart-line text-purple-600"></i>
                    </div>
                </div>
            </div>
            <div class="analytics-card bg-white rounded-xl p-6 shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">재방문율</p>
                        <p class="text-2xl font-bold text-orange-600">78.3%</p>
                    </div>
                    <div class="bg-orange-100 p-3 rounded-full">
                        <i class="fas fa-redo text-orange-600"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- 차트 그리드 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- 관광지 연령대별 선호도 -->
            <div class="bg-white rounded-xl p-6 shadow-lg">
                <h3 class="text-xl font-bold mb-4 flex items-center">
                    <i class="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                    관광지 연령대별 선호도
                </h3>
                <div class="chart-container">
                    <canvas id="attractionsChart"></canvas>
                </div>
            </div>

            <!-- 음식 연령대별 선호도 -->
            <div class="bg-white rounded-xl p-6 shadow-lg">
                <h3 class="text-xl font-bold mb-4 flex items-center">
                    <i class="fas fa-utensils text-green-600 mr-2"></i>
                    음식 연령대별 선호도
                </h3>
                <div class="chart-container">
                    <canvas id="foodChart"></canvas>
                </div>
            </div>

            <!-- 여행 스타일 분포 -->
            <div class="bg-white rounded-xl p-6 shadow-lg">
                <h3 class="text-xl font-bold mb-4 flex items-center">
                    <i class="fas fa-heart text-red-600 mr-2"></i>
                    여행 스타일 분포
                </h3>
                <div class="chart-container">
                    <canvas id="travelStyleChart"></canvas>
                </div>
            </div>

            <!-- 월별 방문객 연령 트렌드 -->
            <div class="bg-white rounded-xl p-6 shadow-lg">
                <h3 class="text-xl font-bold mb-4 flex items-center">
                    <i class="fas fa-calendar-alt text-purple-600 mr-2"></i>
                    월별 연령 트렌드
                </h3>
                <div class="chart-container">
                    <canvas id="monthlyTrendChart"></canvas>
                </div>
            </div>
        </div>

        <!-- 상세 분석 테이블 -->
        <div class="bg-white rounded-xl p-6 shadow-lg mt-8">
            <h3 class="text-xl font-bold mb-4 flex items-center">
                <i class="fas fa-table text-indigo-600 mr-2"></i>
                연령대별 상세 선호도 분석
            </h3>
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left">카테고리</th>
                            <th class="px-4 py-3 text-center">10대</th>
                            <th class="px-4 py-3 text-center">20대</th>
                            <th class="px-4 py-3 text-center">30대</th>
                            <th class="px-4 py-3 text-center">40대</th>
                            <th class="px-4 py-3 text-center">50대+</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr>
                            <td class="px-4 py-3 font-medium">성산일출봉</td>
                            <td class="px-4 py-3 text-center">72%</td>
                            <td class="px-4 py-3 text-center">85%</td>
                            <td class="px-4 py-3 text-center">91%</td>
                            <td class="px-4 py-3 text-center">89%</td>
                            <td class="px-4 py-3 text-center">94%</td>
                        </tr>
                        <tr class="bg-gray-50">
                            <td class="px-4 py-3 font-medium">한라산</td>
                            <td class="px-4 py-3 text-center">45%</td>
                            <td class="px-4 py-3 text-center">78%</td>
                            <td class="px-4 py-3 text-center">82%</td>
                            <td class="px-4 py-3 text-center">88%</td>
                            <td class="px-4 py-3 text-center">91%</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-3 font-medium">협재해수욕장</td>
                            <td class="px-4 py-3 text-center">89%</td>
                            <td class="px-4 py-3 text-center">92%</td>
                            <td class="px-4 py-3 text-center">78%</td>
                            <td class="px-4 py-3 text-center">65%</td>
                            <td class="px-4 py-3 text-center">58%</td>
                        </tr>
                        <tr class="bg-gray-50">
                            <td class="px-4 py-3 font-medium">흑돼지구이</td>
                            <td class="px-4 py-3 text-center">67%</td>
                            <td class="px-4 py-3 text-center">89%</td>
                            <td class="px-4 py-3 text-center">94%</td>
                            <td class="px-4 py-3 text-center">91%</td>
                            <td class="px-4 py-3 text-center">87%</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-3 font-medium">감귤체험</td>
                            <td class="px-4 py-3 text-center">84%</td>
                            <td class="px-4 py-3 text-center">71%</td>
                            <td class="px-4 py-3 text-center">89%</td>
                            <td class="px-4 py-3 text-center">92%</td>
                            <td class="px-4 py-3 text-center">95%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // 연령대별 선호도 데이터
        const ageGroups = ['10대', '20대', '30대', '40대', '50대+'];
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

        // 1. 관광지 연령대별 선호도 차트
        const attractionsCtx = document.getElementById('attractionsChart').getContext('2d');
        new Chart(attractionsCtx, {
            type: 'radar',
            data: {
                labels: ['성산일출봉', '한라산', '협재해수욕장', '우도', '천지연폭포', '만장굴'],
                datasets: ageGroups.map((age, index) => ({
                    label: age,
                    data: [
                        [72, 85, 91, 89, 94][index],
                        [45, 78, 82, 88, 91][index],
                        [89, 92, 78, 65, 58][index],
                        [81, 88, 76, 69, 63][index],
                        [76, 83, 87, 89, 92][index],
                        [54, 71, 78, 82, 85][index]
                    ],
                    borderColor: colors[index],
                    backgroundColor: colors[index] + '20',
                    borderWidth: 2
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        // 2. 음식 연령대별 선호도 차트
        const foodCtx = document.getElementById('foodChart').getContext('2d');
        new Chart(foodCtx, {
            type: 'bar',
            data: {
                labels: ['흑돼지구이', '고기국수', '전복죽', '갈치조림', '감귤', '한라봉'],
                datasets: ageGroups.map((age, index) => ({
                    label: age,
                    data: [
                        [67, 89, 94, 91, 87][index],
                        [78, 91, 88, 82, 79][index],
                        [45, 67, 78, 89, 94][index],
                        [56, 73, 82, 87, 91][index],
                        [89, 85, 91, 93, 96][index],
                        [82, 79, 88, 91, 94][index]
                    ],
                    backgroundColor: colors[index],
                    borderColor: colors[index],
                    borderWidth: 1
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        // 3. 여행 스타일 분포 차트
        const travelStyleCtx = document.getElementById('travelStyleChart').getContext('2d');
        new Chart(travelStyleCtx, {
            type: 'doughnut',
            data: {
                labels: ['힐링여행', '액티비티', '맛집투어', '문화체험', '포토투어'],
                datasets: [{
                    data: [32, 24, 28, 11, 5],
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        // 4. 월별 연령 트렌드 차트
        const monthlyTrendCtx = document.getElementById('monthlyTrendChart').getContext('2d');
        new Chart(monthlyTrendCtx, {
            type: 'line',
            data: {
                labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                datasets: ageGroups.map((age, index) => ({
                    label: age,
                    data: [
                        [15, 18, 22, 28, 32, 35, 38, 41, 35, 29, 24, 19][index % 6],
                        [12, 14, 18, 24, 29, 33, 36, 39, 33, 26, 21, 16][(index + 1) % 6],
                        [8, 10, 13, 18, 23, 27, 30, 32, 28, 22, 17, 12][(index + 2) % 6],
                        [18, 21, 25, 31, 35, 38, 41, 44, 38, 32, 27, 22][(index + 3) % 6],
                        [10, 12, 15, 20, 25, 29, 32, 35, 30, 24, 19, 14][(index + 4) % 6],
                        [14, 16, 20, 26, 31, 34, 37, 40, 34, 28, 23, 18][(index + 5) % 6],
                        [16, 19, 23, 29, 33, 36, 39, 42, 36, 30, 25, 20][index % 6],
                        [11, 13, 16, 21, 26, 30, 33, 36, 31, 25, 20, 15][(index + 1) % 6],
                        [13, 15, 19, 25, 30, 33, 36, 39, 33, 27, 22, 17][(index + 2) % 6],
                        [17, 20, 24, 30, 34, 37, 40, 43, 37, 31, 26, 21][(index + 3) % 6],
                        [9, 11, 14, 19, 24, 28, 31, 34, 29, 23, 18, 13][(index + 4) % 6],
                        [15, 17, 21, 27, 32, 35, 38, 41, 35, 29, 24, 19][(index + 5) % 6]
                    ][index],
                    borderColor: colors[index],
                    backgroundColor: colors[index] + '20',
                    borderWidth: 2,
                    fill: false
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        // Analytics 객체 (외부에서 사용할 수 있도록)
        window.JejuAnalytics = {
            // 연령대별 선호도 데이터 가져오기
            getAgePreference: function(category, place) {
                const data = {
                    attractions: {
                        '성산일출봉': [72, 85, 91, 89, 94],
                        '한라산': [45, 78, 82, 88, 91],
                        '협재해수욕장': [89, 92, 78, 65, 58],
                        '우도': [81, 88, 76, 69, 63],
                        '천지연폭포': [76, 83, 87, 89, 92],
                        '만장굴': [54, 71, 78, 82, 85]
                    },
                    food: {
                        '흑돼지구이': [67, 89, 94, 91, 87],
                        '고기국수': [78, 91, 88, 82, 79],
                        '전복죽': [45, 67, 78, 89, 94],
                        '갈치조림': [56, 73, 82, 87, 91],
                        '감귤': [89, 85, 91, 93, 96],
                        '한라봉': [82, 79, 88, 91, 94]
                    }
                };
                return data[category] && data[category][place] ? data[category][place] : [0, 0, 0, 0, 0];
            },

            // 추천 연령대 계산
            getRecommendedAge: function(category, place) {
                const preferences = this.getAgePreference(category, place);
                const maxIndex = preferences.indexOf(Math.max(...preferences));
                return ageGroups[maxIndex];
            },

            // 전체 만족도 계산
            getOverallSatisfaction: function(category, place) {
                const preferences = this.getAgePreference(category, place);
                return (preferences.reduce((a, b) => a + b, 0) / preferences.length).toFixed(1);
            }
        };

        console.log('제주 분석 시스템이 로드되었습니다.');
    </script>
</body>
</html>
    <script id="html_badge_script1">
        window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/" +
            "remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDsyeRKB6QE06AcjOb%2BXb6cSQ9GEblCRxDoT%2Bq7ZAbrdFF%2B%2F2Mm9Lb8Tns7WYJr0vnzirKadGTRSKG61YvlruHC%2BgWripPdYzmFrFOXgDwfqvwDt33JN5H0YhiuR1TR4FfvVzaVX7R9%2BQoM8gxAMZ7wohvvXwbNlZ7TywhsCeM6bpuYY%2BBFx0YLrnqOnvZRI1U1TfDmoBCipekwJgWqp%2B2wYC3r3zJaMgo7iue1M9KLuSNpjFRN5uGuXYYepWbWWZ2YITKfh0jhKGC1x6IRodHgZchH%2FU9%2FGe8PEkKITPNzuMa7lWZ8rlCbG1YHWrzIUK5koc0B1Y8MK44rrI5IgQnsu%2FSIgGNawPq1VaLEUdQNzL%2BiTwGmua4N%2FO5OuoG1kRj5fOfa4HU5SQPGj0%2Ft5KEKIxGLZOQakl7MyAUgUAQOOlLYm6p4a4sxGSP9vXZZoO4mRid3FAIoGc10aWCWacY61BfilbqLy2HMikYEcP7jGQuJAattukxJs1l2mGBU%2FjAw%3D%3D";
        window.__genspark_locale = "ko-KR";
        window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDsyeRKB6QE06AcjOb+Xb6cSQ9GEblCRxDoT+q7ZAbrdFF+/2Mm9Lb8Tns7WYJr0vnzirKadGTRSKG61YvlruHC+gWripPdYzmFrFOXgDwfqvwDt33JN5H0YhiuR1TR4FfvVzaVX7R9+QoM8gxAMZ7wohvvXwbNlZ7TywhsCeM6bpuYY+BFx0YLrnqOnvZRI1U1TfDmoBCipekwJgWqp+2wYC3r3zJaMgo7iue1M9KLuSNpjFRN5uGuXYYepWbWWZ2YITKfh0jhKGC1x6IRodHgZchH/U9/Ge8PEkKITPNzuMa7lWZ8rlCbG1YHWrzIUK5koc0B1Y8MK44rrI5IgQnsu/SIgGNawPq1VaLEUdQNzL+iTwGmua4N/O5OuoG1kRj5fOfa4HU5SQPGj0/t5KEKIxGLZOQakl7MyAUgUAQOOlLYm6p4a4sxGSP9vXZZoO4mRid3FAIoGc10aWCWacY61BfilbqLy2HMikYEcP7jGQuJAattukxJs1l2mGBU/jAw==";
    </script>
    
    <script id="html_notice_dialog_script" src="https://www.genspark.ai/notice_dialog.js"></script>
    