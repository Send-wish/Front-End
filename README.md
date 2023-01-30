## Front-End
RN for sandwish Project
## 설치법
## 설치하기 전 [공식문서](https://reactnative.dev/docs/environment-setup)의 RN CLI 설치에 필요한 것들(watchman,ruby 등등)을 설치해야 합니다.
1. `git clone https://github.com/Send-wish/Front-End.git`으로 dir 생성
2. 해당 dir에서 `npm install --force`로 node_modules 설치
3. 해당 dir에서 `cd ios`한 뒤,`pod install`
4. 원래 dir로 돌아온뒤, 하나의 터미널에는 `npx react-native run-ios`로 Xcode 시뮬레이터를 또 다른 하나에는 `npx react-native start`로 로깅용 watchman을 실행시킵니다.

### npm install 주의 사항
- npm insatll 시 항상 `--save` 옵션을 붙어주여야,RN과 해당 모듈이 링킹이 됩니다.


## 데모 및 시연 영상

### 화면 구성
https://user-images.githubusercontent.com/109953972/215483643-61415d53-f601-44b3-a9de-859305fbfc67.mov

### 쇼핑몰에서 아이템 담아오기
https://user-images.githubusercontent.com/109953972/215481524-7640c2ea-ccd6-4a86-a253-4d61ebfd1f8a.MP4

### 장바구니 만들고 아이템 담기
https://user-images.githubusercontent.com/109953972/215481579-ef7f1ff1-1c59-4954-bc08-acfbd0d9d5cd.MP4

### 공유 장바구니에서 친구와 소통하고 친구 취향 알아보기
https://user-images.githubusercontent.com/109953972/215481637-d6ebc7fb-e9af-41bd-88e7-eb3da4bd7d88.MP4

### 채팅에서 아이템 확인하기
https://user-images.githubusercontent.com/109953972/215481790-05384474-8eb1-4e6c-b965-e9d67e0cb90f.MP4

### 채팅방에서 투표하기
https://user-images.githubusercontent.com/109953972/215481852-9073cdd7-6854-4e70-8303-adb57099f400.MP4


