---
layout: post
title: "[5강] K-Fold 교차검증"
subtitle: "우연에 의존하지 않는 진짜 실력 검증법"
categories: ["Machine Learning"]
tags: ["머신러닝", "Machine Learning", "교차검증", "K-Fold", "Cross Validation"]
author: "omm0716"
date: "2026-06-11 13:00:00 +0900"
---

안녕하세요! 머신러닝 학습 파이프라인에서 가장 중요한 단계 중 하나인 **모델 평가**에 대해 깊이 파고들어 보겠습니다.

지금까지 우리는 전체 데이터를 훈련용(Train)과 테스트용(Test)으로 보통 8:2 비율로 나누어 사용했습니다. 그런데 생각해보면, **운이 아주 좋게도** 테스트 세트에 모델이 맞추기 아주 쉬운 데이터들만 들어간다면 어떻게 될까요? 반대로 운이 나쁘게 예외적인 데이터들만 테스트 세트에 쏠린다면요?

단 한 번의 분리(train_test_split)로 나온 점수만 믿고 실전에 모델을 투입하기에는 우리의 점수가 우연에 의존할 확률이 높습니다. 이를 방지하기 위한 기법이 바로 **K-Fold 교차검증(Cross Validation)**입니다.

---

## 1. 교차 검증의 원리

교차 검증은 데이터를 한 번만 나누고 끝내는 것이 아니라, 훈련 세트를 여러 조각(Fold)으로 나눈 뒤 돌아가며 시험을 치는 방법입니다.

가장 흔히 쓰이는 **5-Fold 교차검증**을 예로 들어보겠습니다.
1. 훈련 데이터를 5개의 똑같은 크기의 조각(1, 2, 3, 4, 5)으로 나눕니다.
2. 1회차: 1, 2, 3, 4번 조각으로 학습하고 5번 조각으로 시험을 봅니다.
3. 2회차: 1, 2, 3, 5번 조각으로 학습하고 4번 조각으로 시험을 봅니다.
4. 이 과정을 5번 반복하여 모든 조각이 한 번씩 테스트 역할을 하도록 합니다.
5. 5번의 시험에서 나온 점수의 **평균**을 내어 최종 모델의 진짜 성능으로 판별합니다.

이렇게 하면 데이터의 편중(운)을 막고 훨씬 안정적이고 신뢰할 수 있는 성능 평가가 가능합니다.

---

## 2. K-Fold 교차검증 실습하기

파이썬의 `scikit-learn`에서는 `cross_validate`라는 함수를 통해 반복문을 직접 작성할 필요 없이 한 줄로 이 모든 과정을 수행할 수 있습니다.

```python
import pandas as pd
from sklearn.model_selection import cross_validate
from sklearn.tree import DecisionTreeClassifier

# 1. 데이터 불러오기 (예: 과일 데이터)
fruit = pd.read_csv('./머신러닝실습용자료/의사결정나무_과일종류_2가지.csv', encoding='cp949')

data = fruit[['길이', '무게']].to_numpy()
target = fruit['종류'].to_numpy()

# 2. 결정 트리 모델 생성 (아직 학습 X)
dt = DecisionTreeClassifier(random_state=42)

# 3. 5-Fold 교차검증 수행 (cv 속성 기본값이 5)
scores = cross_validate(dt, data, target, cv=5)

# 평가 결과 확인
print("교차 검증 상세 점수:", scores)
```

출력되는 딕셔너리를 보면 `test_score` 항목에 5번의 시험 성적이 담겨 있는 것을 볼 수 있습니다.

```text
{'fit_time': array([...]), 
 'score_time': array([...]), 
 'test_score': array([0.85, 0.90, 0.88, 0.92, 0.86])}
```

---

## 3. 최종 교차 검증 평균 점수 도출

개별 점수보다 중요한 것은 바로 전체 평균 점수입니다. `numpy` 패키지를 이용해 평균을 구해봅시다.

```python
import numpy as np

# 평균 점수 구하기
mean_score = np.mean(scores['test_score'])
print(f"최종 교차 검증 평균 점수: {mean_score:.4f}")
```

이렇게 도출된 점수가 바로 이 모델이 실제로 배포되었을 때 기대할 수 있는 진짜 성능(신뢰할 수 있는 일반화 성능)입니다.

### 세밀한 K-Fold 설정 (StratifiedKFold)
만약 분류 문제에서 데이터의 쏠림(예: 수박 90개, 참외 10개)이 심하다면, 각 폴드마다 수박과 참외의 비율을 균등하게 맞춰서 섞어줘야 합니다. `scikit-learn`의 `cross_validate`는 분류 모델이 들어오면 알아서 비율을 맞춰주는 `StratifiedKFold`를 내부적으로 사용하므로 안심하셔도 됩니다.

직접 폴드 분할기를 지정하고 싶다면 아래처럼 할 수 있습니다.

```python
from sklearn.model_selection import StratifiedKFold

# n_splits=10 으로 10-Fold 교차검증 진행, 데이터 무작위 셔플
splitter = StratifiedKFold(n_splits=10, shuffle=True, random_state=42)

scores_10fold = cross_validate(dt, data, target, cv=splitter)
print("10-Fold 평균 점수:", np.mean(scores_10fold['test_score']))
```

---

## 💡 요약

| 개념 | 설명 |
|---|---|
| **교차 검증 (Cross Validation)** | 전체 데이터를 여러 조각으로 쪼개서 돌아가며 훈련과 테스트를 반복해 모델 성능의 신뢰도를 높이는 평가 방법 |
| **K-Fold** | 데이터를 K개의 조각(Fold)으로 쪼갠다는 의미 (보통 5 또는 10을 사용) |
| **cross_validate** | 파이썬에서 교차 검증 과정을 단 한 줄로 자동으로 수행해주는 편리한 함수 |
| **StratifiedKFold** | 훈련 세트와 테스트 세트에 각 클래스의 비율을 실제 데이터와 동일하게 유지하여 나누는 스마트한 분할기 |

이처럼 교차검증을 통해 모델의 '진짜 실력'을 파악하는 방법을 배웠습니다. 하지만, 모델의 성능이 생각보다 좋지 않다면 어떻게 해야 할까요? 바로 내부 설정값(하이퍼파라미터)을 조절해야 합니다. 다음 6강에서는 이 설정값의 최적의 조합을 찾아주는 마법의 탐색 도구, **그리드 서치(Grid Search)**에 대해 알아보겠습니다.
