---
layout: post
title: "파이썬으로 외부 API 활용하기: 나만의 아침 루틴 프로그램 만들기"
subtitle: "Requests 라이브러리를 이용한 고양이 사진, 날씨, 명언 데이터 가져오기"
categories: [Python]
tags: [python, API, 프로젝트]
author: min oh
comments: true
---

## 1. API란 무엇인가?

**API(Application Programming Interface)**는 서로 다른 소프트웨어 시스템 간에 정보를 주고받거나 기능을 사용할 수 있도록 도와주는 연결 통로입니다. 쉽게 말해, **"특정 주소(URL)로 요청을 보내면, 필요한 데이터를 보내주는 자동화된 시스템"**이라고 이해하면 쉽습니다.

이번 포스트에서는 파이썬의 `requests` 라이브러리를 사용하여 3가지 유용한 무료 API를 활용해보고, 이를 하나로 묶어 '아침 루틴 프로그램'을 만들어 보겠습니다.

---

## 2. 활용할 API 소개

| API 이름 | 주요 기능 | 특징 |
| :--- | :--- | :--- |
| **The Cat API** | 랜덤 고양이 사진 | 귀여운 고양이 사진 URL 제공 |
| **Open-Meteo API** | 날씨 데이터 | 위도/경도 기반의 실시간 날씨 정보 |
| **ZenQuotes API** | 랜덤 명언 | 다양한 유명인들의 명언 제공 |

---

## 3. 핵심 도구: Requests 라이브러리

파이썬에서 API 요청을 보낼 때 가장 많이 사용하는 라이브러리입니다. JSON 형식의 응답 데이터를 파이썬 딕셔너리처럼 쉽게 다룰 수 있게 해줍니다.

```bash
# 설치가 필요하다면 터미널에 입력하세요
pip install requests
```

---

## 4. API별 활용 예제

### (1) 랜덤 고양이 사진 가져오기
```python
import requests

url = "https://api.thecatapi.com/v1/images/search"
response = requests.get(url)
data = response.json() # 응답을 JSON(딕셔너리 리스트)으로 변환
cat_url = data[0]['url']

print(f"오늘의 고양이 사진 주소: {cat_url}")
```

### (2) 서울의 오늘 날씨 확인하기
```python
import requests
from datetime import datetime

# 서울의 위도와 경도
lat, lon = 37.5665, 126.9780
url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSeoul"

response = requests.get(url)
data = response.json()

max_temp = data['daily']['temperature_2m_max'][0]
min_temp = data['daily']['temperature_2m_min'][0]

print(f"서울 오늘 날씨 - 최고: {max_temp}°C, 최저: {min_temp}°C")
```

---

## 5. 최종 프로젝트: 나만의 아침 루틴 클래스

위의 기능들을 하나로 묶어, 실행 시 고양이 사진, 날씨, 명언을 한꺼번에 보여주고 오늘 할 일을 입력받는 프로그램을 만들어 봅니다.

```python
import requests
from datetime import datetime

class MorningRoutine:
    def __init__(self, city="서울"):
        self.city = city

    def get_cat_photo(self):
        url = "https://api.thecatapi.com/v1/images/search"
        data = requests.get(url).json()
        print(f"\n[1] 오늘의 귀여운 고양이 사진: {data[0]['url']}")

    def get_weather(self):
        # 서울 좌표 기준
        lat, lon = 37.5665, 126.9780
        url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSeoul"
        data = requests.get(url).json()
        max_t = data['daily']['temperature_2m_max'][0]
        min_t = data['daily']['temperature_2m_min'][0]
        print(f"\n[2] 오늘의 {self.city} 날씨: 최고 {max_t}°C / 최저 {min_t}°C")

    def get_quote(self):
        url = "https://zenquotes.io/api/random"
        data = requests.get(url).json()
        print(f"\n[3] 오늘의 명언: \"{data[0]['q']}\" — {data[0]['a']}")

    def start(self):
        print("="*40)
        print(f"☀️ {datetime.now().strftime('%Y-%m-%d')} 아침 루틴을 시작합니다!")
        print("="*40)
        self.get_cat_photo()
        self.get_weather()
        self.get_quote()
        print("\n" + "="*40)
        print("오늘 하루도 즐겁게 시작하세요! 🚀")

# 실행
routine = MorningRoutine()
routine.start()
```

---

## 💡 팁: API 활용 시 주의사항
1.  **Rate Limit**: 무료 API는 시간당/일일 요청 횟수 제한이 있을 수 있으니 확인이 필요합니다.
2.  **API Key**: 보안이 필요한 API는 인증키(API Key)를 발급받아야 하며, 이 키가 외부에 노출되지 않도록 주의해야 합니다.
3.  **JSON 구조**: API마다 반환하는 데이터의 구조(리스트인지 딕셔너리인지 등)가 다르므로 `print(data)`를 통해 먼저 확인해보는 것이 좋습니다.

이제 여러분도 다양한 API를 결합하여 자신만의 유용한 도구를 만들어 보세요!
