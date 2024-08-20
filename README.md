# <img src = "https://velog.velcdn.com/images/whitewise95/post/891aab6f-b991-478c-a8c6-81636ee15192/image.png" align=center width=50> 디딧(Didit)
![타이틀 이미지(수정)](https://github.com/user-attachments/assets/6bb287d6-6ade-4c57-b061-73228bfc8544)

### "계획만 세우고 실행하지 못한 일들이 많지 않으셨나요?"
디딧은 개인의 목표 달성을 체계적이고 효율적으로 지원하는 목표 관리 플랫폼입니다.  

목표 설정부터 달성까지,  디딧과 함께 구체적인 계획을 세우고 끝까지 이루어보세요.  


## ⭐️ 핵심 기능
![12](https://github.com/user-attachments/assets/b0f795b2-218c-4c4a-968d-4492ab44688c)
![13](https://github.com/user-attachments/assets/793aa9d3-07db-41fb-af5e-617c08daf4f6)
![14](https://github.com/user-attachments/assets/ebacd144-d7bc-4052-afa6-a6c8e5be40aa)
![409](https://github.com/user-attachments/assets/528628bd-c759-47e8-b582-1db2a02a403b)
![408](https://github.com/user-attachments/assets/948184a3-da25-43b3-880d-5c787bca59ff)



## ⚙️ 아키텍처
![여기서만나용 (1)](https://github.com/user-attachments/assets/7c94c18c-5747-40f5-9b23-3c366ddd9298)


## erd
![erd2](https://github.com/user-attachments/assets/68f825f2-a570-47b4-8264-9e4dad3252d6)


## 📆 프로젝트 기간
- 24년 7월 16일 ~ 24년 8월 20일


## 📝 깃 전략

### 브런치컨벤션
`깃헙커밋규칙` 의 `작업타입/페이지명/기능`
    ex) 상품페이지의 상품등록을 기능개발한다 - feat/product/create

### 커밋메세지 컨벤션
`깃헙커밋규칙` 의 `작업타입: 작업내용`
   ex) 기능개발 - feat: 상품등록 기능 개발 완료
   버그수정 - bugfix: 상품등록시 슈파베이스 오류 나던 버그 수정

| 작업 타입 | 작업내용                       |
| --------- | ------------------------------ |
| 🐛 feat   | 새로운 기능 개발               |
| 🎉 add    | 없던 파일을 생성함, 초기 세팅  |
| 🐛 bugfix | 버그 수정                      |
| 🩹 fix    | 코드 수정                      |

### 머지
main(운영) ← dev(개발) ← 각자 브런치(기능개발)

<details>
<summary>

</summary>
<div markdown="1">
    
</div>
</details>

## 👥 기술적 의사결정

<details>
<summary>
    <img src = "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2Fda9e7f68-8a67-4a64-80ce-99520c1e2ef4%2Fnextjs_icon_132160.png?table=block&id=33a31070-407b-4ec3-a2fc-b03304981f75&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=40&userId=5d0ca314-8b2b-4fd7-8791-2f5f24b81d73&cache=v2" align=center width=20> Next.js
</summary>
<div markdown="1">

<br>


```
 Next.js는 React 기반의 프레임워크로, 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 기본 제공하여 SEO에 최적화되고,
 초기 페이지 로딩 속도를 개선해 사용자 경험을 높입니다 또한, app router를 활용하면 경로 설정이 직관적이고 간편하며,
코드 분할과 페이지 로드 최적화가 자동으로 이루어져 유지 관리가 더욱 쉬워집니다.미들웨어를 통해 로그인 여부에 따른 페이지 접근 관리도 효과적으로 처리했습니다.
이러한 기술적 선택은 프로젝트 요구 사항에 최적화된 결과입니다.
```

</div>
</details>



<details>
<summary>
<img src = "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2Fedb450b3-36cd-48b5-9637-a1407080e0b3%2F%25E1%2584%2583%25E1%2585%25A1%25E1%2584%258B%25E1%2585%25AE%25E1%2586%25AB%25E1%2584%2585%25E1%2585%25A9%25E1%2584%2583%25E1%2585%25B3_(1).png?table=block&id=90d72438-1119-4107-8cee-0a6b4b89f126&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=40&userId=5d0ca314-8b2b-4fd7-8791-2f5f24b81d73&cache=v2" align=center width=20>  Typescript
</summary>
<div markdown="1">

<br>


```
TypeScript는 JavaScript에 정적 타입 시스템을 추가하여 컴파일 단계에서 오류를 미리 발견할 수 있어,
휴먼 에러를 최소화하고 런타임 오류를 줄입니다. 또한, 협업 시 공통된 타입을 사용해 미구현 상태에서도 빠른 진행이 가능하며,
자동 완성 기능을 통해 개발 생산성을 높입니다. 이러한 이유로, 코드 안정성과 효율성을 위해 TypeScript를 선택했습니다.
```

</div>
</details>


<details>
<summary>
<img src = "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F498685e9-8da5-4162-9619-3816b17829d9%2Freact-query.svg?table=block&id=5a35b701-fbbb-4a22-bdcb-c6fa2f7fd3ad&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&userId=5d0ca314-8b2b-4fd7-8791-2f5f24b81d73&cache=v2" align=center width=20> TanStack Query
</summary>
<div markdown="1">

<br>


```
Tanstack Query는 서버에서 가져온 데이터를 클라이언트에 캐싱하고 효율적으로 관리하기 위해 선택했습니다.
이 라이브러리는 비동기 작업을 단순화하고, 데이터의 최신 상태를 유지하면서도 서버 요청 횟수를 최소화하여 효율성을 높입니다.
또한, 서버에서 데이터가 변경되면 자동으로 갱신되어 사용자 경험을 개선할 수 있습니다.
이러한 이유로 Tanstack Query를 사용해 서버 상태 관리를 최적화했습니다.
```
</div>
</details>


<details>
<summary>
<img src = "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2Fd9888d60-0d26-494d-9b2f-c66c9a696463%2Fimage.png?table=block&id=ce4e9a54-18ca-44ed-b594-ded4561bf79b&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=40&userId=5d0ca314-8b2b-4fd7-8791-2f5f24b81d73&cache=v2" align=center width=20> Zustand
</summary>
<div markdown="1">

<br>


```
Zustand는 간단하고 효율적인 전역 상태 관리를 위해 선택되었습니다. 기존에 사용하던 Redux RTK와 React Query의 조합 대신,
불필요한 종속성을 줄이고 더 간편한 상태 관리를 위해 React Query와 Zustand 조합을 채택했습니다.
Zustand는 가벼운 코드 풋프린트로 전역 상태를 쉽게 설정, 업데이트, 구독할 수 있으며, 불필요한 리렌더링을 방지해 성능 최적화에도 기여합니다.
이로 인해 상태 관리가 간소화되고, 코드의 가독성 및 유지보수성이 향상되었습니다.
```

</div>
</details>


<details>
<summary>
<img src = "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F17f6971e-3db7-49b3-aecf-d816bd143ef9%2Funnamed.jpg?table=block&id=35639721-31e1-4c2c-a144-93a49e011a14&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=40&userId=5d0ca314-8b2b-4fd7-8791-2f5f24b81d73&cache=v2" align=center width=20> Tailwind CSS
</summary>
<div markdown="1">


<br>


```
Tailwind CSS는 빠르고 효율적인 UI 구축을 위해 선택되었습니다.
사전 정의된 유틸리티 클래스를 활용해 스타일링을 간편하게 하고, 일관된 디자인 시스템을 통해 유지보수를 용이하게 합니다.
또한, 코드 크기를 줄이고 성능을 최적화하여 Next.js와의 통합에도 최적화된 선택입니다.
```

</div>
</details>


<details>
<summary>
<img src = "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F17b606b3-4b8a-46b8-831e-0db5e8c9729f%2F%25E1%2584%2587%25E1%2585%25A5%25E1%2584%2589%25E1%2585%25A6%25E1%2586%25AF.png?table=block&id=12193f59-c2e9-4b3d-b7fe-b34ee9d42894&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=40&userId=5d0ca314-8b2b-4fd7-8791-2f5f24b81d73&cache=v2" align=center width=20> Vercel
</summary>
<div markdown="1">
    
<br>


```
Vercel은 애플리케이션을 간편하게 배포하기 위해 선택되었습니다. GitHub과의 원활한 통합을 통해 코드 푸시 시 자동 배포가 이루어지며,
Next.js와의 깊은 호환성 덕분에 SSR, 정적 사이트 생성 등을 쉽게 활용할 수 있습니다.
또한, CDN을 통한 빠른 로딩 속도와 트래픽 증가에 따른 자동 스케일링으로 최적화된 성능을 제공합니다.
서버리스 함수 지원으로 API 배포도 간단하게 처리할 수 있어, 전체적으로 인프라 관리가 용이해졌습니다.
```
</div>
</details>


<details>
<summary>
<img src = "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F31464e20-2eac-4bd2-ae62-6845f2def3e0%2F1_MYl6ymOQNRKbyqMtt9DttA.png?table=block&id=de2135a8-1951-4a65-8fbe-5b7c306ff6a8&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=40&userId=5d0ca314-8b2b-4fd7-8791-2f5f24b81d73&cache=v2" align=center width=20> Supabase
</summary>
<div markdown="1">

<br>

```
Supabase는 강력한 SQL 쿼리 지원과 실시간 데이터베이스 기능을 제공하는 Postgres 기반의 오픈소스 백엔드 서비스로 선택되었습니다.
테이블 간 Join과 빈번한 데이터 수정이 필요한 상황에서 RDBMS가 적합하다고 판단했으며, 인증, 스토리지, 서버리스 함수 등
다양한 통합 기능을 통해 개발 시간을 단축하고 복잡한 백엔드 로직을 간편하게 처리할 수 있었습니다.
Firebase보다 편리하고 유연한 BaaS 플랫폼으로, 우리 프로젝트에 최적화된 선택이었습니다.
```

</div>
</details>




## 트러블 슈팅

<details>
<summary>
빌드 과정에서 특정 API Route가 자동으로 호출되는 문제
</summary>
<div markdown="1">
    
### 🔥문제
빌드 과정에서 특정 API Route가 자동으로 호출되어, 의도치 않게 DB에 데이터가 계속 생성되는 문제가 발생했습니다. 이 API Route는 DB에 데이터를 저장하는 로직을 포함하고 있었고, 빌드 시 반복적으로 호출되었습니다.

### ⚒️해결
이 문제는 API Route에서 Supabase 클라이언트를 사용할 때 발생했습니다. 원인은 API Route에서 브라우저용 Supabase 클라이언트를 사용한 것이었으며, 이로 인해 빌드 시 해당 로직이 실행되었습니다. 이를 SSR(Server-Side Rendering)용 Supabase 클라이언트로 변경한 후, 빌드 과정에서 불필요한 API Route 호출이 발생하지 않도록 문제를 해결했습니다.

<br>

</div>
</details>


<details>
<summary>
알림 메세지를 클릭시 게시물상세로 이동이 느렸던 문제
</summary>
<div markdown="1">

### 🔥 문제
사용자는 자신의 챌린지에 대해 다른 유저가 찜을 하거나 특정 이벤트가 발생할 때 알림을 받습니다. 사용자가 해당 알림을 클릭하면 챌린지 상세 페이지로 이동하도록 구현되어 있습니다. 그러나 현재 구현에서는 알림 클릭 시, 사용자가 알림을 확인했다는 정보를 데이터베이스(DB)에 업데이트하는 로직이 포함되어 있습니다. 이로 인해 업데이트가 완료될 때까지 블로킹이 발생하며, 그 결과 챌린지 상세 페이지로 이동하는 데 약 1초의 지연이 발생하는 문제가 있습니다

### ⚒️해결
사용자는 알림을 확인했다는 행위에 큰 관심이 없기 때문에, 해당 정보를 데이터베이스(DB)에 업데이트하는 로직을 비동기로 처리했습니다. 이를 통해 사용자가 알림을 클릭했을 때 즉시 챌린지 상세 페이지로 이동할 수 있도록 하여 관심사를 분리하였습니다. 이렇게 구현함으로써, 알림 상태 업데이트가 블로킹되지 않고 사용자 경험을 개선할 수 있었습니다.

<br>

</div>
</details>



<details>
<summary>
팝업 모달 확인버튼이 고정되지 않았던 문제
</summary>
<div markdown="1">

### 🔥문제
모바일 화면 바닥에 다음이나 확인버튼을 일정한 위치에 고정시키는 작업에서 팝업 모달 확인버튼의 position을 fixed로 처리했을 때 부모의 스크롤와 함께 움직이는 문제가 발생했습니다.

### ⚒️해결
mdn 문서 확인으로 fixed의 조상이 transform, perspective, filter 속성 중 어느 하나라도 none이 아니라면 뷰포트가 아닌 해당 조상을 컨테이닝 기준으로 삼게 됨을 알게 되었습니다. 이에 대한 해결책으로 flex-1를 적극적으로 사용하여 내부 컨텐츠의 길이와 상관없이 화면 바닥에 버튼이 닿을 수 있게 처리하고 sticky 속성으로 일정 위치에 고정하는 방법으로 문제를 해결했습니다.

<br>

</div>
</details>



<details>
<summary>
트랜잭션 결여로 인한 데이터 불일치문제
</summary>
<div markdown="1">
    
### 🔥문제
한 번에 3개의 테이블을 업데이트해야 했기 때문에, 업데이트 작업 중 하나라도 실패할 경우 성공적으로 완료된 작업들을 롤백할 필요가 있었습니다.

### ⚒️해결
이를 위해 Supabase의 트랜잭션 기능을 사용하여 여러 개의 업데이트 작업을 하나의 작업으로 묶었습니다. 이렇게 함으로써 데이터베이스에 모든 변경 사항이 반영되거나, 전혀 반영되지 않도록 하여 원자성을 유지할 수 있었습니다.

<br>

</div>
</details>



<details>
<summary>
복잡한 형태의 상태를 여러 곳에서 수정하고 변경하는 문제
</summary>
<div markdown="1">

### 🔥문제
생성 수정 기능의 다중 업데이트를 용이하게 하기 위해 복잡한 형태의 상태를 관리해야 했습니다. 

### ⚒️해결
하나의 상태를 여러 곳에서 동시에 수정하고 변경사항을 구독할 수 있도록 전역관리 툴 zustand를 적극적으로 사용해서 불필요한 업데이트와 props-drilling 문제를 해결했습니다.

<br>

</div>
</details>


