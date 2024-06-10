import { Col, Row } from "antd";
import SideBar from "./Sidebar";
import ChatWindow from "./ChatWindow";

function ChatRoom() {
    return ( 
        <div>
            <Row>
                <Col span={6}>
                <SideBar/>
                </Col>
                <Col span={18}>
                <ChatWindow />
                </Col>
            </Row>
        </div>
     );
}

export default ChatRoom;