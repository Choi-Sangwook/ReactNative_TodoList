import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import Screen from '../components/ui/Screen';
import { Title } from '../components/ui/Typography';
import { useMemosContext } from '../MemosContext';

const HeaderRow = styled.View`
  width: ${({ width }) => width - 40}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.main,
}))`
  width: ${({ width }) => width - 40}px;
  flex: 1;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 8px;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.textInputBackColor};
  border-radius: 15px;
  font-size: 20px;
  color: ${({ theme }) => theme.main};
`;

const SaveButton = styled.TouchableOpacity`
  width: ${({ width }) => width - 40}px;
  background-color: ${({ theme }) => theme.primary};
  margin: 20px 0;
  padding: 20px;
  border-radius: 8px;
`;

const SaveButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  align-self: center;
`;

const BackButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.primary};
  padding: 10px;
  border-radius: 10px;
`;

const BackButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export default function MemoFormScreen({ navigation, route }) {
  const { width } = useWindowDimensions();
  const { id } = route.params || {};
  const { memos, saveMemo } = useMemosContext();
  const [memoText, setMemoText] = useState(id ? memos[id]?.contents ?? '' : '');

  const handleSubmit = () => {
    if (!memoText.trim()) {
      Toast.show({
        type: 'success',
        text1: '메모 내용이 없어 저장되지 않았습니다.',
        position: 'bottom',
      });
      return;
    }
    saveMemo({ id, contents: memoText });
    navigation.navigate('Memo');
  };

  return (
    <Screen>
      <HeaderRow width={width}>
        <Title>메모 입력</Title>
        <BackButton onPress={() => navigation.goBack()}>
          <BackButtonText>뒤로가기</BackButtonText>
        </BackButton>
      </HeaderRow>

      <Input
        width={width}
        placeholder="메모를 작성하세요"
        multiline
        value={memoText}
        onChangeText={setMemoText}
      />

      <SaveButton width={width} onPress={handleSubmit}>
        <SaveButtonText>저장</SaveButtonText>
      </SaveButton>
    </Screen>
  );
}
