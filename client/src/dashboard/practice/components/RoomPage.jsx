import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loading-button";
import { CircleAlert, SquareMousePointer } from "lucide-react";

export default function RoomPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState("");

  const handleNewRoom = () => {
    const uuid = uuidv4();
    setRoomId(uuid); // Update the roomId state
    setValue("roomId", uuid); // Update the form value immediately
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (!data.roomId) {
        toast.error("Room ID is required");
        return;
      }
      if (!data.username) {
        toast.error("Username is required");
        return;
      }
      // Perform the navigation
      navigate(`/practice/editor/${data.roomId}`, {
        state: {
          username: data.username,
        },
      });
    } catch (err) {
      toast.error("Invalid Room ID");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid gap-2 text-left">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <SquareMousePointer />
            <CardTitle className="text-xl font-bold gradient-text ant">
              Join Room
            </CardTitle>
            <CardDescription className="text-balance text-muted-foreground">
              Code Collaboratively with real-time cursors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="roomId">Room ID</Label>
                <Input
                  id="roomId"
                  value={roomId}
                  type="text"
                  autoComplete="on"
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Your Room ID here"
                  {...register("roomId", {
                    required: "Room ID is required",
                    onChange: (e) => setRoomId(e.target.value),
                  })}
                />
                {errors.roomId && (
                  <div className="flex items-center">
                    <CircleAlert className="h-3 w-3 mr-1 text-red-500" />
                    <p className="text-xs text-red-500">
                      {errors.roomId.message}
                    </p>
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  autoComplete="on"
                  placeholder="Your username here"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <div className="flex items-center">
                    <CircleAlert className="h-3 w-3 mr-1 text-red-500" />
                    <p className="text-xs text-red-500">
                      {errors.username.message}
                    </p>
                  </div>
                )}
              </div>
              {loading ? (
                <LoadingButton loading />
              ) : (
                <Button variant="shine" type="submit" className="w-full">
                  Join Room
                </Button>
              )}
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have a Room?{" "}
              <div
                onClick={handleNewRoom}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Create Now
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
