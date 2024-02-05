
import React, { useEffect, useState } from 'react';
import { callGraphApi } from './graphService'; // Ensure this path is correct

const UserProfile = () => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await callGraphApi();
                setProfileData(userData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome {profileData.displayName}</h1>
            {/* Render additional user profile information here */}
        </div>
    );
};

export default UserProfile;
