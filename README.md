GD-for-Kakao-Bot
================

MessengerBot R 에서 사용가능한 Geometry Dash 모듈입니다.
몇가지 준비해야 될 사항들이 있습니다.
아래 절차를 따라주세요.

Before using this..
===================

아래 절차를 꼼꼼히 읽어주세요.

<br>

> 1. __다운로드__

![썸네일](/Images-for-readme/1.PNG)

__Download ZIP__ 버튼을 눌러 다운로드 하세요.

만약 저 아이콘이 보이지 않는다면 [이곳](https://github.com/DenFade/GD-for-Kakao-Bot/archive/master.zip) 을 눌러 다운로드 하세요.

다운로드를 완료하셨다면 압축을 풀어주세요.

<br>

> 2. __폴더이동__

<br>

압축을 푸셨다면 GD-for-Kakao-Bot/global_modules 폴더에 들어가보세요.

gd, log 라는 두 폴더가 있을껍니다. 두 폴더를 선택후 MessengerBot R의 global_modules 폴더로 이동시켜주세요.

<br>

> 3. __setting.js 파일 생성__

<br>

MessengerBot R의 global_modules폴더에 gd, log폴더를 옮기셨다면, log폴더에 들어가주세요. _Logger.js_ 이외에 아무것도 없을껍니다.

log폴더 내부에 들어가셨다면, 그안에 _logs_ 라는 이름의 폴더를 생성해주시고, 생성한 _logs_ 폴더에 들어가주세요.

들어오셨다면, 그안에 _setting.js_ 라는 파일을 생성해주시고, 파일 내부에

```js
exports.dir = " /*MessengerBot R전용폴더 이름*/ ";
```
라는 내용으로 작성해주세요.

예시를 들자면, 저는 
> storage/emulated/0/__scripts__/global_modules/plugins/log/logs/setting.js

이런식으로 __scripts__ 라는 폴더를 MessengerBot R 전용폴더로 지정 해두었습니다.

그러면 _setting.js_ 파일에
```js
exports.dir = "scripts";
```
이런식으로 그 파일명을 적으면 됩니다.

만약 내부저장소 자체를 MessengerBot R 전용폴더로 지정하셨다면
```js
exports.dir = "";
```
이런식으로 빈문자를 넣으면 됩니다.

<br>

---

이제 준비는 끝났습니다 :)

이제 한번 사용해볼까요?

