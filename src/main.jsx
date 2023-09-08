// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import { ConfigProvider } from "antd";
import  '@/common/styles/frame.styl';
import zhCN from 'antd/locale/zh_CN'
// import Popup from '@/popup';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>

)