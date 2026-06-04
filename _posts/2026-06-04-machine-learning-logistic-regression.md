---
layout: post
title: 로지스틱 회귀 분석 (Logistic Regression)
subtitle: 로지스틱 회귀 분석을 이용한 분류 문제 해결 방법을 배웁니다.
categories: [Machine Learning]
tags: [머신러닝, 분류, 로지스틱회귀]
author: min oh
---

# Google Colab 데이터 로드

```python
#Step 1.분석할 데이터가 저장된 파일을 불러와서 변수에 할당합니다.
from google.colab import files
myfile = files.upload()
import io
import pandas as pd
#pd.read_csv로 csv파일 불러오기
study = pd.read_csv(io.BytesIO(myfile['공부시간과시험합격.csv']),
                       encoding='cp949')
study
```

# 로컬 데이터 로드

```python
#컴퓨터에서 작업하려면 아래 코드의 주석을 제거하고 실행하면 됩니다
import pandas as pd
study = pd.read_csv('./머신러닝실습용자료/공부시간과시험합격.csv',encoding='cp949')
study
```

```text
       이름  공부시간  시험점수 합격여부
0     이원재  15.0  85.0   합격
1     맹승주  14.5  86.5   합격
2     안미경  14.0  86.0   합격
3     서진수  13.5  85.5   합격
4     황경인  13.0  85.0   합격
5     신운무  12.0  83.0   합격
6      권율  12.0  85.0   합격
7      강준  11.0  82.0   합격
8    신사임당  11.0  83.0   합격
9     문무왕  10.5  82.0   합격
10    김지희  10.5  81.5   합격
11    임기승  10.0  82.0   합격
12    강감찬  10.0  81.0   합격
13  광개토대왕   9.5  78.0  불합격
14    이세혁   9.3  77.4  불합격
15    전우치   9.0  77.0  불합격
16    이순신   9.0  76.0  불합격
17    정진교   8.5  75.5  불합격
18   계백장군   8.5  76.0  불합격
19    왕광환   8.4  75.5  불합격
20    홍길동   8.2  75.0  불합격
21    곽재우   8.0  74.5  불합격
22    김유신   7.5  74.0  불합격
23    이승우   7.5  73.5  불합격
24    일지매   7.0  73.0  불합격
```

# 공통 실습 코드

```python
#Step 2: 훈련용 데이터셋과 테스트용 데이터셋 나누어서 분석
from sklearn.model_selection import train_test_split

# data  나누기
data =  study['공부시간'].to_numpy()
target = study['합격여부'].to_numpy()

# train, test 데이터 분리
from sklearn.model_selection import train_test_split
훈련용_data, 테스트용_data , 훈련용_target , 테스트용_target = train_test_split(
data, target, test_size= 0.2, random_state=40)


훈련용_data = 훈련용_data.reshape(-1,1)
테스트용_data = 테스트용_data.reshape(-1,1)

```

```python
print(훈련용_data)
```

```text
[[13.5]
 [ 8. ]
 [14. ]
 [10. ]
 [ 8.5]
 [13. ]
 [11. ]
 [ 9. ]
 [ 7.5]
 [ 8.2]
 [15. ]
 [10.5]
 [10.5]
 [ 7.5]
 [10. ]
 [14.5]
 [ 8.5]
 [12. ]
 [11. ]
 [12. ]]

```

```python
#Step 3. 학습 후 모델을 생성하고 예측을 수행합니다
from sklearn.linear_model import LogisticRegression
lr = LogisticRegression()
# 로지스틱회귀 모델 생성
lr.fit(훈련용_data,훈련용_target)
# 행(row)으로 되어있는 데이터, 열(column)로 나열

# 모델 학습



# 테스트용_data로 예측
print(lr.predict(테스트용_data))
```

```text
['불합격' '불합격' '불합격' '불합격' '합격']

```

```python
import numpy as np

# 각 항목별 확률값 출력
print(np.round(lr.predict_proba(테스트용_data),3))
```

```text
[[0.668 0.332]
 [0.984 0.016]
 [0.546 0.454]
 [0.849 0.151]
 [0.461 0.539]]

```

# Google Colab 데이터 로드

```python
# 다중 분류 활용-과일 종류 분류하기
#Step 1.분석할 데이터가 저장된 파일을 불러와서 변수에 할당합니다.
from google.colab import files
myfile = files.upload()
import io
import pandas as pd
#pd.read_csv로 csv파일 불러오기
fruit_2 = pd.read_csv(io.BytesIO(myfile['과일채소목록_2.csv']),
                       encoding='cp949')
fruit_2
```

# 로컬 데이터 로드

```python
#컴퓨터에서 작업하려면 아래 코드의 주석을 제거하고 실행하면 됩니다
import pandas as pd
fruit_2 = pd.read_csv('./머신러닝실습용자료/과일채소목록_2.csv',encoding='cp949')
fruit_2
```

```text
      종류  무게_g  길이_cm   당도 등급
0   거봉포도   291   29.1  9.1  A
1   거봉포도   290   29.0  9.0  A
2   거봉포도   281   28.1  8.1  B
3   거봉포도   280   28.0  8.0  B
4   거봉포도   271   26.1  8.6  B
5   거봉포도   270   26.0  8.5  B
6   거봉포도   251   25.1  7.6  C
7   거봉포도   250   25.0  7.5  C
8   거봉포도   221   22.1  7.1  C
9   거봉포도   220   22.0  7.0  C
10    수박  2501   25.1  7.1  C
11    수박  2500   25.0  7.0  C
12    수박  2201   21.1  9.6  A
13    수박  2200   21.0  9.5  A
14    수박  2001   30.5  8.1  A
15    수박  2000   30.0  8.0  B
16    수박  1801   20.1  6.6  D
17    수박  1800   20.0  6.5  D
18    수박  1501   16.1  8.6  B
19    수박  1500   16.0  8.5  B
20   옥수수   501   25.1  2.1  B
21   옥수수   500   25.0  2.0  B
22   옥수수   451   20.1  3.1  A
23   옥수수   450   20.0  3.0  A
24   옥수수   401   23.1  1.1  D
25   옥수수   400   23.0  1.0  D
26   옥수수   381   22.1  1.6  C
27   옥수수   380   22.0  1.5  C
28   옥수수   351   20.1  1.4  C
29   옥수수   350   20.0  1.3  C
30    자두   151    3.9  8.6  B
31    자두   150    3.8  8.5  B
32    자두   121    3.8  7.1  C
33    자두   120    3.7  7.0  C
34    자두   111    3.7  7.6  C
35    자두   110    3.6  7.5  C
36    자두   101    3.6  6.1  D
37    자두   100    3.5  6.0  D
38    자두    91    2.9  8.1  B
39    자두    90    2.8  8.0  B
40    참외   601    8.6  8.1  B
41    참외   600    8.5  8.0  B
42    참외   501    8.1  8.1  B
43    참외   500    8.0  8.0  B
44    참외   451    8.1  7.6  C
45    참외   450    8.0  7.5  C
46    참외   401    7.6  7.3  C
47    참외   401    6.6  6.6  D
48    참외   400    7.5  7.2  C
49    참외   400    6.5  6.5  D
```

# 공통 실습 코드

```python
#Step 2: 훈련용 데이터셋과 테스트용 데이터셋 나누어서 분석
from sklearn.model_selection import train_test_split

# data  나누기
data = fruit_2[['무게_g', '길이_cm', '당도']]
target = fruit_2['종류']

# train, test 데이터 분리
from sklearn.model_selection import train_test_split
훈련용_data, 테스트용_data , 훈련용_target , 테스트용_target = train_test_split(
data, target, test_size= 0.2, random_state=40)
```

```python
#Step 3. 데이터 표준화를 진행합니다
from sklearn.preprocessing import StandardScaler
ss = StandardScaler()
ss.fit(훈련용_data)

표준화_훈련용_data = ss.transform(훈련용_data)
표준화_테스트용_data = ss.transform(테스트용_data)
```

```python
# 모델을 생성하고 테스트하고 성능을 확인합니다.
from sklearn.linear_model import LogisticRegression
import numpy as np

# 로지스틱회귀분석 모델 생성 및 학습
sofrmax_reg = LogisticRegression()
sofrmax_reg.fit(표준화_훈련용_data, 훈련용_target)
# 분류 결과 확인
print(sofrmax_reg.predict(표준화_테스트용_data))

# 분류 확률 확인
print(np.round(sofrmax_reg.predict_proba(표준화_테스트용_data), 3))

# 분류 점수 확인
print(sofrmax_reg.score(표준화_테스트용_data, 테스트용_target))
```

```text
['자두' '옥수수' '참외' '자두' '참외' '거봉포도' '수박' '거봉포도' '수박' '거봉포도']
[[0.021 0.007 0.018 0.658 0.297]
 [0.021 0.008 0.945 0.009 0.017]
 [0.039 0.03  0.052 0.421 0.458]
 [0.021 0.006 0.007 0.671 0.296]
 [0.067 0.046 0.032 0.334 0.521]
 [0.93  0.031 0.011 0.003 0.026]
 [0.053 0.667 0.012 0.006 0.263]
 [0.877 0.04  0.021 0.009 0.052]
 [0.004 0.979 0.004 0.    0.013]
 [0.893 0.037 0.029 0.006 0.035]]
1.0

```

