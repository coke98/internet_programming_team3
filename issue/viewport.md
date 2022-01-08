# Viewport

Viewport는 웹페이지가 사용자에게 보이는 영역을 의미한다.

&#x20;

우리의 웹 페이지의 경우 데스크톱 기준의 고정된 Viewport로 만들어져 있었기에 화면이 작은 모바일 환경에서는 다음과 같은 문제점이 발생했다.

{% tabs %}
{% tab title="고정 Viewport" %}
![](<../.gitbook/assets/image (8).png>)![](<../.gitbook/assets/image (7).png>)


{% endtab %}
{% endtabs %}

데스크톱 기준의 넓은 Viewport를 모바일 화면에 모두 표시하려다 보니 화면이 사용할 수 없을 정도로 작아져 버렸다.

&#x20;

이를 해결하기 위해 \<head>에 다음의 태그를 작성하였다.

```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

{% hint style="info" %}
* width=device-width : 페이지의 너비를 기기의 스크린 너비로 설정
* initial-scale=1.0 : 처음 페이지 로딩 시 확대/축소가 되지 않은 원래 크기를 사용
{% endhint %}

위와 같이 Viewport를 수정함으로써 모바일 환경에서도 정상적인 크기로 사용이 가능하게 되었다.
