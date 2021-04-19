import { Alert } from 'antd';
import React, { useState, useEffect, useRef, useReducer, useMemo, useCallback, useContext } from 'react';

interface UserInfo {
  name: string;
  age: number;
}
type ArticleInfo = {
  title: string;
  content: string;
}

export const User:React.FC<UserInfo&{ initial: number }> = ({children, name, age, initial = 0}) => {
  console.log(children, name, age)
  const [count, setCount] = useState<number>(initial)
  return (
    <div>
      <p>{ name }</p>
      <p>{ age }</p>
      <div>
        { children }
      </div>
      <p>Count: { count }</p>
      <button onClick={() => setCount(count+1)}>加</button>
      <button onClick={() => setCount(count-1)}>减</button>
    </div>
  )
}

let articleCount = 1;
export const Article: React.FC<ArticleInfo> = ({title, content}) => {
  const [article, setArticle] = useState<ArticleInfo>({ title, content });
  // 第二个参数 [] 即使每次状态都改变，也只执行第一次 useEffect 的逻辑
  useEffect(() => {
    articleCount += 1;
  }, [article])
  return (
    <div>
      <p>Title: { article.title }</p>
      <section>{ article.content }</section>
      <button onClick={() => setArticle({
        title: '下一篇',
        content: '下一篇的内容'
      })}>
        下一篇
      </button>
      <span>{ `第${ articleCount }篇` }</span>
    </div>
  )
}


export const Counter = () => {
  const [count, setCount] = useState<number>(0);
  const countRef = useRef<number>(count);

  useEffect(() => {
    countRef.current = count
  })

  const handleCount = () => {
    setTimeout(() => {
      alert('current count: ' + countRef.current)
    }, 3000);
  }

  return (
    <div>
      <p>pre count: { countRef.current }</p>
      <p>current count: { count }</p>
      <button onClick={() => setCount(count + 1)}>加</button>
      <button onClick={() => handleCount()}>弹框显示</button>
    </div>
  )
}


const initialState = { count: 0, text: '重置' }
function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return { count: state.count + 1, text: '加' };
    case 'decrement':
      return { count: state.count - 1, text: '减' };
    default:
      return state;
  }
}

const ColorContext = React.createContext<string>('')
export const Counter2 = ({ initialCount = 0, initialText = '重置'}) => {
  const [state, dispatch] = useReducer(reducer, { count: initialCount, text: initialText });
  const color = useContext(ColorContext)
  return (
    <div>
      Count: {state.count} {state.text} 父组件值{ color }
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  )
}

