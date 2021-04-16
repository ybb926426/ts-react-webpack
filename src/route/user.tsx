import React, { memo, Suspense } from 'react';
import PageLoading from '@/components/layout/PageLoading';

const UserRouter = memo(() => {
  return (
    <Suspense fallback={<PageLoading />}>
      <div>UserRouter</div>
    </Suspense>
  )
})
UserRouter.displayName = 'UserRouter';

export default UserRouter;
