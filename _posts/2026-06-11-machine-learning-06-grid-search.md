---
layout: post
title: "[6강] 그리드 서치"
subtitle: "최고의 모델 설정값(하이퍼파라미터)을 자동으로 찾아주는 탐색기"
categories: ["Machine Learning"]
tags: ["머신러닝", "Machine Learning", "그리드서치", "GridSearchCV", "하이퍼파라미터"]
author: "omm0716"
date: "2026-06-11 14:00:00 +0900"
---

안녕하세요! 5강에서 교차 검증으로 모델의 실력을 정확히 평가하는 법을 배웠다면, 이번 6강에서는 **성능을 극대화하기 위해 모델을 세팅하는 방법**을 배워보겠습니다.

카메라를 살 때 조리개, 셔터스피드, ISO 등 다양한 설정값이 있죠? 머신러닝 알고리즘에도 이러한 수동 설정값들이 존재하며, 이를 **하이퍼파라미터(Hyperparameter)**라고 부릅니다. 
예를 들어 결정 트리(Decision Tree) 모델의 경우 '트리의 최대 깊이(`max_depth`)', '잎사귀 최소 샘플 수(`min_samples_leaf`)' 등을 사람이 직접 정해줘야 합니다.

최적의 조합을 찾으려면 어떻게 해야 할까요?
깊이를 1, 2, 3... 넣어보고, 다시 샘플 수를 10, 20... 바꿔가며 수백 번 수동으로 코드를 고치고 돌려보는 것은 엄청난 노가다입니다. 이것을 기계가 대신 다 해주는 툴이 바로 **그리드 서치(Grid Search)**입니다.

---

## 1. 수작업의 고통 (for문 사용하기)

만약 그리드 서치가 없다면 우리는 파이썬의 이중, 삼중 `for` 문을 사용해 파라미터 조합을 바꿔가며 교차검증을 반복해야 합니다. 코드가 지저분해지고 실수할 여지가 많습니다.

```python
# 그리드 서치가 없었을 때의 끔찍한 하드코딩 예시 (따라하지 마세요!)
best_score = 0
for depth in [1, 2, 3, 4, 5]:
    for leaf in [1, 2, 3]:
        model = DecisionTreeClassifier(max_depth=depth, min_samples_leaf=leaf)
        score = np.mean(cross_validate(model, data, target)['test_score'])
        if score > best_score:
            best_score = score
            best_params = {'max_depth': depth, 'min_samples_leaf': leaf}
```

---

## 2. GridSearchCV를 활용한 스마트한 탐색

`scikit-learn`이 제공하는 `GridSearchCV` 모듈은 마치 격자(Grid)의 교차점들을 하나씩 다 찍어보듯, 우리가 던져준 모든 파라미터 조합을 꼼꼼하게 시도하고 가장 좋은 결과를 알려줍니다. 게다가 내부적으로 **교차 검증(Cross Validation)**까지 알아서 수행합니다!

```python
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import GridSearchCV

# 데이터 준비
fruit = pd.read_csv('./머신러닝실습용자료/의사결정나무_과일종류_2가지.csv', encoding='cp949')
data = fruit[['길이', '무게']].to_numpy()
target = fruit['종류'].to_numpy()

# 탐색할 하이퍼파라미터 딕셔너리 준비
# (기계가 시도해볼 값들의 후보 목록입니다)
params = {
    'max_depth': [3, 4, 5, 6, 7],         # 트리 깊이 5가지
    'min_samples_split': [2, 3, 4, 5]     # 분할 최소 노드 수 4가지
}

# 기본 모델 생성
dt = DecisionTreeClassifier(random_state=42)

# 그리드 서치 객체 생성 (기본 5-Fold 교차검증)
# 시도 횟수 = 5 * 4 * 5번 교차검증 = 총 100번의 모델 학습이 자동으로 진행됨!
gs = GridSearchCV(dt, param_grid=params, n_jobs=-1)

# 학습(탐색) 시작!
gs.fit(data, target)
```

> [!TIP]
> `n_jobs=-1`은 컴퓨터의 모든 CPU 코어를 총동원하여 작업을 병렬로 빠르게 처리하라는 뜻입니다. 그리드 서치는 계산량이 많기 때문에 이 옵션을 켜두는 것이 좋습니다.

---

## 3. 탐색 결과 확인하기

수백 번의 학습을 마친 `GridSearchCV` 객체 안에는 최적의 결과들이 고스란히 담겨 있습니다. 우리는 이 값들을 그냥 꺼내 쓰기만 하면 됩니다.

```python
# 1. 기계가 찾은 가장 좋은 성능의 모델 
# (이미 전체 데이터로 최종 학습까지 완료된 상태입니다)
best_model = gs.best_estimator_

# 2. 기계가 찾은 최고의 파라미터 조합
print("최적의 하이퍼파라미터:", gs.best_params_)

# 3. 최고의 조합으로 나왔던 교차 검증 평균 점수
print("최고 교차검증 점수:", gs.best_score_)
```

출력 예시:
```text
최적의 하이퍼파라미터: {'max_depth': 5, 'min_samples_split': 3}
최고 교차검증 점수: 0.9125
```

그리드 서치 덕분에 우리는 편안하게 커피 한 잔 마시는 동안 최상의 성능을 내는 설정값을 획득했습니다! `best_model` 변수에 이미 최적 설정으로 세팅된 모델이 들어있기 때문에 바로 `predict` 함수를 사용해 실전에 활용할 수 있습니다.

---

## 💡 요약

| 개념 | 설명 |
|---|---|
| **하이퍼파라미터 (Hyperparameter)** | 기계가 스스로 학습하지 못하고, 사람이 직접 개입하여 값을 지정해 줘야 하는 모델의 설정값들 |
| **그리드 서치 (Grid Search)** | 지정해 준 하이퍼파라미터들의 모든 경우의 수를 격자판처럼 교차하여 탐색하는 최적화 기법 |
| **GridSearchCV 클래스** | 교차 검증과 하이퍼파라미터 탐색을 동시에 자동으로 수행해주는 scikit-learn의 필수 도구 |

모델의 성능을 영혼까지 끌어모으고 싶다면 GridSearchCV는 필수입니다. 
다음 7강에서는 단일 모델의 한계를 극복하기 위해 여러 모델이 힘을 합치는 집단 지성 알고리즘인 **앙상블 기법(랜덤 포레스트)**에 대해 알아보겠습니다.
