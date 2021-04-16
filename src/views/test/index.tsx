import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext({});

export function ChildNonTheme() {
  console.log('不关心皮肤的子组件渲染了');
  return <div>我不关心皮肤，皮肤改变的时候别让我重新渲染！</div>;
}

export function ChildWithTheme() {
  const theme = useContext(ThemeContext);
  return <div>我是有皮肤的哦~ {theme}</div>;
}

class Test extends React.Component {
  render() {
    const [theme, setTheme] = useState('light');
    const onChangeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
    return (
      <>
        <div onClick={onChangeTheme}></div>
        Test
      </>
    );
  }
}

export default Test;
