import { Col, Row } from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from 'styled-components'

const SideBarStyled = styled.div`
    background: #59bdbc;
    color:white;
    height:100vh;

`;
function SideBar() {
    return ( 
       <SideBarStyled>
        <Row>
                <Col span={24}>
                <UserInfo />
                </Col>
                <Col span={24}>
                <RoomList />
                </Col>
            </Row>
       </SideBarStyled>
     );
}

export default SideBar;