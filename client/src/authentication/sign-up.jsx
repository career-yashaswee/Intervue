import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { isUniqueUsername, registerUser } from "@/helpers/authAPI";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { CircleX, CircleCheck, CircleAlert } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Spinner } from "@/components/ui/spinner";
import { LoadingButton } from "@/components/ui/loading-button";
const schema = z.object({
  username: z
    .string()
    .min(4, { message: "Too Short" })
    .max(8, { message: "Too Long" })
    .regex(/^[a-z0-9-]+$/, {
      message: "hypen 0-8 a-z allowed only",
    }),
});

export default function SignUp() {
  const referrer = localStorage.getItem("referrer");
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUsernameUnique, setIsUsernameUnique] = useState(null);

  const [username, email, firstName, lastName, password] = watch([
    "username",
    "email",
    "firstName",
    "lastName",
    "password",
  ]);
  const debouncedUsername = useDebounce(username, 500); // Adjust delay as needed

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const validateUsername = async (debouncedUsername) => {
      const { success } = schema.safeParse({
        username: debouncedUsername,
      });
      if (success) {
        try {
          setLoading(true);
          const isUnique = await isUniqueUsername(debouncedUsername);
          setIsUsernameUnique(isUnique);
        } catch (err) {
          toast.error("Error checking username uniqueness.");
        } finally {
          setLoading(false);
        }
      } else {
        setIsUsernameUnique(false);
      }
    };
    validateUsername(debouncedUsername);
  }, [debouncedUsername]);

  const onSubmit = async () => {
    setLoading(true);
    const userData = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    try {
      await registerUser(userData)
        .then(() => {
          localStorage.setItem("user@email", email);
          toast.success(`Verify your Email Address`);
          navigate("/verify");
        })
        .catch((error) => {
          const errorTXT = error.response.data.message;
          toast.error(errorTXT);
        });
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-screen">
      {/* Left Half with Gradient Background */}
      <div className="flex-1 flex items-center justify-center">
        <div className="h-full w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="relative z-10 text-sm md:text-7xl  bg-clip-text text-transparent text-white text-center font-sans font-bold">
              I'm Jobie Ai
            </h1>
            <p></p>
            { referrer == "onboard" && <p className="text-slate-400 max-w-lg mx-auto my-3 text-sm text-center relative z-10">
              Sign up to help me give you access to your personalised learning
              roadmap and your next 3 best-steps to achieve your career goals 10X
              Quicker!
            </p>}
          </div>
          <BackgroundBeams />
        </div>
      </div>
      {/* Right Half with Sign-Up Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-xl pl-2 gradient-text">
                Sign Up
              </CardTitle>
              <CardDescription className="pl-2 pb-4">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="flex items-center">
                      <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            id="username"
                            placeholder="Your username here"
                            {...field}
                            className={`${
                              errors.username
                                ? "ring-2 ring-red-500"
                                : isUsernameUnique === false
                                ? "ring-2 ring-yellow-500"
                                : isUsernameUnique === true
                                ? "ring-2 ring-green-500"
                                : ""
                            }`}
                          />
                        )}
                      />
                      {errors.username ? (
                        <span className="text ml-2">
                          <CircleAlert className="h-4 w-4 text-yellow-500" />
                        </span>
                      ) : isUsernameUnique === true ? (
                        <span className="text ml-2">
                          <CircleCheck className="h-4 w-4 text-green-500" />
                        </span>
                      ) : isUsernameUnique === false ? (
                        <span className="text ml-2">
                          <CircleX className="h-4 w-4 text-red-500" />
                        </span>
                      ) : loading ? (
                        <Spinner size="small" />
                      ) : null}
                    </div>
                    <div className="h-4">
                      {errors.username && (
                        <p className="flex items-center text-red-500 font-mono text-xs leading-tight">
                          <span className="mr-1">
                            <CircleAlert className="h-3 w-3" />
                          </span>
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            id="firstName"
                            placeholder="Rohit"
                            {...field}
                            required
                          />
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            id="lastName"
                            placeholder="Kumar"
                            {...field}
                            required
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@domain.com"
                          {...field}
                          required
                        />
                      )}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="flex items-center">
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...field}
                            required
                          />
                        )}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="ml-2"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 transition-opacity duration-300 opacity-100" />
                        ) : (
                          <EyeIcon className="h-4 w-4 transition-opacity duration-300 opacity-100" />
                        )}
                      </button>
                    </div>
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>
                  {loading ? (
                    <LoadingButton loading></LoadingButton>
                  ) : (
                    <Button variant="shine" type="submit" className="w-full">
                      Create account
                    </Button>
                  )}

                  <Button variant="outline" className="w-full">
                    Sign up with Google
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/log-in" className="text-blue-500 hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
