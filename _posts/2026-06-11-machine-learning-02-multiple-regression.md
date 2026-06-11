---
layout: post
title: "[2강] 다중 회귀 분석"
subtitle: "여러 개의 원인이 하나의 결과에 미치는 영향 분석하기"
categories: ["Machine Learning"]
tags: ["머신러닝", "Machine Learning", "다중회귀", "Multiple Regression"]
author: "omm0716"
date: "2026-06-11 10:00:00 +0900"
---

안녕하세요! 지난 1강에서는 '공부 시간'이라는 단 하나의 특징(Feature)으로 '시험 점수(Target)'를 예측하는 단순 선형 회귀를 배웠습니다.

하지만 현실 세계는 그렇게 단순하지 않습니다. 시험 점수에 영향을 미치는 요소가 공부 시간 하나뿐일까요? 평소의 복습 시간, 학원에 다닌 시간 등 다양한 요인이 존재합니다. 이처럼 **여러 개의 특성(독립 변수)을 사용하여 타겟(종속 변수)을 예측하는 방법**을 **다중 회귀 분석(Multiple Regression)**이라고 합니다.

---

## 1. 다중 회귀 모델의 기본 개념

단순 선형 회귀의 방정식이 $y = ax + b$ 였다면, 
다중 회귀의 방정식은 특성이 늘어남에 따라 다음과 같이 확장됩니다.

> $y = a_1x_1 + a_2x_2 + a_3x_3 + ... + b$

즉, 각 특성마다 고유의 가중치(기울기)가 곱해져서 타겟 값을 계산하게 됩니다.

---

## 2. 데이터 준비 및 분리

이번 실습에서는 '공부시간'뿐만 아니라 '과외시간' 등의 추가적인 Feature가 포함된 데이터를 활용한다고 가정해 보겠습니다.

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# 1. 데이터 불러오기 (예: 다중회귀용 데이터셋)
study_multi = pd.read_csv('./머신러닝실습용자료/공부시간시험성적_다중.csv', encoding='cp949')

# 2. Feature(X)와 Target(Y) 분리
# 다중 회귀이므로 X 데이터는 2차원 형태의 여러 열을 갖게 됩니다.
data = study_multi[['공부시간', '과외시간', '복습시간']].to_numpy()
target = study_multi['시험점수'].to_numpy()

# 3. 학습용 / 테스트용 분리 (8:2 비율)
훈련용_data, 테스트용_data, 훈련용_target, 테스트용_target = train_test_split(
    data, target, test_size=0.2, random_state=42
)
```

데이터 분리 과정은 단순 선형 회귀와 완전히 똑같습니다! 단지 `data` 변수 안에 들어가는 열의 개수가 1개에서 여러 개로 늘어났을 뿐입니다.

---

## 3. 다중 회귀 모델 학습시키기

놀랍게도 모델을 학습시키는 코드조차 단순 선형 회귀와 100% 동일합니다. `scikit-learn`이 입력된 데이터의 열 개수를 스스로 파악하여 다중 회귀 공식을 알아서 만들어 냅니다.

```python
from sklearn.linear_model import LinearRegression

# 모델 생성
lr = LinearRegression()

# 모델 학습
lr.fit(훈련용_data, 훈련용_target)

# 성능 평가
print("훈련 세트 점수 (R^2):", lr.score(훈련용_data, 훈련용_target))
print("테스트 세트 점수 (R^2):", lr.score(테스트용_data, 테스트용_target))
```

점수를 확인해 보면, 단순 선형 회귀를 사용했을 때보다 훨씬 더 높고 안정적인 점수가 나오는 것을 확인할 수 있습니다. 정보가 많아질수록 기계가 예측할 수 있는 단서가 풍부해지기 때문입니다.

---

## 4. 특성 공학 (Feature Engineering) 적용하기

점수를 더 높일 수는 없을까요? 
1강에서 배웠던 다항 회귀(x를 제곱하여 곡선 만들기)를 다중 회귀에도 적용할 수 있습니다. 

특성 1, 특성 2가 있다면, `특성 1의 제곱`, `특성 2의 제곱`, 심지어 `특성 1 * 특성 2`처럼 기존의 특성들을 조합하여 새로운 특성을 뽑아내는 과정을 **특성 공학(Feature Engineering)**이라고 합니다. `PolynomialFeatures` 클래스를 사용하면 이 과정을 자동화할 수 있습니다.

```python
from sklearn.preprocessing import PolynomialFeatures

# degree=2: 제곱항까지만 추가하겠다는 의미
poly = PolynomialFeatures(degree=2, include_bias=False)

# 훈련 데이터를 기반으로 조합 규칙을 찾고(fit) 데이터를 변환(transform)
poly.fit(훈련용_data)
훈련용_data_poly = poly.transform(훈련용_data)
테스트용_data_poly = poly.transform(테스트용_data)

print("변환 전 특성 개수:", 훈련용_data.shape[1])
print("변환 후 특성 개수:", 훈련용_data_poly.shape[1])
```

특성의 개수가 크게 늘어난 것을 볼 수 있습니다. 이 확장된 데이터를 바탕으로 다시 회귀 모델을 학습시키면 예측력이 한층 더 강화됩니다.

```python
lr_poly = LinearRegression()
lr_poly.fit(훈련용_data_poly, 훈련용_target)

print("특성 확장 후 테스트 세트 점수:", lr_poly.score(테스트용_data_poly, 테스트용_target))
```

> [!WARNING]
> **과대적합(Overfitting) 주의!**
> 특성의 개수를 너무 무리하게 늘리면(예: `degree=5` 설정), 훈련 세트에서는 100점에 가까운 점수가 나오지만 테스트 세트에서는 형편없는 점수가 나오는 **과대적합** 현상이 발생합니다. 기계가 훈련 데이터의 사소한 패턴까지 다 외워버렸기 때문입니다.

---

## 💡 요약

| 개념 | 설명 |
|---|---|
| **다중 회귀 (Multiple Regression)** | 여러 개의 특성(독립 변수)을 사용하여 하나의 결과(종속 변수)를 예측하는 방법론 |
| **특성 공학 (Feature Engineering)** | 기존의 데이터 특성을 곱하거나 제곱하는 등 가공하여 새로운 특성을 창출해 내는 작업 |
| **PolynomialFeatures** | 파이썬에서 특성을 쉽게 조합하고 생성할 수 있도록 도와주는 강력한 변환기 |
| **과대적합 (Overfitting)** | 모델이 훈련 데이터에 너무 과도하게 맞춰져서, 새로운 데이터(테스트 세트)에 대한 예측력이 떨어지는 부작용 |

이제 우리는 데이터를 선형으로도, 다항으로도, 그리고 여러 변수를 활용해서도 예측할 수 있는 강력한 무기를 얻었습니다. 다음 3강에서는 값을 예측하는 '회귀'가 아닌, 어느 그룹에 속할지 분류하는 **로지스틱 회귀 분석**에 대해 알아보겠습니다.
