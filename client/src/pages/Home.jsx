import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth-context';

const Home = () => {
  const [userData, setUserData] = useState(true);
  const [contact, setContact] = useState({
    fullName : "",
    email : "",
    profileImage : ""
  })
  const {user} = useAuth();
  useEffect(()=>{
    if(user){
      setContact({
        fullName : user.fullName,
        email : user.email,
        profileImage : user.profileImage
      })
      setUserData(false);
    }
  },[user]);

  return (
    <>
      hello,
      {contact.fullName},
      {contact.profileImage}
      <img src={contact.profileImage} />
    </>
  )
}

export default Home