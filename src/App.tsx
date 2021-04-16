import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import RootRouter from "@/route/index";
import "./App.less";

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <RootRouter />
      </Router>
    </ConfigProvider>
  );
}

export default App;
