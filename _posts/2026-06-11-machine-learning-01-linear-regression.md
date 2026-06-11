---
layout: post
title: "[1강] 선형 회귀 분석 기초"
subtitle: "데이터를 통해 미래를 예측하는 가장 기본적이고 강력한 도구"
categories: ["Machine Learning"]
tags: ["머신러닝", "Machine Learning", "선형회귀", "Linear Regression"]
author: "omm0716"
date: "2026-06-11 09:00:00 +0900"
---

안녕하세요! 머신러닝의 첫 걸음을 내딛으신 것을 환영합니다. 오늘 배울 첫 번째 주제는 바로 **선형 회귀 분석(Linear Regression)**입니다. 

머신러닝이라고 하면 굉장히 복잡해 보이지만, 사실 그 시작은 우리가 중학교 수학 시간에 배웠던 $y = ax + b$ (일차방정식)와 맞닿아 있습니다. 데이터를 바탕으로 이 "가장 적합한 일차방정식의 선"을 찾는 과정이 바로 선형 회귀 분석입니다.

이번 시간에는 **"공부 시간과 시험 점수의 상관관계"**를 분석하며 선형 회귀의 개념을 실습해 보겠습니다.

---

## 1. 데이터 준비하기

먼저 데이터를 불러와야 합니다. 실습 파일인 `공부시간과시험점수.csv`를 Pandas 라이브러리를 사용해 표(DataFrame) 형태로 읽어옵니다.

```python
import pandas as pd

# 로컬 환경에서 데이터 불러오기
study = pd.read_csv('./머신러닝실습용자료/공부시간과시험점수.csv', encoding='cp949')
study.head() # 상위 5개 데이터 확인
```

불러온 데이터를 살펴보면 **이름, 공부시간, 시험점수** 항목이 있습니다.
여기서 우리가 알고 싶은 것은 "공부시간"이 "시험점수"에 미치는 영향이므로:
- **Feature (특징 / 원인)**: `공부시간`
- **Target (목표 / 결과)**: `시험점수`
로 데이터를 분리하겠습니다. (`이름`은 예측에 불필요하므로 사용하지 않습니다.)

---

## 2. 데이터 시각화 (산점도)

데이터가 어떤 모양을 띄고 있는지 눈으로 확인하는 것은 데이터 분석의 기본입니다. `matplotlib`을 이용해 산점도(Scatter plot)를 그려보겠습니다.

```python
import matplotlib.pyplot as plt

# Feature와 Target 분리
data = study['공부시간'].to_numpy()
target = study['시험점수'].to_numpy()

# 산점도 그리기
plt.plot(data, target, 'o')
plt.xlabel('Study Time (hours)')
plt.ylabel('Test Score')
plt.title('Study Time vs Test Score')
plt.show()
```

그래프를 그려보면, 대체로 **공부 시간이 많을수록 시험 점수가 높은 우상향(대각선 위쪽) 형태**를 띄는 것을 볼 수 있습니다. 이 점들을 관통하는 하나의 직선을 그리는 것이 우리의 목표입니다.

---

## 3. 학습용 데이터와 테스트용 데이터 분리

머신러닝 모델을 만들 때 가장 중요한 원칙 중 하나는 **"모의고사용 데이터(Train)와 수능용 데이터(Test)를 분리해야 한다"**는 것입니다.

모델이 정답을 미리 다 외워버리면(과대적합) 처음 보는 데이터에 대해 예측을 할 수 없기 때문입니다. `scikit-learn`의 `train_test_split`을 이용해 8:2 비율로 분리해줍니다.

```python
from sklearn.model_selection import train_test_split

# test_size=0.2 는 전체 데이터의 20%를 테스트용으로 빼두겠다는 의미입니다.
훈련용_data, 테스트용_data, 훈련용_target, 테스트용_target = train_test_split(
    data, target, test_size=0.2, random_state=40
)
```

### 주의할 점: 데이터 형태(Shape) 맞추기
scikit-learn의 모델들은 입력 데이터(Feature)가 **2차원 배열** 형태이길 기대합니다. 반면 현재 우리의 데이터는 1차원 리스트 형태이므로, `reshape(-1, 1)`을 사용해 모양을 변환해줍니다.

```python
# 1차원(20,) -> 2차원(20, 1) 로 변환
# -1은 "행은 데이터 개수에 맞게 알아서 채워라"라는 뜻입니다.
훈련용_data = 훈련용_data.reshape(-1, 1)
테스트용_data = 테스트용_data.reshape(-1, 1)

print("변환 후 형태:", 훈련용_data.shape)
```

---

## 4. 선형 회귀 모델 학습하기

이제 준비된 데이터를 바탕으로 기계에게 "이 점들을 가장 잘 설명하는 선을 찾아봐!"라고 명령할 차례입니다. `fit()` 함수 하나면 충분합니다.

```python
from sklearn.linear_model import LinearRegression

lr = LinearRegression()

# 모델 학습 (fit)
lr.fit(훈련용_data, 훈련용_target)
```

단 3줄의 코드로 기계학습이 끝났습니다! 기계는 데이터를 분석하여 최적의 $y = ax + b$ 공식을 찾아냈습니다.

---

## 5. 모델 평가 및 예측

학습이 끝난 모델이 얼마나 똑똑한지 확인해 볼까요? 모델의 정확도(결정계수 $R^2$)를 확인하고, 새로운 데이터에 대해 예측을 시켜보겠습니다.

```python
# 점수 확인 (1에 가까울수록 예측을 잘한다는 뜻입니다)
print("훈련 세트 점수:", lr.score(훈련용_data, 훈련용_target))
print("테스트 세트 점수:", lr.score(테스트용_data, 테스트용_target))
```

```text
훈련 세트 점수: 0.8869114576908868
테스트 세트 점수: 0.83676625848856
```

약 83~88%의 높은 설명력을 보여줍니다! 그럼 만약 **16시간**을 공부한다면 점수가 몇 점이 나올까요?

```python
# 16시간 공부했을 때의 점수 예측
print("16시간 공부 예측 점수:", lr.predict([[16]]))
```

```text
16시간 공부 예측 점수: [90.12423029]
```

모델은 16시간을 공부하면 약 90.1점을 받을 것이라고 예측했습니다.

---

## 6. 결과 시각화 및 한계점 극복 (다항 회귀)

기계가 찾아낸 일차방정식의 $a$(기울기, `coef_`)와 $b$(y절편, `intercept_`)를 꺼내서 그래프로 그려보겠습니다.

```python
import matplotlib.pyplot as plt

plt.scatter(훈련용_data, 훈련용_target)

# x가 5일때부터 18일때까지의 직선 긋기
plt.plot([5, 18], [5 * lr.coef_ + lr.intercept_, 18 * lr.coef_ + lr.intercept_], color='red')

# 우리가 예측한 16시간(90점) 위치 표시
plt.scatter(16, 90, marker="^", color='green', s=100)
plt.show()
```

빨간색 선이 바로 모델이 찾아낸 최적의 추세선입니다. 하지만 데이터의 분포를 가만히 보면 약간 둥글게 휘어진 곡선 형태를 띄는 것 같습니다. 일차방정식(직선)으로는 한계가 있죠.

이럴 때 사용하는 것이 바로 **다항 회귀(Polynomial Regression)**입니다. 변수를 제곱(`x^2`)하여 이차방정식 형태의 곡선을 만들면 더 정확한 예측이 가능합니다.

```python
import numpy as np

# 기존 데이터(x)에 제곱한 데이터(x^2)를 이어 붙여 새로운 특성을 만듭니다.
훈련용_data_poly = np.column_stack((훈련용_data ** 2, 훈련용_data))
테스트용_data_poly = np.column_stack((테스트용_data ** 2, 테스트용_data))

# 다시 학습시키기
lr = LinearRegression()
lr.fit(훈련용_data_poly, 훈련용_target)

print("다항회귀 테스트 세트 점수:", lr.score(테스트용_data_poly, 테스트용_target))
```

곡선을 적용하니 점수가 더 오르는 것을 확인할 수 있습니다! 

---

## 💡 요약

| 개념 | 설명 |
|---|---|
| **Feature (X)** | 예측의 원인이 되는 특징 (예: 공부시간) |
| **Target (Y)** | 예측하고자 하는 결과값 (예: 시험점수) |
| **train_test_split** | 모델이 정답을 외우는 것을 방지하기 위해 데이터를 모의고사용/수능용으로 나누는 과정 |
| **LinearRegression** | 데이터들 사이의 관계를 가장 잘 설명하는 직선(일차방정식)을 찾는 머신러닝 알고리즘 |
| **다항 회귀** | 데이터가 직선이 아닌 곡선 형태일 때, 특성을 제곱하여 곡선 형태로 학습하는 방법 |

오늘은 머신러닝의 가장 기초가 되는 선형 회귀에 대해 알아보았습니다. 다음 시간에는 변수가 여러 개일 때 사용하는 **다중 회귀 분석**에 대해 배워보겠습니다!
