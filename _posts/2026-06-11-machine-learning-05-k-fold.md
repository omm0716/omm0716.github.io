---
layout: post
title: [5강] K-Fold 교차검증
subtitle: 모델의 신뢰성을 높이는 교차검증 기법 실습
categories: [Machine Learning]
tags: [머신러닝, Machine Learning]
author: omm0716
date: 2026-06-11 13:00:00 +0900
---

# Google Colab 데이터 로드

```python
#Step 1. 구글 코랩에 한글 폰트 설정하기

!sudo apt-get install -y fonts-nanum
!sudo fc-cache -fv
!rm ~/.cache/matplotlib -rf
```

```python
#Step 2.분석할 데이터가 저장된 파일을 불러와서 변수에 할당합니다.
from google.colab import files
myfile = files.upload()
import io
import pandas as pd
#pd.read_csv로 csv파일 불러오기
src_data = pd.read_csv(io.BytesIO(myfile['의사결정나무_과일종류_2가지.csv']),
                       encoding='cp949')
src_data
```

# 로컬 데이터 로드

```python
#컴퓨터에서 작업하려면 아래 코드의 주석을 제거하고 실행하면 됩니다
import pandas as pd
src_data = pd.read_csv('./머신러닝실습용자료/의사결정나무_과일종류_2가지.csv',encoding='cp949')
src_data
```
```text
    종류    무게    길이
0   수박  2000  30.0
1   수박  2500  25.0
2   수박  1800  20.0
3   수박  1500  16.0
4   수박  1900  19.0
5   수박   600   9.0
6   참외   500   8.0
7   참외   400   7.5
8   참외   450   5.0
9   참외   400   4.5
10  참외   600   9.5
11  참외   550   8.5
```

# 공통 실습 코드

```python
#Step 3.주어진 데이터를 훈련용 데이터와 검증용 데이터로 나눕니다
import numpy as np


# 수정 전: data = src_data['길이'], src_data['무게']
# 수정 후: 
data = src_data[['길이', '무게']]  # 대괄호 두 개로 묶어줍니다!
target = src_data['종류']

# train, test 데이터 분리
from sklearn.model_selection import train_test_split
훈련용_data, 테스트용_data , 훈련용_target , 테스트용_target = train_test_split(
    data, target, test_size= 0.2, random_state=10
)
```

```python
# 교차검증 없이 모델 검증합니다.
from sklearn.tree import DecisionTreeClassifier
# 의사결정트리 분류기 모델 생성
dt = DecisionTreeClassifier(random_state = 10)
# 모델 학습
dt.fit(훈련용_data, 훈련용_target)
# 훈련용 데이터 기준 score 출력
print("정확도:", dt.score(훈련용_data, 훈련용_target) )
# 테스트용 데이터 기준 score 출력
print("정확도:", dt.score(테스트용_data, 테스트용_target) )
```
```text
정확도: 1.0
정확도: 1.0

```

```python
#3-Fold 교차 검증 수행
from sklearn.model_selection import cross_validate , cross_val_score
from sklearn.tree import DecisionTreeClassifier
dt = DecisionTreeClassifier(random_state=10)

# cross_validate() : 검사 결과를 자세하게 보여주는 것
scores_1 = cross_validate(dt, 훈련용_data, 훈련용_target, cv = 3)
# cross_val_score() : 검사 결과 중에서 평균 점수만 보여주는 것
scores_2 = cross_val_score(dt, 훈련용_data, 훈련용_target, cv = 3)

print('cross_validate 결과:', scores_1)
#print('cross_validate 결과:', np.mean(scores_1['test_score']))
print('cross_val_score 결과:', np.mean(scores_2))
```
```text
cross_validate 결과: {'fit_time': array([0.00258517, 0.00239253, 0.00175095]), 'score_time': array([0.00164104, 0.00298834, 0.00102997]), 'test_score': array([0.66666667, 1.        , 0.66666667])}
cross_val_score 결과: 0.7777777777777777

```

```python
#5-Fold 교차검증 수행
from sklearn.model_selection import cross_validate, cross_val_score
from sklearn.tree import DecisionTreeClassifier
dt1 = DecisionTreeClassifier(random_state = 10)

scores_3 = cross_validate(dt1, 훈련용_data, 훈련용_target, cv = 5)
scores_4 = cross_val_score(dt1, 훈련용_data, 훈련용_target, cv = 5)

print("cross_validate 결과", scores_3)
print("cross_val_score 결과", scores_4)
```
```text
cross_validate 결과 {'fit_time': array([0.00331688, 0.00219798, 0.0023942 , 0.00159931, 0.00153399]), 'score_time': array([0.00180721, 0.0017364 , 0.00205445, 0.00145841, 0.00135064]), 'test_score': array([0.5, 1. , 0.5, 1. , 1. ])}
cross_val_score 결과 [0.5 1.  0.5 1.  1. ]

```
```text
c:\Users\user\AppData\Local\Programs\Python\Python313\Lib\site-packages\sklearn\model_selection\_split.py:813: UserWarning: The least populated class in y has only 4 members, which is less than n_splits=5.
  warnings.warn(
c:\Users\user\AppData\Local\Programs\Python\Python313\Lib\site-packages\sklearn\model_selection\_split.py:813: UserWarning: The least populated class in y has only 4 members, which is less than n_splits=5.
  warnings.warn(

```
