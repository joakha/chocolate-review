import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'
import RegisterUser from './components/RegisterUser'
import { AuthNotification } from './components/AuthNotification'
import { useUser } from './hooks/useUser'
import LoginUser from './components/LoginUser'
import { CreateReview } from './components/CreateReview'
import EditReview from './components/EditReview'
import UserReviews from './components/UserReviews'
import FindReviews from './components/FindReviews'
import FindResults from './components/FindResults'

function App() {

  const { notificationMsg, loggedIn } = useUser();

  return (
    <div className='flex flex-col min-h-screen bg-chocolate-white'>
      <Header />
      <Banner />
      <div className='container mx-auto'>
        <FindReviews />
      </div>
      <div className='container mx-auto py-12 flex-1'>
        <Routes>
          <Route path='/' element={<p>Main content</p>} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/login' element={<LoginUser />} />
          <Route path='/find-reviews' element={<FindResults />} />
          {loggedIn &&
            <>
              <Route path='/create-review' element={<CreateReview />} />
              <Route path='/your-reviews' element={<UserReviews />} />
              <Route path='/edit-review/:id' element={<EditReview />} />
            </>
          }
        </Routes>
      </div>
      {notificationMsg && <AuthNotification />}
      <Footer />
    </div>
  )
}

export default App
