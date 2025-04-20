// No React imports needed with modern JSX
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { NewsDetail } from './pages/NewsDetail';
import { Search } from './pages/Search';
import { UserProfile } from './pages/UserProfile';
import { SubmitNews } from './pages/SubmitNews';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AdminPanel } from './pages/AdminPanel';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { About } from './pages/About';
import { AuthProvider } from './context/AuthContext';
import { NewsProvider } from './context/NewsContext';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ErrorBoundary>
          <AuthProvider>
            <ErrorBoundary>
              <NewsProvider>
                <ErrorBoundary>
                  <div className="min-h-screen flex flex-col bg-gray-50">
                    <ErrorBoundary>
                      <Header />
                    </ErrorBoundary>
                    <main className="flex-grow">
                      <Routes>
                        <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
                        <Route path="/news/:id" element={<ErrorBoundary><NewsDetail /></ErrorBoundary>} />
                        <Route path="/search" element={<ErrorBoundary><Search /></ErrorBoundary>} />
                        <Route path="/profile/:id" element={<ErrorBoundary><UserProfile /></ErrorBoundary>} />
                        <Route path="/submit" element={<ErrorBoundary><SubmitNews /></ErrorBoundary>} />
                        <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
                        <Route path="/signup" element={<ErrorBoundary><Signup /></ErrorBoundary>} />
                        <Route path="/settings" element={<ErrorBoundary><Settings /></ErrorBoundary>} />
                        <Route path="/help" element={<ErrorBoundary><Help /></ErrorBoundary>} />
                        <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
                        <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
                        <Route path="/privacy" element={<ErrorBoundary><Privacy /></ErrorBoundary>} />
                        <Route path="/terms" element={<ErrorBoundary><Terms /></ErrorBoundary>} />
                        <Route path="/admin" element={<ErrorBoundary><AdminPanel /></ErrorBoundary>} />
                      </Routes>
                    </main>
                    <ErrorBoundary>
                      <Footer />
                    </ErrorBoundary>
                  </div>
                </ErrorBoundary>
              </NewsProvider>
            </ErrorBoundary>
          </AuthProvider>
        </ErrorBoundary>
      </Router>
    </ErrorBoundary>
  );
}

export default App;