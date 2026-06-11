import React from 'react';
import Screen from '../components/ui/Screen';
import { Title } from '../components/ui/Typography';
import SettingComponent from '../components/SettingComponent';

export default function SettingsScreen() {
  return (
    <Screen>
      <Title>Setting</Title>
      <SettingComponent title="다크 모드" />
    </Screen>
  );
}
