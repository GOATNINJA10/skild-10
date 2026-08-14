import SkillCard from "#/components/SkillCard";
import { dummySkills } from "#/lib/dummySkills";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div id="home">
			<section className="hero">
				<div className="copy">
					<h1>The Registry for <br />
					<span className="text-gradient">Agentic Intelligence</span>
					</h1>
					<p>
						A high-performance registry for procedural agent skills. Discover, share, and run reusable agent capabilities from a unified workspace.
					</p>
				</div>
				<div className="actions">
					<Link to="/skills" className="btn-primary">
						<Terminal size={18} />
						<span>Explore Registry</span>
					</Link>
					<Link to="/skills/new" className="btn-secondary">
						Publish Skill
					</Link>
				</div>
			</section>

			<section className="latest">
				<div className="space-y-2">
					<h2>Latest Created 
					<span className="text-gradient"> Skills</span>
					</h2>
					<p>
						{" "}
						Discover the latest agentic skills from the database.
					</p>
				</div>
				<div>
					{dummySkills.length > 0 ? (
						<div className="skills-grid">
							{[...dummySkills].sort((a, b) => {
								if (a.createdAt === null && b.createdAt === null) return 0;
								if (a.createdAt === null) return 1;
								if (b.createdAt === null) return -1;
								return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
							}).map((skill) => (
								<SkillCard key={skill.id} {...skill}/>
							))}
						</div>
					): (
						<p>No skills found.</p>
					)}
				</div>
			</section>
		</div>
	);
}
