import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from '../theme';
import MemoTask from '../components/MemoTask';
import IconButton from '../components/IconButton';
import {images} from '../images';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native'; // 추가된 부분
import { useTasksContext } from '../TaskContext';
import {lightTheme, darkTheme} from '../theme'

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;
const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  width: ${({ width }) => width - 150}px;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  align-self: center;
  margin: 20px;
`;
const List = styled.ScrollView`
  margin:10px 0;
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

const SubTitle = styled.Text`
margin: 20px;
    padding: 0 20px;
    color: ${({ theme }) => theme.main};
    font-size: 20px;
    font-weight: 700;
    align-self: flex-start;
`;

const BoxConatiner = styled.SafeAreaView`
  height:120px;
  width: ${({ width }) => width - 40}px;    
  background-color: ${({ theme }) => theme.background};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;




export default function App({ navigation }) {
  const width = Dimensions.get('window').width;

  const [isReady, setIsReady] = useState(false);
 
  const [memos, setMemos] = useState({});
  const [searchKeyword, setSearchKeyword] = useState(''); //테스트

  const { darkMode, updateDarkMode} = useTasksContext();

  const _saveMemos = async (memoData) => {
    try {
      await AsyncStorage.setItem('memos', JSON.stringify(memoData));
      setMemos(memoData);
    } catch (error) {
      console.error(error);
    }
  };

  const _loadMemos = async () => {
    try {
      console.log('메모를 불러오는 중...');
      const loadedMemos = await AsyncStorage.getItem('memos');
      console.log('로드된 메모:', loadedMemos);
      setMemos(JSON.parse(loadedMemos || '{}'));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // 화면이 포커스를 얻을 때마다 메모 목록을 다시 불러옴
      console.log('화면이 포커스를 얻었습니다. 메모를 다시 불러옵니다.');
      _loadMemos();
    });

    return unsubscribe;
  }, [navigation]);

  const _deleteMemo = (id) => {
    const currentMemos = { ...memos };
    delete currentMemos[id];
    _saveMemos(currentMemos);
  };

  const _updateMemo = (id) => {
    navigation.navigate('AddMemoForm', { id: id });
  };

  const filteredMemos = Object.values(memos).filter( //ㅈ테스트
    (memo) =>
      memo.contents.includes(searchKeyword) || memo.title.includes(searchKeyword)
  );
 
  return isReady ? (
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
      <Container>
      <StatusBar
          barStyle={darkMode ? "light-content":"dark-content"}
          backgroundColor={darkMode ? darkTheme.background:lightTheme.background} // Android only
        />
        <BoxConatiner width={width}>
            <Title>Note</Title>
            <IconButton 
              type={images.update}
              onPressOut={() => navigation.navigate('AddMemoForm')}/>
        </BoxConatiner>
        <TextInput
          placeholder="메모를 검색하세요"
          value={searchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}
          placeholderTextColor={darkMode ? darkTheme.main : lightTheme.main}
          style={{
            color: darkMode ? darkTheme.main : lightTheme.main,
            width: width - 40,
            borderColor: darkMode ? darkTheme.main : lightTheme.main,
            borderWidth: 1,
            borderRadius: 5,
            padding: 8,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        {Object.values(memos).length === 0 ? ( 
          <Container>
            <SubTitle>메모를 등록해보세요!</SubTitle>
          </Container>
        ) : ( 
          <List width={width}>
            {Object.values(filteredMemos)
              .reverse()
              .map(item => (
                <MemoTask
                  key={item.id}
                  item={item}
                  deleteMemo={_deleteMemo}
                  updateMemo={_updateMemo}
                />
              ))}
          </List>
        )}
      </Container>
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={_loadMemos}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
}
