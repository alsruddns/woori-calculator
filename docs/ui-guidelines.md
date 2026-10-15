# woori-calculator UI Guidelines

## Header
- woori.today logo → `/{locale}`
- Family Sites
- locale selector
- 높이와 정렬 일치

## Family Sites
Desktop header는 수평 패밀리 서비스 링크를 보여주고, 모바일 header는 서비스 메뉴를 열어 6개 서비스를 보여준다. Calculator 서비스에서는 계산기 항목을 active로 표시한다.

표시 순서:
1. 포탈
2. 계산기
3. 온라인 도구
4. 무료 공유 가계부
5. 문서·양식
6. 퀴즈·테스트

각 locale 경로를 유지한다: `/{locale}`, `/{locale}/calculators`, `/{locale}/tools`, `/{locale}/money`, `/{locale}/docs`, `/{locale}/quiz`.

현재 locale을 유지한다.

새 탭 링크는 `target="_blank"`와 `rel="noopener noreferrer"`를 사용한다.

trigger는 항상 locale별 Family Sites 고정 문구를 사용한다.

## Sidebar
- desktop sidebar
- mobile drawer/sheet
- 전체 계산기에 접근 가능
- route 이동 시 scroll 유지

Fallback storage key: `woori-calculator:sidebar-scroll`

## Calculator form
- input label
- unit
- placeholder
- validation
- thousand separator
- mobile numeric keyboard 고려
- 필요하면 입력 아래 한글 금액 표시
- 기간 입력은 UX가 필요한 계산기에서 년/개월 변환을 명확히 제공

## Result
- 결과값
- 단위
- 공식/설명
- 기준 정보
- 필요한 경우 정책 적용일 또는 기준연도 노출

## Buttons
- 빈 텍스트 금지
- 번역 누락 금지
- 한국어 페이지에 `Calculate` 같은 영어 fallback이 노출되지 않게 함
- icon-only 버튼은 aria-label 제공

## Toast
Copy, 성공, 오류 피드백을 제공한다.

## Ads
disabled 시 DOM, 공간, placeholder를 모두 숨긴다.

## Footer
- 개인정보 안내
- 이용안내
- 문의 사항
- email: krdd125@gmail.com

## Responsive
mobile/tablet/desktop을 지원한다.

## Accessibility
- semantic HTML
- label
- keyboard
- focus
- contrast

기존 코드와 문서가 다르면 코드 강제 변경 없이 차이를 보고한다.
