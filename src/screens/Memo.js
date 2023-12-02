import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from '../theme';
import MemoTask from '../components/MemoTask';
import IconButton from '../components/IconButton';
import {images} from '../images';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  margin: 20px;
`;
const List = styled.ScrollView`
  margin:10px 0;
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

const SubTitle = styled.Text`
    padding: 0 20px;
    color: #2B3F62;
    font-size: 16px;
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
 
  return isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background} // Android only
        />
        <BoxConatiner width={width}>
            <Title>Note</Title>
            <IconButton 
              type={images.update}
              onPressOut={() => navigation.navigate('AddMemoForm')}/>
        </BoxConatiner>
        {Object.values(memos).length === 0 ? ( 
          <Container>
            <SubTitle>메모를 등록해보세요!</SubTitle>
          </Container>
        ) : ( 
          <List width={width}>
            {Object.values(memos)
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
