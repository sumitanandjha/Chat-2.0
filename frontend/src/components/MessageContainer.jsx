import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector((store) => store.user);

    const isOnline = onlineUsers?.includes(selectedUser?._id);

    return (
        <>
            {selectedUser ? (
                <div className='md:min-w-[550px] flex flex-col'>
                    <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                        <div className={classNames('avatar', { 'online': isOnline })}>
                            <div className='w-12 rounded-full'>
                                <img
                                    src={selectedUser?.profilePhoto || '/default-profile.png'}
                                    alt="user-profile"
                                    onError={(e) => e.target.src = '/default-profile.png'} // Fallback image
                                />
                            </div>
                        </div>
                        <div className='flex flex-col flex-1'>
                            <div className='flex justify-between gap-2'>
                                <p>{selectedUser?.fullName}</p>
                            </div>
                        </div>
                    </div>
                    <Messages />
                    <SendInput />
                </div>
            ) : (
                <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                    <h1 className='text-4xl text-white font-bold'>Hi, {authUser?.fullName}</h1>
                    <h1 className='text-2xl text-white'>Let's start a conversation</h1>
                </div>
            )}
        </>
    );
}

export default MessageContainer;
