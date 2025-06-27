<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>제주도 날씨 시스템 - weather.js</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');
        body { font-family: 'Noto Sans KR', sans-serif; }
        .weather-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .chart-container { height: 300px; }
    </style>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
            <i class="fas fa-cloud-sun mr-3"></i>제주도 날씨 시스템 - weather.js
        </h1>
        
        <!-- 실시간 날씨 카드 -->
        <div class="weather-card text-white rounded-xl p-6 mb-8 shadow-lg">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-xl font-semibold mb-2">제주시 현재 날씨</h2>
                    <div class="flex items-center mb-2">
                        <i id="weather-icon" class="fas fa-sun text-4xl mr-4"></i>
                        <div>
                            <div class="text-3xl font-bold" id="current-temp">22°C</div>
                            <div class="text-sm opacity-90" id="weather-desc">맑음</div>
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm opacity-90">체감온도</div>
                    <div class="text-xl font-semibold" id="feels-like">24°C</div>
                    <div class="text-sm opacity-90 mt-2">습도 <span id="humidity">65%</span></div>
                </div>
            </div>
        </div>

        <!-- 상세 날씨 정보 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-gray-500 text-sm">바람</div>
                        <div class="text-xl font-semibold" id="wind-speed">3.2 m/s</div>
                    </div>
                    <i class="fas fa-wind text-blue-500 text-2xl"></i>
                </div>
            </div>
            <div class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-gray-500 text-sm">기압</div>
                        <div class="text-xl font-semibold" id="pressure">1013 hPa</div>
                    </div>
                    <i class="fas fa-tachometer-alt text-green-500 text-2xl"></i>
                </div>
            </div>
            <div class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-gray-500 text-sm">자외선</div>
                        <div class="text-xl font-semibold" id="uv-index">5 보통</div>
                    </div>
                    <i class="fas fa-sun text-yellow-500 text-2xl"></i>
                </div>
            </div>
            <div class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-gray-500 text-sm">가시거리</div>
                        <div class="text-xl font-semibold" id="visibility">10 km</div>
                    </div>
                    <i class="fas fa-eye text-purple-500 text-2xl"></i>
                </div>
            </div>
        </div>

        <!-- 24시간 예보 차트 -->
        <div class="bg-white rounded-xl p-6 shadow-lg mb-8">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">
                <i class="fas fa-chart-line mr-2"></i>24시간 온도 예보
            </h3>
            <div class="chart-container">
                <canvas id="hourlyChart"></canvas>
            </div>
        </div>

        <!-- 주간 예보 -->
        <div class="bg-white rounded-xl p-6 shadow-lg mb-8">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">
                <i class="fas fa-calendar-week mr-2"></i>7일 예보
            </h3>
            <div id="weekly-forecast" class="space-y-3"></div>
        </div>

        <!-- 여행 추천 -->
        <div class="bg-white rounded-xl p-6 shadow-lg">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">
                <i class="fas fa-lightbulb mr-2"></i>날씨 기반 여행 추천
            </h3>
            <div id="travel-recommendations" class="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
        </div>
    </div>

    <script>
// weather.js - 제주도 날씨 시스템

class JejuWeatherSystem {
    constructor() {
        this.apiKey = 'demo'; // 실제 사용시 OpenWeatherMap API 키 필요
        this.jejuCoords = { lat: 33.4996, lon: 126.5312 }; // 제주시 좌표
        this.chart = null;
        this.init();
    }

    init() {
        this.loadCurrentWeather();
        this.loadHourlyForecast();
        this.loadWeeklyForecast();
        this.generateTravelRecommendations();
        
        // 10분마다 업데이트
        setInterval(() => {
            this.loadCurrentWeather();
        }, 600000);
    }

    // 현재 날씨 로드 (데모 데이터)
    loadCurrentWeather() {
        // 실제 구현시 OpenWeatherMap API 호출
        const mockWeatherData = {
            temp: Math.round(18 + Math.random() * 10),
            feelsLike: Math.round(20 + Math.random() * 8),
            humidity: Math.round(60 + Math.random() * 20),
            windSpeed: (2 + Math.random() * 4).toFixed(1),
            pressure: Math.round(1010 + Math.random() * 10),
            uvIndex: Math.round(3 + Math.random() * 5),
            visibility: Math.round(8 + Math.random() * 4),
            condition: this.getRandomCondition()
        };

        this.updateCurrentWeatherUI(mockWeatherData);
    }

    // 시간별 예보 로드
    loadHourlyForecast() {
        const hourlyData = [];
        const labels = [];
        const now = new Date();

        for (let i = 0; i < 24; i++) {
            const hour = new Date(now.getTime() + i * 3600000);
            labels.push(hour.getHours() + ':00');
            hourlyData.push(Math.round(18 + Math.random() * 8 + Math.sin(i / 4) * 3));
        }

        this.createHourlyChart(labels, hourlyData);
    }

    // 주간 예보 로드
    loadWeeklyForecast() {
        const weeklyData = [];
        const days = ['오늘', '내일', '모레', '목요일', '금요일', '토요일', '일요일'];
        
        for (let i = 0; i < 7; i++) {
            weeklyData.push({
                day: days[i],
                high: Math.round(22 + Math.random() * 6),
                low: Math.round(15 + Math.random() * 5),
                condition: this.getRandomCondition(),
                icon: this.getWeatherIcon(this.getRandomCondition()),
                rain: Math.round(Math.random() * 40)
            });
        }

        this.updateWeeklyForecastUI(weeklyData);
    }

    // 현재 날씨 UI 업데이트
    updateCurrentWeatherUI(data) {
        document.getElementById('current-temp').textContent = data.temp + '°C';
        document.getElementById('feels-like').textContent = data.feelsLike + '°C';
        document.getElementById('humidity').textContent = data.humidity + '%';
        document.getElementById('wind-speed').textContent = data.windSpeed + ' m/s';
        document.getElementById('pressure').textContent = data.pressure + ' hPa';
        document.getElementById('uv-index').textContent = data.uvIndex + ' ' + this.getUVLevel(data.uvIndex);
        document.getElementById('visibility').textContent = data.visibility + ' km';
        document.getElementById('weather-desc').textContent = data.condition;
        document.getElementById('weather-icon').className = 'fas ' + this.getWeatherIcon(data.condition) + ' text-4xl mr-4';
    }

    // 시간별 차트 생성
    createHourlyChart(labels, data) {
        const ctx = document.getElementById('hourlyChart').getContext('2d');
        
        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '온도 (°C)',
                    data: data,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                }
            }
        });
    }

    // 주간 예보 UI 업데이트
    updateWeeklyForecastUI(weeklyData) {
        const container = document.getElementById('weekly-forecast');
        container.innerHTML = '';

        weeklyData.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg';
            dayElement.innerHTML = `
                <div class="flex items-center space-x-4">
                    <div class="w-16 text-sm font-medium">${day.day}</div>
                    <i class="fas ${day.icon} text-blue-500 w-6"></i>
                    <div class="text-sm text-gray-600">${day.condition}</div>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="text-sm text-blue-600">
                        <i class="fas fa-tint mr-1"></i>${day.rain}%
                    </div>
                    <div class="text-sm text-gray-500">${day.low}°</div>
                    <div class="text-sm font-semibold">${day.high}°</div>
                </div>
            `;
            container.appendChild(dayElement);
        });
    }

    // 여행 추천 생성
    generateTravelRecommendations() {
        const recommendations = [
            {
                condition: '맑음',
                title: '해변 활동 추천',
                activities: ['협재해수욕장', '함덕해수욕장', '성산일출봉'],
                icon: 'fa-umbrella-beach',
                color: 'text-yellow-500'
            },
            {
                condition: '구름 조금',
                title: '야외 관광 추천',
                activities: ['한라산 등반', '올레길 걷기', '우도 관광'],
                icon: 'fa-mountain',
                color: 'text-green-500'
            },
            {
                condition: '비',
                title: '실내 활동 추천',
                activities: ['아쿠아플라넷', '박물관 투어', '카페 투어'],
                icon: 'fa-building',
                color: 'text-blue-500'
            }
        ];

        const container = document.getElementById('travel-recommendations');
        container.innerHTML = '';

        recommendations.forEach(rec => {
            const recElement = document.createElement('div');
            recElement.className = 'bg-gray-50 rounded-lg p-4';
            recElement.innerHTML = `
                <div class="flex items-center mb-3">
                    <i class="fas ${rec.icon} ${rec.color} text-xl mr-2"></i>
                    <h4 class="font-semibold">${rec.title}</h4>
                </div>
                <div class="space-y-1">
                    ${rec.activities.map(activity => 
                        `<div class="text-sm text-gray-600">• ${activity}</div>`
                    ).join('')}
                </div>
            `;
            container.appendChild(recElement);
        });
    }

    // 헬퍼 함수들
    getRandomCondition() {
        const conditions = ['맑음', '구름 조금', '흐림', '비', '소나기'];
        return conditions[Math.floor(Math.random() * conditions.length)];
    }

    getWeatherIcon(condition) {
        const iconMap = {
            '맑음': 'fa-sun',
            '구름 조금': 'fa-cloud-sun',
            '흐림': 'fa-cloud',
            '비': 'fa-cloud-rain',
            '소나기': 'fa-cloud-showers-heavy'
        };
        return iconMap[condition] || 'fa-sun';
    }

    getUVLevel(index) {
        if (index <= 2) return '낮음';
        if (index <= 5) return '보통';
        if (index <= 7) return '높음';
        if (index <= 10) return '매우높음';
        return '위험';
    }
}

// 실제 API 연동 함수 (사용 예시)
async function fetchRealWeatherData() {
    // OpenWeatherMap API 사용 예시
    const API_KEY = 'YOUR_API_KEY'; // 실제 API 키 필요
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=33.4996&lon=126.5312&appid=${API_KEY}&units=metric&lang=kr`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            pressure: data.main.pressure,
            visibility: data.visibility / 1000,
            condition: data.weather[0].description
        };
    } catch (error) {
        console.error('날씨 데이터를 불러올 수 없습니다:', error);
        return null;
    }
}

// 날씨 시스템 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.jejuWeather = new JejuWeatherSystem();
});

// 외부에서 사용할 수 있는 API
window.JejuWeatherAPI = {
    getCurrentWeather: () => window.jejuWeather?.getCurrentWeather(),
    getHourlyForecast: () => window.jejuWeather?.getHourlyForecast(),
    getTravelRecommendations: (condition) => window.jejuWeather?.getTravelRecommendations(condition),
    updateWeather: () => window.jejuWeather?.loadCurrentWeather()
};
    </script>
</body>
</html>
    <script id="html_badge_script1">
        window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/" +
            "remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDrzvDkC0IaFU5H4LWsnqkmE%2F0youLxFVVA%2B3jQ5hWIcBrknq7MMqhYOhCxmlK3SwI%2BLDYtbKtifJ8qE0uvYu6Lr%2FJYyQIu3Bm%2F3vfMteknO5if2f7IQ749P9b%2FAz5RzvhX4AcRsWgvk%2BeZvEC3b5SuGRAYbu4htYravOtpqBWfwufPKgjTYkeFFrEgcTCfq3Yv7dSmHs%2Fr1DkMOnK34KeU7GdgqR1wm9hu0%2FVC73o6WDO3OxDhA6juSwzbUjq5O1N%2BLpJV6F%2F0YfhCcF2uCZThIhPFBkrlKMgR6eyNGeICTisshLdTOSS6QCG5R7b1UXCx26ZG68geJX93x6cll6%2BYXifct5UN93AzrQxP5y9DDmko1aIsKJTeW0wHpg33BmC6i%2BCe7%2BeUuTJJZj6SL2OngzJII2i4254kmWb6Xct9XZ11qT5N8UYgRRlu9xlg0raaEqaLG1GR5fq6vn7SlXcjnyl2cXHDn%2BVCdyd2hqZabM";
        window.__genspark_locale = "ko-KR";
        window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDrzvDkC0IaFU5H4LWsnqkmE/0youLxFVVA+3jQ5hWIcBrknq7MMqhYOhCxmlK3SwI+LDYtbKtifJ8qE0uvYu6Lr/JYyQIu3Bm/3vfMteknO5if2f7IQ749P9b/Az5RzvhX4AcRsWgvk+eZvEC3b5SuGRAYbu4htYravOtpqBWfwufPKgjTYkeFFrEgcTCfq3Yv7dSmHs/r1DkMOnK34KeU7GdgqR1wm9hu0/VC73o6WDO3OxDhA6juSwzbUjq5O1N+LpJV6F/0YfhCcF2uCZThIhPFBkrlKMgR6eyNGeICTisshLdTOSS6QCG5R7b1UXCx26ZG68geJX93x6cll6+YXifct5UN93AzrQxP5y9DDmko1aIsKJTeW0wHpg33BmC6i+Ce7+eUuTJJZj6SL2OngzJII2i4254kmWb6Xct9XZ11qT5N8UYgRRlu9xlg0raaEqaLG1GR5fq6vn7SlXcjnyl2cXHDn+VCdyd2hqZabM";
    </script>
    
    <script id="html_notice_dialog_script" src="https://www.genspark.ai/notice_dialog.js"></script>
    