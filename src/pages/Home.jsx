import React, { useState } from 'react';
import { useAuth } from '../store/auth-context';

const Home = () => {
  const [userData, setUserData] = useState(true);
  const [contact, setContact] = useState({
    fullName : "",
    email : "",
  })
  const {user} = useAuth();

  if(user && userData){
    setContact({
      fullName : user.fullName,
      email : user.email
    })
    setUserData(false);
  }
  return (
    <>
      hello,
      {contact.email}
    </>
  )
}

export default Home