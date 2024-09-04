import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PlusCircle,
  Pencil,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Diamond,
  MoreVertical,
  Trash,
} from "lucide-react";


const ProfileHeader = ({ isLoading }) => {


  if (isLoading) {
    return (
      <Card>
        <div className="h-32 bg-muted"></div>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mt-4">
            <Skeleton className="h-8 w-32" />
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600"></div>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
          <Avatar className="w-32 h-32 border-4 border-background absolute -top-16 sm:static">
            <AvatarImage
              src="/placeholder.svg?height=128&width=128"
              alt="Profile picture"
            />
            <AvatarFallback>YK</AvatarFallback>
          </Avatar>
          <div className="space-y-1 mt-16 sm:mt-0">
            <h1 className="text-2xl font-bold">Yashaswee Kesharwani</h1>
            <p className="text-muted-foreground">Founder at Final Take</p>
            <p className="text-sm text-muted-foreground">
              Phagwara, Punjab, India • Remote
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mt-4">
          <div className="flex items-center space-x-2">
            <Diamond className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Profile Score</p>
              <Progress value={85} className="w-24 h-2" />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Contact Info
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              (123) 456-7890
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AboutSection = ({ isLoading, isEditing, setIsEditing }) => {
  const [expanded, setExpanded] = useState(false);
  const fullText =
    "Hi, I'm Yashaswee Kesharwani, currently pursuing a Bachelor's degree in Computer Science and Engineering from Lovely Professional University, minoring in Data Science, expected to graduate in 2026. My academic background is enriched with a solid understanding of Full Stack Web Development, Machine Learning/Artificial Intelligence, alongside proficiency in Java and Python. As the founder of Final Take, a data-first marketing firm, I have successfully driven brand value and sales for startups and content creators through innovative, data-driven ad optimization strategies. This role has sharpened my ability to analyze market dynamics, deploy effective marketing tactics, and generate significant revenue growth. I'm always eager to connect with like-minded professionals and explore opportunities to collaborate on exciting projects. Let's connect and see how we can make a difference together!";
  const shortText = fullText.slice(0, 300) + "...";

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-24" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>About</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            className="min-h-[100px]"
            placeholder="Tell us about yourself..."
            defaultValue={fullText}
          />
        ) : (
          <>
            <p>{expanded ? fullText : shortText}</p>
            {fullText.length > 300 && (
              <Button
                variant="link"
                onClick={() => setExpanded(!expanded)}
                className="mt-2 p-0"
              >
                {expanded ? (
                  <>
                    See less <ChevronUp className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    See more <ChevronDown className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            )}
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Top skills</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Full-Stack Development</Badge>
                <Badge variant="secondary">Machine Learning</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">React.js</Badge>
                <Badge variant="secondary">MongoDB</Badge>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const ExperienceSection = ({ isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Experience</CardTitle>
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src="/placeholder.svg?height=48&width=48"
              alt="Company logo"
            />
            <AvatarFallback>FT</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Founder</h3>
            <p className="text-sm text-muted-foreground">
              Final Take • Self-employed
            </p>
            <p className="text-sm text-muted-foreground">
              Jan 2023 - Present • 1 yr 9 mos
            </p>
            <p className="text-sm mt-2">
              • Boosted MRR for Startups and Content Creators leading to +20%
              increase in Brand Value through data.
            </p>
            <p className="text-sm">
              • Deploying Data Driven Ad-Optimisation Strategies to Facebook &
              Google Ads. growing client sales by 30%.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary">Data Analysis</Badge>
              <Badge variant="secondary">Digital Marketing</Badge>
              <Badge variant="secondary">Ad Optimization</Badge>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src="/placeholder.svg?height=24&width=24"
                  alt="Endorser"
                />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">
                Endorsed by John Smith, Marketing Director
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src="/placeholder.svg?height=48&width=48"
              alt="Company logo"
            />
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Digital Marketing Specialist</h3>
            <p className="text-sm text-muted-foreground">
              TechStart Inc. • Full-time
            </p>
            <p className="text-sm text-muted-foreground">
              Jun 2021 - Dec 2022 • 1 yr 7 mos
            </p>
            <p className="text-sm mt-2">
              • Led digital marketing campaigns resulting in a 45% increase in
              lead generation.
            </p>
            <p className="text-sm">
              • Implemented SEO strategies that improved organic traffic by 60%
              within 6 months.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary">SEO</Badge>
              <Badge variant="secondary">Lead Generation</Badge>
              <Badge variant="secondary">Campaign Management</Badge>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src="/placeholder.svg?height=24&width=24"
                  alt="Endorser"
                />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">
                Endorsed by Alice Miller, CEO of TechStart Inc.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EducationSection = ({ isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Education</CardTitle>
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src="/placeholder.svg?height=48&width=48"
              alt="University logo"
            />
            <AvatarFallback>LPU</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Lovely Professional University</h3>
            <p className="text-sm text-muted-foreground">
              Bachelor of Technology - BTech, Computer Science and Engineering
            </p>
            <p className="text-sm text-muted-foreground">Jul 2022 - Aug 2026</p>
            <p className="text-sm mt-2">
              Activities and societies: • Head of Divisions to Student
              Organisation, Wissen, spearheading 105+ membered team conducting
              5+ Mega events catering the academic and technical interests of
              30K+ Students
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src="/placeholder.svg?height=24&width=24"
                  alt="Endorser"
                />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">
                Endorsed by Dr. Priya Sharma, Dean of Computer Science
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SkillSection = ({ skill, endorsedBy, review, percentage }) => (
  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
    <div className="flex-1">
      <h4 className="font-semibold">{skill}</h4>
      <p className="text-sm text-muted-foreground">Endorsed by {endorsedBy}</p>
      <p className="text-sm">{review}</p>
    </div>
    <div className="relative w-16 h-16 flex-shrink-0">
      <svg viewBox="0 0 36 36" className="w-16 h-16">
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={`${percentage}, 100`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold">{percentage}%</span>
      </div>
    </div>
  </div>
);

const SkillsSection = ({ isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-24" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills</CardTitle>
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <SkillSection
          skill="Data Modeling"
          endorsedBy="Jane Smith"
          review="Yashaswee's data modeling skills are exceptional. He consistently delivers insightful analyses."
          percentage={95}
        />
        <Separator />
        <SkillSection
          skill="Email Marketing"
          endorsedBy="Mike Johnson"
          review="Yashaswee's email campaigns have significantly improved our conversion rates."
          percentage={88}
        />
        <Separator />
        <SkillSection
          skill="Python"
          endorsedBy="Sarah Lee"
          review="Yashaswee's Python scripts have automated many of our data processing tasks, saving us countless hours."
          percentage={92}
        />
        <Separator />
        <SkillSection
          skill="SQL"
          endorsedBy="Alex Chen"
          review="Yashaswee's SQL queries are always optimized and efficient, handling large datasets with ease."
          percentage={90}
        />
      </CardContent>
    </Card>
  );
};

const ProjectsSection = ({ isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <PlusCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">
            Anonymous Ai Feedback Sharing Platform
          </h3>
          <p className="text-sm text-muted-foreground">Jun 2024 - Present</p>
          <div className="flex items-center space-x-2 mt-1">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src="/placeholder.svg?height=24&width=24"
                alt="University logo"
              />
              <AvatarFallback>LPU</AvatarFallback>
            </Avatar>
            <p className="text-sm">
              Associated with Lovely Professional University
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="secondary">REST APIs</Badge>
            <Badge variant="secondary">Full-Stack Development</Badge>
            <Badge variant="secondary">+5 skills</Badge>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <img
              src="/placeholder.svg?height=80&width=120"
              alt="Project screenshot"
              className="rounded-md"
            />
            <div>
              <h4 className="font-semibold">Ai Anonymous Feedback</h4>
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold">Intervue</h3>
          <p className="text-sm text-muted-foreground">Jun 2024 - Present</p>
          <div className="flex items-center space-x-2 mt-1">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src="/placeholder.svg?height=24&width=24"
                alt="University logo"
              />
              <AvatarFallback>LPU</AvatarFallback>
            </Avatar>
            <p className="text-sm">
              Associated with Lovely Professional University
            </p>
          </div>
          <p className="text-sm mt-2">
            Intervue is an AI-powered mock interview and assessment application
            designed to transform the way candidates prepare for their dream
            jobs. Our application leverages cutting-edge artificial intelligence
            technology to p...
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="secondary">Express.js</Badge>
            <Badge variant="secondary">Node.js</Badge>
            <Badge variant="secondary">+9 skills</Badge>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <img
              src="/placeholder.svg?height=80&width=120"
              alt="Project screenshot"
              className="rounded-md"
            />
            <div>
              <h4 className="font-semibold">Intervue</h4>
              <p className="text-sm">
                Developed a full-stack SaaS-based AI Video Interview Platform
                using the M.E.R.N stack, integrating React Hook Forms with Zod
                for schema validation and shadCN with Framer Motion an...
              </p>
            </div>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          Show all 3 projects
        </Button>
      </CardContent>
    </Card>
  );
};

const CoursesSection = ({ isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Courses</CardTitle>
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Advanced Data Analysis Techniques</h3>
          <p className="text-sm text-muted-foreground">Coursera</p>
          <div className="flex items-center space-x-2 mt-1">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src="/placeholder.svg?height=24&width=24"
                alt="Instructor"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p className="text-sm">
              Endorsed by Dr. John Doe, Data Science Professor
            </p>
          </div>
          <p className="text-sm mt-1">Grade: A+ (98%)</p>
          <p className="text-sm text-muted-foreground">Completed: May 2023</p>
          <Button variant="link" className="p-0 h-auto mt-1">
            View Certificate
          </Button>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold">Digital Marketing Masterclass</h3>
          <p className="text-sm text-muted-foreground">Udemy</p>
          <div className="flex items-center space-x-2 mt-1">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src="/placeholder.svg?height=24&width=24"
                alt="Instructor"
              />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <p className="text-sm">Endorsed by Jane Smith, Marketing Expert</p>
          </div>
          <p className="text-sm mt-1">Grade: A (95%)</p>
          <p className="text-sm text-muted-foreground">
            Completed: August 2023
          </p>
          <Button variant="link" className="p-0 h-auto mt-1">
            View Certificate
          </Button>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold">Full Stack Web Development</h3>
          <p className="text-sm text-muted-foreground">freeCodeCamp</p>
          <div className="flex items-center space-x-2 mt-1">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src="/placeholder.svg?height=24&width=24"
                alt="Instructor"
              />
              <AvatarFallback>QW</AvatarFallback>
            </Avatar>
            <p className="text-sm">
              Endorsed by Quincy Larson, Founder of freeCodeCamp
            </p>
          </div>
          <p className="text-sm mt-1">Grade: Pass</p>
          <p className="text-sm text-muted-foreground">
            Completed: October 2023
          </p>
          <Button variant="link" className="p-0 h-auto mt-1">
            View Certificate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Component() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <ProfileHeader isLoading={isLoading} />
      <AboutSection
        isLoading={isLoading}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <ExperienceSection isLoading={isLoading} />
      <EducationSection isLoading={isLoading} />
      <ProjectsSection isLoading={isLoading} />
      <SkillsSection isLoading={isLoading} />
      <CoursesSection isLoading={isLoading} />
    </div>
  );
}
