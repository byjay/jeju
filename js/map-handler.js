<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>지도 핸들러 JavaScript 파일</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        pre { background: #1e1e1e; color: #d4d4d4; padding: 20px; border-radius: 8px; overflow-x: auto; }
        .download-btn { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    </style>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">📍 지도 핸들러 - map-handler.js</h1>
            <p class="text-gray-600 mb-4">구글맵 연동, 동선 관리, 거리 계산 시스템</p>
            <button onclick="downloadFile()" class="download-btn text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                📥 map-handler.js 다운로드
            </button>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-bold mb-4">파일 내용 미리보기:</h2>
            <pre id="jsCode">// 지도 핸들러 - map-handler.js
// 구글맵 연동, 동선 관리, 거리 계산 시스템

class MapHandler {
    constructor() {
        this.map = null;
        this.directionsService = null;
        this.directionsRenderer = null;
        this.markers = [];
        this.userLocationMarker = null;
        this.currentPath = [];
        this.isNavigationMode = false;
        this.watchId = null;
    }

    // 지도 초기화
    async initializeMap(containerId = 'map') {
        try {
            this.map = new google.maps.Map(document.getElementById(containerId), {
                center: { lat: 33.385, lng: 126.55 },
                zoom: 10,
                mapTypeId: 'roadmap',
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [{ visibility: 'simplified' }]
                    }
                ]
            });

            this.directionsService = new google.maps.DirectionsService();
            this.directionsRenderer = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: '#4f46e5',
                    strokeWeight: 4,
                    strokeOpacity: 0.8
                }
            });
            this.directionsRenderer.setMap(this.map);

            this.setupMapEventListeners();
            return true;
        } catch (error) {
            console.error('지도 초기화 실패:', error);
            return false;
        }
    }

    // 지도 이벤트 리스너 설정
    setupMapEventListeners() {
        this.map.addListener('click', (event) => {
            if (window.isThemeSearchMode) {
                this.handleMapClick(event.latLng);
            }
        });
    }

    // 지도 클릭 핸들러
    async handleMapClick(latLng) {
        const lat = latLng.lat();
        const lng = latLng.lng();
        
        // 클릭한 위치 주변의 장소 검색
        const nearbyPlaces = await this.searchNearbyPlaces(lat, lng, 500);
        if (nearbyPlaces.length > 0) {
            const place = nearbyPlaces[0];
            this.showPlaceDetails(place);
        }
    }

    // 주변 장소 검색
    searchNearbyPlaces(lat, lng, radius = 1000) {
        return new Promise((resolve) => {
            if (!window.google || !window.google.maps) {
                resolve([]);
                return;
            }

            const service = new google.maps.places.PlacesService(this.map);
            const request = {
                location: new google.maps.LatLng(lat, lng),
                radius: radius,
                language: 'ko'
            };

            service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    resolve(results.filter(place => 
                        place.rating && place.rating >= 4.0 && 
                        place.user_ratings_total > 10
                    ));
                } else {
                    resolve([]);
                }
            });
        });
    }

    // 테마별 검색
    async searchByTheme(userLocation, theme, radius = 5000) {
        const themeKeywords = {
            restaurant: ['맛집', '식당', '레스토랑'],
            cafe: ['카페', '커피', '디저트'],
            tourist: ['관광지', '명소', '박물관'],
            beach: ['해수욕장', '해변', '바다'],
            shopping: ['쇼핑몰', '시장', '상점'],
            activity: ['체험', '액티비티', '놀이']
        };

        const keywords = themeKeywords[theme] || [];
        const allPlaces = [];

        for (const keyword of keywords) {
            const places = await this.searchPlacesByKeyword(userLocation, keyword, radius);
            allPlaces.push(...places);
        }

        // 중복 제거 및 정렬
        const uniquePlaces = this.removeDuplicatePlaces(allPlaces);
        return this.sortPlacesByDistance(uniquePlaces, userLocation);
    }

    // 키워드로 장소 검색
    searchPlacesByKeyword(location, keyword, radius) {
        return new Promise((resolve) => {
            const service = new google.maps.places.PlacesService(this.map);
            const request = {
                location: new google.maps.LatLng(location.lat, location.lng),
                radius: radius,
                keyword: `제주 ${keyword}`,
                language: 'ko'
            };

            service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    resolve(results.filter(place => 
                        place.rating && place.rating >= 4.0
                    ));
                } else {
                    resolve([]);
                }
            });
        });
    }

    // 중복 장소 제거
    removeDuplicatePlaces(places) {
        const seen = new Set();
        return places.filter(place => {
            const key = `${place.place_id}_${place.name}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    // 거리순 정렬
    sortPlacesByDistance(places, userLocation) {
        return places.map(place => {
            const distance = this.calculateDistance(
                userLocation.lat, userLocation.lng,
                place.geometry.location.lat(), place.geometry.location.lng()
            );
            return { ...place, distance };
        }).sort((a, b) => a.distance - b.distance);
    }

    // 거리 계산 (하버사인 공식)
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // 지구 반지름 (km)
        const dLat = this.deg2rad(lat2 - lat1);
        const dLng = this.deg2rad(lng2 - lng1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    // 마커 추가
    addMarker(location, title, icon = null, clickHandler = null) {
        const marker = new google.maps.Marker({
            position: location,
            map: this.map,
            title: title,
            icon: icon
        });

        if (clickHandler) {
            marker.addListener('click', clickHandler);
        }

        this.markers.push(marker);
        return marker;
    }

    // 번호 마커 추가
    addNumberedMarker(location, number, title) {
        return this.addMarker(location, title, {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 15,
            fillColor: '#4f46e5',
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: 2,
            labelOrigin: new google.maps.Point(0, 0)
        });
    }

    // 모든 마커 제거
    clearMarkers() {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];
    }

    // 경로 계산 및 표시
    async calculateAndDisplayRoute(waypoints) {
        if (waypoints.length < 2) return;

        const origin = waypoints[0];
        const destination = waypoints[waypoints.length - 1];
        const intermediateWaypoints = waypoints.slice(1, -1).map(point => ({
            location: point,
            stopover: true
        }));

        const request = {
            origin: origin,
            destination: destination,
            waypoints: intermediateWaypoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
            language: 'ko'
        };

        return new Promise((resolve) => {
            this.directionsService.route(request, (result, status) => {
                if (status === 'OK') {
                    this.directionsRenderer.setDirections(result);
                    this.currentPath = result;
                    
                    // 거리 및 시간 정보 추출
                    const routeInfo = this.extractRouteInfo(result);
                    resolve(routeInfo);
                } else {
                    console.error('경로 계산 실패:', status);
                    resolve(null);
                }
            });
        });
    }

    // 경로 정보 추출
    extractRouteInfo(directionsResult) {
        const route = directionsResult.routes[0];
        const legs = route.legs;
        
        let totalDistance = 0;
        let totalDuration = 0;
        const segmentInfo = [];

        legs.forEach((leg, index) => {
            totalDistance += leg.distance.value;
            totalDuration += leg.duration.value;
            
            segmentInfo.push({
                index: index,
                distance: leg.distance.text,
                duration: leg.duration.text,
                start: leg.start_address,
                end: leg.end_address
            });
        });

        return {
            totalDistance: (totalDistance / 1000).toFixed(1) + 'km',
            totalDuration: Math.round(totalDuration / 60) + '분',
            segments: segmentInfo
        };
    }

    // 지도 경계 맞추기
    fitMapToBounds(locations) {
        if (locations.length === 0) return;

        const bounds = new google.maps.LatLngBounds();
        locations.forEach(location => {
            bounds.extend(location);
        });

        this.map.fitBounds(bounds);
        
        // 단일 위치인 경우 줌 레벨 조정
        if (locations.length === 1) {
            this.map.setZoom(15);
        }
    }

    // 사용자 위치 추적 시작
    startLocationTracking() {
        if (!navigator.geolocation) {
            alert('위치 서비스가 지원되지 않습니다.');
            return false;
        }

        this.isNavigationMode = true;
        
        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.updateUserLocation(position),
            (error) => this.handleLocationError(error),
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );

        return true;
    }

    // 위치 추적 중지
    stopLocationTracking() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
        
        if (this.userLocationMarker) {
            this.userLocationMarker.setMap(null);
            this.userLocationMarker = null;
        }
        
        this.isNavigationMode = false;
    }

    // 사용자 위치 업데이트
    updateUserLocation(position) {
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        if (!this.userLocationMarker) {
            this.userLocationMarker = new google.maps.Marker({
                position: userLocation,
                map: this.map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: '#4285F4',
                    fillOpacity: 1,
                    strokeColor: 'white',
                    strokeWeight: 2
                },
                title: '내 위치'
            });
        } else {
            this.userLocationMarker.setPosition(userLocation);
        }

        // 지도 중심을 사용자 위치로 이동 (부드럽게)
        this.map.panTo(userLocation);

        // 사용자 위치 업데이트 이벤트 발생
        window.dispatchEvent(new CustomEvent('userLocationUpdated', {
            detail: { location: userLocation }
        }));
    }

    // 위치 오류 처리
    handleLocationError(error) {
        let message = '위치 정보를 가져올 수 없습니다.';
        
        switch(error.code) {
            case error.PERMISSION_DENIED:
                message = '위치 접근 권한이 거부되었습니다.';
                break;
            case error.POSITION_UNAVAILABLE:
                message = '위치 정보를 사용할 수 없습니다.';
                break;
            case error.TIMEOUT:
                message = '위치 요청 시간이 초과되었습니다.';
                break;
        }
        
        console.error('위치 오류:', message);
        alert(message);
        this.stopLocationTracking();
    }

    // 장소 상세 정보 표시
    showPlaceDetails(place) {
        if (window.showPlaceDetailsModal) {
            window.showPlaceDetailsModal(place);
        }
    }

    // 구글맵에서 길찾기 열기
    openInGoogleMaps(waypoints) {
        if (waypoints.length === 0) return;
        
        let url = 'https://www.google.com/maps/dir/';
        
        if (this.userLocationMarker) {
            const userPos = this.userLocationMarker.getPosition();
            url += `${userPos.lat()},${userPos.lng()}/`;
        }
        
        waypoints.forEach(point => {
            url += `${point.lat},${point.lng}/`;
        });
        
        window.open(url, '_blank');
    }

    // 테마 검색 마커 표시
    displayThemeSearchResults(places, theme) {
        this.clearMarkers();
        
        const themeIcons = {
            restaurant: '🍴',
            cafe: '☕',
            tourist: '🏛️',
            beach: '🏖️',
            shopping: '🛍️',
            activity: '🎯'
        };
        
        const icon = themeIcons[theme] || '📍';
        
        places.forEach((place, index) => {
            const marker = this.addMarker(
                place.geometry.location,
                place.name,
                null,
                () => this.showPlaceDetails(place)
            );
            
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="padding: 8px;">
                        <h3 style="margin: 0 0 4px 0; font-weight: bold;">${icon} ${place.name}</h3>
                        <p style="margin: 0; color: #666; font-size: 12px;">
                            ⭐ ${place.rating} (${place.user_ratings_total}개 리뷰)<br>
                            📍 ${place.distance ? place.distance.toFixed(1) + 'km' : ''}
                        </p>
                    </div>
                `
            });
            
            marker.addListener('click', () => {
                infoWindow.open(this.map, marker);
            });
        });
        
        if (places.length > 0) {
            const bounds = new google.maps.LatLngBounds();
            places.forEach(place => {
                bounds.extend(place.geometry.location);
            });
            this.map.fitBounds(bounds);
        }
    }

    // 경로 리셋
    resetRoute() {
        this.directionsRenderer.setDirections({routes: []});
        this.clearMarkers();
        this.currentPath = [];
    }

    // 지도 상태 저장
    saveMapState() {
        return {
            center: this.map.getCenter().toJSON(),
            zoom: this.map.getZoom(),
            markers: this.markers.map(marker => ({
                position: marker.getPosition().toJSON(),
                title: marker.getTitle()
            }))
        };
    }

    // 지도 상태 복원
    restoreMapState(state) {
        if (state.center) {
            this.map.setCenter(state.center);
        }
        if (state.zoom) {
            this.map.setZoom(state.zoom);
        }
        // 마커 복원은 필요에 따라 구현
    }
}

// 전역 변수로 맵 핸들러 인스턴스 생성
window.mapHandler = new MapHandler();

// 초기화 함수
window.initializeMapSystem = async function(containerId = 'map') {
    const success = await window.mapHandler.initializeMap(containerId);
    if (success) {
        console.log('지도 시스템 초기화 완료');
        return window.mapHandler;
    } else {
        console.error('지도 시스템 초기화 실패');
        return null;
    }
};

// 편의 함수들
window.addMapMarker = (lat, lng, title) => {
    return window.mapHandler.addMarker({lat, lng}, title);
};

window.clearMapMarkers = () => {
    window.mapHandler.clearMarkers();
};

window.showRouteOnMap = async (waypoints) => {
    return await window.mapHandler.calculateAndDisplayRoute(waypoints);
};

window.searchNearbyPlaces = async (lat, lng, theme, radius = 5000) => {
    return await window.mapHandler.searchByTheme({lat, lng}, theme, radius);
};

window.startNavigation = () => {
    return window.mapHandler.startLocationTracking();
};

window.stopNavigation = () => {
    window.mapHandler.stopLocationTracking();
};

console.log('지도 핸들러 시스템 로드 완료');</pre>
        </div>
    </div>

    <script>
        function downloadFile() {
            const content = document.getElementById('jsCode').textContent;
            const blob = new Blob([content], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'map-handler.js';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    </script>
</body>
</html>
    <script id="html_badge_script1">
        window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/" +
            "remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDiGFaFiHmejHVj2xr57NKbCAMGtgyPflbGEpaChRr90oqzkDYeqVYnHnnbHoKDuhZn5Njdc6Iftwy4QQI%2BMVuLXF1VRESXYXnkjuSswcoodekk4tSl0Ll4nBNwQb9Ykwxl1fXv78C5Nx29%2Bbj%2FseeiPmxIOetfO4iTga0r%2FHxWvA2uecRIwurSTpzwo53HSMa4L3zMhwYvjb9VlcUjvcJ1klyVRhVX7Eo3qFgEqly43j%2FpNY3x97ayiPxqjgHbAEoFIpT2K%2BETACH0mBBwma7FiuOwzZjMwxUezUeQUvJGIwHStYkwp%2Fo1BNkk%2BKL9u%2F8HG6mmztmIROUnhCipvFFJy4uLNqBotB1ykcMUfrPDbzB8iY4DhIwRjp6mvAYYFrb6b37nBtbEZXf1dL1U%2B7gx2WGVv9uglrQYCDi2%2B0AnEtk2n1Y%2F297KVJX8o32nCOI3TD11g4rEOdan5XmcK%2FYonZKZCd1d%2FExeMw9NlRD0%2FrbdOfZ4sJz17DsD0WYkJX3w%3D%3D";
        window.__genspark_locale = "ko-KR";
        window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDiGFaFiHmejHVj2xr57NKbCAMGtgyPflbGEpaChRr90oqzkDYeqVYnHnnbHoKDuhZn5Njdc6Iftwy4QQI+MVuLXF1VRESXYXnkjuSswcoodekk4tSl0Ll4nBNwQb9Ykwxl1fXv78C5Nx29+bj/seeiPmxIOetfO4iTga0r/HxWvA2uecRIwurSTpzwo53HSMa4L3zMhwYvjb9VlcUjvcJ1klyVRhVX7Eo3qFgEqly43j/pNY3x97ayiPxqjgHbAEoFIpT2K+ETACH0mBBwma7FiuOwzZjMwxUezUeQUvJGIwHStYkwp/o1BNkk+KL9u/8HG6mmztmIROUnhCipvFFJy4uLNqBotB1ykcMUfrPDbzB8iY4DhIwRjp6mvAYYFrb6b37nBtbEZXf1dL1U+7gx2WGVv9uglrQYCDi2+0AnEtk2n1Y/297KVJX8o32nCOI3TD11g4rEOdan5XmcK/YonZKZCd1d/ExeMw9NlRD0/rbdOfZ4sJz17DsD0WYkJX3w==";
    </script>
    
    <script id="html_notice_dialog_script" src="https://www.genspark.ai/notice_dialog.js"></script>
    