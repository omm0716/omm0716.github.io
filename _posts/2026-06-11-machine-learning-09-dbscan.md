---
layout: post
title: "[9강] 군집 분석: DBSCAN"
subtitle: "노이즈를 걸러내고 밀도로 뭉친다! 모양이 불규칙한 데이터의 구원자"
categories: ["Machine Learning"]
tags: ["머신러닝", "Machine Learning", "군집분석", "Clustering", "DBSCAN", "비지도학습"]
author: "omm0716"
date: "2026-06-11 17:00:00 +0900"
---

안녕하세요! 8강에서 배운 K-Means 알고리즘은 훌륭하지만 치명적인 단점이 하나 있습니다. 바로 무조건 '원형(동그라미)' 형태로만 군집을 묶으려 한다는 점입니다. 만약 데이터가 초승달 모양이거나, 도넛처럼 링 모양으로 퍼져있다면 K-Means는 데이터를 완전히 엉뚱하게 찢어버리게 됩니다.

이 문제를 해결하기 위해 등장한 구원자가 바로 **DBSCAN (Density-Based Spatial Clustering of Applications with Noise)** 입니다. 이름이 길지만, 핵심 단어는 **Density(밀도)**와 **Noise(노이즈)** 두 가지입니다.

---

## 1. 밀도 기반 군집화: DBSCAN의 원리

DBSCAN은 중심점을 찍고 시작하는 K-Means와 달리, "내 주변에 친구가 얼마나 빽빽하게 모여있는가(밀도)"를 기준으로 뭉쳐나갑니다. 작동 방식은 마치 바이러스가 전염되는 것과 비슷합니다.

1. 임의의 데이터 하나를 콕 찍습니다.
2. 그 점을 중심으로 반경 **R(Epsilon)** 안에 데이터가 **M(MinPts)**개 이상 있으면, 그곳은 '인구 밀집 지역(Core)'으로 인정합니다.
3. 밀집 지역 안에 있는 친구들도 똑같이 반경 R 안에 M명의 친구가 있는지 검사합니다. 조건이 맞으면 또 밀집 지역으로 인정받아 영토를 확장합니다.
4. 이렇게 계속 전염되다가 더 이상 주변에 친구가 없으면 전염(영토 확장)을 멈추고 하나의 군집(그룹)을 완성합니다.
5. 어디에도 전염되지 못하고 덩그러니 남겨진 데이터들은 **이상치/노이즈(Noise)**로 낙인찍어 버립니다.

이러한 전염 방식 덕분에, 데이터가 S자로 구불구불 이어져 있든 도넛 모양이든 상관없이 선을 따라 완벽하게 군집을 만들어냅니다. 게다가 사전에 K(그룹 개수)를 지정해 줄 필요도 없습니다!

---

## 2. DBSCAN 실습해보기

scikit-learn에서 DBSCAN 클래스를 불러와 실습해 보겠습니다. 앞서 언급한 반경 R은 `eps`, 최소 데이터 개수 M은 `min_samples`라는 파라미터로 조절합니다.

```python
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import DBSCAN

# 데이터 준비 (예: 불규칙한 패턴을 가진 가상의 데이터셋이라고 가정)
fruit = pd.read_csv('./머신러닝실습용자료/의사결정나무_과일종류_2가지.csv', encoding='cp949')
data = fruit[['길이', '무게']].to_numpy()

# DBSCAN 모델 생성
# 반경 eps=0.5, 최소 이웃 수 min_samples=3 으로 설정
dbscan = DBSCAN(eps=0.5, min_samples=3)

# 학습(군집화) 진행 및 라벨 부여
labels = dbscan.fit_predict(data)

print("DBSCAN이 부여한 라벨:", labels)
```

출력된 라벨을 유심히 보셔야 합니다.
```text
DBSCAN이 부여한 라벨: [ 0  0  0 -1  1  1  0 -1  1  1]
```
K-Means에서는 0번, 1번 등의 그룹 번호만 있었지만 DBSCAN의 결과에는 **`-1`**이라는 숫자가 등장합니다. 이 `-1`이 바로 어떤 군집에도 끼지 못한 외톨이, 즉 **노이즈(이상치)**를 의미합니다. DBSCAN은 억지로 모든 데이터를 끼워 맞추지 않고, 이상한 데이터는 과감히 버릴 줄 아는 똑똑한 알고리즘입니다.

---

## 3. 스케일링(StandardScaler)의 치명적 중요성

DBSCAN은 반경 `eps`를 기준으로 거리를 재기 때문에, 각 특성(길이, 무게 등)의 단위가 다르면 거리가 왜곡됩니다. 길이가 1cm 변하는 것과 무게가 1g 변하는 것이 똑같은 거리로 취급되어선 안 되죠. 따라서 **DBSCAN을 돌리기 전에는 무조건 스케일링을 해야 합니다!**

```python
from sklearn.preprocessing import StandardScaler

# 스케일링 진행
scaler = StandardScaler()
data_scaled = scaler.fit_transform(data)

# 스케일링된 데이터로 다시 군집화
dbscan_scaled = DBSCAN(eps=0.5, min_samples=3)
labels_scaled = dbscan_scaled.fit_predict(data_scaled)

# 시각화해보기
plt.scatter(data_scaled[:, 0], data_scaled[:, 1], c=labels_scaled, cmap='viridis')
plt.xlabel('Length (Scaled)')
plt.ylabel('Weight (Scaled)')
plt.show()
```

그래프를 그려보면 찌그러짐 없이 데이터가 올바른 비율로 뭉쳐서 군집이 예쁘게 생성된 것을 볼 수 있습니다.

---

## 💡 요약

| 개념 | 설명 |
|---|---|
| **DBSCAN** | 데이터의 '밀도'를 기준으로 연결된 데이터들을 하나의 무리로 묶어주는 비지도 학습 군집 알고리즘 |
| **eps (Epsilon)** | '이웃'이라고 인정해 줄 반경(거리). 너무 크면 다 한 무리가 되고, 너무 작으면 모두 노이즈가 됨 |
| **min_samples** | 하나의 군집으로 인정받기 위해 반경 안에 모여야 하는 최소 이웃의 수 |
| **노이즈 (-1)** | 어떤 군집의 조건도 만족하지 못하고 뚝 떨어져 있는 이상치 데이터 |

K-Means와 DBSCAN은 비지도 학습을 이끄는 양대 산맥입니다. 둥글게 뭉쳐 있으면 K-Means를, 불규칙한 모양이거나 이상치(노이즈)를 찾아내야 한다면 DBSCAN을 꺼내 드세요!

마지막 10강에서는 여태까지 배운 전통적인 머신러닝의 틀을 넘어서, 요즘 가장 핫한 최신 기술인 **LLM(대규모 언어 모델)**과 **LangChain**을 결합하여 나만의 PDF 문서 기반 챗봇을 만드는 실습을 진행해 보겠습니다.
