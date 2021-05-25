# Gets

## 프로젝트 개요

### 1. 패션 플랫폼

### 2. 구현 예정 사항

#### Android application

- 홈
    - 스타일 추천
    - 미리 보기
- 카테고리
    - 종류별 탐색
    - 상세 검색
    - 제품 정보
    - 제품 리뷰
- 옷장
    - 내 옷 종류별 표시
    - 좋아요 선택 옷 종류별 표시
- 코디
    - 사용자 정의 코디
- 설정
    - 계정 설정
    - 정보 수정
- 계정
    - 로그인
    - 회원 가입
    - 상세 정보 입력

#### Data server

- 제품
- 사용자 정보

#### Web application

- android 및 서버 개발 이후 진행

### 3. 개발 진행 사항
#### 주요 개발 일정
|항목                           |시작      |종료      |진행 |
|------------------------------|----------|----------|-----|
|제공 서비스 선별/확립            |2021/05/03|2021/05/07|완료|
|안드로이드 레이아웃 설계          |2021/05/07|2021/05/21|완료|
|의류 데이터 수집                |2021/05/14|2021/05/28|진행|
|데이터 서버 설계               |2021/05/14|2021/05/21|완료|
|데이터베이스 설계                |2021/05/14|2021/05/24|완료|
|사업계획서 작성                 |2021/05/24|2021/06/04|진행|
|안드로이드 레이아웃 제작          |-|-|예정|
|데이터 서버 제작                 |-|-|예정|
|데이터베이스 제작                 |-|-|예정|
|안드로이드 제공 서비스 제작        |-|-|예정|
|웹 레이아웃 설계                 |-|-|예정|
|웹 레이아웃 제작                 |-|-|예정|
|웹 제공 서비스 제작              |-|-|예정|
|착수 보고                        |2021/07/09|2021/07/09|예정|
|중간 보고                        |2021/08/06|2021/08/06|예정|
|최종 보고 및 창업                 |2021/09/03|2021/09/03|예정|
|포스터 제작 및 발표                |2021/09/09|2021/09/10|예정|
|최종 발표                        |2021/09/11|2021/09/11|예정|

## 프로젝트 실행

### 1. 요구 사항

#### Android application

- Android >= 7

#### Data server

- Node.js >= 14
- MySQL Community Server >= 8

### 2. 설치 방법

#### Android application

- 요구 사항을 만족하는 emulator

#### Data server

##### 필요 프로그램 설치

- Node.js
- MySQL Community Server

##### node.js 모듈 설치

```text
npm install
```

##### 데이터베이스 설정

```mysql
create database gets;
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
    gender        CHAR(1),
    height        INT,
    weight        INT,
    topSize       INT,
    bottomSize    INT,
    style         INT,
    fit           INT
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
    image1ID INT           NOT NULL,
    image2ID INT DEFAULT NULL,
    image3ID INT DEFAULT NULL
);

create table review
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    userEmail VARCHAR(64),
    productID INT           NOT NULL,
    star      INT           NOT NULL,
    contents  VARCHAR(2048) NOT NULL,
    date      DATE          NOT NULL DEFAULT (current_date),
    image1ID  INT           NOT NULL,
    image2ID  INT                    DEFAULT NULL,
    image3ID  INT                    DEFAULT NULL,
    FOREIGN KEY (userEmail) REFERENCES user (email) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (productID) REFERENCES product (id) ON UPDATE CASCADE ON DELETE CASCADE
);
```

##### 서버 실행

server 파일에서

```text
node ./bin/www
```

##### 서버 접속

메인페이지:
[http://localhost:3000](http://localhost:3000)  
API:
[http://localhost:3000/api](http://localhost:3000/api)

## 계획안

![plan1](./data/plan/1.png)
![plan2](./data/plan/2.png)
![plan3](./data/plan/3.png)
![plan4](./data/plan/4.png)