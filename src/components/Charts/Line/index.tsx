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

export const Example = () => {
  const [time, setTime] = useState<number>(0);
  const [random, setRandom] = useState<number>(0);

  return (
    <div>
      <button onClick={() => setTime(new Date().getTime())}>获取当前时间</button>
      <button onClick={() => setRandom(Math.random())}>获取当前随机数</button>
      <Show time={time}>{random}</Show>
    </div>
  )
}

type Data = {
  time: number;
}
const Show: React.FC<Data> = ({ time, children }) => {
  const changeTime = (time: number) => {
    console.log('changeTime excuted...')
    return new Date(time).toISOString()
  }
  const newTime = useMemo(() => {
    return changeTime(time);
  }, [time])
  const getNewTime = useCallback(() => {
    return changeTime(time);
  }, [time])
  return (
    <div>
      <p>Time is: { getNewTime() }</p>
      <p>Random is: { children }</p>
    </div>
  )
}

/**
 * @param name name
 * @param age age
 * @param children children
 */
type UserInfos = {
  /** color */
  name: string
  /** age */
  age: number
}
type AppProps = React.PropsWithChildren<{ message: string }>
type changeFn = (e: React.FormEvent<HTMLInputElement>) => void;
type IResponse<T> = {
  message: string
  result: T
  success: boolean
}
export const App = ({ message, children }: AppProps) => {
  const [user] = useState({ name: 'yjj', age: 22 });
  const [userInfo, setUserInfo] = useState<UserInfos | null>({ name: '', age: 12 });
  const [state, setState] = React.useState('')
  const showUser = useCallback((obj: typeof user) => {
    return `my name id ${obj.name}, my age is ${obj.age}`
  }, [])

  const onChange: changeFn = e => {
    setState(e.currentTarget.value);
  }

  const clientEventH = (event: MouseEvent) => {
    console.log(event.clientX);
  }

  const getResponse = async():Promise<IResponse<number[]>> => {
    return {
      message: '获取成功',
      result: [1, 3, 5],
      success: true
    }
  }
  getResponse().then(res => {
    console.log(res.message);
  })
  return (
    <div>
      { message }
      { children }
      <span>用户： { showUser(user) }</span>
      <input type="text" value={state} onChange={onChange} />
    </div>
  )
}


export declare interface AppBetterProps {
  children: React.ReactNode
  functionChildren: (name: string) => React.ReactNode
  style?: React.CSSProperties
  onChange?: React.FormEventHandler<HTMLInputElement>
}


const isPalindrome = (head) => {
  if (head == null || head.next == null) {
    return true;
  }
  let fast = head;
  let slow = head;
  let prev;
  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  prev.next = null;  // 断成两个链表
  // 翻转后半段
  let head2 = null;
  while (slow) {
    const tmp = slow.next;
    slow.next = head2;
    head2 = slow;
    slow = tmp;
  }
  // 比对
  while (head && head2) {
    if (head.val != head2.val) {
      return false;
    }
    head = head.next;
    head2 = head2.next;
  }
  return true;
};

var reverseList = function(head) {
  let prev = null;
  let curr = head;
  while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
  }
  return prev;
};

var SolutionLink = function(head) {
  // let fast = head, slow = head;
  let mapList = new Map();
  while (head) {
    if (mapList.has(head)) {
      return true;
    }
    mapList.set(head, true);
    head = head.next;
  }
  return false;
}

var SolutionLink2 = function(head) {
  if (head == null || head.next == null) {
    return false;
  }
  let fast = head.next, slow = head;
  while(fast!=slow) {
    if (fast == null || fast.next == null) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  return true;
}

const mergeTwoLists = function(l1, l2) {
  if (l1 == null) {
      return l2;
  } else if (l2 == null) {
      return l1;
  } else if (l1.val < l2.val) {
      l1.next = mergeTwoLists(l1.next, l2);
      return l1;
  } else {
      l2.next = mergeTwoLists(l1, l2.next);
      return l2;
  }
}

const mergeTwoLists2 = function(l1, l2) {
  let newNode = new ListNode('start'), temp = newNode;

  while(l1 != null && l2 != null) {
    if (l1.val < l2.val) {
      temp.next = l1;
      l1 = l1.next;
    } else {
      temp.next = l2;
      l2 = l2.next;
    }
    temp = temp.next;
  }

  temp.next = l1 == null ? l2: l1;
  return newNode.next;
}

const middleNode = function(head) {
  let fast = head, slow = head;
  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
const middleNode2 = function(head) {
  let n = 0, cur = head;
  while(cur) {
    ++n;
    cur = cur.next;
  }
  let k = 0;
  cur = head;
  while(k < Math.trunc(n / 2)) {
    ++k;
    cur = cur.next;
  }
  return cur;
}

export class ArrayStack {
  private items: string[];
  private count: number;
  private n: number;

  constructor(n: number) {
    this.items = [];
    this.n = n;
    this.count = 0;
  }

  push(item: string) {
    if (this.count === this.n) {
      return false;
    }
    this.items[this.count] = item;
    this.count++;
    return true;
  }

  pop() {
    if (this.count === 0) return null;
    let tmp = this.items[this.count-1];
    this.count--;
    return tmp;
  }
}

const isValid = function (s) {
  const n = s.length;
  const splitArr = s.split('');
  if (n % 2 === 1) {
    return false;
  }
  const pairs = new Map([
    [')', '('],
    [']', '['],
    ['}', '{']
  ]);
  const stk = [];
  for (const iterator of splitArr) {
    if (pairs.has(iterator)) {
      if (stk[stk.length - 1] !== pairs.get(iterator)) {
        return false;
      }
      stk.pop();
    } else {
      stk.push(iterator)
    }
  }
  return !stk.length;
}


class MinStack {
  private x_stack = [];
  private min_stack = [];

  push(x) {
    this.x_stack.push(x);
    this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x))
  }
  pop(x) {
    this.x_stack.pop();
    this.min_stack.pop();
  }
  top() {
    return this.x_stack[this.x_stack.length - 1]
  }
  getMin() {
    return this.min_stack[this.min_stack.length - 1];
  }
}

class ArrayQueue {
  private items = [];
  private n;
  private head = 0;
  private tail = 0;

  constructor(n) {
    this.n = n;
  }
  public enqueue(item) {
    if (this.tail == this.n) {
      if (this.head == 0) return false;
      for(let i = this.head; i< this.tail; i++) {
        this.items[i - this.head] = item[i]
      }
      this.tail = this.tail - this.head;
      this.head = 0;
    }
    this.items[this.tail] = item;
    this.tail++;
    return true;
  }
  public dequeue() {
    if (this.head == this.tail) return null;
    const ret = this.items[this.head];
    this.head++;
    return ret;
  }

}

class StackQueue {
  private inStack = [];
  private outStack = [];
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  public push(item) {
    this.inStack.push(item);
  }
  public pop() {
    if (!this.outStack.length) {
      while(this.inStack.length) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack.pop();
  }
  public peek() {
    if (!this.outStack.length) {
      while(this.inStack.length) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack[this.outStack.length - 1];
  }
  public empty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}

const backSpaceCompare = (S: string, T: string) => {

  let i = S.length - 1, j = T.length - 1, skipS = 0, skipT = 0;
  while(i >= 0 || j >= 0) {
    while(i >= 0) {
      if (S[i] === '#') {
        skipS++;
        i--;
      } else if (skipS > 0) {
        skipS--;
        i--;
      } else break;
    }
    while(j >= 0) {
      if (S[j] === '#') {
        skipT++;
        j--;
      } else if (skipT > 0) {
        skipT--;
        j--;
      } else break;
    }
    if (S[i] !== T[j]) return false;
    i--;
    j--;
  }
  return true;
}


const bubbleSort = (arr: []) => {
  let length = arr.length;
  for(let i = 0; i < length; i++) {
    let flag = false;
    for(let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j+1] = temp;
        flag = true;
      }
    }
    if (!flag) break;
  }
}

const insertSort = (arr: []) => {
  let length = arr.length;
  if (length <= 1) return;
  for(let i = 1; i < length; i++) {
    let value = arr[i];
    let j = i - 1;
    for(; j >= 0; j--) {
      if (arr[j] > value) {
        arr[j+1] = arr[j]
      } else {
        break;
      }
    }
    arr[j+1] = value;
  } 
}