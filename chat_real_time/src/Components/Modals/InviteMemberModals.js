import React, { useContext, useState } from 'react';
import { Form, Modal, Select, Spin, Avatar } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc } from 'firebase/firestore';

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = async (value) => {
      setOptions([]);
      setFetching(true);

      const newOptions = await fetchOptions(value, curMembers);
      
      setOptions(newOptions);
      setFetching(false);
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size='small' src={opt.photoURL}>
            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, curMembers) {
  const usersCollection = collection(db, 'users');
  console.log(search.toLowerCase())
  const userQuery = query(
    usersCollection,
    where('keywords', 'array-contains', search),
    orderBy('displayName'),
    limit(20)
  );

  const snapshot = await getDocs(userQuery);
  const userList = snapshot.docs.map((doc) => ({
    label: doc.data().displayName,
    value: doc.data().uid,
    photoURL: doc.data().photoURL,
  }));

  // Filter out users who are already members
  const filteredUserList = userList.filter((user) => !curMembers.includes(user.value));
  console.log(filteredUserList)
  return filteredUserList;
}

export default function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  const handleOk = async () => {
    // reset form value
    form.resetFields();
    setValue([]);

    // update members in current room
    const roomRef = doc(collection(db, 'rooms'), selectedRoomId);

    await updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });

    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();
    setValue([]);

    setIsInviteMemberVisible(false);
  };
  return (
    <div>
      <Modal
        title='Mời thêm thành viên'
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout='vertical'>
          <DebounceSelect
            mode='multiple'
            name='search-user'
            label='Tên các thành viên'
            value={value}
            placeholder='Nhập tên thành viên'
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: '100%' }}
            curMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}
