---
layout: post
title: "[7강] 앙상블: 랜덤 포레스트"
subtitle: "백지장도 맞들면 낫다! 결정 트리들의 집단 지성, Random Forest"
categories: ["Machine Learning"]
tags: ["머신러닝", "Machine Learning", "앙상블", "Ensemble", "랜덤포레스트", "Random Forest"]
author: "omm0716"
date: "2026-06-11 15:00:00 +0900"
---

안녕하세요! 오늘은 머신러닝의 꽃이자, 실무에서도 캐글(Kaggle) 같은 데이터 분석 대회에서도 가장 널리 쓰이는 강력한 기법, **앙상블(Ensemble) 학습**에 대해 배워보겠습니다.

단일 모델(예를 들어 결정 트리 하나)은 질문을 아무리 정교하게 짜도 판단력이 한쪽으로 치우치거나, 훈련 데이터에만 너무 과도하게 맞춰져 실전에서 약해지는 과대적합(Overfitting)에 빠지기 쉽습니다. 

이 문제를 어떻게 해결할 수 있을까요? 
"한 명의 똑똑한 전문가보다, 여러 명의 평범한 사람들의 의견을 다수결로 모으는 것이 더 정확하다"는 집단 지성의 원리를 머신러닝에 도입한 것이 바로 앙상블 학습입니다. 그리고 그중에서 **결정 트리(Decision Tree)를 수백 개 모아서 숲(Forest)을 이룬 모델이 바로 랜덤 포레스트(Random Forest)**입니다.

---

## 1. 랜덤 포레스트는 어떻게 동작할까?

이름이 왜 '랜덤(Random)' 포레스트일까요? 수백 개의 결정 트리를 만들 때, 모든 트리가 똑같은 데이터로 똑같은 학습을 한다면 결국 모두 똑같은 결과만 내놓겠죠? 다양성을 확보하기 위해 랜덤 포레스트는 꼼수를 부립니다.

1. **데이터 무작위 샘플링 (부트스트랩 방식)**: 전체 훈련 데이터에서 무작위로 복원 추출을 하여, 각각의 트리에게 서로 조금씩 다른 훈련 데이터를 나눠줍니다.
2. **특성 무작위 선택**: 트리가 분기점(노드)을 만들 때, 모든 특성을 다 검토하지 않고 일부 특성만 무작위로 골라내어 그중에서 최선을 찾게 만듭니다.

이렇게 되면 각각의 트리는 서로 다른 시각(특성)과 경험(데이터)을 가진 개성 있는 전문가들로 자라납니다. 마지막에 이 숲(Forest)의 나무들이 내놓은 결과를 취합해 **다수결 투표(분류)**를 하거나 **평균(회귀)**을 내어 최종 결정을 내립니다.

---

## 2. 랜덤 포레스트 실습하기 (과일 분류)

파이썬의 `scikit-learn`에서는 `RandomForestClassifier`를 통해 정말 손쉽게 랜덤 포레스트를 사용할 수 있습니다.

```python
import pandas as pd
from sklearn.model_selection import train_test_split, cross_validate
from sklearn.ensemble import RandomForestClassifier

# 1. 데이터 불러오기
fruit = pd.read_csv('./머신러닝실습용자료/의사결정나무_과일종류_2가지.csv', encoding='cp949')
data = fruit[['길이', '무게']].to_numpy()
target = fruit['종류'].to_numpy()

# 2. 훈련/테스트 데이터 분할
훈련용_data, 테스트용_data, 훈련용_target, 테스트용_target = train_test_split(
    data, target, test_size=0.2, random_state=42
)

# 3. 랜덤 포레스트 모델 생성
# n_estimators=100 : 기본적으로 100개의 결정 트리를 만들어 숲을 구성합니다.
rf = RandomForestClassifier(n_jobs=-1, random_state=42)

# 4. 교차 검증으로 성능 평가
scores = cross_validate(rf, 훈련용_data, 훈련용_target, return_train_score=True, n_jobs=-1)

import numpy as np
print("훈련 세트 평균 점수:", np.mean(scores['train_score']))
print("검증 세트 평균 점수:", np.mean(scores['test_score']))
```

결과를 확인해보면 단일 결정 트리를 썼을 때보다 훈련 세트와 검증 세트의 점수 격차가 줄어들어, 과대적합이 방지되고 성능이 안정된 것을 확인할 수 있습니다.

---

## 3. 특성 중요도 (Feature Importance) 파악

랜덤 포레스트의 훌륭한 장점 중 하나는 **"어떤 특징(Feature)이 예측에 가장 크게 기여했는가?"**를 알 수 있다는 점입니다. 수백 개의 나무들이 학습하면서 얻은 지식을 종합해 각 특성의 중요도를 계산해줍니다.

```python
# 최종 학습 (feature_importances_ 를 보려면 반드시 fit을 먼저 해야 합니다)
rf.fit(훈련용_data, 훈련용_target)

# 특성 중요도 출력
print("특성 중요도 (길이, 무게):", rf.feature_importances_)
```

출력 예시:
```text
특성 중요도 (길이, 무게): [0.25 0.75]
```

만약 결과가 `[0.25, 0.75]`라면, 수박과 참외를 구별하는 데 있어 '길이'보다 '무게'가 3배 더 중요한 역할을 했다는 뜻입니다! 이처럼 랜덤 포레스트는 성능도 뛰어나면서 분석의 해석력(Interpretability)까지 제공하는 멋진 도구입니다.

---

## 💡 요약

| 개념 | 설명 |
|---|---|
| **앙상블 학습 (Ensemble)** | 여러 개의 약한 예측 모델(Weak Learner)을 엮어 하나의 강력한 예측 모델을 만드는 기법 |
| **랜덤 포레스트 (Random Forest)** | 결정 트리(Decision Tree)를 무작위로 여러 개 만들어 숲을 이루고, 다수결을 통해 최종 결과를 내는 대표적인 앙상블 알고리즘 |
| **특성 중요도 (Feature Importance)** | 모델이 정답을 맞추는 데 어떤 특징이 가장 중요하게 작용했는지 점수로 나타낸 지표 |

뛰어난 성능, 과대적합 방지, 사용의 편리함까지 삼박자를 갖춘 랜덤 포레스트는 실무에서 **"무엇을 써야 할지 모르겠다면 일단 랜덤 포레스트부터 돌려보라"**는 말이 있을 정도로 필수적인 알고리즘입니다.

지금까지는 정답(Target)이 존재하는 '지도 학습'을 배웠습니다. 다음 8강부터는 정답이 주어지지 않은 상태에서 데이터 스스로 패턴을 찾는 **비지도 학습 (군집 분석)**의 세계로 떠나보겠습니다.
