import React from 'react';
import { Row, Col, Button } from 'antd';
import { auth, FacebookAuthProvider, signInWithPopup } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { addDocument, generateKeywords } from '../../firebase/services';

function Login() {
    const fbProvider = new FacebookAuthProvider();
    fbProvider.addScope('email');
    const navigate = useNavigate();
    
    const handleLoginFb = async () => {
        try {
            const result = await signInWithPopup(auth, fbProvider);
            const user = result.user;
            
            const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
            
            if (isNewUser) {
                await addDocument('users', {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    providerId: user.providerData[0].providerId,
                    createdAt: user.metadata.creationTime,
                    keywords: generateKeywords(user.displayName)
                });
            }
            
            navigate('/');
        } catch (error) {
            console.error('Facebook login error:', error);
        }
    };
    
    return (
        <div>
            <Row justify="center" style={{ height: "800px" }}>
                <Col span={8}>
                    <h1 style={{ textAlign: "center" }}>Fun chat</h1>
                    <Button style={{ width: "100%", marginBottom: 5 }}>
                        Đăng nhập bằng Google
                    </Button>
                    <Button style={{ width: "100%" }} onClick={handleLoginFb}>
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
