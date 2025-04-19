// No React imports needed with modern JSX
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { NewsDetail } from './pages/NewsDetail';
import { Search } from './pages/Search';
import { UserProfile } from './pages/UserProfile';
import { SubmitNews } from './pages/SubmitNews';
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