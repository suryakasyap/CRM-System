import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { useAuth } from './contexts/AuthContext';

// Improved loading component with progress indication and visual feedback
const PageLoading = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress size={60} thickness={4} color="primary" />
    <Typography variant="body1" sx={{ mt: 2 }}>
      Loading content...
    </Typography>
  </Box>
);

// Debugging component to display auth state
const AuthDebug = () => {
  const { currentUser, loading } = useAuth();
  
  if (loading) return null;
  
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 9999,
        p: 1,
        m: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        borderRadius: 1,
        fontSize: '12px',
        maxWidth: '300px',
        opacity: 0.7,
        '&:hover': {
          opacity: 1
        }
      }}
    >
      <Typography variant="caption" display="block">
        Auth Status: {currentUser ? 'Logged In' : 'Not Logged In'}
      </Typography>
      {currentUser && (
        <>
          <Typography variant="caption" display="block">
            User: {currentUser.username}
          </Typography>
          <Typography variant="caption" display="block">
            Roles: {currentUser.roles?.join(', ')}
          </Typography>
        </>
      )}
    </Box>
  );
};

// Lazy load with simpler implementation
const lazyLoad = (importFunc) => {
  return lazy(importFunc);
};

// Lazy load layout separately to reduce initial load
const Layout = lazy(() => import('./components/Layout/Layout'));

// Group related routes by feature for better code splitting
const Dashboard = lazyLoad(() => import('./pages/Dashboard'));
const LandingPage = lazyLoad(() => import('./pages/Landing/LandingPage'));

// Auth pages
const AuthPages = {
  Login: lazyLoad(() => import('./pages/Auth/Login')),
  Register: lazyLoad(() => import('./pages/Auth/Register')),
};

// Customer pages
const CustomerPages = {
  List: lazyLoad(() => import('./pages/Customers/CustomerList')),
  Create: lazyLoad(() => import('./pages/Customers/CustomerCreate')),
  Edit: lazyLoad(() => import('./pages/Customers/CustomerEdit')),
  View: lazyLoad(() => import('./pages/Customers/CustomerView')),
};

// Interaction pages
const InteractionPages = {
  List: lazyLoad(() => import('./pages/Interactions/InteractionList')),
  Create: lazyLoad(() => import('./pages/Interactions/InteractionCreate')),
  Edit: lazyLoad(() => import('./pages/Interactions/InteractionEdit')),
};

const NotFound = lazyLoad(() => import('./pages/NotFound'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            p: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" color="error" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            There was an error loading this page. Please try again.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/dashboard';
            }}
          >
            Go to Dashboard
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Enhanced loadable wrapper with error boundary
const Loadable = (Component) => (props) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoading />}>
        <Component {...props} />
        <AuthDebug />
      </Suspense>
    </ErrorBoundary>
  );
};

// Create loadable components
const LoadableDashboard = Loadable(Dashboard);
const LoadableLogin = Loadable(AuthPages.Login);
const LoadableRegister = Loadable(AuthPages.Register);
const LoadableCustomerList = Loadable(CustomerPages.List);
const LoadableCustomerCreate = Loadable(CustomerPages.Create);
const LoadableCustomerEdit = Loadable(CustomerPages.Edit);
const LoadableCustomerView = Loadable(CustomerPages.View);
const LoadableInteractionList = Loadable(InteractionPages.List);
const LoadableInteractionCreate = Loadable(InteractionPages.Create);
const LoadableInteractionEdit = Loadable(InteractionPages.Edit);
const LoadableNotFound = Loadable(NotFound);
const LoadableLandingPage = Loadable(LandingPage);
const LoadableLayout = Loadable(Layout);

// Protected route component with preloading
const ProtectedRoute = ({ element }) => {
  const { currentUser, loading } = useAuth();
  
  // Show loading indicator when auth state is determining
  if (loading) {
    return <PageLoading />;
  }
  
  console.log("Protected route check - User logged in:", !!currentUser);
  
  // If not authenticated, redirect to login page
  if (!currentUser) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  // User is authenticated, render the protected element
  console.log("User authenticated, showing protected content");
  return element;
};

// Public route with preloading
const PublicRoute = ({ element }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <PageLoading />;
  }
  
  console.log("Public route check - User logged in:", !!currentUser);
  
  return !currentUser ? element : <Navigate to="/dashboard" replace />;
};

// Preload critical components
const preloadComponents = () => {
  // No-op preloading - will be handled by browser naturally
};

function App() {
  // Show auth debug info in development
  const showDebug = process.env.NODE_ENV === 'development';
  
  useEffect(() => {
    // Preload critical components after initial render
    preloadComponents();
    
    // Clear URL hash on initial load (can cause issues with router)
    if (window.location.hash) {
      window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
    
    // Add debugging info to console
    console.log("App started in mode:", process.env.NODE_ENV);
  }, []);

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoadableLandingPage />} />
        <Route path="/landing" element={<LoadableLandingPage />} />
        
        {/* Auth pages (no layout) */}
        <Route path="/login" element={<PublicRoute element={<LoadableLogin />} />} />
        <Route path="/register" element={<PublicRoute element={<LoadableRegister />} />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <LoadableLayout>
                  <LoadableDashboard />
                </LoadableLayout>
              }
            />
          }
        />

        {/* Customer routes */}
        <Route
          path="/customers"
          element={
            <ProtectedRoute
              element={
                <LoadableLayout>
                  <LoadableCustomerList />
                </LoadableLayout>
              }
            />
          }
        />
        <Route
          path="/customers/create"
          element={
            <ProtectedRoute
              element={
                <LoadableLayout>
                  <LoadableCustomerCreate />
                </LoadableLayout>
              }
            />
          }
        />
        <Route
          path="/customers/:id/edit"
          element={
            <ProtectedRoute
              element={
                <LoadableLayout>
                  <LoadableCustomerEdit />
                </LoadableLayout>
              }
            />
          }
        />
        <Route
          path="/customers/:id"
          element={
            <ProtectedRoute
              element={
                <LoadableLayout>
                  <LoadableCustomerView />
                </LoadableLayout>
              }
            />
          }
        />

        {/* Interaction routes */}
        <Route
          path="/interactions"
          element={
            <ProtectedRoute
              element={
                <LoadableLayout>
                  <LoadableInteractionList />
                </LoadableLayout>
              }
            />
          }
        />
        <Route
          path="/interactions/create"
          element={
            <ProtectedRoute
              element={
                <LoadableLayout>
                  <LoadableInteractionCreate />
                </LoadableLayout>
              }
            />
          }
        />
        <Route
          path="/interactions/:id/edit"
          element={
            <ProtectedRoute
              element={
                <LoadableLayout>
                  <LoadableInteractionEdit />
                </LoadableLayout>
              }
            />
          }
        />

        {/* Not found page */}
        <Route path="*" element={<LoadableNotFound />} />
      </Routes>
    </>
  );
}

export default App; 