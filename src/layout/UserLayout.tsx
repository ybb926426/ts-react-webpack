import React from 'react';
import UserRouter from '@/route/user';

const UserLayout = () => {
  return (
    <div style={{position: 'relative'}}>
      UserContentMain
      <UserRouter />
    </div>
  )
}

export default UserLayout;
