---
layout: post
title: "[7강] 파이썬으로 외부 API 활용하기: 나만의 아침 루틴 만들기"
subtitle: "requests 라이브러리로 날씨·명언·고양이 사진 API 완전 정복"
categories: [Python]
tags: [python, API, requests, JSON, 프로젝트, 클래스]
author: min oh
comments: true
---

지금까지 파이썬의 핵심 문법을 배웠습니다. 이제 **외부 API(Application Programming Interface)**를 활용하여 인터넷에서 실시간 데이터를 가져오는 실전 프로젝트를 만들어봅니다. API는 현대 프로그래밍의 필수 개념입니다!

---

## 1. API란 무엇인가?

**API**는 서로 다른 소프트웨어 시스템 간에 데이터를 주고받는 **공식 연결 통로**입니다.

```
내 파이썬 프로그램
       │
       │ HTTP 요청 (GET)
       ▼
   API 서버
       │
       │ JSON 응답
       ▼
내 파이썬 프로그램 (데이터 수신)
```

쉽게 말해, **"특정 주소(URL)로 요청을 보내면 필요한 데이터를 돌려주는 자동화된 시스템"**입니다.

---

## 2. 핵심 도구: requests 라이브러리

```bash
# 터미널에서 설치
pip install requests
```

```python
import requests

# 기본 GET 요청
response = requests.get("https://api.example.com/data")

print(response.status_code)  # 200 = 성공
print(response.json())        # JSON → 파이썬 딕셔너리로 변환
print(response.text)          # 원본 텍스트

# 파라미터와 함께 요청
params = {'city': 'Seoul', 'units': 'metric'}
response = requests.get(url, params=params)
```

### HTTP 상태 코드 이해

| 코드 | 의미 |
|------|------|
| 200 | 성공 (OK) |
| 400 | 잘못된 요청 |
| 401 | 인증 실패 (API Key 오류) |
| 404 | 찾을 수 없음 |
| 429 | 요청 한도 초과 (Rate Limit) |
| 500 | 서버 오류 |

---

## 3. 활용할 API 소개

| API | 기능 | 인증 필요? | URL |
|-----|------|-----------|-----|
| **The Cat API** | 랜덤 고양이 사진 | 없음 | api.thecatapi.com |
| **Open-Meteo** | 날씨 데이터 | 없음 | api.open-meteo.com |
| **ZenQuotes** | 랜덤 명언 | 없음 | zenquotes.io/api |

---

## 4. API별 실습

### 4.1 랜덤 고양이 사진

```python
import requests

def get_cat_photo():
    url = "https://api.thecatapi.com/v1/images/search"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()  # 리스트 형태로 반환
        return data[0]['url']
    else:
        return None

cat_url = get_cat_photo()
print(f"오늘의 고양이: {cat_url}")
```

### 4.2 실시간 날씨 정보 (Open-Meteo)

```python
import requests

def get_weather(lat=37.5665, lon=126.9780, city="서울"):
    """위도/경도 기반 날씨 조회. 기본값: 서울"""
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        'latitude': lat,
        'longitude': lon,
        'daily': 'temperature_2m_max,temperature_2m_min,precipitation_sum',
        'current_weather': True,
        'timezone': 'Asia/Seoul'
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    current = data['current_weather']
    daily   = data['daily']
    
    return {
        'city': city,
        'current_temp': current['temperature'],
        'max_temp': daily['temperature_2m_max'][0],
        'min_temp': daily['temperature_2m_min'][0],
        'rain': daily['precipitation_sum'][0]
    }

weather = get_weather()
print(f"{weather['city']} 날씨")
print(f"현재: {weather['current_temp']}°C")
print(f"최고/최저: {weather['max_temp']}°C / {weather['min_temp']}°C")
print(f"강수량: {weather['rain']}mm")
```

### 4.3 오늘의 명언

```python
import requests

def get_daily_quote():
    url = "https://zenquotes.io/api/random"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        return {
            'quote': data[0]['q'],
            'author': data[0]['a']
        }
    return None

quote = get_daily_quote()
if quote:
    print(f'"{quote["quote"]}"')
    print(f"  — {quote['author']}")
```

---

## 5. JSON 응답 파싱 실습

```python
import json

# API 응답 예시 (실제로는 requests.get().json()으로 받음)
sample_response = '''
{
    "equipment": {
        "id": 101,
        "model": "ETCH-A100",
        "sensors": [
            {"name": "rf_power", "value": 498.5, "unit": "W"},
            {"name": "gas_flow", "value": 102.3, "unit": "sccm"}
        ]
    }
}
'''

data = json.loads(sample_response)

equipment = data['equipment']
print(f"장비: {equipment['model']}")

for sensor in equipment['sensors']:
    print(f"  {sensor['name']}: {sensor['value']} {sensor['unit']}")
```

---

## 6. 최종 프로젝트: 아침 루틴 클래스

지금까지 만든 기능들을 **클래스(Class)**로 묶어 완성된 프로그램을 만듭니다.

```python
import requests
from datetime import datetime

class MorningRoutine:
    """매일 아침 날씨, 명언, 고양이 사진을 출력하는 루틴 클래스"""
    
    def __init__(self, city="서울", lat=37.5665, lon=126.9780):
        self.city = city
        self.lat = lat
        self.lon = lon
    
    def get_cat_photo(self):
        """랜덤 고양이 사진 URL을 반환합니다."""
        try:
            url = "https://api.thecatapi.com/v1/images/search"
            data = requests.get(url, timeout=5).json()
            return data[0]['url']
        except Exception as e:
            return f"(오류: {e})"
    
    def get_weather(self):
        """현재 날씨 정보를 반환합니다."""
        try:
            url = "https://api.open-meteo.com/v1/forecast"
            params = {
                'latitude': self.lat,
                'longitude': self.lon,
                'daily': 'temperature_2m_max,temperature_2m_min',
                'timezone': 'Asia/Seoul'
            }
            data = requests.get(url, params=params, timeout=5).json()
            return {
                'max': data['daily']['temperature_2m_max'][0],
                'min': data['daily']['temperature_2m_min'][0],
            }
        except Exception as e:
            return {'max': '?', 'min': '?'}
    
    def get_quote(self):
        """오늘의 명언을 반환합니다."""
        try:
            data = requests.get("https://zenquotes.io/api/random", timeout=5).json()
            return f'"{data[0]["q"]}" — {data[0]["a"]}'
        except Exception as e:
            return "오늘도 좋은 하루 되세요!"
    
    def start(self):
        """아침 루틴을 시작합니다."""
        today = datetime.now().strftime('%Y년 %m월 %d일 (%A)')
        
        print("=" * 50)
        print(f"  ☀️  {today}")
        print(f"  {self.city} 아침 루틴을 시작합니다!")
        print("=" * 50)
        
        # 날씨
        weather = self.get_weather()
        print(f"\n[🌤 오늘 {self.city} 날씨]")
        print(f"  최고: {weather['max']}°C / 최저: {weather['min']}°C")
        
        # 명언
        print(f"\n[💬 오늘의 명언]")
        print(f"  {self.get_quote()}")
        
        # 고양이
        print(f"\n[🐱 오늘의 고양이 사진]")
        print(f"  {self.get_cat_photo()}")
        
        # 할 일 입력
        print(f"\n[📋 오늘 할 일]")
        tasks = []
        while True:
            task = input("  할 일을 입력하세요 (완료: Enter만): ").strip()
            if not task:
                break
            tasks.append(task)
        
        if tasks:
            print("\n  오늘의 할 일 목록:")
            for i, t in enumerate(tasks, 1):
                print(f"  {i}. {t}")
        
        print("\n" + "=" * 50)
        print("  오늘 하루도 화이팅입니다! 🚀")
        print("=" * 50)

# 실행
if __name__ == "__main__":
    routine = MorningRoutine(city="서울")
    routine.start()
```

---

## 7. API 활용 시 주의사항과 팁

### 7.1 에러 처리 (try-except)

```python
import requests

def safe_api_call(url, params=None):
    """예외 처리가 포함된 안전한 API 호출"""
    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()  # 4xx, 5xx 오류 시 예외 발생
        return response.json()
    except requests.exceptions.Timeout:
        print("⚠️ 요청 시간 초과")
    except requests.exceptions.HTTPError as e:
        print(f"⚠️ HTTP 오류: {e}")
    except requests.exceptions.ConnectionError:
        print("⚠️ 네트워크 연결 오류")
    return None
```

### 7.2 API Key 안전하게 관리하기

```python
import os

# ❌ 절대 하지 말 것 (코드에 직접 하드코딩)
api_key = "sk-1234abcd5678efgh"

# ✅ 환경 변수에서 불러오기
api_key = os.environ.get("MY_API_KEY")

# ✅ .env 파일 + python-dotenv 라이브러리
from dotenv import load_dotenv
load_dotenv()
api_key = os.environ.get("MY_API_KEY")
```

---

## 8. 전체 시리즈 총정리

```
[1강] 변수·자료형·연산자 → 파이썬의 기본 단위
[2강] 기초 실습 → 직접 코딩으로 익히기
[3강] 조건문·반복문 → 프로그램 흐름 제어
[4강] 반복문 심화 → 실전 패턴 마스터
[5강] 함수 → 코드 재사용과 모듈화
[6강] 파일 I/O → 데이터 영구 저장 (TXT/CSV/JSON)
[7강] API → 인터넷 데이터 활용 + 클래스 적용
```

| 강 | 핵심 개념 | 실전 활용 |
|----|-----------|-----------|
| 1강 | 자료형, 변수, 연산자 | 데이터 모델링 |
| 2강 | str/list/dict 실습 | 데이터 처리 |
| 3강 | if/for/while | 로직 구현 |
| 4강 | 반복문 패턴 | 알고리즘 |
| 5강 | 함수, 람다, 재귀 | 코드 재사용 |
| 6강 | CSV, JSON, with문 | 파일 데이터 처리 |
| 7강 | requests, 클래스 | 웹 API 연동 |

이제 여러분은 파이썬으로 **데이터를 다루고, 파일을 처리하고, 인터넷 데이터를 활용**하는 실용적인 프로그램을 만들 수 있습니다!
