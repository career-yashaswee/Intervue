import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { listReport } from "@/helpers/reportAPI";
import { Info, Loader2, ShieldAlert } from "lucide-react";

function Report({ userId }) {
	const [title, setTitle] = useState("");
	const [company, setCompany] = useState("");
	const [description, setDescription] = useState("");
	const [experience, setExperience] = useState("");
	const [errors, setErrors] = useState({});
	const handleSave = async (e) => {
		e.preventDefault();

		const data = {
			userId: userId,
			jobTitle: title,
			jobDescription: description,
			experience: parseInt(experience, 10),
			company: company,
		};

		try {
			const response = await listReport(userId);
			setScenarios(response);
		} catch (error) {
			if (error instanceof z.ZodError) {
				const fieldErrors = error.errors.reduce((acc, curr) => {
					acc[curr.path[0]] = curr.message;
					return acc;
				}, {});
				setErrors(fieldErrors);
			} else {
				console.error("Error saving scenario:", error);
			}
		}
	};

	const [scenarios, setScenarios] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const fetchReport = async () => {
			setLoading(true);
			try {
				const response = await listReport(userId);
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

		fetchReport();
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
				<ShieldAlert className="h-5 w-5 animate-spin" />
				<p className="text-sm">{error}</p>
			</div>
		);
	}

	return (
		<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl gradient-text">
					Report
				</h1>
			</div>
			{scenarios.length === 0 ? (
				<div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
					<div className="flex flex-col items-center gap-1 text-center pb-8 pt-8">
						<Info></Info>
						<h3 className="text-2xl font-bold tracking-tight">
							No Reports Generated
						</h3>
						<p className="text-sm text-muted-foreground">
							New reports will be automatically generated, once you finish an
							interview session.
						</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{scenarios.map((scenario) => (
						<Card key={scenario._id} className="flex flex-col">
							<CardHeader>
								<CardTitle>{scenario.jobTitle}</CardTitle>
								<p>{scenario.company}</p>
							</CardHeader>
							<CardContent>
								<p>{scenario.jobDescription}</p>
								<p>Experience: {scenario.experience} years</p>
							</CardContent>
							<CardFooter className="flex justify-between border-t px-6 py-4">
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleEdit(scenario)}
								>
									Edit
								</Button>
								<Button variant="shine" size="sm">
									View
								</Button>
							</CardFooter>
						</Card>
					))}
					<div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm gap-1 text-center pb-8 pt-8 min-h-[12rem]">
						<Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
							<DialogTrigger asChild>
								<div
									className="flex text-sm items-center justify-center"
									onClick={handleOpen}
									style={{
										width: "100%",
										height: "100%",
										cursor: "pointer",
									}}
								>
									<i>Click here to add a Job Scenario</i>
								</div>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>
										{editingScenario ? "Edit Scenario" : "Create Scenario"}
									</DialogTitle>
								</DialogHeader>
								<form className="grid gap-6">
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
										<Button variant="outline" size="sm" type="reset">
											Discard
										</Button>
										<Button onClick={handleSave} size="sm" type="submit">
											Save Scenario
										</Button>
									</div>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			)}
		</main>
	);
}

export default Report;
