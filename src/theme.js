// Single source of truth for theming.
// lightTheme and darkTheme MUST expose the same keys so every styled component
// can read `theme.x` through the root ThemeProvider without branching on darkMode.

export const lightTheme = {
  statusBarStyle: 'dark-content',

  background: '#F1F7FE',
  itemBackground: '#C2DCFF',
  itemCompletedBackground: '#D8FFEB',

  main: '#2B3F62',
  text: '#2B3F62',
  done: '#616161',
  border: '#919498',

  // navigation
  tabBarColor: '#fff',
  tabBarActiveTintColor: '#2B3F62',
  tabBarInactiveTintColor: 'grey',

  // controls
  toggleDone: '#17D313',
  toggleunfilledColor: '#00A3FF',
  toggleborderColor: '#00A3FF',
  toggleThumbColor: '#fff',

  // inputs / buttons
  textInputBackColor: '#fff',
  buttonText: '#fff',
  primary: '#416AD7',
  accent: '#3E92FF',
};

export const darkTheme = {
  statusBarStyle: 'light-content',

  background: '#000',
  itemBackground: '#979797',
  itemCompletedBackground: '#474747',

  main: '#fff',
  text: '#fff',
  done: '#616161',
  border: '#5A5A5A',

  // navigation
  tabBarColor: '#5A5A5A',
  tabBarActiveTintColor: '#000',
  tabBarInactiveTintColor: '#fff',

  // controls
  toggleDone: '#fff',
  toggleunfilledColor: 'grey',
  toggleborderColor: 'grey',
  toggleThumbColor: '#5A5A5A',

  // inputs / buttons
  textInputBackColor: 'grey',
  buttonText: '#fff',
  primary: '#474747',
  accent: '#474747',
};

// TEMP compat: MemoForm still imports `theme`; removed when Memo is migrated (Phase 5).
export const theme = lightTheme;
