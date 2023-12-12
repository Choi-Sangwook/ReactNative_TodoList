import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions,  View,Keyboard  } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from '../theme';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 20px 0;
`;

const Input = styled.TextInput`
  width: ${Dimensions.get('window').width * 0.9}px;
  flex:1;
  border: 1px solid ${(props) => props.theme.border};
  padding: 8px;
  margin-bottom: 16px; 
  background-color: white;
  background-color: #FFFFFF;
  border-radius: 15px;
  font-size: 20px
`;

const Button = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width * 0.9}px;
  background-color: #416AD7;
  margin: 20px 0;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  align-self:center;
`;

const BackButton = styled.TouchableOpacity`
  background-color: #416AD7;
  padding: 10px;
  border-radius: 10px;
`;

const BackButtonText = styled.Text`
  font-size: 18px;
  color: white;
`;

const MemoForm = ({ navigation, id }) => {
  
  const [memoText, setMemoText] = useState('');
  useEffect(() => {
    if (id) {
      const fetchMemoContent = async () => {
        try {
          const existingMemos = await AsyncStorage.getItem('memos');
          const memos = existingMemos ? JSON.parse(existingMemos) : {};
          if (memos[id]) {
            setMemoText(memos[id].contents);
          }
        } catch (error) {
          console.error('메모 내용 가져오기 오류:', error);
        }
      };

      fetchMemoContent();
    }
  }, [id]);

  const _updateMemo = async () => {
    const title = memoText.substring(0,7);
    const existingMemos = await AsyncStorage.getItem('memos');
    const memos = existingMemos ? JSON.parse(existingMemos) : {};
    await _saveMemo({ ...memos, [id]: { id: id, title:title ,contents: memoText } });
  };
  
  const _addMemo = async () => {
    const ID = Date.now().toString();
    const title = memoText.substring(0, 7);
   
    const newMemoObject = {
      [ID]: {id: ID, title: title, contents: memoText},
    };
    try {
      const existingMemos = await AsyncStorage.getItem('memos');
      const value = existingMemos ? JSON.parse(existingMemos) : {}; 
      setMemoText('');
      await _saveMemo({ ...value, ...newMemoObject });
      
    } catch (error) {
      console.error('메모 저장 오류:', error);
    }
  };

  
  const _saveMemo = async (memoData) => {
    try {
      await AsyncStorage.setItem('memos', JSON.stringify(memoData));
      navigation.navigate('Memo');
    } catch (error) {
      console.error('메모 저장 오류:', error);
    }
  };
  
  const showToast = (message) => {
    Toast.show({
      type: 'success', // 또는 'error', 'info'
      text1: message,
      position: 'bottom',
    });
  };
  
  const handleMemoSubmit = () => {
    if (memoText && memoText.trim() !== '') {
      if(id === undefined){
      _addMemo();      
      }else {
        _updateMemo();        
      }
    } else {
      showToast('메모 텍스트가 없거나 빈 문자열이어서 저장되지 않았습니다.'); // 알림 추가
    }
  };

  return (
    <Container>

    <View style={{ width: Dimensions.get('window').width * 0.9,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>  
    <Title>메모 입력</Title>
      </TouchableWithoutFeedback>
      <BackButton onPress={() => navigation.goBack()}>
          <BackButtonText>뒤로가기</BackButtonText>
        </BackButton>
        
    </View>
    <Input
        placeholder="메모를 작성하세요"      
        multiline
        value={memoText}
        onChangeText={(text) => setMemoText(text)}
      />
      <Button onPress={handleMemoSubmit}>
        <ButtonText>저   장</ButtonText>
      </Button>
    </Container>
  );
};

const MemoFormPage = ({ navigation, route}) => {

  const { id } = route.params || {id: undefined};
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <MemoForm navigation={navigation} id={id}/>
    </ThemeProvider>
  );
};

export default MemoFormPage;
