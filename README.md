# GETs

## 프로젝트 개요

### 1. GETs
- 개인 맞춤형 패션 플랫폼  
- Guess Style, Get Style

맞춤 추천과 가상 피팅 기능 중점, 사용자 맞춤형 기능 제공 목표

### 2. 구현 예정 사항

- 홈
    - 맞춤 추천
    - 스타일 찾기
    - 트렌드
- 제품
    - 종류별 탐색
    - 제품 검색
    - 제품 정보
- 옷장
    - 제품 목록 (좋아요 선택한 항목)
    - 코디 목록 (좋아요 선택한 항목)
    - 가상 피팅
- 계정
    - 로그인
    - 회원 가입
    - 정보 수정
    - 상세 정보 입력
    - 스타일 분석

### 3. 개발 진행 사항

#### 주요 개발 일정

|항목                           |시작      |종료      |진행 |
|------------------------------|----------|----------|-----|
|제공 서비스 선별/확립            |2021/05/03|2021/05/07|완료|
|안드로이드 레이아웃 설계          |2021/05/07|2021/05/21|완료|
|기초 의류 데이터 수집            |2021/05/14|2021/05/28|완료|
|데이터 서버 설계               |2021/05/14|2021/05/21|완료|
|데이터베이스 설계                |2021/05/14|2021/05/24|완료|
|사업계획서 작성                 |2021/05/24|2021/07/20|완료|
|안드로이드 레이아웃 제작          |2021/06/21|2021/08/15|완료|
|데이터 서버 제작                 |2021/06/21|2021/08/15|완료|
|데이터베이스 제작                 |2021/06/21|2021/08/15|완료|
|안드로이드 제공 서비스 제작        |2021/06/23|-|진행|
|웹 레이아웃 설계                 |2021/06/23|2021/08/06|완료|
|웹 레이아웃 제작                 |2021/06/23|-|진행|
|웹 제공 서비스 제작              |2021/06/30|-|진행|
|착수 보고                        |2021/07/09|2021/07/09|완료|
|중간 보고                        |2021/08/06|2021/08/06|완료|
|최종 보고 및 창업                 |2021/09/03|2021/09/03|예정|
|포스터 제작 및 발표                |2021/09/09|2021/09/10|예정|
|최종 발표                        |2021/09/11|2021/09/11|예정|

#### 사용자 요구 사항 명세

| 화면명        | 요구사항명                | 요구사항 내용                                                                |
|-----------	|-----------------------	|--------------------------------------------------------------------------	|
| 홈            | 맞춤 추천                | 카드 형태로 추천 스타일 표시                                                |
| 홈            | 날씨                    | 카드 형태로 오늘/내일 날씨 요약 표시                                        |
| 홈            | 검색                    | 제품 검색 바로 가기                                                        |
| 계정        | 로그인                    | 서버 사용자 로그인                                                        |
| 계정        | 회원 가입                | 서버 사용자 회원 가입                                                        |
| 검색        | 제품 검색                | 키워드를 이용 제품 검색                                                    |
| 검색        | 제품 필터                | 필터(성별, 분류, 색상, 핏, 계절, 소재, 나이, 스타일 등)를 이용 제품 검색    |
| 검색        | 제품 목록 표시            | 카드 형태로 제품 검색 결과 목록 표시                                        |
| 상세 정보    | 제품 정보                | 제품 상세 정보(이미지, 제품명, 가격, 리뷰 요약) 표시                        |
| 상세 정보    | 제품 리뷰                | 제품 상세 리뷰(별점, 후기, 리뷰 이미지) 표시                                |
| 상세 정보    | 제품 옷장에 추가        | 제품을 옷장(보유 제품 목록)에 추가                                        |
| 상세 정보    | 제품으로 새 코디 시작    | 제품을 선택한 채로 새로운 코디 만들기 시작                                |
| 카테고리    | 종류별 탐색            | 제품을 종류별 필터를 적용하여 검색                                        |
| 카테고리    | 브랜드 탐색            | 제품을 브랜드별 필터를 적용하여 검색                                        |
| 옷장        | 제품 종류별 표시        | 보유 제품 목록을 종류별로 표시                                            |
| 옷장        | 제품 추가                | 보유 제품 목록에 제품 추가                                                |
| 코디        | 새 코디 만들기            | 새로운 코디 만들기(보유 제품 이용) 시작                                    |
| 코디        | 저장한 코디 표시        | 이전에 만든 코디 목록 표시                                                |
| 코디        | 가상 피팅 표시            | 제품 착용 모습 미리 보기 표시                                                |
| 설정        | 계정 설정                | 사용자 계정(비밀번호) 설정                                                |
| 설정        | 사용자 정보 입력        | 사용자 정보(이름, 전화번호, 생일, 주소) 입력                                |
| 설정        | 사용자 정보 수정        | 사용자 정보(이름, 전화번호, 생일 주소) 수정                                |
| 설정        | 사용자 맞춤 정보 입력    | 사용자 맞춤 정보(성별, 사이즈, 스타일, 핏) 입력                            |
| 설정        | 사용자 맞춤 정보 수정    | 사용자 맞춤 정보(성별, 사이즈, 스타일, 핏) 수정                            |

## 프로젝트 실행

### 1. 요구 사항

#### Android application

- Android >= 7

#### Data server

- Node.js >= 14
- MySQL Community Server >= 8

### 2. 설치 방법

#### Android application

- emulator 또는 휴대 전화에서 실행

#### Data server

##### 필요 프로그램 설치

- Node.js
- MySQL Community Server

##### node.js 모듈 설치

- server 파일과 web 파일에서 각각
```text
npm install
```

##### 데이터베이스 설정

```mysql
create database gets;
create database session;
use gets;

create table user
(
  email         VARCHAR(64) PRIMARY KEY,
  pw            VARCHAR(32)  NOT NULL,
  name          NVARCHAR(16) NOT NULL,
  phone         VARCHAR(16),
  birthday      DATE,
  address       NVARCHAR(128),
  addressDetail NVARCHAR(128),
  gender        INT,
  height        INT,
  weight        INT,
  topSize       INT,
  bottomSize    INT,
  shoulder      INT,
  waist         INT,
  hip           INT,
  thigh         INT,
  style         INT
);

create table product
(
  id       INT PRIMARY KEY AUTO_INCREMENT,
  name     NVARCHAR(128) NOT NULL,
  brand    NVARCHAR(128) NOT NULL,
  code     NVARCHAR(64),
  gender   INT           NOT NULL,
  type     INT           NOT NULL,
  detail   INT           NOT NULL,
  color    INT           NOT NULL,
  fit      INT           NOT NULL,
  season   INT           NOT NULL,
  fiber    INT           NOT NULL,
  age      INT           NOT NULL,
  style    INT           NOT NULL,
  price    INT           NOT NULL,
  size     VARCHAR(128)  NOT NULL,
  image1ID VARCHAR(32)   NOT NULL,
  image2ID VARCHAR(32)   DEFAULT NULL,
  image3ID VARCHAR(32)   DEFAULT NULL
);

create table magazine(
  id           INT PRIMARY KEY AUTO_INCREMENT,
  title        VARCHAR(256) NOT NULL,
  keyword      VARCHAR(64) DEFAULT NULL,
  contents     VARCHAR(2048)    NOT NULL,
  imageID      VARCHAR(32)   DEFAULT NULL,
  styleTag     INT DEFAULT NULL
);

create table coordination
(
  id            INT PRIMARY KEY AUTO_INCREMENT,
  title         VARCHAR(64),
  outerID       INT,
  outerImageID  INT,
  topID         INT,
  topImageID    INT,
  bottomID      INT,
  bottomImageID INT,
  skirtID       INT,
  skirtImageID  INT,
  setID         INT,
  setImageID    INT,
  shoesID       INT,
  shoesImageID  INT,
  bagID         INT,
  bagImageID    INT,
  hatID         INT,
  hatImageID    INT,
  style         INT,
  gender        INT,
  age           INT,
  fit           INT,
  price         INT,
  weather       INT,
  imageID       VARCHAR(64)
);

create table favoriteProduct(
  userEmail   VARCHAR(64),
  productID   INT,
  PRIMARY KEY(userEmail,productID),
  FOREIGN KEY (userEmail) REFERENCES user (email) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (productID) REFERENCES product (id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table favoriteCoordination(
  userEmail   VARCHAR(64),
  coordinationID   INT,
  PRIMARY KEY(userEmail,coordinationID),
  FOREIGN KEY (userEmail) REFERENCES user (email) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (coordinationID) REFERENCES coordination (id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table article
(
  id          INT PRIMARY KEY AUTO_INCREMENT,
  name        NVARCHAR(128)  NOT NULL,
  tag         NVARCHAR(128)  NOT NULL,
  brand       NVARCHAR(128)  NOT NULL,
  description NVARCHAR(1024) NOT NULL
);

create table articleImage
(
  articleID INT,
  imageID   INT,
  PRIMARY KEY (articleID, imageID)
);
```

##### 서버 실행

- server 파일에서

```text
node ./bin/www
```

- web 파일에서

```text
node start
```

##### 서버 접속

메인페이지:
[http://localhost:4000](http://localhost:4000)  
API:
[http://localhost:3000/api](http://localhost:3000/api)

## 발표 자료

### 사업계획서

![plan1](./image/plan/1.png)
![plan2](./image/plan/2.png)
![plan3](./image/plan/3.png)
![plan4](./image/plan/4.png)
![plan4](./image/plan/5.png)
![plan4](./image/plan/6.png)
![plan4](./image/plan/7.png)
![plan4](./image/plan/8.png)
![plan4](./image/plan/9.png)
![plan4](./image/plan/10.png)


### 해커톤

![plan1](./image/hackathon/1.PNG)
![plan1](./image/hackathon/2.PNG)
![plan1](./image/hackathon/3.PNG)
![plan1](./image/hackathon/4.PNG)
![plan1](./image/hackathon/5.PNG)
![plan1](./image/hackathon/6.PNG)
![plan1](./image/hackathon/7.PNG)
![plan1](./image/hackathon/8.PNG)
![plan1](./image/hackathon/9.PNG)
![plan1](./image/hackathon/10.PNG)
![plan1](./image/hackathon/11.PNG)
![plan1](./image/hackathon/12.PNG)
![plan1](./image/hackathon/13.PNG)
![plan1](./image/hackathon/14.PNG)
![plan1](./image/hackathon/15.PNG)
![plan1](./image/hackathon/16.PNG)
![plan1](./image/hackathon/17.PNG)
![plan1](./image/hackathon/18.PNG)
![plan1](./image/hackathon/19.PNG)
![plan1](./image/hackathon/20.PNG)
![plan1](./image/hackathon/21.PNG)
![plan1](./image/hackathon/22.PNG)
![plan1](./image/hackathon/23.PNG)

