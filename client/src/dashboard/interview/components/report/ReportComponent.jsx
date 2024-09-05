import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	CircleHelp,
	Clock10,
	Feather,
	Gauge,
	ListChecks,
	User2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportComponent() {
	return (
		<div className="bg-background text-foreground min-h-[100dvh] flex flex-col">
			<header className="bg-muted py-4 px-6 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<User2 className="w-8 h-8" />
					<div>
						<h1 className="text-xl font-bold">Session Summary</h1>
						<p className="text-xs text-muted-foreground font-mono">
							session id
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div className="text-sm text-muted-foreground">
						<div>Date</div>
						<div>July 28, 2024</div>
					</div>
					<div className="text-sm text-muted-foreground">
						<div>Time</div>
						<div>2:00 PM</div>
					</div>
				</div>
			</header>
			<main className="flex-1 grid grid-cols-1 md:grid-cols-[240px_auto] gap-4 p-6">
				<section>
					<h2 className="text-lg font-bold mb-4">Session Statistics</h2>
					<div className="grid gap-6">
						<div className="flex items-center gap-4">
							<div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
								<Clock10 className="w-5 h-5 text-muted-foreground" />
							</div>
							<div className="flex-1">
								<h3 className="text-base font-medium">Duration</h3>
								<p className="text-sm text-muted-foreground">45 minutes</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
								<ListChecks className="w-5 h-5 text-muted-foreground" />
							</div>
							<div className="flex-1">
								<h3 className="text-base font-medium">Questions</h3>
								<p className="text-sm text-muted-foreground">12 questions</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
								<Gauge className="w-5 h-5 text-muted-foreground" />
							</div>
							<div className="flex-1">
								<h3 className="text-base font-medium">Average Rating</h3>
								<p className="text-sm text-muted-foreground">4.1</p>
							</div>
						</div>
					</div>
				</section>
				<section className="overflow-auto h-full">
					<h2 className="text-lg font-bold mb-4 gradient-text">Feedback</h2>
					<div className="grid gap-3">
						<Card className="pt-4">
							<CardContent className="flex items-center">
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-1">
											<h3 className="text-base font-medium">Question 1</h3>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<p className="text-sm text-muted-foreground">
											The candidate provided a thorough and well-structured
											response, demonstrating a strong understanding of the
											topic.
										</p>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button className="font flex-row-reverse" variant="outline">
									Know more
								</Button>
							</CardFooter>
						</Card>
					</div>
				</section>
			</main>
		</div>
	);
}
