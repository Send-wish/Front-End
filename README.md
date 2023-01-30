# Front-End
RN for sandwish Project
## 설치법
### 설치하기 전 [공식문서](https://reactnative.dev/docs/environment-setup)의 RN CLI 설치에 필요한 것들(watchman,ruby 등등)을 설치해야 합니다.
1. `git clone https://github.com/Send-wish/Front-End.git`으로 dir 생성
2. 해당 dir에서 `npm install --force`로 node_modules 설치
3. 해당 dir에서 `cd ios`한 뒤,`pod install`
4. 원래 dir로 돌아온뒤, 하나의 터미널에는 `npx react-native run-ios`로 Xcode 시뮬레이터를 또 다른 하나에는 `npx react-native start`로 로깅용 watchman을 실행시킵니다.

### npm install 주의 사항
- npm insatll 시 항상 `--save` 옵션을 붙어주여야,RN과 해당 모듈이 링킹이 됩니다.
### 데모 및 시연 영상 <a href="https://www.youtube.com/watch?v=kKdQTMBP7dQ">(바로가기)<a>



![SendWish](https://user-images.githubusercontent.com/109953972/215467054-c11c8b96-e085-403f-8047-ef7daeeaadb8.jpg)
