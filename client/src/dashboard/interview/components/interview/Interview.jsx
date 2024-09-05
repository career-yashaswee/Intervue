import { Link } from "react-router-dom";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Loader2, Rabbit, ShieldAlert } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { listScenarios } from "@/helpers/scenarioAPI";
import { LoadingButton } from "@/components/ui/loading-button";
const FormSchema = z.object({
  scenario: z.string({
    required_error: "Select a Job Scenario",
  }),
  interviewer: z.string({
    required_error: "Select an Interviewer Profile",
  }),
});

function Interview({ userId }) {
  const [date, setDate] = useState();
  const [scenarios, setScenarios] = useState([]);
  const navigate = useNavigate();
  const [sessions, setsessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const handleOpen = () => setIsOpen(true);
  // const handleClose = () => {
  // 	setIsOpen(false);
  // };

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const response = await listScenarios(userId);
        setScenarios(response);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setScenarios([]);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchScenarios();
  }, [userId]);

  const handleStartSession = (_id) => {
    navigate(`./session?interviewSessionId=${_id}`);
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  useEffect(() => {
    // Fetch sessions from the server
    const fetchsessions = async () => {
      try {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${import.meta.env.VITE_BACKEND_URI}/interview?user=${userId}`,
          headers: {},
        };
        const response = await axios.request(config);
        setsessions(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setsessions([]); // No scenarios found
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchsessions();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen flex-col gap-2">
        <Loader2 className="h-5 w-5 animate-spin" />
        <p className="text-sm">Loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen flex-col gap-2">
        <ShieldAlert className="h-5 w-5" />
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl gradient-text">
          Interview
        </h1>
      </div>
      {sessions.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-screen">
          <div className="flex flex-col items-center gap-1 text-center pb-8 pt-8">
            <Info></Info>
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Interviews Scheduled
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start taking sessions as soon as you book an interview.
            </p>
            <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  className="mt-4"
                  variant="shine"
                  onClick={() => handleOpen}
                >
                  Book Interview
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {/* {editingScenario ? "Edit Interview" : "Create Interview"} */}
                    Create Interview
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="scenario"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Scenario</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Job Scenario" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {scenarios.map((scenario) => (
                                <SelectItem
                                  value={scenario._id}
                                  key={scenario._id}
                                >
                                  {scenario.jobTitle}, {scenario.company}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Refer Job Scenarios in the Scenario Section.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interviewer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interviewer</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                id="interviewer"
                                className="items-start [&_[data-description]]:hidden"
                              >
                                <SelectValue placeholder="Select an Interviewer Profile" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* {interviewers.map((interviewer) => ( */}
                              <SelectItem
                                value="Sally"
                                // key={interviewer._id}
                              >
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Rabbit className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      Neural{" "}
                                      <span className="font-medium text-foreground">
                                        Genesis
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Our fastest model for general use cases.
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                              {/* ))} */}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Refer Job Scenarios in the Scenario Section.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Your date of birth is used to calculate your age.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Interview Format</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row space-y-1 justify-start"
                            >
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="all" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Voice Only
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="mentions" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Video
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between gap-2">
                      <Button variant="outline" size="sm" type="reset">
                        Discard
                      </Button>
                      <Button size="sm" type="submit" className="">
                        Save Scenario
                      </Button>
                    </div>
                  </form>
                </Form>
                {/* <DialogFooter>
									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											size="sm"
											type="reset"
											onClick={handleClose}
										>
											Discard
										</Button>
										<Button size="sm" type="submit" onClick={handleSave}>
											Save Interview
										</Button>
									</div>
								</DialogFooter> */}
              </DialogContent>
            </Dialog>
            {/* <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
							<DialogTrigger asChild>
								<Button
									className="mt-4"
									variant="shine"
									onClick={() => handleOpen}
								>
									Create Scenario
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>
										{editingScenario ? "Edit Scenario" : "Create Scenario"}
									</DialogTitle>
								</DialogHeader>
								<form onSubmit={handleSave} className="grid gap-6">
									<div className="grid gap-3">
										<Label htmlFor="title">Job Title</Label>
										<Input
											id="title"
											placeholder="Machine Learning Senior Engineer"
											type="text"
											className="w-full"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
										/>
										{errors.jobTitle && (
											<span className="text-red-500">{errors.jobTitle}</span>
										)}
									</div>
									<div className="grid gap-3">
										<Label htmlFor="company">Institution</Label>
										<Input
											id="company"
											placeholder="Amazon"
											type="text"
											className="w-full"
											value={company}
											onChange={(e) => setCompany(e.target.value)}
										/>
										{errors.company && (
											<span className="text-red-500">{errors.company}</span>
										)}
									</div>
									<div className="grid gap-3">
										<Label htmlFor="description">Job Description</Label>
										<Textarea
											id="description"
											placeholder="Paste Job Description here"
											className="min-h-32"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
										/>
										{errors.jobDescription && (
											<span className="text-red-500">
												{errors.jobDescription}
											</span>
										)}
									</div>
									<div className="grid gap-3">
										<Label htmlFor="experience">Experience</Label>
										<Input
											type="number"
											id="experience"
											value={experience}
											onChange={(e) => setExperience(e.target.value)}
										/>
										{errors.experience && (
											<span className="text-red-500">{errors.experience}</span>
										)}
									</div>
								</form>
								<DialogFooter>
									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											size="sm"
											type="reset"
											onClick={handleClose}
										>
											Discard
										</Button>
										<Button size="sm" type="submit" onClick={handleSave}>
											Save Scenario
										</Button>
									</div>
								</DialogFooter>
							</DialogContent>
						</Dialog> */}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <Card key={session._id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{session.status}</CardTitle>
                <CardDescription>{session.inteviewerId}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <Button onClick={() => handleStartSession(session._id)}>
                  Start Interview
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}

export default Interview;
