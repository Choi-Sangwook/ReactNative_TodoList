# Claude Code Review

검토일: 2026-06-11

## 검토 기준

- `CLAUDE.md`의 단순성, 최소 변경, 검증 중심 원칙
- `README.md`에 정의된 테마, 화면 래퍼, Context 구조
- 일정 및 메모의 저장, 수정, 삭제 사용자 흐름
- Expo 의존성 및 Android 번들 생성 가능 여부

## 발견 사항

### 1. [P2] 주요 버튼에 `onPressOut` 사용

관련 파일:

- `src/components/IconButton.js:15`
- `src/components/CustomButton.js:22`
- `src/components/DatePicker.js:32`

현재 버튼 동작이 `onPressOut`에 연결되어 있습니다. `onPressOut`은 정상적인
탭 완료 여부와 무관하게 손가락을 떼는 시점에 호출될 수 있으므로, 특히 삭제나
저장처럼 되돌리기 어려운 작업에는 적합하지 않습니다.

권장 수정:

- 사용자 액션을 `onPress`로 변경합니다.
- 컴포넌트가 받는 prop 이름도 가능하면 `onPress`로 통일합니다.
- 호출부 변경은 해당 컴포넌트를 사용하는 파일로만 제한합니다.

검증:

- 일정 및 메모의 추가, 수정, 삭제 버튼이 한 번씩만 실행됩니다.
- 버튼을 누른 상태에서 영역 밖으로 이동한 뒤 손을 떼면 액션이 실행되지 않습니다.

### 2. [P2] 일정 저장 후 선택 날짜가 오늘로 초기화됨

관련 파일:

- `src/screens/CalendarScreen.js:38`
- `src/screens/CalendarFormScreen.js:55`

`CalendarScreen`은 화면이 focus될 때마다 `selectedDate`를 오늘로 변경합니다.
따라서 미래 또는 과거 날짜에 일정을 등록하고 돌아오면 저장한 날짜가 아닌 오늘이
선택되어, 방금 저장한 일정이 화면에서 사라진 것처럼 보입니다.

권장 수정:

- 저장 후 캘린더로 돌아갈 때 저장한 날짜를 전달하거나 기존 선택 날짜를 유지합니다.
- 탭을 새로 열었을 때만 오늘을 기본값으로 사용하는 단순한 흐름을 우선합니다.

검증:

1. 오늘이 아닌 날짜를 선택합니다.
2. 해당 날짜에 일정을 추가합니다.
3. 캘린더로 돌아왔을 때 같은 날짜가 선택되고 새 일정이 즉시 표시되어야 합니다.
4. 기존 일정을 다른 날짜로 수정한 경우 수정된 날짜가 선택되어야 합니다.

### 3. [P2] 제목 없는 일정 저장 가능

관련 파일:

- `src/screens/CalendarFormScreen.js:41`

현재는 일정 제목과 메모가 모두 비어 있을 때만 저장을 막습니다. 메모만 입력하면
목록에 제목이 없는 일정이 생성됩니다.

권장 수정:

- 일정 제목이 필수라면 `!newTask.trim()` 조건으로 저장을 차단합니다.
- 별도 검증 UI가 필요하지 않다면 기존처럼 조용히 반환하는 최소 변경으로 처리합니다.

검증:

- 제목 없이 메모만 입력한 일정은 저장되지 않습니다.
- 제목만 입력하거나 제목과 메모를 모두 입력하면 정상 저장됩니다.

### 4. [P3] README의 Expo Go 설명 보완 필요

관련 파일:

- `README.md:28`
- `README.md:30`

현재 설명은 모든 Expo Go가 SDK 54만 지원하는 것처럼 읽힙니다. 2026년 6월의
전환 기간에는 Play Store 배포판과 Expo CLI 등을 통해 직접 설치한 버전의 지원
SDK가 다를 수 있습니다.

권장 수정:

- 프로젝트가 SDK 54인 이유를 Play Store 배포판 Expo Go 호환성 기준이라고 명시합니다.
- Expo Go 지원 SDK는 변경될 수 있으므로 Expo 공식 설치 페이지를 확인하도록 안내합니다.
- 시점에 따라 바뀌는 내용을 영구적인 규칙처럼 단정하지 않습니다.

## 확인된 정상 항목

- `eslint .` 통과
- `expo install --check` 통과
- Android 대상 `expo export` 성공
- 모든 화면이 공용 `Screen` 컴포넌트를 사용함
- 앱 전체에 루트 `ThemeProvider` 하나만 사용함
- AsyncStorage 접근이 `src/contexts/`에 모여 있음
- `lightTheme`과 `darkTheme`의 키 구성이 동일함
- Android Metro 번들에서 모듈 해석 및 구문 오류가 발견되지 않음

## 권장 수정 순서

1. `onPressOut`을 `onPress`로 변경
2. 일정 저장 후 선택 날짜 유지
3. 일정 제목 필수 검증
4. README의 Expo Go 설명 보완
5. ESLint와 Android 번들 생성 재검증

## 범위 제한

- 위 이슈와 직접 관계없는 리팩터링은 하지 않습니다.
- 현재 Context, ThemeProvider, Screen 구조는 유지합니다.
- 자동화 테스트 환경이 없으므로 수정 후 실기기에서 일정 및 메모 흐름을 확인합니다.
