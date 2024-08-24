import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
import { BaseUrl } from '../constant/Base';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true; // To track if the component is mounted

        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true; // Ensure this is needed; otherwise, set it globally
                const res = await axios.get(`${BaseUrl}/api/v1/user`);
                
                if (isMounted) {
                    // Store data only if the component is still mounted
                    console.log("other users -> ", res);
                    dispatch(setOtherUsers(res.data));
                }
            } catch (error) {
                console.error('Error fetching other users:', error); // Improved error logging
            }
        };

        fetchOtherUsers();

        return () => {
            isMounted = false; // Cleanup function to set isMounted to false on unmount
        };
    }, [dispatch]); // Add dispatch to dependency array to avoid lint warnings
};

export default useGetOtherUsers;
