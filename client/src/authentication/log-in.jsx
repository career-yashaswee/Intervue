import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../components/ui/card";
import { BackgroundBeams } from "@/components/ui/background-beams";

// import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Toggle } from "../components/ui/toggle";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loading-button";
import { CircleAlert, LogIn } from "lucide-react";

export default function Login() {
  const referrer = localStorage.getItem("referrer");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    //TODO: Make the URL Consistent by adding it to the .env file and referencing it here.
    try {
      const response1 = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/auth/login`,
        data
      );

      localStorage.setItem("token", response1.data.token);

      navigate("/dashboard"); // Redirect to a protected route
    } catch (err) {
      toast.error("Incorrect Username or Password");
      // setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="h-full w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="relative z-10 text-sm md:text-7xl  bg-clip-text text-transparent text-white text-center font-sans font-bold">
              I'm Jobie Ai
            </h1>
            <p></p>
            {referrer == "onboard" && (
              <p className="text-slate-400 max-w-lg mx-auto my-3 text-sm text-center relative z-10">
                Sign up to help me give you access to your personalised learning
                roadmap and your next 3 best-steps to achieve your career goals
                10X Quicker!
              </p>
            )}
          </div>
          <BackgroundBeams />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold gradient-text">
                <LogIn></LogIn> Login
              </CardTitle>
              <CardDescription className="text-balance text-muted-foreground">
                Enter your username below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 mt-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    autoComplete="on"
                    placeholder="Your Username here"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    required
                  />
                  {errors.username && (
                    <div className="flex items-center">
                      <CircleAlert className="h-3 w-3 mr-1 text-red-500"></CircleAlert>
                      <p className="text-xs text-red-500">
                        {errors.username.message}
                      </p>
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="ml-auto inline-block text-sm text-blue-500 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="on"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    required
                  />
                  {errors.password && (
                    <div className="flex items-center">
                      <CircleAlert className="h-3 w-3 mr-1 text-red-500"></CircleAlert>
                      <p className="text-xs text-red-500">
                        {errors.password.message}
                      </p>
                    </div>
                  )}
                </div>
                <Toggle
                  className="absolute inset-y-0 right-0 px-3 py-1 text-sm text-gray-600"
                  onChange={togglePasswordVisibility}
                  checked={showPassword}
                />
                {loading ? (
                  <LoadingButton loading></LoadingButton>
                ) : (
                  <Button variant="shine" type="submit" className="w-full">
                    Login
                  </Button>
                )}
              </form>
              {error && <p>{error}</p>}

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/sign-up" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

//!TODO: Fix the Resizing Problem : https://stackoverflow.com/questions/69250282/googles-sign-in-button-resizes-after-loading
