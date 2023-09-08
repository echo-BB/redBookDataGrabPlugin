import { Button, message, Alert, Space } from "antd";
import react, { useEffect, useState } from "react";
import axios from 'axios';

const GrabData = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [noteData, setNoteData] = useState({})
    const [loading, setLoading] = useState(false)

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.data) {
                console.log("Received username:", request.data, sendResponse, request);
                setNoteData(request.data)
                sendResponse({ reply: "Received the data!" });
            }
        });
        useEffect(()=>{
            console.log("弹窗打开了");
        },[])
    const getData = async () => {
        console.log("测试输出：", noteData)
        if (!noteData.dropTag) {
            messageApi.open({
                type: 'warning',
                content: '当前页面不在小红书笔记内',
            });
            return
        }
        setLoading(true)
        try {
            const response = await fetch('https://salyut2.bantouyan.com/api/v1/db/data/v1/lrimk2ck-68qg49y8li4sulr0o57ierx7gp2/article', {
                method: 'POST',
                headers: {
                    'xc-auth': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTczIiwiY2xpZW50Ijoibm9jb2RiIiwiZXhwIjoxNjkzNTU2Mzc3fQ.JTrRq_R2MU6CG7OJSN7x3f3p2f_l9Xg7Sn5YIyfa5Wo',
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "content": noteData.detailDesc, //文章内容
                    "img_list": noteData.imgList, //文章图片
                    "origin_url": noteData.originUrl, //原始文章地址
                    "commend_count": noteData.chatWrapper, //评论数
                    "liked_count": noteData.likeWrapper, // 喜爱数
                    "collected_count": noteData.collectWrapper, //收藏数
                    "tag_list": noteData.tagList, // 文章标签
                    "username": noteData.username, // 文章的用户名
                    "title": noteData.detailDesc //文章名
                })
            });
            console.log("response:", response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log("responseData", responseData)
        } catch (error) {
            console.error('Error:', error);
        }

    }
    return (
        <div id="popupContainer" style={{
            width: "300px", height: "80px", display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end"
        }}>
            <Space direction="vertical" style={{ width: '100%' }}>
                {noteData.dropTag ? <Alert message="已获取到笔记数据" type="success" /> : <Alert message="未获取到笔记数据" type="error" />}
            </Space>

            <Button style={{ marginTop: "10px" }} onClick={getData} loading={loading}>抓取当前页面数据</Button>
            {contextHolder}
        </div>

    )
}
export default GrabData