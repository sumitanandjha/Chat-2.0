import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { BaseUrl } from '../constant/Base';

const useGetMessages = () => {
    const { selectedUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selectedUser?._id) return; // Early return if selectedUser._id is undefined

        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BaseUrl}/api/v1/message/${selectedUser._id}`);
                dispatch(setMessages(res.data));
            } catch (error) {
                console.log('Error fetching messages:', error);
            }
        };

        fetchMessages();

    }, [selectedUser?._id, dispatch]); // Only include selectedUser._id and dispatch

};

export default useGetMessages;
