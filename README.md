# 🎥 **Movie App**

## 1. 프로젝트 소개  
> **영화를 검색하고 정보를 확인할 수 있는 강력한 웹 애플리케이션**

- **목적**: 사용자가 쉽고 빠르게 영화를 검색하고 관련 정보를 확인할 수 있도록 제공  
- **주요 기능**:  
  - 🎬 인기 영화 리스트 확인  
  - 🔍 원하는 영화 검색 및 최근 검색 기록 확인  
  - 📱 **반응형 UI**: 모바일, 태블릿, 데스크톱에서 모두 최적화  
- **해결하는 문제**:  
  - 여러 플랫폼을 이용하지 않고, 하나의 앱에서 모든 영화 정보를 확인 가능  

---

## 2. 기술 스택  
> **이 프로젝트에서 사용된 기술과 도구들**  

| **종류**      | **사용 기술**                                                                                                           |
|---------------|-----------------------------------------------------------------------------------------------------------------------|
| **프레임워크** | <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white" alt="React" />       |
| **언어**       | <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white" alt="JS" />|
| **라이브러리** | <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" alt="Axios" /> <img src="https://img.shields.io/badge/Styled--components-DB7093?style=flat-square&logo=styled-components&logoColor=white" alt="Styled-components" />|
| **API 제공**   | <img src="https://img.shields.io/badge/TMDb-01D277?style=flat-square&logo=TheMovieDatabase&logoColor=white" alt="TMDb API" /> |

---

## 3. TMDb API  
> **TMDb(The Movie Database) API**를 사용하여 다양한 영화 정보를 제공  

- **API 출처**:  
  TMDb API를 통해 영화 데이터베이스에 있는 인기 영화, 검색 결과, 장르 정보 등을 가져옵니다.  
  - 출처: [TMDb API](https://www.themoviedb.org/documentation/api)  

### 아이콘
![TMDb](https://www.themoviedb.org/assets/2/v4/logos/stacked-blue-8c4d43b738109aa5b809ed055a85aa1d6d6535a2e3fc576f7332aa084224c377.svg)

---

## 4. 설치 가이드  

### **필수 조건**  
- Node.js >= 14.0 필요  

### **설치 명령어**
```sh
git clone https://github.com/hodu26/movie.git
cd movie
npm install
```

---

## 5. 실행 방법  

### **개발 환경 설정**
```sh
npm install
```

### **개발 서버 실행**
```sh
npm run start
```

### **빌드 방법**
```sh
npm run build
```

---

## 6. 프로젝트 구조
```tree
movie/
├── public/                # 정적 파일 (이미지, 아이콘 등)
├── src/
│   ├── api/               # API URL 설정 파일
│   ├── components/        # 재사용 가능한 UI 컴포넌트
│   ├── hooks/             # 훅 함수 및 사용자 인증 로직
│   ├── pages/             # 주요 페이지 구성
│   ├── redux/             # Redux 전역 상태 관리
│   │   ├── slices/        # Redux slice 파일들
│   ├── styles/            # 스타일 파일 (CSS, SCSS)
│   ├── utils/             # 유틸리티 함수
│   └── App.js             # 애플리케이션 진입점
├── package.json           # 프로젝트 설정 및 의존성 목록
└── README.md              # 프로젝트 설명 파일
```

---

## 7. 기능 상세 설명
- **검색 기능**: 사용자가 원하는 영화를 검색하고 검색 기록 저장
- **검색 기록**: 최근 검색어를 확인할 수 있는 기능 제공
- **반응형 UI**: 모바일, 태블릿, 데스크톱에 최적화된 화면 제공

---

## 8. 프로젝트 화면

### **1. 홈 화면**  
![홈 화면](https://github.com/user-attachments/assets/6c85e6d4-7b88-434c-8ff4-1a09a2e82f5f)

### **2. 대세 콘텐츠 화면**
#### 그리드 뷰
![대세 콘텐츠 - 그리드](https://github.com/user-attachments/assets/c0696c81-ba08-408e-876d-d8aa8ac1755d)
#### 테이블 뷰
![대세 콘텐츠 - 테이블](https://github.com/user-attachments/assets/d4d42159-b6e9-4a2e-af95-907203b70901)


### **3. 찾아보기 화면**
#### 상세 검색 (테이블)
![찾아보기 - 상세검색](https://github.com/user-attachments/assets/99ebedf1-8755-4f33-9712-08faae7414db)
#### 검색 결과 (그리드)
![찾아보기 - 검색결과](https://github.com/user-attachments/assets/5c0aa5f4-9c0c-4f95-ae92-156bdf631ad5)

### **4. 위시리스트 화면**
#### 그리드 뷰 (성인 O)
![위시리스트 - 그리드](https://github.com/user-attachments/assets/5f7f0399-1045-4f92-b9e6-9f95430309f5)
#### 테이블 뷰 (성인 X)
![위시리스트 - 테이블](https://github.com/user-attachments/assets/29f003e5-356a-4a57-9d2c-69a14f015bdc)

### **Mobile**
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/77b057b4-626d-4850-bc92-4d1b2a0e2088" alt="모바일 - 홈" width="200" /></td>
    <td><img src="https://github.com/user-attachments/assets/f11b06bc-898f-4b37-9be1-983855302fda" alt="모바일 - 사이드 메뉴" width="200" /></td>
    <td><img src="https://github.com/user-attachments/assets/b28089b8-7fad-4ac0-8f6f-2a29d3f364ae" alt="모바일 - 그리드" width="200" /></td>
    <td><img src="https://github.com/user-attachments/assets/877da166-5371-4ec4-96d0-a17beadf0541" alt="모바일 - 테이블" width="200" /></td>
    <td><img src="https://github.com/user-attachments/assets/c527df75-e70b-4e2d-8aa1-4663598a2b23" alt="모바일 - 검색" width="200" /></td>
    <td><img src="https://github.com/user-attachments/assets/05a89c0b-fd89-4252-8443-210a3c27e437" alt="모바일 - 위시리스트" width="200" /></td>
  </tr>
</table>

---

## 9. TMDb API 사용 예시
### TMDB API 코드 예제
```js
import { useSelector, useDispatch } from 'react-redux';
import { fetchGenres } from '../redux/slices/genreSlice';
import { fetchMovies } from '../redux/slices/movieSlice';

...
// 장르 정보 및 영화 정보 가져오기
const dispatch = useDispatch();
const { genres } = useSelector((state) => state.genres);
const { movies, page, totalPages } = useSelector((state) => state.movies);

...

const fetchMovies = () => {
  dispatch(fetchMovies({ tag: 'popular', page: page + 1 }));
};

...
```

---

## 10. 추가 정보  

- **문의**: hodu26@example.com  
- **향후 계획**:  
  - 사용자 맞춤형 추천 알고리즘 추가  
  - 리뷰 및 평점 기능 제공  

- **라이선스**:  
  이 프로젝트는 MIT 라이선스를 따릅니다.  

--- 

### **참고 자료**  
- [TMDb API 문서](https://www.themoviedb.org/documentation/api)  
- [React 공식 사이트](https://reactjs.org/)  
- **참고** : Netflix
