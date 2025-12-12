# Webdev Levtor 2025
## 학번 : 20222253 
## 이름 : parkinhyung
CSS의 box-model에서 '바깥 여백'과 '안쪽 여백'을 설정하는 속성(property)은 각각 무엇인지 순서대로 쓰시오. 
margin (바깥 여백)padding (안쪽 여백)
수업에서 코드 관리, 버전 관리 및 과제 제출을 위해 사용을 강조한 플랫폼의 이름은 무엇인지 쓰시오. 
github
JavaScript에서 id를 이용하여 특정 HTML 요소를 선택할 때 사용하는 함수는 무엇인지 쓰시오.
document.getElementById()
CSS에서 너비(width)와 높이(height)가 100px인 정사각형 요소를 완전한 원으로 만들기 위해 사용해야 하는 속성(property)과 값(value)은 무엇인지 쓰시오. 
정답은 border-radius 속성에 값으로 **50%**를 설정하는 것입니다.
HTML <input> 요소에 type="range" 속성을 사용하여 만들 수 있는 컨트롤의 이름은 무엇인지 한글로 쓰시오.
정답은 슬라이더 (Slider)입니다.
강의 자료 1강에서는 GitHub를 '강호(江湖)'에 비유하며 그 중요성을 강조했습니다. 이 수업에서 GitHub가 왜 중요한지 서술하고, GitHub Pages를 이용하여 자신의 웹 페이지를 인터넷에 배포하는 과정을 설명하시오. 
생성한 리포지토리 상단 메뉴 중 [Settings] 탭을 클릭합니다.
왼쪽 사이드바 메뉴에서 **[Pages]**를 클릭합니다.
Build and deployment 섹션의 Branch 항목을 찾습니다.
None으로 되어 있는 부분을 main (또는 master)으로 변경하고, 옆의 폴더는 /(root) 그대로 둔 뒤 **[Save]**를 클릭합니다.
4단계: 배포 확인
설정 상단에 "GitHub Pages source saved."라는 알림과 함께 잠시 후 사이트 주소가 생성됩니다.
주소 형식: https://[내아이디].github.io/[저장소이름]/
해당 주소를 클릭하면 내가 만든 웹 페이지가 인터넷에 배포된 것을 확인할 수 있습니다.
CSS의 margin과 padding 속성의 차이점을 설명하고, 언제 각각을 사용해야 하는지 강의 자료의 예시를 바탕으로 설명하시오. 
padding:내용물이 답답해 보이지 않게 하고 싶을 때 margin다른 요소와 거리를 벌리고 싶을 때
Margin (바깥 여백)	Padding (안쪽 여백)
위치	테두리(Border)의 바깥쪽	테두리(Border)의 안쪽
배경색(Background)	적용되지 않음 (투명)	요소의 배경색이 함께 적용됨
영향	요소와 외부 요소 사이의 거리 벌림	요소의 **크기(내부 부피)**가 커짐
강의 자료 2강의 '라디오 버튼' 예제 코드를 보고, JavaScript 코드 document.querySelector('input[name="fruit"]:checked').value가 어떻게 여러 개의 라디오 버튼 중 선택된 하나의 값만을 가져올 수 있는지 그 원리를 단계별로 서술하시오. 
"전체 문서(document)에서 이름이 'fruit'인 입력창들(input[name="fruit"]) 중에, 지금 체크 표시가 된 녀석(:checked)을 하나 찾아서(querySelector), 그 녀석이 가진 값(.value)을 내놔.
HTML <input> 태그에 사용자가 입력한 값을 JavaScript로 가져올 때 사용하는 속성(property)은 무엇인지 쓰시오. 
답value
CSS 스타일을 HTML 문서 내부에 직접 작성하기 위해 사용하는 태그의 이름은 무엇이며, 이 태그는 일반적으로 HTML 문서의 <head>와 <body> 중 어디에 위치하는지 순서대로 쓰시오.
태그 이름: <style> 위치: <head> 태그 내부
사용자가 웹 페이지의 버튼을 클릭했을 때, 특정 텍스트 입력창 (<input type="text">)에 입력된 값을 가져와 화면에 표시하는 전체 과정을 단계별로 설명하시오. 반드시 document.getElementById(), addEventListener(), .value, .textContent 키워드를 모두 사용하여 서술하시오.
먼저 HTML 문서에 필요한 세 가지 요소를 만들고, 자바스크립트가 찾을 수 있도록 각각 고유한 id를 부여합니다.
자바스크립트에서 조작할 HTML 요소들을 변수로 가져옵니다. 이때 document.getElementById() 메서드를 사용합니다.
버튼이 클릭되었을 때 특정 동작을 하도록 addEventListener() 메서드를 사용하여 '클릭 이벤트'를 등록합니다.
이벤트가 발생했을 때(버튼을 눌렀을 때) .value, .textContent이용하여 실행될 실제 로직을 작성합니다.

실습 문제
카운터 문제
계산기 문제
열차표 예약 문제

기말고사

git branch 에 대해서 설명하시오.
Git Branch(브랜치)**는 한마디로 '독립적인 작업 공간' 또는 **'평행우주'**를 만드는 기능입니다.
원본 코드(main)를 건드리지 않고, 새로운 기능을 개발하거나 버그를 수정할 때 코드를 복사해 따로 작업하는 공간을 의미합니다
git 의 pull request에 대해서 설명하시오.
Pull Request(풀 리퀘스트), 줄여서 PR은 GitHub와 같은 원격 저장소 서비스에서 사용하는 기능으로, **"내가 작업한 코드를 원본(Main)에 합쳐달라고 요청하는 편지"**입니다
github page만드는 법에 대해서 설명하세요.
저장소 생성: GitHub에서 New Repository를 클릭하여 Public(공개) 저장소를 만듭니다.
파일 준비: 메인 페이지 파일의 이름은 반드시 **index.html**이어야 합니다.
코드 업로드: 준비한 파일들을 저장소에 올립니다. (git push 또는 Upload files)
설정 활성화: 저장소의 [Settings] > [Pages] 메뉴로 이동하여, Branch를 main (또는 master)으로 변경하고 Save를 누릅니다.
flex를 사용하여 화면 중앙에 문장(학번 이름)을 배치 하시오. (단 동적으로 화면에 반응해야함)
<style>
        /* 1. 기본 여백 제거 (브라우저 기본 스타일 초기화) */
        body {
            margin: 0;
            padding: 0;
        }

        /* 2. 부모 컨테이너 설정 */
        .container {
            /* 핵심: Flexbox 활성화 */
            display: flex;

            /* 가로축(Main Axis) 중앙 정렬 */
            justify-content: center;

            /* 세로축(Cross Axis) 중앙 정렬 */
            align-items: center;

            /* 높이 설정: 화면 전체 높이(100vh)를 차지해야 세로 중앙이 됨 */
            height: 100vh;
flex에 대해서 최대한 상세 하게 설명하세요.
Flexbox는 **'부모(Container)'**가 **'자식(Item)'**들을 통제하는 시스템입니다.부모: display: flex;를 선언하여 시스템을 가동합니다.자식: 부모의 명령에 따라 줄을 서거나 크기가 변합니다.2. 방향과 정렬 (십자가 법칙)두 개의 축(Axis)을 기준으로 정렬합니다. **"주축(Main)"**과 **"교차축(Cross)"**만 기억하세요.구분설명담당 속성 (부모)주축 (Main Axis)진행 방향 (보통 가로)justify-content (좌우 정렬)교차축 (Cross Axis)수직 방향 (보통 세로)align-items (상하 정렬)※ flex-direction: column(세로 배치)을 쓰면 주축과 교차축이 반대로 바뀝니다.3. 📏 크기 조절 (자식 속성)자식 요소가 남는 공간을 어떻게 차지할지 결정합니다.flex: 1; : "빈 공간을 꽉 채워라" (가장 많이 씀)flex-wrap: wrap; (부모 속성): "공간이 부족하면 줄 바꿈을 해라"
css , html ,js  관계를 설명하세요
.HTML (HyperText Markup Language): 웹 페이지의 **'구조와 의미(Semantics)'**를 정의하는 마크업 언어이다. 제목, 문단, 목록, 입력 양식 등 정보의 위계와 뼈대를 구축하여 브라우저가 콘텐츠를 인식할 수 있도록 한다. (구조적 계층)

CSS (Cascading Style Sheets): HTML 요소의 **'시각적 표현(Presentation)'**을 담당하는 스타일 시트 언어이다. 레이아웃, 색상, 타이포그래피, 반응형 디자인 등을 정의하여 사용자에게 직관적인 UI(User Interface)를 제공한다. (표현적 계층)

JavaScript: 웹 페이지의 **'동적 기능(Behavior)'**과 **'상호작용(Interaction)'**을 제어하는 프로그래밍 언어이다. DOM(Document Object Model)을 통해 HTML 요소와 CSS 스타일을 실시간으로 조작하고, 사용자의 이벤트 처리 및 서버와의 비동기 통신 등을 수행한다. (기능적 계층)