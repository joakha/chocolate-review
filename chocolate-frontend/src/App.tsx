import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'
import RegisterUser from './components/RegisterUser'
import { AuthNotification } from './components/AuthNotification'
import { useUser } from './hooks/useUser'

function App() {

  const { notificationMsg } = useUser();

  return (
    <div className='flex flex-col min-h-screen bg-chocolate-white'>
      <Header />
      <Banner />
      <div className='container mx-auto py-12 flex-1'>
        <Routes>
          <Route path='/' element={<p>Main content</p>} />
          <Route path='/register' element={<RegisterUser />} />
        </Routes>
      </div>
      <>
        {notificationMsg && <AuthNotification />}
        <Footer />
      </>
    </div>
  )
}

export default App
