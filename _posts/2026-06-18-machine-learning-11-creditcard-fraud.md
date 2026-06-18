---
layout: post
title: "[11강] 실전 프로젝트: 신용카드 이상 거래 탐지"
subtitle: "Kaggle 데이터로 4가지 분류 모델 비교 + GridSearch 튜닝까지"
categories: ["Machine Learning"]
tags: ["머신러닝", "Machine Learning", "분류", "LogisticRegression", "RandomForest", "SVM", "DecisionTree", "GridSearch", "불균형 데이터", "ROC-AUC"]
author: "omm0716"
date: "2026-06-18 09:00:00 +0900"
---

안녕하세요! 머신러닝 시리즈 **11강**입니다. 지금까지 선형 회귀부터 LangChain RAG 챗봇까지 다양한 이론을 학습했습니다. 이번 시간은 **실전 Kaggle 데이터셋**을 사용하여 지금까지 배운 핵심 기법들을 한꺼번에 적용해 보는 **종합 실습 프로젝트**입니다.

> 💳 **주제**: 신용카드 이상 거래(사기) 탐지  
> 📊 **데이터**: [Kaggle - Credit Card Fraud Detection](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud)  
> 🎯 **목표**: 4가지 분류 모델 성능 비교 + 최고 성능 모델 GridSearch로 하이퍼파라미터 튜닝

---

## 1. 데이터 소개 및 준비

이 데이터셋은 유럽 카드 소지자들의 **2일 간 284,807건**의 신용카드 거래 기록입니다. 이 중 사기 거래는 단 **492건(0.17%)**으로, 극심한 **클래스 불균형(Class Imbalance)** 문제를 가지고 있습니다.

| 컬럼 | 설명 |
|---|---|
| `Time` | 첫 거래 이후 경과 시간(초) |
| `V1 ~ V28` | PCA로 익명화된 28개 특성 |
| `Amount` | 거래 금액 |
| `Class` | **정답 레이블** (0: 정상, 1: 사기🚨) |

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score

# 데이터를 불러옵니다.
data = pd.read_csv('creditcard.csv')
data
```

```
            Time         V1         V2  ...       Amount  Class
0            0.0  -1.359807  -0.072781  ...       149.62      0
1            0.0   1.191857   0.266151  ...         2.69      0
...
[284807 rows x 31 columns]
```

---

## 2. 클래스 분포 확인 및 전처리

### 클래스 불균형 확인

```python
# target 데이터(Class)의 분포를 확인합니다.
print("Class Distribution:")
print(data['Class'].value_counts())

# 정답(Class)과 분석에 불필요한 'Time'을 제거합니다.
target = data['Class']
data = data.drop(columns=['Class', 'Time'])
```

```
Class Distribution:
Class
0    284315   ← 정상 거래
1       492   ← 사기 거래 (0.17%!)
```

> **⚠️ 불균형 주의!** 사기 거래가 0.17%에 불과합니다.  
> 단순 정확도(Accuracy)만 보면 "항상 0으로 예측"해도 99.83%가 나오므로,  
> **정밀도(Precision), 재현율(Recall), F1, ROC-AUC**를 함께 봐야 합니다.

### 데이터 분할 및 표준화

```python
# 1. 훈련/테스트 분할 (stratify로 비율 유지)
훈련용_data, 테스트용_data, 훈련용_target, 테스트용_target = train_test_split(
    data, target, test_size=0.2, stratify=target, random_state=42
)

print(f"훈련용 데이터 형태: {훈련용_data.shape}, 테스트용 데이터 형태: {테스트용_data.shape}")
# 훈련용 데이터 형태: (227845, 29), 테스트용 데이터 형태: (56962, 29)

# 2. 표준화 (훈련 기준으로 fit → 테스트에 transform만)
scaler = StandardScaler()
표준화_훈련용_data = scaler.fit_transform(훈련용_data)
표준화_테스트용_data = scaler.transform(테스트용_data)
```

> **💡 핵심 규칙**: `scaler.fit()`은 반드시 **훈련 데이터에만** 적용하고,  
> 테스트 데이터는 `transform()`만 사용합니다. (데이터 누수 방지)

---

## 3. 모델 1: 로지스틱 회귀 (Logistic Regression)

가장 기본적인 분류 모델로 시작합니다.

```python
# 1. 모델 생성 및 학습
lr = LogisticRegression(max_iter=1000, random_state=42)
lr.fit(표준화_훈련용_data, 훈련용_target)
print("🎯 로지스틱 회귀 모델 훈련 완료!\n")

# 2. 예측
예측_결과 = lr.predict(표준화_테스트용_data)       # 0 또는 1로 분류
예측_확률 = lr.predict_proba(표준화_테스트용_data)[:, 1]  # 사기일 확률

# 3. 성능 평가
정확도 = accuracy_score(테스트용_target, 예측_결과)
정밀도 = precision_score(테스트용_target, 예측_결과)
재현율 = recall_score(테스트용_target, 예측_결과)
f1_스코어 = f1_score(테스트용_target, 예측_결과)
lr_auc_score = roc_auc_score(테스트용_target, 예측_확률)

print("=========================================")
print("     🚨 로지스틱 회귀 모델 평가 결과     ")
print("=========================================")
print(f"📈 전체 정확도 (Accuracy)  : {정확도:.4f} (약 {정확도*100:.2f}%)")
print(f"🎯 정밀도 (Precision)      : {정밀도:.4f}")
print(f"🔍 재현율 (Recall)         : {재현율:.4f}")
print(f"⚖️ F1 Score               : {f1_스코어:.4f}")
print(f"✨ ROC-AUC Score          : {lr_auc_score:.4f}")
print("=========================================")
```

```
🎯 로지스틱 회귀 모델 훈련 완료!

=========================================
     🚨 로지스틱 회귀 모델 평가 결과     
=========================================
📈 전체 정확도 (Accuracy)  : 0.9992 (약 99.92%)
🎯 정밀도 (Precision)      : 0.8289
🔍 재현율 (Recall)         : 0.6429
⚖️ F1 Score               : 0.7241
✨ ROC-AUC Score          : 0.9578
=========================================
```

---

## 4. 모델 2: 의사결정나무 (Decision Tree)

```python
# 1. 의사결정나무 모델 생성 (max_depth=5로 과적합 방지)
dt_fusion = DecisionTreeClassifier(max_depth=5, random_state=42)
dt_fusion.fit(표준화_훈련용_data, 훈련용_target)
print("🌲 의사결정나무 모델 훈련 완료!\n")

# 2. 예측 및 확률 계산
예측_결과_dt = dt_fusion.predict(표준화_테스트용_data)
예측_확률_dt = dt_fusion.predict_proba(표준화_테스트용_data)[:, 1]

# 3. 성능 평가지표 계산
정확도_dt = accuracy_score(테스트용_target, 예측_결과_dt)
정밀도_dt = precision_score(테스트용_target, 예측_결과_dt)
재현율_dt = recall_score(테스트용_target, 예측_결과_dt)
f1_스코어_dt = f1_score(테스트용_target, 예측_결과_dt)
auc_스코어_dt = roc_auc_score(테스트용_target, 예측_확률_dt)

print("=========================================")
print("  🌲 의사결정나무(융합 데이터) 평가 결과  ")
print("=========================================")
print(f"📈 전체 정확도 (Accuracy)  : {정확도_dt:.4f} (약 {정확도_dt*100:.2f}%)")
print(f"🎯 정밀도 (Precision)      : {정밀도_dt:.4f}")
print(f"🔍 재현율 (Recall)         : {재현율_dt:.4f}")
print(f"⚖️ F1 Score               : {f1_스코어_dt:.4f}")
print(f"✨ ROC-AUC Score          : {auc_스코어_dt:.4f}")
print("=========================================")
```

```
🌲 의사결정나무 모델 훈련 완료!

=========================================
  🌲 의사결정나무(융합 데이터) 평가 결과  
=========================================
📈 전체 정확도 (Accuracy)  : 0.9995 (약 99.95%)
🎯 정밀도 (Precision)      : 0.8953
🔍 재현율 (Recall)         : 0.7857
⚖️ F1 Score               : 0.8370
✨ ROC-AUC Score          : 0.9335
=========================================
```

---

## 5. 모델 3: 랜덤 포레스트 (Random Forest)

```python
from sklearn.ensemble import RandomForestClassifier

# 1. 랜덤 포레스트 모델 생성 (나무 100그루, 깊이 5)
rf_original = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42, n_jobs=-1)
rf_original.fit(표준화_훈련용_data, 훈련용_target)

# 2. 예측 및 확률 계산
예측_결과_rf = rf_original.predict(표준화_테스트용_data)
예측_확률_rf = rf_original.predict_proba(표준화_테스트용_data)[:, 1]

# 3. 지표 계산
acc_orig = accuracy_score(테스트용_target, 예측_결과_rf)
prec_orig = precision_score(테스트용_target, 예측_결과_rf)
rec_orig = recall_score(테스트용_target, 예측_결과_rf)
f1_orig = f1_score(테스트용_target, 예측_결과_rf)
auc_orig = roc_auc_score(테스트용_target, 예측_확률_rf)

print("==================================================")
print("     🔄 랜덤포레스트 결과    ")
print("==================================================")
print(f"📈 전체 정확도 (Accuracy)  : {acc_orig:.4f} (약 {acc_orig*100:.2f}%)")
print(f"🎯 정밀도 (Precision)      : {prec_orig:.4f}")
print(f"🔍 재현율 (Recall)         : {rec_orig:.4f}")
print(f"⚖️ F1 Score               : {f1_orig:.4f}")
print(f"✨ ROC-AUC Score          : {auc_orig:.4f}")
print("==================================================")
```

```
==================================================
     🔄 랜덤포레스트 결과    
==================================================
📈 전체 정확도 (Accuracy)  : 0.9994 (약 99.94%)
🎯 정밀도 (Precision)      : 0.9125
🔍 재현율 (Recall)         : 0.7449
⚖️ F1 Score               : 0.8202
✨ ROC-AUC Score          : 0.9615
==================================================
```

---

## 6. 모델 4: 서포트 벡터 머신 (SVM)

```python
from sklearn.svm import SVC

# 1. SVM 모델 생성
# kernel='rbf': 곡선(비선형) 경계를 그려주는 커널 트릭
# probability=True: ROC-AUC 계산을 위해 확률 예측 활성화
svm_model = SVC(kernel='rbf', probability=True, random_state=42)
svm_model.fit(표준화_훈련용_data, 훈련용_target)
print("🛡️ 서포트 벡터 머신(SVM) 모델 훈련 완료!\n")

# 2. 예측 및 확률 계산
예측_결과_svm = svm_model.predict(표준화_테스트용_data)
예측_확률_svm = svm_model.predict_proba(표준화_테스트용_data)[:, 1]

# 3. 성능 평가지표 계산
acc_svm = accuracy_score(테스트용_target, 예측_결과_svm)
prec_svm = precision_score(테스트용_target, 예측_결과_svm)
rec_svm = recall_score(테스트용_target, 예측_결과_svm)
f1_svm = f1_score(테스트용_target, 예측_결과_svm)
auc_svm = roc_auc_score(테스트용_target, 예측_확률_svm)

print("=========================================")
print("  🛡️ 서포트 벡터 머신(SVM) 평가 결과    ")
print("=========================================")
print(f"📈 전체 정확도 (Accuracy)  : {acc_svm:.4f} (약 {acc_svm*100:.2f}%)")
print(f"🎯 정밀도 (Precision)      : {prec_svm:.4f}")
print(f"🔍 재현율 (Recall)         : {rec_svm:.4f}")
print(f"⚖️ F1 Score               : {f1_svm:.4f}")
print(f"✨ ROC-AUC Score          : {auc_svm:.4f}")
print("=========================================")
```

```
🛡️ 서포트 벡터 머신(SVM) 모델 훈련 완료!

=========================================
  🛡️ 서포트 벡터 머신(SVM) 평가 결과    
=========================================
📈 전체 정확도 (Accuracy)  : 0.9994 (약 99.94%)
🎯 정밀도 (Precision)      : 0.9565
🔍 재현율 (Recall)         : 0.6735
⚖️ F1 Score               : 0.7904
✨ ROC-AUC Score          : 0.9646
=========================================
```

---

## 7. 4가지 모델 성능 비교표

| 모델 | 정확도 | 정밀도 | 재현율 | F1 | **ROC-AUC** |
|---|---|---|---|---|---|
| 로지스틱 회귀 | 99.92% | 0.8289 | 0.6429 | 0.7241 | 0.9578 |
| 의사결정나무 | 99.95% | 0.8953 | 0.7857 | 0.8370 | 0.9335 |
| 랜덤 포레스트 | 99.94% | 0.9125 | 0.7449 | 0.8202 | 0.9615 |
| **SVM (🏆)** | **99.94%** | **0.9565** | **0.6735** | **0.7904** | **0.9646** |

> **🏆 SVM이 ROC-AUC 0.9646으로 가장 높은 성능**을 보였습니다.  
> 이제 랜덤 포레스트(두 번째로 높은 AUC)를 GridSearch로 튜닝하여 최종 성능을 끌어올려봅시다!

---

## 8. GridSearch로 최고 모델 튜닝하기

AUC 순위 2위 랜덤 포레스트를 `GridSearchCV`로 최적 하이퍼파라미터를 탐색합니다.

```python
from sklearn.model_selection import GridSearchCV

# 1. 탐색할 하이퍼파라미터 후보군 세팅 (Grid)
param_grid = {
    'n_estimators': [50, 100],       # 나무를 50그루 vs 100그루
    'max_depth': [5, 10],            # 나무 깊이 5층 vs 10층
    'criterion': ['gini', 'entropy'] # 데이터를 쪼개는 기준
}

# 2. 기본 모델 설정
rf_base = RandomForestClassifier(random_state=42, n_jobs=-1)

# 3. 그리드 서치 객체 생성
# scoring='roc_auc': AUC 점수 최대화를 목표로 탐색
# cv=3: 3-Fold 교차 검증으로 안전하게 평가
grid_search = GridSearchCV(
    estimator=rf_base,
    param_grid=param_grid,
    scoring='roc_auc',
    cv=3,
    n_jobs=-1,
    verbose=2
)

# 4. 그리드 서치 시작!
print("🚀 최적의 AUC 조합을 찾기 위한 그리드 서치 스타트! (약 1~2분 소요)...")
grid_search.fit(표준화_훈련용_data, 훈련용_target)

# 5. 최적 조합으로 학습된 모델 추출
best_rf_model = grid_search.best_estimator_

print("\n=========================================")
print("👑 그리드 서치가 찾아낸 최적의 파라미터:", grid_search.best_params_)
print("=========================================")

# 6. 최종 예측 및 결과 계산
최종_예측_결과 = best_rf_model.predict(표준화_테스트용_data)
최종_예측_확률 = best_rf_model.predict_proba(표준화_테스트용_data)[:, 1]

정확도_최종 = accuracy_score(테스트용_target, 최종_예측_결과)
정밀도_최종 = precision_score(테스트용_target, 최종_예측_결과)
재현율_최종 = recall_score(테스트용_target, 최종_예측_결과)
f1_스코어_최종 = f1_score(테스트용_target, 최종_예측_결과)
auc_스코어_최종 = roc_auc_score(테스트용_target, 최종_예측_확률)

print(f"📈 전체 정확도 (Accuracy)  : {정확도_최종:.4f}")
print(f"🎯 정밀도 (Precision)      : {정밀도_최종:.4f}")
print(f"🔍 재현율 (Recall)         : {재현율_최종:.4f}")
print(f"⚖️ F1 Score               : {f1_스코어_최종:.4f}")
print(f"✨ 최종 고점 ROC-AUC Score : {auc_스코어_최종:.4f} 🌟")
print("=========================================")
```

```
🚀 최적의 AUC 조합을 찾기 위한 그리드 서치 스타트! (약 1~2분 소요)...
Fitting 3 folds for each of 8 candidates, totalling 24 fits

=========================================
👑 그리드 서치가 찾아낸 최적의 파라미터: {'criterion': 'entropy', 'max_depth': 10, 'n_estimators': 100}
=========================================
📈 전체 정확도 (Accuracy)  : 0.9996
🎯 정밀도 (Precision)      : 0.9405
🔍 재현율 (Recall)         : 0.8061
⚖️ F1 Score               : 0.8681
✨ 최종 고점 ROC-AUC Score : 0.9829 🌟
=========================================
```

> **🚀 튜닝 결과**: GridSearch 이전 ROC-AUC **0.9615** → 튜닝 후 **0.9829**!  
> `criterion='entropy'`, `max_depth=10`, `n_estimators=100` 조합이 최적임을 찾아냈습니다.

---

## 9. 보너스: 변수 중요도 분석

로지스틱 회귀 모델에서 **어떤 특성(Feature)이 사기 탐지에 가장 큰 영향**을 미치는지 확인해봅니다.

```python
import numpy as np

# 학습된 모델에서 변수별 가중치(절댓값) 추출
가중치 = lr.coef_[0]
변수_중요도 = pd.DataFrame({
    '특성': data.columns,
    '중요도(절댓값)': np.abs(가중치),
    '실제_가중치(부호포함)': 가중치
}).sort_values(by='중요도(절댓값)', ascending=False)

print("=== 🏆 로지스틱 회귀 변수 중요도 상위 10개 ===")
print(변수_중요도.head(10))
```

```
=== 🏆 로지스틱 회귀 변수 중요도 상위 10개 ===
     특성  중요도(절댓값)  실제_가중치(부호포함)
3    V4  0.978395      0.978395
9   V10  0.740649     -0.740649
13  V14  0.602441     -0.602441
21  V22  0.481183      0.481183
12  V13  0.480856     -0.480856
8    V9  0.322836     -0.322836
15  V16  0.306715     -0.306715
19  V20  0.294384     -0.294384
20  V21  0.281279      0.281279
26  V27  0.240903     -0.240903
```

**V4, V10, V14**가 사기 탐지에 가장 중요한 특성으로 꼽혔습니다.

### 상위 10개 특성만으로 재학습

```python
# 1. 상위 10개 특성 선택
상위_10개_특성 = 변수_중요도.head(10)['특성'].tolist()
print("선택된 상위 10개 특성:", 상위_10개_특성)

# 2. 10개 특성만 골라 재분할 및 표준화
data_selected = data[상위_10개_특성]
훈련용_특성_선택, 테스트용_특성_선택, 훈련용_target, 테스트용_target = train_test_split(
    data_selected, target, test_size=0.2, stratify=target, random_state=42
)
scaler_selected = StandardScaler()
표준화_훈련용_data_선택 = scaler_selected.fit_transform(훈련용_특성_선택)
표준화_테스트용_data_선택 = scaler_selected.transform(테스트용_특성_선택)

# 3. 새 로지스틱 회귀 모델 생성 및 학습
lr_selected = LogisticRegression(max_iter=1000, random_state=42)
lr_selected.fit(표준화_훈련용_data_선택, 훈련용_target)

# 4. 성능 평가
예측_결과_선택 = lr_selected.predict(표준화_테스트용_data_선택)
예측_확률_선택 = lr_selected.predict_proba(표준화_테스트용_data_선택)[:, 1]

정확도_선택 = accuracy_score(테스트용_target, 예측_결과_선택)
정밀도_선택 = precision_score(테스트용_target, 예측_결과_선택)
재현율_선택 = recall_score(테스트용_target, 예측_결과_선택)
f1_스코어_선택 = f1_score(테스트용_target, 예측_결과_선택)
auc_스코어_선택 = roc_auc_score(테스트용_target, 예측_확률_선택)

print("\n=========================================")
print("  🏆 상위 10개 특성만 사용한 평가 결과   ")
print("=========================================")
print(f"📈 전체 정확도 (Accuracy)  : {정확도_선택:.4f} (약 {정확도_선택*100:.2f}%)")
print(f"🎯 정밀도 (Precision)      : {정밀도_선택:.4f}")
print(f"🔍 재현율 (Recall)         : {재현율_선택:.4f}")
print(f"⚖️ F1 Score               : {f1_스코어_선택:.4f}")
print(f"✨ ROC-AUC Score          : {auc_스코어_선택:.4f}")
print("=========================================")
```

> **💡 특성 선택(Feature Selection)의 효과**: 특성을 29개 → 10개로 줄여도 비슷한 성능을 유지할 수 있습니다.  
> 모델이 단순해지면 학습이 빠르고, 과적합 위험도 낮아집니다!

---

## 10. 핵심 개념 정리

| 개념 | 설명 |
|---|---|
| **클래스 불균형** | 정상(0)과 사기(1)의 데이터 수 차이가 극심한 상황. 단순 정확도만 보면 안 됨 |
| **ROC-AUC** | 0~1 사이 값. 1에 가까울수록 우수. 불균형 데이터에서 가장 신뢰할 수 있는 지표 |
| **정밀도(Precision)** | "사기라고 찍었을 때 실제로 사기인 비율" — 오경보(False Alarm)를 줄이고 싶을 때 중요 |
| **재현율(Recall)** | "실제 사기 중에서 잡아낸 비율" — 사기를 하나라도 더 잡고 싶을 때 중요 |
| **GridSearchCV** | 하이퍼파라미터 조합을 자동으로 전수 탐색해 최적 모델 찾기 |
| **특성 선택** | 중요도가 낮은 특성을 제거해 모델을 단순화하고 성능을 유지하는 기법 |

---

## 🎯 최종 결론

이번 실습에서는 Kaggle의 실제 신용카드 사기 탐지 데이터를 통해 **4가지 분류 모델을 비교**하고, **GridSearch로 최적 하이퍼파라미터를 탐색**하며, **변수 중요도 분석**까지 수행했습니다.

실제 머신러닝 프로젝트는 바로 이런 흐름입니다:
1. **데이터 탐색** → 2. **전처리(분할·표준화)** → 3. **여러 모델 비교** → 4. **최고 모델 선택** → 5. **하이퍼파라미터 튜닝** → 6. **특성 분석 및 최적화**

이 파이프라인을 자신의 데이터에 적용할 수 있다면, 여러분은 이미 실무 수준의 머신러닝 프로젝트를 수행할 준비가 된 것입니다! 🚀
