import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	Bell,
	CircleUser,
	Command,
	Layers2,
	LineChart,
	Loader2,
	Menu,
	MessageCircleDashed,
	MessagesSquare,
	Paperclip,
	Radio,
	Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Scenario from "./scenario/Scenario";
import Interview from "./interview/Interview";
import Resume from "./resume/Resume";
import { getUserId } from "@/helpers/api";
import { DashboardPage } from "./DashboardPage";
import InterviewSession from "./session/Session";
import { useNavigate } from "react-router-dom";
import Report from "./report/Report";
import Session from "./session/SessionDash";
import DemoPage from "./session/page";

function Dashboard() {
	const [selectedComponent, setSelectedComponent] = useState("Dashboard");
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	getUserId(localStorage.getItem("token"));
	const userId = localStorage.getItem("_id");
	useEffect(() => {
		// Simulate loading state
		setIsLoading(true);
		setIsLoading(false);
	}, [selectedComponent]);

	const renderComponent = () => {
		if (isLoading) {
			return (
				<div className="flex justify-center items-center h-full">
					<Loader2 className="h-8 w-8 animate-spin" />
				</div>
			);
		}

		switch (selectedComponent) {
			case "Dashboard":
				return <DashboardPage></DashboardPage>;
			case "Scenario":
				return (
					<div>
						<Scenario userId={userId}></Scenario>
					</div>
				);
			case "Interview":
				return (
					<div>
						<Interview userId={userId}></Interview>
					</div>
				);
			case "Session":
				return (
					<div>
						<DemoPage></DemoPage>
					</div>
				);
			case "Report":
				return <Report></Report>;
			case "Resume":
				return (
					<div>
						<Resume></Resume>
					</div>
				);
			default:
				return <div>Dashboard Content</div>;
		}
	};

	const logout = () => {
		localStorage.clear();
		navigate("/log-in");
	};

	return (
		<div className="relative min-h-screen w-screen bg-white">
			<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<div className="hidden border-r bg-muted/40 md:block">
					<div className="flex h-full max-h-screen flex-col gap-2">
						<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
							<Link href="/" className="flex items-center gap-2 font-semibold">
								<MessageCircleDashed className="h-6 w-6" />
								<span className="">Intervue</span>
							</Link>
							<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
								<Bell className="h-4 w-4" />
								<span className="sr-only">Toggle notifications</span>
							</Button>
						</div>
						<div className="flex-1">
							<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
								<button
									onClick={() => setSelectedComponent("Dashboard")}
									className={`flex items-center gap-3  px-3 py-2 transition-all ${
										selectedComponent === "Dashboard"
											? "bg-primary text-muted"
											: "bg-muted text-primary hover:text-primary"
									} rounded-tl-[12px] rounded-tr-[12px]`}
								>
									<Command className="h-4 w-4" />
									Dashboard
								</button>
								<button
									onClick={() => setSelectedComponent("Scenario")}
									className={`flex items-center gap-3  px-3 py-2 transition-all ${
										selectedComponent === "Scenario"
											? "bg-primary text-muted"
											: "bg-muted text-primary hover:text-primary"
									}`}
								>
									<Layers2 className="h-4 w-4" />
									Scenario
								</button>
								<button
									onClick={() => setSelectedComponent("Interview")}
									className={`flex items-center gap-3  px-3 py-2 transition-all ${
										selectedComponent === "Interview"
											? "bg-primary text-muted"
											: "bg-muted text-primary hover:text-primary"
									}`}
								>
									<MessagesSquare className="h-4 w-4" />
									Interview
								</button>
								<button
									onClick={() => setSelectedComponent("Session")}
									className={`flex items-center gap-3  px-3 py-2 transition-all ${
										selectedComponent === "Session"
											? "bg-primary text-muted"
											: "bg-muted text-primary hover:text-primary"
									}`}
								>
									<Radio className="h-4 w-4" />
									Session
								</button>
								<button
									onClick={() => setSelectedComponent("Report")}
									className={`flex items-center gap-3  px-3 py-2 transition-all ${
										selectedComponent === "Report"
											? "bg-primary text-muted"
											: "bg-muted text-primary hover:text-primary"
									}`}
								>
									<LineChart className="h-4 w-4" />
									Report
								</button>
								<button
									onClick={() => setSelectedComponent("Resume")}
									className={`flex items-center gap-3  px-3 py-2 transition-all ${
										selectedComponent === "Resume"
											? "bg-primary text-muted"
											: "bg-muted text-primary hover:text-primary"
									} rounded-bl-[12px] rounded-br-[12px]`}
								>
									<Paperclip className="h-4 w-4" />
									Resume
								</button>
							</nav>
						</div>

						<div className="mt-auto p-4">
							<Card x-chunk="dashboard-02-chunk-0">
								<CardHeader className="p-2 pt-0 md:p-4">
									<CardTitle>Upgrade to Pro</CardTitle>
									<CardDescription>
										Unlock all features and get unlimited access to our support
										team.
									</CardDescription>
								</CardHeader>
								<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
									<Button size="sm" className="w-full">
										Upgrade
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									className="shrink-0 md:hidden"
								>
									<Menu className="h-5 w-5" />
									<span className="sr-only">Toggle navigation menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="flex flex-col">
								<nav className="grid gap-2 text-lg font-medium">
									<Link
										href="#"
										className="flex items-center gap-2 text-lg font-semibold"
									>
										<MessageCircleDashed className="h-6 w-6" />
										<span className=" ">Intervue</span>
									</Link>
									<button
										onClick={() => setSelectedComponent("Dashboard")}
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<Command className="h-5 w-5" />
										Dashboard
									</button>
									<button
										onClick={() => setSelectedComponent("Scenario")}
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
									>
										<Layers2 className="h-5 w-5" />
										Scenario
									</button>
									<button
										onClick={() => setSelectedComponent("Interview")}
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<MessagesSquare className="h-5 w-5" />
										Interview
									</button>
									<button
										onClick={() => setSelectedComponent("Session")}
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<Radio className="h-5 w-5" />
										Session
									</button>
									<button
										onClick={() => setSelectedComponent("Report")}
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<LineChart className="h-5 w-5" />
										Report
									</button>
									<button
										onClick={() => setSelectedComponent("Resume")}
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<Paperclip className="h-5 w-5" />
										Resume
									</button>
								</nav>
								<div className="mt-auto">
									<Card>
										<CardHeader>
											<CardTitle>Upgrade to Pro</CardTitle>
											<CardDescription>
												Unlock all features and get unlimited access to our
												support team.
											</CardDescription>
										</CardHeader>
										<CardContent>
											<Button size="sm" className="w-full">
												Upgrade
											</Button>
										</CardContent>
									</Card>
								</div>
							</SheetContent>
						</Sheet>
						<div className="w-full flex-1">
							<form>
								<div className="relative">
									<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										type="search"
										placeholder="Search Intervue..."
										className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
									/>
								</div>
							</form>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full"
								>
									<CircleUser className="h-5 w-5" />
									<span className="sr-only">Toggle user menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<Link to={"/setting"}>
									<DropdownMenuItem>Settings</DropdownMenuItem>
								</Link>
								<DropdownMenuItem>Support</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => logout()}>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</header>

					{renderComponent()}
				</div>
			</div>{" "}
		</div>
	);
}

export default Dashboard;
