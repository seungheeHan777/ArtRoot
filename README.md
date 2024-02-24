## 프로젝트 개요

이 프로젝트는 전시회 추천을 위한 전시회 및 미술관 추천 웹 서비스 애플리케이션입니다. 
전시회 정보 제공과 유저의 전시회 취향 추천 기능 등을 제공하고 있습니다.
React 와 Express를 활용해서 개발했으며, DB는 MariaDB를 사용하고, 취향 추천 및 정보 수집 코드에는 Python 을 사용했습니다.
***

### 주요 기능

1. **전시회 검색**: 사용자는 특정 키워드를 입력하여 전시회를 검색할 수 있습니다.

2. **전시회 필터링**: 날짜, 장소, 카테고리 등 다양한 기준으로 전시회를 필터링할 수 있습니다.

3. **전시회 추천**: 사용자의 관심사와 이용 기록을 바탕으로 개인화된 전시회 추천을 제공합니다.
 
4. **사용자 인증**: 사용자는 회원가입 및 로그인을 통해 개인 설정과 추천 서비스를 이용할 수 있습니다.

5. **전시회 상세 정보**: 각 전시회에 대한 상세 정보 및 위치 정보를 제공합니다. Naver Map API를 통해 전시회의 위치를 지도 상에 표시합니다.
6. **관리자 기능**:
+ 유저 정보 수정 및 삭제
+ 전시회 정보 추가, 수정, 삭제
+ AI 학습에 사용하는 그림 추가

### 기술 스택
+ Frontend: React
+ Backend: Express
+ DB: MariaDB

### 프로젝트 구조
+ frontend: React 앱의 소스코드(src)
  + detail page: (src-pages)
+ backend: server-server.js
  + 각 기능 api : (server-lib-api 폴더 내)
  + databas 연결 : (server-lib-db.js)
+ ai : (ai)
  + ai 기능사용 : (ai-ai_module.py)
  + ai 학습 : learningAIModel.py


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
