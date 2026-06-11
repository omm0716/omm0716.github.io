---
layout: post
title: [6강] 그리드 서치
subtitle: 최적의 하이퍼파라미터를 찾는 Grid Search 실습
categories: [Machine Learning]
tags: [머신러닝, Machine Learning]
author: omm0716
date: 2026-06-11 14:00:00 +0900
---

## GridSearch
최적의 하이퍼파라미터를 찾는 방법

```python
#컴퓨터에서 작업하려면 아래 코드의 주석을 제거하고 실행하면 됩니다
import pandas as pd
src_data = pd.read_csv('../../머신러닝실습용자료/의사결정나무_과일종류_2가지.csv',encoding='cp949')
src_data
```

```python
#Step 3.주어진 데이터를 훈련용 데이터와 검증용 데이터로 나눕니다
import numpy as np

# 무게, 길이로 종류를 예측
data = None
target = None
print(data)
print(target)

# train, test 데이터 분리
```

```python
from sklearn.model_selection import GridSearchCV
from sklearn.tree import DecisionTreeClassifier


parm = {'max_depth':[1,2,3]}
gs = GridSearchCV(DecisionTreeClassifier(random_state=50) , parm , n_jobs=-1)
gs.fit(훈련용_data , 훈련용_target)
```

```python
print(gs.best_params_)
dt = gs.best_estimator_
print(dt.score(훈련용_data , 훈련용_target))
```

```python
#한꺼번에 여러 속성값을 찾을 경우
from sklearn.model_selection import GridSearchCV
parm = {'max_depth': range(1,10,1) ,
        'min_impurity_decrease': np.arange(0.0001,0.001 , 0.0001),
        'min_samples_split' : range(2,100,10) }
gs = GridSearchCV(DecisionTreeClassifier(random_state=50) , parm , n_jobs=-1)
gs.fit(훈련용_data , 훈련용_target)
print(gs.best_params_)
```

```python
#교차검증 점수중 최고값을 확인하기
print(np.max(gs.cv_results_['mean_test_score']))
```

```python
# 최적의 모델로 테스트용 데이터로 최종 테스트하기
dt = gs.best_estimator_
print(dt.score(테스트용_data , 테스트용_target))
print(dt.score(훈련용_data , 훈련용_target))
```
