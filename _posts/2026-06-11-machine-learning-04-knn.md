---
layout: post
title: "[4강] KNN 알고리즘"
subtitle: "내 주변의 이웃들을 보고 나를 판단한다 (K-Nearest Neighbors)"
categories: ["Machine Learning"]
tags: ["머신러닝", "Machine Learning", "KNN", "최근접이웃", "분류"]
author: "omm0716"
date: "2026-06-11 12:00:00 +0900"
---

안녕하세요! 오늘 배울 머신러닝 알고리즘은 아주 직관적이고 이해하기 쉬운 **KNN (K-Nearest Neighbors)** 알고리즘입니다. 한국어로는 'K-최근접 이웃 알고리즘'이라고 부릅니다.

우리가 모르는 동네에 갔을 때, 그곳이 어떤 동네인지 알기 위한 가장 좋은 방법은 무엇일까요? 바로 '주변에 사는 이웃들이 어떤 사람들인지'를 보는 것입니다. 주변에 카페와 대학생이 많다면 대학가일 것이고, 회사원과 오피스 건물이 많다면 업무 지구일 것입니다. 

KNN 알고리즘의 원리도 이와 완전히 똑같습니다. 새로운 데이터가 들어왔을 때, **가장 가까이에 있는 'K'개의 기존 데이터(이웃)들을 살펴보고 다수결로 자신의 정체를 결정**하는 방식입니다.

오늘은 이 알고리즘을 사용해 과일의 당도와 무게를 바탕으로 **"이 과일이 수박인지 참외인지"**를 맞추는 실습을 해보겠습니다.

---

## 1. 데이터 분포 확인하기 (산점도)

먼저 수박과 참외의 데이터가 어떻게 생겼는지 눈으로 확인해 보겠습니다.

```python
import pandas as pd
import matplotlib.pyplot as plt

# 1. 과일 데이터 불러오기
fruit = pd.read_csv('./머신러닝실습용자료/의사결정나무_과일종류_2가지.csv', encoding='cp949')

# 2. 종류별로 데이터 분리
watermelons = fruit[fruit['종류'] == '수박']
melons = fruit[fruit['종류'] == '참외']

# 3. 산점도 시각화
plt.scatter(watermelons['길이'], watermelons['무게'], color='green', label='Watermelon')
plt.scatter(melons['길이'], melons['무게'], color='yellow', label='Korean Melon')

plt.xlabel('Length (cm)')
plt.ylabel('Weight (g)')
plt.legend()
plt.show()
```

그래프를 그려보면 무게가 무겁고 길이가 긴 데이터(초록색)가 수박 무리를 형성하고, 무게가 가볍고 길이가 짧은 데이터(노란색)가 참외 무리를 형성하고 있는 것을 뚜렷하게 볼 수 있습니다.

---

## 2. KNN 모델 학습하기

데이터를 훈련용과 테스트용으로 나눈 뒤 모델을 학습시켜 봅시다. KNN 분류기는 `KNeighborsClassifier`라는 클래스를 사용합니다.

```python
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

# Feature와 Target 분리
data = fruit[['길이', '무게']].to_numpy()
target = fruit['종류'].to_numpy()

# 데이터 분리
훈련용_data, 테스트용_data, 훈련용_target, 테스트용_target = train_test_split(
    data, target, test_size=0.2, random_state=42
)

# KNN 모델 생성 (기본값 K=5)
knn = KNeighborsClassifier()
knn.fit(훈련용_data, 훈련용_target)

print("테스트 세트 분류 정확도:", knn.score(테스트용_data, 테스트용_target))
```

> [!TIP]
> KNN 모델에서 K의 개수는 `n_neighbors` 속성으로 지정할 수 있으며, 기본값은 5입니다. 즉, 기본적으로 **가장 가까운 5명의 이웃**을 찾아 다수결을 진행합니다.

---

## 3. 새로운 데이터 예측해보기

만약 마트에서 길이 25cm, 무게 2000g짜리 미지의 과일을 주웠다고 가정해 봅시다. KNN 모델은 이 과일을 무엇이라고 예측할까요?

```python
# [길이, 무게] 새로운 데이터 예측
unknown_fruit = [[25, 2000]]
result = knn.predict(unknown_fruit)

print("미지의 과일 예측 결과:", result[0])
```

결과는 당연히 `수박`으로 나올 것입니다. 기존에 훈련받은 데이터 중에서 (25, 2000) 좌표와 가장 가까운 5개의 점들이 모두 수박 무리에 속해 있을 것이기 때문입니다.

---

## 4. 데이터 스케일링 (정규화)의 중요성

KNN은 **'거리'**를 기반으로 동작하는 알고리즘입니다. 그런데 만약 '길이'는 10~30cm 범위에서 움직이는데, '무게'는 500~3000g 범위에서 움직인다면 어떻게 될까요? 무게 숫자가 훨씬 크기 때문에 거리 계산 시 '길이'의 차이는 무시되고 '무게'에 의해서만 결과가 좌우되는 문제가 발생합니다.

이를 해결하기 위해 모든 특성들의 스케일(범위)을 일치시켜주는 **데이터 전처리 과정(표준화)**이 반드시 필요합니다.

```python
from sklearn.preprocessing import StandardScaler

# 표준화 변환기 생성
scaler = StandardScaler()

# 훈련 데이터를 기준으로 평균과 표준편차 계산
scaler.fit(훈련용_data)

# 훈련 데이터와 테스트 데이터 모두 표준화 변환
훈련용_scaled = scaler.transform(훈련용_data)
테스트용_scaled = scaler.transform(테스트용_data)

# 스케일링된 데이터로 다시 학습
knn_scaled = KNeighborsClassifier()
knn_scaled.fit(훈련용_scaled, 훈련용_target)

print("스케일링 후 정확도:", knn_scaled.score(테스트용_scaled, 테스트용_target))
```

KNN을 사용할 때는 반드시 이 `StandardScaler` 등을 이용한 스케일링 작업을 잊지 마세요!

---

## 💡 요약

| 개념 | 설명 |
|---|---|
| **KNN (K-Nearest Neighbors)** | 새로운 데이터의 클래스를 판단할 때 주변의 가장 가까운 K개의 이웃을 찾아 다수결로 결정하는 알고리즘 |
| **K의 의미 (`n_neighbors`)** | 몇 명의 이웃을 참조할 것인가. K가 너무 작으면 노이즈에 민감해지고, 너무 크면 경계가 모호해짐 (보통 동점을 피하기 위해 홀수를 사용) |
| **데이터 스케일링 (표준화)** | 거리 기반 알고리즘인 KNN이 특성 간의 단위 차이에 의해 왜곡되지 않도록 값의 범위를 평등하게 맞춰주는 필수 전처리 과정 |

KNN은 수식 없이도 직관적으로 이해할 수 있는 매우 간단하면서도 강력한 알고리즘입니다. 다음 시간에는 머신러닝 모델의 신뢰성을 극한으로 끌어올리는 검증 기법인 **K-Fold 교차검증**에 대해 다루어 보겠습니다.
