import React, { ChangeEvent, FC, useState } from 'react';
import DefaultLayout from '../components/layout/DefaultLayout';
import { DEFAULT_HOME_TEXT, HOME_TEXT_VALUE_KEY } from '../Constants';

const configStyle = {
  flex: '1 1',
  display: 'flex',
  padding: '20px',
};

const Config: FC = () => {
  const currentText = localStorage.getItem(HOME_TEXT_VALUE_KEY) || DEFAULT_HOME_TEXT;
  const [ homeText, setHomeText ] = useState<string>(currentText);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHomeText(e.target.value || '');
  };

  const apply = () => {
    if (homeText === '') {
      alert('입력 필수..');
      return;
    }
    localStorage.setItem(HOME_TEXT_VALUE_KEY, homeText);
    alert('완..');
  };

  const onReset = () => {
    localStorage.removeItem(HOME_TEXT_VALUE_KEY);
    setHomeText(DEFAULT_HOME_TEXT);
    alert('완..');
  };
  
  return (
    <DefaultLayout>
      <div style={ configStyle } className="hus-flex-column">
        <div style={{ marginBottom: '10px' }} >
          <button onClick={onReset}>초기화</button>
        </div>
        <div>
          <span>홈화면 문구:&nbsp;</span>
          <input type="text" onChange={onChange} value={homeText}  />
          <button onClick={apply}>적용</button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Config;