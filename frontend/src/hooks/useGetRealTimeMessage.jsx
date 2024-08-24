import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const dispatch = useDispatch();
    const socket = useSelector((store) => store.socket.socket);
    const messages = useSelector((store) => store.message.messages);

    useEffect(() => {
        if (!socket) return; // Early return if socket is not available

        const handleNewMessage = (newMessage) => {
            dispatch(setMessages([...messages, newMessage]));
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, dispatch, messages]); // Include `messages` here to ensure the effect reacts to changes

};

export default useGetRealTimeMessage;
