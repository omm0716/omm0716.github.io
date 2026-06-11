---
layout: post
title: [7강] 앙상블: 랜덤 포레스트
subtitle: 결정 트리의 앙상블 모델인 Random Forest 실습
categories: [Machine Learning]
tags: [머신러닝, Machine Learning]
author: omm0716
date: 2026-06-11 15:00:00 +0900
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
과일채소목록 = pd.read_csv(io.BytesIO(myfile['과일채소목록.csv']),
                       encoding='cp949')
과일채소목록
```

# 로컬 데이터 로드

```python
#컴퓨터에서 작업하려면 아래 코드의 주석을 제거하고 실행하면 됩니다
import pandas as pd
src_data = pd.read_csv('./머신러닝실습용자료/과일채소목록.csv',encoding='cp949')
src_data
```
```text
      종류  무게_g  길이_cm  색상   당도
0     수박  2000   30.0   1  8.0
1     수박  2500   25.0   1  7.0
2     수박  1800   20.0   1  6.5
3     수박  1500   16.0   1  8.5
4     수박  2200   21.0   1  9.5
5     자두   100    3.5   3  6.0
6     자두   120    3.7   3  7.0
7     자두    90    2.8   3  8.0
8     자두   150    3.8   3  8.5
9     자두   110    3.6   3  7.5
10    참외   500    8.0   2  8.0
11    참외   400    7.5   2  7.2
12    참외   450    8.0   2  7.5
13    참외   400    6.5   2  6.5
14    참외   600    8.5   2  8.0
15   옥수수   450   20.0   1  3.0
16   옥수수   500   25.0   1  2.0
17   옥수수   380   22.0   1  1.5
18   옥수수   400   23.0   1  1.0
19   옥수수   350   20.0   1  1.3
20  거봉포도   280   28.0   3  8.0
21  거봉포도   250   25.0   3  7.5
22  거봉포도   220   22.0   3  7.0
23  거봉포도   270   26.0   3  8.5
24  거봉포도   290   29.0   3  9.0
25    수박  2001   30.5   1  8.1
26    수박  2501   25.1   1  7.1
27    수박  1801   20.1   1  6.6
28    수박  1501   16.1   1  8.6
29    수박  2201   21.1   1  9.6
30    자두   101    3.6   3  6.1
31    자두   121    3.8   3  7.1
32    자두    91    2.9   3  8.1
33    자두   151    3.9   3  8.6
34    자두   111    3.7   3  7.6
35    참외   501    8.1   2  8.1
36    참외   401    7.6   2  7.3
37    참외   451    8.1   2  7.6
38    참외   401    6.6   2  6.6
39    참외   601    8.6   2  8.1
40   옥수수   451   20.1   1  3.1
41   옥수수   501   25.1   1  2.1
42   옥수수   381   22.1   1  1.6
43   옥수수   401   23.1   1  1.1
44   옥수수   351   20.1   1  1.4
45  거봉포도   281   28.1   3  8.1
46  거봉포도   251   25.1   3  7.6
47  거봉포도   221   22.1   3  7.1
48  거봉포도   271   26.1   3  8.6
49  거봉포도   291   29.1   3  9.1
```

# 공통 실습 코드

```python
#Step 3. 훈련용 세트와 테스트용 세트로 나눕니다.
# '무게_g','길이_cm','색상','당도'에 따른 과일종류 분류
data = src_data[['무게_g','길이_cm','색상','당도']]
target = src_data['종류']

# train, test 데이터 분리
from sklearn.model_selection import train_test_split
훈련용_data, 테스트용_data , 훈련용_target , 테스트용_target = train_test_split(
    data, target, test_size= 0.3, random_state=40
)
```

```python
# 각각의 데이터 확인
print(훈련용_data.shape , 테스트용_data.shape)
print(훈련용_data)
print(훈련용_target)
```
```text
(35, 4) (15, 4)
    무게_g  길이_cm  색상   당도
41   501   25.1   1  2.1
23   270   26.0   3  8.5
36   401    7.6   2  7.3
5    100    3.5   3  6.0
13   400    6.5   2  6.5
39   601    8.6   2  8.1
17   380   22.0   1  1.5
43   401   23.1   1  1.1
24   290   29.0   3  9.0
3   1500   16.0   1  8.5
22   220   22.0   3  7.0
40   451   20.1   1  3.1
26  2501   25.1   1  7.1
34   111    3.7   3  7.6
20   280   28.0   3  8.0
28  1501   16.1   1  8.6
14   600    8.5   2  8.0
15   450   20.0   1  3.0
30   101    3.6   3  6.1
8    150    3.8   3  8.5
46   251   25.1   3  7.6
32    91    2.9   3  8.1
9    110    3.6   3  7.5
48   271   26.1   3  8.6
42   381   22.1   1  1.6
10   500    8.0   2  8.0
31   121    3.8   3  7.1
19   350   20.0   1  1.3
47   221   22.1   3  7.1
12   450    8.0   2  7.5
1   2500   25.0   1  7.0
37   451    8.1   2  7.6
7     90    2.8   3  8.0
27  1801   20.1   1  6.6
6    120    3.7   3  7.0
41     옥수수
23    거봉포도
36      참외
5       자두
13      참외
39      참외
17     옥수수
43     옥수수
24    거봉포도
3       수박
22    거봉포도
40     옥수수
26      수박
34      자두
20    거봉포도
28      수박
14      참외
15     옥수수
30      자두
8       자두
46    거봉포도
32      자두
9       자두
48    거봉포도
42     옥수수
10      참외
31      자두
19     옥수수
47    거봉포도
12      참외
1       수박
37      참외
7       자두
27      수박
6       자두
Name: 종류, dtype: str

```

```python
# 랜덤 포레스트 모델 생성
from sklearn.ensemble import RandomForestClassifier
# 학습
tree = RandomForestClassifier(n_estimators=10, n_jobs=-1, random_state= 40)
tree.fit(훈련용_data, 훈련용_target)
# 예측
print(tree.predict(테스트용_data))
# score
print(tree.score(테스트용_data, 테스트용_target))
```
```text
['자두' '수박' '거봉포도' '참외' '거봉포도' '수박' '옥수수' '수박' '참외' '수박' '옥수수' '참외' '수박'
 '거봉포도' '옥수수']
1.0

```

### 결과표 작성 및 시각화

```python
# 테스트 데이터 확인
테스트용_data
```
```text
    무게_g  길이_cm  색상   당도
33   151    3.9   3  8.6
29  2201   21.1   1  9.6
49   291   29.1   3  9.1
38   401    6.6   2  6.6
45   281   28.1   3  8.1
0   2000   30.0   1  8.0
18   400   23.0   1  1.0
4   2200   21.0   1  9.5
11   400    7.5   2  7.2
2   1800   20.0   1  6.5
16   500   25.0   1  2.0
35   501    8.1   2  8.1
25  2001   30.5   1  8.1
21   250   25.0   3  7.5
44   351   20.1   1  1.4
```

```python
# 예측결과 데이터프레임을 만들고
예측결과 = pd.DataFrame(tree.predict(테스트용_data),columns=['예측결과'])
# concat을 통해 기존 테스트 data와 예측결과 데이터를 합친다.
result = pd.concat([테스트용_data.reset_index(drop=True), 예측결과], axis= 1)
print(result)

from sklearn.metrics import classification_report

pred = tree.predict(테스트용_data)
print(classification_report(테스트용_target, pred))
```
```text
    무게_g  길이_cm  색상   당도  예측결과
0    151    3.9   3  8.6    자두
1   2201   21.1   1  9.6    수박
2    291   29.1   3  9.1  거봉포도
3    401    6.6   2  6.6    참외
4    281   28.1   3  8.1  거봉포도
5   2000   30.0   1  8.0    수박
6    400   23.0   1  1.0   옥수수
7   2200   21.0   1  9.5    수박
8    400    7.5   2  7.2    참외
9   1800   20.0   1  6.5    수박
10   500   25.0   1  2.0   옥수수
11   501    8.1   2  8.1    참외
12  2001   30.5   1  8.1    수박
13   250   25.0   3  7.5  거봉포도
14   351   20.1   1  1.4   옥수수
              precision    recall  f1-score   support

        거봉포도       1.00      1.00      1.00         3
          수박       1.00      1.00      1.00         5
         옥수수       1.00      1.00      1.00         3
          자두       1.00      1.00      1.00         1
          참외       1.00      1.00      1.00         3

    accuracy                           1.00        15
   macro avg       1.00      1.00      1.00        15
weighted avg       1.00      1.00      1.00        15


```

```python
# k-fold 교차 검증
from sklearn.model_selection import cross_validate, cross_val_score
from sklearn.tree import DecisionTreeClassifier
dt1 = DecisionTreeClassifier(random_state = 10)

scores_3 = cross_validate(dt1, 훈련용_data, 훈련용_target, cv = 5)
scores_4 = cross_val_score(dt1, 훈련용_data, 훈련용_target, cv = 5)

print("cross_validate 결과", scores_3)
print("cross_val_score 결과", scores_4)
```
```text
cross_validate 결과 {'fit_time': array([0.00273681, 0.00269222, 0.0019567 , 0.00150013, 0.00178194]), 'score_time': array([0.00143933, 0.00154948, 0.00101423, 0.00086236, 0.00170422]), 'test_score': array([1., 1., 1., 1., 1.])}
cross_val_score 결과 [1. 1. 1. 1. 1.]

```

```python
# 중요 속성 지표값 출력

import matplotlib.pyplot as plt
plt.rc('font', family='NanumBarunGothic')

imp = tree.feature_importances_
print('중요속성지표값:',imp)

plt.figure()
plt.bar(range(len(imp)),imp)
plt.xticks(range(len(imp)),data.columns, rotation=90)
plt.show()
```
```text
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
C:\Users\user\AppData\Roaming\Python\Python313\site-packages\IPython\core\pylabtools.py:170: UserWarning: Glyph 47924 (\N{HANGUL SYLLABLE MU}) missing from font(s) DejaVu Sans.
  fig.canvas.print_figure(bytes_io, **kw)
C:\Users\user\AppData\Roaming\Python\Python313\site-packages\IPython\core\pylabtools.py:170: UserWarning: Glyph 44172 (\N{HANGUL SYLLABLE GE}) missing from font(s) DejaVu Sans.
  fig.canvas.print_figure(bytes_io, **kw)
findfont: Font family 'NanumBarunGothic' not found.
C:\Users\user\AppData\Roaming\Python\Python313\site-packages\IPython\core\pylabtools.py:170: UserWarning: Glyph 44600 (\N{HANGUL SYLLABLE GIL}) missing from font(s) DejaVu Sans.
  fig.canvas.print_figure(bytes_io, **kw)
C:\Users\user\AppData\Roaming\Python\Python313\site-packages\IPython\core\pylabtools.py:170: UserWarning: Glyph 51060 (\N{HANGUL SYLLABLE I}) missing from font(s) DejaVu Sans.
  fig.canvas.print_figure(bytes_io, **kw)
findfont: Font family 'NanumBarunGothic' not found.
C:\Users\user\AppData\Roaming\Python\Python313\site-packages\IPython\core\pylabtools.py:170: UserWarning: Glyph 49353 (\N{HANGUL SYLLABLE SAEG}) missing from font(s) DejaVu Sans.
  fig.canvas.print_figure(bytes_io, **kw)
C:\Users\user\AppData\Roaming\Python\Python313\site-packages\IPython\core\pylabtools.py:170: UserWarning: Glyph 49345 (\N{HANGUL SYLLABLE SANG}) missing from font(s) DejaVu Sans.
  fig.canvas.print_figure(bytes_io, **kw)
findfont: Font family 'NanumBarunGothic' not found.
C:\Users\user\AppData\Roaming\Python\Python313\site-packages\IPython\core\pylabtools.py:170: UserWarning: Glyph 45817 (\N{HANGUL SYLLABLE DANG}) missing from font(s) DejaVu Sans.
  fig.canvas.print_figure(bytes_io, **kw)
C:\Users\user\AppData\Roaming\Python\Python313\site-packages\IPython\core\pylabtools.py:170: UserWarning: Glyph 46020 (\N{HANGUL SYLLABLE DO}) missing from font(s) DejaVu Sans.
  fig.canvas.print_figure(bytes_io, **kw)
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.
findfont: Font family 'NanumBarunGothic' not found.

```
```text
중요속성지표값: [0.42564394 0.27820286 0.10204579 0.1941074 ]

```
```text
<Figure size 640x480 with 1 Axes>
```
