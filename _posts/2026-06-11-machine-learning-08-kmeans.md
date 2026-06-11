---
layout: post
title: "[8강] 군집 분석: K-Means"
subtitle: "정답 없이도 끼리끼리 뭉치게 만드는 비지도 학습의 마법"
categories: ["Machine Learning"]
tags: ["머신러닝", "Machine Learning", "군집분석", "Clustering", "KMeans", "비지도학습"]
author: "omm0716"
date: "2026-06-11 16:00:00 +0900"
---

안녕하세요! 7강까지 우리는 '공부 시간 -> 80점', '길이와 무게 -> 수박' 처럼 명확한 **정답(Target)**을 알려주고 모델을 훈련시키는 **지도 학습(Supervised Learning)**을 다루었습니다.

하지만 실무에서는 정답이 없는 데이터가 태반입니다. 예를 들어, 쇼핑몰 고객 1만 명의 구매 데이터를 주고 "이 사람들을 비슷한 성향을 가진 3개의 그룹으로 묶어봐"라고 한다면 어떨까요? 정답표는 없습니다. 기계가 알아서 데이터의 패턴을 파악해 '끼리끼리' 묶어줘야 합니다. 

이처럼 정답(Target) 없이 데이터의 특성(Feature)만으로 비슷한 것들끼리 묶어주는 작업을 **군집 분석(Clustering)**이라고 하며, 대표적인 **비지도 학습(Unsupervised Learning)** 중 하나입니다. 이번 8강에서는 군집 분석의 대명사인 **K-Means (K-평균)** 알고리즘을 배워보겠습니다.

---

## 1. K-Means 알고리즘의 작동 원리

K-Means 알고리즘의 아이디어는 놀라울 정도로 단순합니다. 여기서 'K'는 '우리가 묶고자 하는 클러스터(그룹)의 개수'를 의미합니다.

1. **무작위 점 찍기**: 데이터 공간에 사용자가 지정한 K개의 중심점(Centroid)을 무작위로 찍습니다.
2. **거리 계산 및 소속 결정**: 모든 데이터 포인트들은 K개의 중심점 중에서 가장 가까운 중심점의 그룹에 소속됩니다.
3. **중심점 이동**: 각 그룹에 속한 데이터들의 '평균(Means)' 좌표를 구해서 중심점을 그 위치로 쓱 이동시킵니다.
4. **반복**: 중심점이 이동했으니 각 데이터들의 소속이 또 바뀔 수 있겠죠? 중심점이 더 이상 이동하지 않을 때까지 2번과 3번 과정을 끊임없이 반복합니다.

결과적으로 데이터들은 자신들과 가장 잘 어울리는 끼리끼리의 그룹으로 예쁘게 나뉘게 됩니다.

---

## 2. K-Means 실습: 과일 군집화

과일의 길이와 무게 데이터만 주고, 정답(종류)을 가린 채로 기계에게 "이 데이터를 2개의 무리로 나눠봐!"라고 지시해 보겠습니다. (우리 눈에는 수박과 참외로 보이겠지만, 기계는 모르는 상태입니다)

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

# 1. 데이터 불러오기
fruit = pd.read_csv('./머신러닝실습용자료/의사결정나무_과일종류_2가지.csv', encoding='cp949')

# 2. 이번에는 정답(종류) 데이터를 분리하지 않고 오로지 길이, 무게만 사용!
data = fruit[['길이', '무게']].to_numpy()

# 3. K-Means 모델 생성 및 학습
# n_clusters=2 : 2개의 무리로 나눠달라고 지정합니다.
km = KMeans(n_clusters=2, random_state=42)
km.fit(data)

# 4. 각 데이터가 몇 번 그룹(0번 또는 1번)에 할당되었는지 확인
labels = km.labels_
print("기계가 분류한 라벨 결과:", labels)
```

출력 예시:
```text
기계가 분류한 라벨 결과: [0 0 0 1 1 0 1 1 0 1 1 1]
```
정답을 가르쳐주지도 않았는데, 기계가 데이터를 보고 알아서 0번 그룹과 1번 그룹으로 분류를 해냈습니다!

---

## 3. 군집 결과 시각화해보기

기계가 나눈 이 0번 그룹과 1번 그룹이 정말로 잘 나뉘었는지, 그리고 기계가 최종적으로 확정한 K개의 **중심점(Centroid)**이 어디에 위치해 있는지 그래프로 그려봅시다.

```python
# 0번 그룹과 1번 그룹 데이터를 분리
group_0 = data[labels == 0]
group_1 = data[labels == 1]

# 각 그룹을 다른 색으로 산점도 그리기
plt.scatter(group_0[:, 0], group_0[:, 1], color='green', label='Group 0')
plt.scatter(group_1[:, 0], group_1[:, 1], color='yellow', label='Group 1')

# 기계가 찾은 각 그룹의 중심점 그리기
centroids = km.cluster_centers_
plt.scatter(centroids[:, 0], centroids[:, 1], marker='^', s=200, color='red', label='Centroids')

plt.xlabel('Length (cm)')
plt.ylabel('Weight (g)')
plt.legend()
plt.show()
```

그래프를 확인해보면 기계가 스스로 수박 무리(초록색)와 참외 무리(노란색)를 파악하고, 그 중심에 빨간색 세모(중심점)를 꽂아둔 것을 볼 수 있습니다. 정말 놀랍지 않나요?

---

## 4. 최적의 K 찾기 (엘보우 방법)

K-Means의 유일한 단점은 **K값(몇 개의 그룹으로 나눌지)을 사람이 미리 정해줘야 한다**는 것입니다. 최적의 K를 어떻게 알 수 있을까요? 

이를 위해 **이너셔(Inertia)**라는 개념을 사용합니다. 이너셔란 중심점과 그룹 내 데이터들 간의 거리 제곱합으로, 이 값이 작을수록 데이터들이 중심에 오밀조밀하게 뭉쳐있다는 뜻입니다. K를 1부터 쭉 늘려가며 이너셔의 변화를 그래프로 그렸을 때, **그래프가 꺾이는 지점(팔꿈치 모양, Elbow)**이 최적의 K가 됩니다.

```python
inertia = []
for k in range(2, 7):
    km_test = KMeans(n_clusters=k, random_state=42)
    km_test.fit(data)
    inertia.append(km_test.inertia_)

plt.plot(range(2, 7), inertia, marker='o')
plt.xlabel('Number of Clusters (K)')
plt.ylabel('Inertia')
plt.show()
```

그래프를 그려보면 K=2 인 부근에서 꺾이는 것을 볼 수 있으며, 이를 통해 이 데이터는 2개의 무리로 나누는 것이 가장 합리적임을 증명할 수 있습니다.

---

## 💡 요약

| 개념 | 설명 |
|---|---|
| **비지도 학습 (Unsupervised Learning)** | 정답(Target) 데이터 없이 입력 데이터(Feature)만으로 패턴을 찾고 구조를 파악하는 머신러닝의 한 분야 |
| **K-Means (K-평균)** | 데이터를 사용자가 지정한 K개의 무리로 묶어주는 가장 대표적인 군집 분석 알고리즘 |
| **이너셔 (Inertia) & 엘보우 (Elbow) 방법** | 최적의 K값을 찾기 위해 군집 내 거리의 합(이너셔)을 계산하고, 그래프가 꺾이는 지점(팔꿈치)을 찾는 기법 |

하지만 K-Means는 모든 군집을 동그란 구형으로 가정하기 때문에, 찌그러져 있거나 길게 늘어진 초승달 모양의 데이터들은 잘 분리하지 못하는 치명적인 단점이 있습니다. 

이를 극복하기 위해 '밀도(Density)'를 기준으로 데이터를 묶는 9강의 **DBSCAN 알고리즘**을 만나러 가보겠습니다!
