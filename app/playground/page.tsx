"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Divider,
  Link,
  IconButton,
  InputAdornment,
  Container,
  Box,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): string | undefined => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return undefined;
  };

  const handleInputChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate form
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Login successful:", formData);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 3,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 400,
            boxShadow: 3,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={3}>
              {/* Header */}
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Welcome Back
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Sign in to your account to continue
                </Typography>
              </Box>

              {/* Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    error={!!errors.email}
                    helperText={errors.email}
                    autoComplete="email"
                  />

                  <TextField
                    fullWidth
                    required
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange("password")}
                    error={!!errors.password}
                    helperText={errors.password}
                    autoComplete="current-password"
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={
                                showPassword
                                  ? "hide the password"
                                  : "display the password"
                              }
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <Box sx={{ textAlign: "right" }}>
                    <Link
                      href="#"
                      variant="body2"
                      sx={{ textDecoration: "none" }}
                    >
                      Forgot Password?
                    </Link>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    loading={isLoading}
                  >
                    Sign In
                  </Button>
                </Stack>
              </Box>

              {/* Divider */}
              <Divider>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  or
                </Typography>
              </Divider>

              {/* Social Login */}
              <Stack spacing={1}>
                <Button variant="outlined" fullWidth startIcon={<GoogleIcon />}>
                  Continue with Google
                </Button>

                <Button variant="outlined" fullWidth startIcon={<GitHubIcon />}>
                  Continue with GitHub
                </Button>
              </Stack>

              {/* Footer */}
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Don't have an account?{" "}
                  <Link
                    href="#"
                    sx={{ textDecoration: "none", fontWeight: "medium" }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
