"use client"

import SectionHeading from "./SectionHeading"
import ProjectCard from "./ProjectCard"
import { projects } from "@/data/projects"

export default function FeaturedProjects() {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
  const other = projects
    .filter((p) => !p.featured)
    .sort((a, b) => a.order - b.order)

  return (
    <section id="projects" className="py-24 md:py-32 px-6 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/[0.04] rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          label="Projects"
          title="Featured Work"
          subtitle="Systems I've designed and built — from retrieval-augmented research assistants to production ML pipelines."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {other.length > 0 && (
          <div className="mt-16">
            <h3 className="text-sm font-mono text-muted tracking-wider uppercase mb-8">
              More Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {other.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i + featured.length}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
