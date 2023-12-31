import { useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import { useAppDispatch } from './redux/hook';
import { setLoading } from './redux/features/user/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { getUserData } from './redux/features/user/userThunk';
import { Toaster } from './components/ui/toaster';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(true))
  },[])

  onAuthStateChanged(auth, (user) => {
    
    if(user){
      dispatch(getUserData(user.uid));
      dispatch(setLoading(false));
    }else{
      dispatch(setLoading(false));
    }
  })
  return (
    <div>
      <MainLayout />
      <Toaster />
    </div>
  )
}

export default App
