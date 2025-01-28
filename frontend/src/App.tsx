import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Dashboard } from './pages/Dashboard';
import { AiAssistant } from './pages/AiAssistant';
import { PatientRecords } from './pages/PatientRecords';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { DoctorRecords } from './pages/DoctorRecord';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/ai-assistant" element={<AiAssistant />} />
                      <Route path="/records" element={<PatientRecords />} />
                      <Route path='/doctor' element= {<DoctorRecords />} />
                      <Route path="/about" element={<About />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;