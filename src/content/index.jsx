import ReactDOM from 'react-dom/client'
import './content.styl'
import { useEffect, useState } from "react";
import MainModal from './components/mainModal';
import { message } from 'antd';
// import  domDataFun  from "./components/getDomData";
function Content() {
    const [mainModalVisible, setMainModalVisible] = useState(false)
    const [dropData, setDropData] = useState({})
    // 在内容脚本中添加事件监听器
    document.addEventListener('click', function (event) {
        var popupElement = document.getElementById('CRX-container'); // 替换为你的popup元素ID
        var targetElement = event.target;

        // 检查点击事件是否发生在popup页面之外
        if (popupElement && !popupElement.contains(targetElement)) {
            // 阻止popup页面的关闭
            event.preventDefault();
            event.stopPropagation();
        }
    });
    const removeEmojis=(text)=> {
        // Emoji Unicode 范围：\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]
        const emojiPattern = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udc00-\udcfd]|(?:\ud83d[\ude80-\udeff]|\ud83e[\udd00-\uddff]))|\ufe0f/g;
        return text.replace(emojiPattern, '');
    }
    useEffect(() => {
        if (mainModalVisible) {
            setTimeout(()=>{
                // console.log("dom:", document.getElementById("noteContainer") == null)
                let noteContainer = document.getElementById("noteContainer")
                if (noteContainer!==null) {
                    
                    let detailTitle = noteContainer.querySelector("#detail-title");
                    let detailDesc = noteContainer.querySelector("#detail-desc");
                    let username = noteContainer.querySelector('div.info a.name span');
            
                    let likeCount = noteContainer.querySelector('.like-wrapper span.count');
                    let collectCount = noteContainer.querySelector('.collect-wrapper span.count');
                    let chatCount = noteContainer.querySelector('.chat-wrapper span.count');
            
                    let imgContainer = noteContainer.querySelectorAll('.swiper-slide');
            
                    let tagContainer = noteContainer.querySelectorAll('div.desc span.tag')
                    let imgList = []
                    let tagList = []
                    for (let index = 1; index < imgContainer.length - 1; index++) {
                        let computedStyle = getComputedStyle(imgContainer[index]);
                        let backgroundImage = computedStyle.getPropertyValue('background-image').split('?')[0].substring(5);
                        // console.log(backgroundImage);
                        imgList.push(backgroundImage)
                    }
                    for (let index = 0; index < tagContainer.length; index++) {
                        let tagStr = tagContainer[index]['textContent'].substring(1)
                        tagList.push(tagStr)
                    }
                    setDropData({
                        dropTag: true,
                        username: removeEmojis(username['textContent'] || ""),
                        title: removeEmojis(detailTitle['textContent'] || ""),
                        detailDesc: removeEmojis(detailDesc['textContent'] || ""),
                        collectWrapper: collectCount['textContent'] || "",
                        chatWrapper: chatCount['textContent'] || "",
                        likeWrapper: likeCount['textContent'] || "",
                        imgList: [...imgList],
                        originUrl: window.location.href || "",
                        tag_list:[...tagList]||"",
                    })
                }else{
                    setDropData({
                        dropTag: false
                    })
                }
            },500)

        }
        
    }, [mainModalVisible])
    const saveNoteData =  async(searchQuery)=>{
        try {
            const response = await fetch('https://salyut2.bantouyan.com/api/v1/db/data/v1/lrimk2ck-68qg49y8li4sulr0o57ierx7gp2/article', {
                method: 'POST',
                headers: {
                    'xc-auth': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTczIiwiY2xpZW50Ijoibm9jb2RiIiwiZXhwIjoxNjkzNTU2Mzc3fQ.JTrRq_R2MU6CG7OJSN7x3f3p2f_l9Xg7Sn5YIyfa5Wo',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "content": dropData.detailDesc, //文章内容
                    "img_list": JSON.stringify(dropData.imgList), //文章图片
                    "origin_url": dropData.originUrl, //原始文章地址
                    "commend_count": dropData.chatWrapper, //评论数
                    "liked_count": Number(dropData.likeWrapper), // 喜爱数
                    "collected_count": dropData.collectWrapper, //收藏数
                    "tag_list": JSON.stringify(dropData.tag_list), // 文章标签
                    "username": dropData.username, // 文章的用户名
                    "title": dropData.title, //文章名
                    "search_query":searchQuery||''
                })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log("responseData", responseData)
            if (responseData.id!==null) {
                message.success("抓取成功")
                setMainModalVisible(false)
            }else{
                message.error("抓取失败")
            }
        } catch (error) {
        }
    }

    return (
        <div className="CRX-content">
            <div className="content-entry" onClick={()=>{
                setMainModalVisible(true)
            }}></div>
            {mainModalVisible?(
                <MainModal 
                maskClosable={true}
                onClose={()=>{
                    setMainModalVisible(false)
                }}
                noteData = {dropData}
                btnClick = {saveNoteData}
                />
            ):null}
        </div>
    )
}
// 创建id为CRX-container的div
const app = document.createElement('div')
app.id = 'CRX-container'
// 将刚创建的div插入body最后
document.body.appendChild(app)
// 将ReactDOM插入刚创建的div
const crxContainer = ReactDOM.createRoot(
    document.getElementById('CRX-container')
)
crxContainer.render(<Content />)

// 向目标页面驻入js
try {
    let insertScript = document.createElement('script')
    insertScript.setAttribute('type', 'text/javascript')
    insertScript.src = window.chrome.runtime.getURL('insert.js')
    document.body.appendChild(insertScript)
} catch (err) { }