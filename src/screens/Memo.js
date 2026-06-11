import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import Screen from '../components/ui/Screen';
import { Title, SubTitle } from '../components/ui/Typography';
import MemoTask from '../components/MemoTask';
import IconButton from '../components/IconButton';
import { images } from '../images';
import { useMemosContext } from '../MemosContext';

const HeaderRow = styled.View`
  width: ${({ width }) => width - 40}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.main,
}))`
  width: ${({ width }) => width - 40}px;
  margin: 10px 0;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.main};
  border-radius: 5px;
  color: ${({ theme }) => theme.main};
`;

const List = styled.ScrollView`
  margin: 10px 0;
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

export default function MemoScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { memos, deleteMemo } = useMemosContext();
  const [keyword, setKeyword] = useState('');

  const filtered = Object.values(memos).filter(
    (memo) => memo.contents.includes(keyword) || memo.title.includes(keyword)
  );

  return (
    <Screen>
      <HeaderRow width={width}>
        <Title>Note</Title>
        <IconButton
          type={images.update}
          onPressOut={() => navigation.navigate('AddMemoForm')}
        />
      </HeaderRow>

      <SearchInput
        width={width}
        placeholder="메모를 검색하세요"
        value={keyword}
        onChangeText={setKeyword}
      />

      {Object.values(memos).length === 0 ? (
        <SubTitle>메모를 등록해보세요!</SubTitle>
      ) : (
        <List width={width}>
          {filtered.reverse().map((item) => (
            <MemoTask
              key={item.id}
              item={item}
              deleteMemo={deleteMemo}
              updateMemo={(id) => navigation.navigate('AddMemoForm', { id })}
            />
          ))}
        </List>
      )}
    </Screen>
  );
}
