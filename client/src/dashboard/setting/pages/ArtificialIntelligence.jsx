import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ArtificialIntelligence() {
	return (
		<main className="flex gap-6 flex-col">
			<Card x-chunk="dashboard-04-chunk-1">
				<CardHeader>
					<CardTitle>Google Gemini Key</CardTitle>
					<CardDescription>
						Get your Gemini API key from the Google Ai Studio
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<Input placeholder="API Key" />
					</form>
				</CardContent>
				<CardFooter className="border-t px-6 py-4">
					<Button variant="shine">Lock</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
