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
저희 서비스는 개인 장바구니, 공유 장바구니, 친구를 추가하고 채팅목록을 확인 할 수 있는 3개의 탭으로 구성되어 있습니다.
<br>

https://user-images.githubusercontent.com/109953972/215483643-61415d53-f601-44b3-a9de-859305fbfc67.mov 

### 쇼핑몰에서 아이템 담아오기
앱이 꺼져있을 때나, 백 그라운드 상태일 때에도 다른 쇼핑몰 앱내에서 공유하기 버튼 하나만으로 쉽게 상품정보를 앱으로 담아올 수 있습니다.<br>
IOS의 Share-Extension을 커스터마이징하여 공유하기 모달 창을 직관적으로 변경하고, 서버와 통신할 수 있도록 만들었습니다.
<br>
https://user-images.githubusercontent.com/109953972/215481524-7640c2ea-ccd6-4a86-a253-4d61ebfd1f8a.MP4

### 장바구니 만들고 아이템 담기
목적이 각기 다른 장바구니들을 만들고 담아온 아이템을 쉽게 담아 분류하여 관리할 수 있습니다.
<br>
https://user-images.githubusercontent.com/109953972/215481579-ef7f1ff1-1c59-4954-bc08-acfbd0d9d5cd.MP4

### 공유 장바구니에서 친구와 소통하고 친구 취향 알아보기
쇼핑의 목적이 동일한 의사결정자들과 같은 장바구니를 공유하고 채팅을 통하여 각자 담은 아이템을 확인하며, 소통할 수 있습니다. <br>
선물을 받는 친구가 존재한다면, 친구가 담은 아이템들의 카테고리를 자체적으로 분석하여 어떤 아이템을 선호할지 추천하는 시스템을 구현하였습니다. <br>
이미지 학습 AI모델인 TenseorFlower을 사전학습 시키고 활용해 상품이미지에 맞는 카테고리를 자동적으로 생성할 수 있습니다. 
<br>
https://user-images.githubusercontent.com/109953972/215481637-d6ebc7fb-e9af-41bd-88e7-eb3da4bd7d88.MP4

### 채팅에서 아이템 확인하기
다른 메신저들과 다르게, 각자 담은 아이템을 한 눈에 모아서 보여주기 때문에 훨씬 의사결정을 손쉽게 할 수 있습니다.
<br>
https://user-images.githubusercontent.com/109953972/215481790-05384474-8eb1-4e6c-b965-e9d67e0cb90f.MP4

### 채팅방에서 투표하기
개인이 하는 쇼핑과 다르게, 그룹이 하는 쇼핑에서는 동시간대에 다 같이 의사결정하는 프로세스가 부족한 면이 있습니다.<br>
저희는 이러한 불편함을 해결할 수 있도록 다 같이 어떤 아이템이 좋은지 투표하고 1, 2, 3순위의 최종 후보군을 도출할 수 있도록 설계하였습니다.<br>
이는 WebSocket 패키지 중 하나인 Stomp를 활용해 구현하였으며, 아이템을 눌러 외부쇼핑몰로 이동해 바로 구매가능하도록 하였습니다.
<br>
https://user-images.githubusercontent.com/109953972/215481852-9073cdd7-6854-4e70-8303-adb57099f400.MP4


