# ARTROOT

# 목차
- [프로젝트 개요](#프로젝트-개요)
  - [1.1 프로젝트 필요성](#---1.1-프로젝트-필요성)
  - [1.2 서비스 대상](#1.2-서비스-대상)
  - [1.3 담당 업무](#13-담당-업무)
- [프로젝트 구성](#프로젝트-구성)
  - [1. 기술 스택](#1-기술-스택)
  - [2. 시스템 아키텍처](#2-시스템-아키텍처)
  - [3. API 명세서](#3-api-명세서)
- [프로젝트 수행과정 및 결과](#프로젝트-수행과정-및-결과)
  - [1. 수행 과정](#1-수행-과정)
  - [2. 결과](#2-결과)
  - [3. 개선해야 할 점](#3-개선해야-할-점)
 
    
- [프로젝트 후기](#프로젝트-후기)
## 프로젝트 개요

### 🎯 1.1 프로젝트 필요성

현재 전시회 정보는 각 미술관, 박물관별로 분산되어 있어 사용자가 원하는 전시회를 찾기 위해서는 여러 사이트를 일일이 확인해야 하는 불편함이 있습니다.  
또한 전시회에 관심은 있지만 어떤 전시회를 관람해야 할지 모르는 사용자들에게는 **개인의 취향에 맞는 전시회를 추천받을 수 있는 서비스**가 필요합니다.  

이러한 문제점을 해결하기 위해 다양한 전시장의 정보를 한 곳에서 확인하고, **AI 기반 추천 알고리즘**을 통해 개인 맞춤형 전시회를 추천받을 수 있는 **통합 플랫폼**의 필요성이 대두되었습니다.

    ### 🎯 개발 목표
    
    PC 환경에서 **미술관, 박물관 등 전시장에서 열리는 전시회**를 효과적으로 추천하는 웹 서비스를 개발합니다.
    
    - ✨ **사용자 중심 설계**: 편의성과 접근성을 최우선으로 한 직관적인 UI/UX  
    - 🤖 **AI 기반 추천**: 개인 맞춤형 추천 시스템을 통한 사용자 경험 극대화  
    - 🛠️ **효율적인 관리**: 관리자를 위한 직관적인 백오피스 구축  
    - 📊 **통합 관리**: 사용자, 전시회 정보, 일정, 할인 정보 통합 관리

---

### 👥 1.2 서비스 대상

#### 🎯 주요 타겟
- 전시회에 관심이 많고 정기적으로 관람하는 사용자  
- 미술관, 박물관 등 전시회 정보를 효율적으로 찾고자 하는 사용자  

#### 🌟 부가 타겟
- 전시회에 대한 지식은 부족하지만 문화 활동에 관심이 있는 초보자  
- 개인 취향에 맞는 전시회를 추천받고 싶은 사용자  
- 전시회 할인 정보와 일정 관리가 필요한 사용자  

---

### 👨‍💻 1.3 담당 업무

| 이름 | 역할 | 주요 개발 기능 |
|------|------|----------------|
| **김민수** |  팀장 | - 프로젝트 및 팀원 관리<br>- 서버 설계 및 구현<br>- DB 설계 및 구축<br>- 웹 크롤링 기능 구현<br>- AI 모델 학습 및 구축<br>- 메인 홈페이지 및 전시회 검색 기능 구현<br>- CSS 스타일링 |
| **한승희** |  팀원 | - 로그인/로그아웃<br>- 회원 정보 수정 및 관리<br>- 배경 지식 기능<br>- 관리자 페이지 구현<br>- 추천 알고리즘 구현<br>- 코드 통합 및 DB 구축<br>- 네이버 맵API를 이용한 전시회 위치 기능<br>- AI 웹 서버 연동 |
| **신재훈** |  팀원 | - 메인 홈페이지 구현<br>- 커뮤니티 기능<br>- 캘린더 및 평점 기능<br>- 할인 정보 및 전시회 정보 구현<br>- 전시 데이터 및 DB 설계 및 구축 <br>- CSS 스타일링 |

---


## 프로젝트 구성
### 1. 기술 스택


| 구분         | 상세 내용                                  |
|--------------|---------------------------------------------|
| **Frontend** | JavaScript, React                           |
| **Backend**  | Node.js, Express |
| **AI**   | Python, TensorFlow           |
| **Database** | MariaDB                                     |
| **개발 도구** | VSCode, GitHub                             |

### 2. 시스템 아키텍처
#### ▸ 시퀀스 다이어그램
![image](https://github.com/user-attachments/assets/431c0130-6b01-47af-a892-2668ae945844)

#### ▸ 데이터베이스 구조
![image](https://github.com/user-attachments/assets/348b43ea-4d4f-4aec-a2ac-18b04a617af6)


### 3. API 명세서
####  Admin REST API 명세서

| Method | Endpoint                 | 설명               |
| ------ | ------------------------ | ---------------- |
| GET    | `/admin/users`           | 전체 사용자 목록 조회     |
| POST   | `/admin/update`          | 사용자 정보 수정        |
| DELETE | `/admin/deleteUser/:id`  | 사용자 삭제           |
| GET    | `/admin/exhibitions`     | 전체 전시회 목록 조회     |
| POST   | `/admin/exhibitionss`    | 전시회 추가 |
| PUT    | `/admin/exhibitions/:id` | 전시회 정보 수정        |
| DELETE | `/admin/exhibitions/:id` | 전시회 삭제           |
| GET    | `/admin/eximages/:id`    | 전시회 이미지 조회       |
| POST   | `/admin/cw`              | 크롤링한 전시회 데이터 저장  |

#### AI 관련 REST API 명세서

| Method | Endpoint                              | 설명                          |
| ------ | ------------------------------------- | --------------------------- |
| GET    | `/ai/predicted?imagePath=?` | 이미지 경로를 기반으로 AI 예측 수행       |
| POST   | `/ai/savestyle/user`                  | 유저 스타일 정보 저장                |
| POST   | `/ai/savestyle/exhibition`            | 전시회 스타일 정보 저장               |
| GET    | `/ai/:username`                       | 유저 취향에 맞는 전시회를 가져오기            |
| POST   | `/ai/saveImageData`                   | 이미지 및 라벨 데이터 저장 및 모델 재학습 수행 |

#### Auth 관련 Rest API 명세서

| Method | Endpoint | 설명 |
|--------|------|------|
| POST | `/auth/SignUp` | 사용자 회원가입 |
| POST | `/auth/LogIn` | 사용자 로그인 및 세션 생성 |
| POST | `/auth/Logout` | 사용자 로그아웃 및 세션 종료 |
| POST | `/auth/findPW` | 비밀번호 찾기 |
| POST | `/auth/findID` | 아이디 찾기 |
| GET | `/auth/mypage` | 현재 사용자 정보 조회 |
| PUT | `/auth/update` | 사용자 정보 수정|
| DELETE | `/auth/deleteAccount` | 계정 탈퇴 |
| GET | `/auth/myone` | 현재 사용자 한줄평 정보 조회 |
| POST | `/auth/updateOne` | 한줄평 정보 수정 |
| POST | `/auth/question` | 문의사항 등록 |

#### 전시회 관련 Rest API 명세서

| Method | Endpoint                                     | 설명                       |
| ------ | -------------------------------------------- | ------------------------ |
| GET    | `/ex/allexhibitions`                 | 전체 전시회 목록 조회             |
| GET    | `/ex/exhibitiondetail/:id`           | 특정 전시회 상세 정보 조회          |
| GET    | `/ex/ExhibitionSearchList?query=검색어` | 전시회 이름 또는 키워드로 검색        |
| GET    | `/ex/random`                         | 랜덤 전시회 조회             |
| GET    | `/ex/rating/:id`                     | 특정 전시회에 대한 별점 및 한줄평 조회   |
| POST   | `/ex/submitRating`                   | 전시회에 대한 별점 및 한줄평 등록      |
| GET    | `/ex/all`                            | 모든 한줄평 및 별점 리스트 조회       |
| DELETE | `/ex/Ratings/:ONE_USER/:ONE_ARTNUM`  | 특정 사용자의 특정 전시에 대한 한줄평 삭제 |
| GET    | `/ex/DiscountExhibitions`            | 할인 전시회 목록 조회             |
| GET    | `/ex/exhibitionrate/:id`             | 특정 전시회의 별점 리스트 조회        |

#### 취향 추천에 사용되는 요소 관련 Rest API 명세서

| Method | Endpoint                     | 설명                                                     |
| ------ | ---------------------------- | ------------------------------------------------------ |
| GET    | `/keyword/admin/keywords`            | 관리자 키워드 전체 조회                                          |
| GET    | `/keyword/admin/categories`          | 관리자 카테고리 전체 조회                                         |
| DELETE | `/keyword/admin/deletecategories`    | 관리자 카테고리 여러 개 삭제               |
| POST   | `/keyword/admin/addcategory`         | 관리자 카테고리 추가           |
| POST   | `/keyword/admin/addimage`            | 관리자 이미지 추가 |
| GET    | `/keyword/admin/getExkeyword`        | 특정 전시회의 키워드 조회                                      |
| POST   | `/keyword/admin/exhibition_keywords` | 전시회-키워드 관계 데이터 추가      |
| DELETE | `/keyword/admin/exhibition_keywords` | 전시회-키워드 관계 데이터 삭제      |
| POST   | `/keyword/user/saveCategories` | 유저 취향 저장      |
| GET    | `/keyword/user/updateCategory/:username`        | 유저의  선호 카테고리 조회 |
| GET    | `/keyword/user/updateImage/:username`        | 유저의  선호 이미지 조회 |
| GET    | `/keyword/ex/addkeyword`        | 전시회 키워드 추가 |



#### 미술관 위치 관련 Rest API 명세서

| Method | Endpoint                | 설명                    |
| ------ | ----------------------- | --------------------- |
| GET    | `/museum/getMuseumCoordinates` | 미술관 이름으로 좌표 조회 |



## 프로젝트 수행과정 및 결과
### 1. 수행 과정
설명 작성 예정

### 2. 결과
설명 작성 예정

### 3. 개선해야 할 점

DB에 비밀번호를 저장할 때, 암호화된 비밀번호를 저장해서 보안에 조금 더 신경을 써야겠다.

최적화로 속도 개선과 코드 리팩토링 필요

AI 학습과정과 데이터 전송 과정에서 속도 개선 필요



## 프로젝트 후기
설명 작성 예정
