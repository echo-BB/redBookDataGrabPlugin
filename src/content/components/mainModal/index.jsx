import { useEffect, useState } from 'react'
import { Button, Input, Modal, Space, Alert, message, Form } from 'antd'
import './mainModal.styl'
function MainModal(props) {
    const [messageApi, contextHolder] = message.useMessage();
    // const [noteData, setNoteData] = useState({})
    const [loading, setLoading] = useState(false)
    // 接收父组件控制本组件关闭的方法
    const { onClose, btnClick, noteData } = props
    const dropBtnClick = async () => {
        const values = await form.validateFields();

        console.log("noteData:",noteData,values);
        if (!noteData.dropTag) {
            messageApi.open({
                type: 'warning',
                content: '当前页面不在小红书笔记内',
            });
            return
        }
        btnClick(values.schoolName+values.contentDescript)
    }
    const [form] = Form.useForm();
    return (
        <Modal
            className="CRX-mainModal"
            open={true}
            title={'小红书笔记抓取'}
            footer={null}
            maskClosable={false}
            onCancel={() => {
                onClose && onClose()
            }}
            width={400}
        >
            <div id="popupContainer" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end"
            }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    {noteData.dropTag ? <Alert message="已获取到笔记数据" type="success" /> : <Alert message="未获取到笔记数据" type="error" />}
                </Space>
                <Form
                form={form}
                style={{width:'100%'}}
                >
                    <Form.Item
                        label="学校名称"
                        name="schoolName"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="内容描述"
                        name="contentDescript"
                    >
                        <Input />
                    </Form.Item>
                </Form>
                <Button type="primary" style={{ marginTop: "10px" }} onClick={dropBtnClick} loading={loading}>抓取当前页面数据</Button>
                {contextHolder}
            </div>
        </Modal>
    )
}
export default MainModal