import './App.css';
import Login from './Components/Login';
import ChatRoom from './Components/ChatRoom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import InviteMemberModal from './Components/Modals/InviteMemberModals';
import AddRoomModal from './Components/Modals/AddRoomModals';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ChatRoom />} />
        </Routes>
        <AddRoomModal />
        <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
