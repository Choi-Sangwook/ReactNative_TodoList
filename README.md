# ReactNative TodoList

할 일(Task)·메모(Memo)·캘린더를 한 앱에서 관리하는 React Native(Expo) 모바일 앱입니다.
다크 모드를 지원하며, 데이터는 기기 로컬(AsyncStorage)에 저장됩니다.

## 주요 기능

- **홈** — 오늘의 할 일 요약, 진행도 바, 완료 토글
- **캘린더** — 날짜별 일정 등록/수정/삭제, 일정이 있는 날짜 마킹, 선택 날짜의 할 일 목록
- **메모** — 메모 작성/수정/삭제, 검색
- **설정** — 다크 모드 토글 (앱 전체에 즉시 반영)

## 기술 스택

| 영역 | 사용 |
|---|---|
| 프레임워크 | Expo **SDK 54**, React Native 0.81, React 19 |
| 네비게이션 | React Navigation 6 (Bottom Tabs + Stack) |
| 스타일링 | styled-components 6 (단일 ThemeProvider 기반 테마) |
| 저장소 | @react-native-async-storage/async-storage |
| 캘린더 | react-native-calendars |
| 날짜 선택 | react-native-modal-datetime-picker |
| 린트 | ESLint (eslint-config-expo) |

## 사전 준비물

- **Node.js 20.19.4 이상** (Expo SDK 54 요구사항)
- 휴대폰에 **Expo Go** 앱 (Android/iOS) — 현재 Expo Go는 **SDK 54**를 지원합니다.

> ⚠️ Expo Go는 최신 출시 SDK 하나만 지원합니다. 이 프로젝트가 SDK 54인 이유이며, SDK를 올릴 때는 Expo Go가 지원하는지 먼저 확인해야 합니다.

## 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행 (캐시 초기화 옵션 -c 권장)
npm start -- -c
```

서버가 켜지면 터미널에 QR 코드가 표시됩니다.

### 실기기에서 실행

1. 휴대폰과 PC를 **같은 Wi-Fi**에 연결
2. **Expo Go** 앱으로 QR 코드 스캔
   - Android: Expo Go 앱 내 "Scan QR code"
   - iOS: 기본 카메라 앱으로 스캔
3. 같은 네트워크가 아니라면 터널 모드: `npm start -- --tunnel`

## 사용 가능한 스크립트

| 명령 | 설명 |
|---|---|
| `npm start` | Expo 개발 서버 실행 |
| `npm run android` | Android에서 실행 |
| `npm run ios` | iOS에서 실행 |
| `npm run web` | 웹에서 실행 |
| `npm run lint` | ESLint 검사 |

## 프로젝트 구조

```
src/
├─ contexts/        앱 상태 + 영속화 (AsyncStorage)
│  ├─ TasksContext.js   할 일 + 다크 모드
│  └─ MemosContext.js   메모
├─ navigation/
│  └─ AppNavigator.js   탭 + 스택 네비게이션, 루트 ThemeProvider
├─ screens/         화면 (각 *Screen.js)
│  ├─ HomeScreen.js
│  ├─ CalendarScreen.js / CalendarFormScreen.js
│  ├─ MemoScreen.js / MemoFormScreen.js
│  └─ SettingsScreen.js
├─ components/
│  ├─ ui/           공용 UI (Screen 래퍼, Typography)
│  └─ ...           기능 컴포넌트 (Task, Box, ProgressBar 등)
├─ theme.js         lightTheme / darkTheme (동일한 키)
├─ utils/date.js    날짜 헬퍼
└─ images.js        아이콘 매핑
```

## 아키텍처 컨벤션

유지보수를 위해 다음 규칙을 따릅니다:

- **테마는 루트의 단일 `ThemeProvider`로만** 공급합니다. 컴포넌트는 `theme.x`(또는 `useTheme()`)로만 색을 읽으며, `darkMode` prop을 넘기거나 테마 객체를 직접 import 하지 않습니다. `lightTheme`/`darkTheme`은 **동일한 키**를 가집니다.
- 모든 화면은 `components/ui/Screen`으로 감쌉니다 (SafeArea + StatusBar + 배경 일괄 처리).
- 데이터(상태 + AsyncStorage)는 `contexts/`에만 둡니다. 화면에서 직접 AsyncStorage를 호출하지 않습니다.
- 스타일은 styled-components로 통일하며, React 19에 맞춰 `defaultProps` 대신 기본 매개변수를 사용합니다.

## 개발 메모

- 네이티브/dev 빌드만 관련된 일부 moderate 보안 알림(uuid, postcss)은 Expo SDK 내부 의존성에서 비롯되며, 앱 런타임과 무관합니다. Expo SDK 업데이트 시 자연히 해소됩니다.
