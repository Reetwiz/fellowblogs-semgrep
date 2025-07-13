// frontend/src/App.tsx

import { ClerkProvider, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Box, Button, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AllBlogs from "./pages/AllBlogs";
import CompleteSignup from "./pages/CompleteSignup";
import CreateBlog from "./pages/CreateBlog";
import SingleBlog from "./pages/SingleBlog";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const theme = createTheme();

// Frontend app.tsx..
const basename = import.meta.env.BASE_URL;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: "100vh", width: '100%', bgcolor: "#f5f5f5" }}>
          {/* This is the critical change: use the dynamic basename here. */}
          <Router basename={basename}>
            <Routes>
              {/* All your routes will now work correctly in both environments */}
              <Route path="/" element={<Navigate to="/blogs" replace />} />
              <Route path="/blogs" element={<AllBlogs />} />
              {/* <Route path="/scan" element={<Navigate to="/scan/index.html" replace />} /> */}
              <Route
                path="/blogs/create"
                element={
                  <>
                    <SignedIn>
                      <CreateBlog />
                    </SignedIn>
                    <SignedOut>
                      <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
                        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Box
                            sx={{
                              bgcolor: "#fff",
                              p: 5,
                              borderRadius: 3,
                              boxShadow: 6,
                              minWidth: 320,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                              Please sign in to continue
                            </Typography>
                            <SignInButton
                              mode="modal"
                              fallbackRedirectUrl="/blogs/create"
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                  mt: 2,
                                  textTransform: "none",
                                  fontWeight: 600,
                                  fontSize: "1rem",
                                  bgcolor: "#4285F4",
                                  "&:hover": { bgcolor: "#357ae8" },
                                  width: "100%",
                                }}
                                fullWidth
                              >
                                Sign in
                              </Button>
                            </SignInButton>
                          </Box>
                        </Box>
                      </Box>
                    </SignedOut>
                  </>
                }
              />
              <Route path="/blogs/:id" element={<SingleBlog />} />
              <Route
                path="/sign-in"
                element={
                  <SignedOut>
                    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <SignInButton />
                    </Box>
                  </SignedOut>
                }
              />
              <Route path="/complete-signup" element={<CompleteSignup />} />
            </Routes>
          </Router>
        </Box>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App;