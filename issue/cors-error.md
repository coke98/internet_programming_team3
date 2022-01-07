# CORS Error

API 사용 중 다음과 같은 에러를 표시하며 정상적으로 데이터를 불러올 수 없는 경우가 발생했다.&#x20;

![](<../.gitbook/assets/image (4).png>)

CORS와 관련된 에러를 찾아보니 SOP(Same-Origin Policy)에 의해 동일한 도메인이 아닐 경우, 보안상의 위협을 막기 위해 데이터를 참조할 수 없도록 하였던 것에 이유가 있었다.

&#x20;

현재 사이트의 경우 API 서버로부터 데이터를 받아오게 되는데 우리의 사이트와 서버의 도메인이 다르다 보니 데이터를 불러올 수 없게 된 것이다.

&#x20;

이를 해결하기 위해서는 Cross-Origin 즉 다른 도메인 주소로의 참조가 가능하도록 CORS(Cross-Origin Resource Sharing)를 허용해주어야 한다.

&#x20;

스프링과 같은 백엔드 서버를 두었을 때, 간단히 CORS 등록을 함으로써 허용을 할 수 있지만, 프론트엔드만을 사용하는 이번 프로젝트에서는 다른 방법이 필요했다.



위와 같이 cors-anywhere라는 프록시 서버 소스를 깃허브에 fork하고 heroku서버에 호스팅하여 [https://cors-jhs.herokuapp.com](https://cors-jhs.herokuapp.com) 와 같은 프록시 서버를 개설하였다.

&#x20;

“[https://cors-jhs.herokuapp.com](https://cors-jhs.herokuapp.com)/참조하고자하는 주소”

&#x20;

의 형식으로 데이터를 호출하면 사이트에 CORS가 허용된 상태로 데이터를 받아오고 이를 우리 사이트 내에서 문제없이 받아올 수 있었다.

&#x20;

앞으로 자바 스프링과 같은 백엔드 프레임워크를 사용하게 된다면 CORS 설정을 허용해주는 작업을 해줌으로써 위 문제를 해결해보고자 한다.
