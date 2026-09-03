import type { Project, CategoryDef } from '../store'
import { projectTitle } from '../store'
import { useLang } from '../i18n'

interface Props {
  projects: Project[]
  categories: CategoryDef[]
  onProjectClick: (project: Project) => void
}

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1784031208107-f489c769e1f9?w=600&h=800&fit=crop&auto=format'

function ProjectCard({ project, lang, onClick }: { project: Project; lang: string; onClick: () => void }) {
  return (
    <article
      className="flex-shrink-0 w-40 sm:w-48 lg:w-52 cursor-pointer group"
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter') onClick() }}
      tabIndex={0}
      role="button"
    >
      <div className="aspect-[2/3] mb-3 p-1.5 rounded-[1.25rem] bg-ink/[0.04] ring-1 ring-ink/[0.06] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-ink/[0.12] group-hover:shadow-[0_12px_40px_rgba(34,30,23,0.14)]">
        <div className="w-full h-full overflow-hidden rounded-[calc(1.25rem-0.375rem)] bg-cream-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
          <img
            src={project.coverImage}
            alt={projectTitle(project, lang as 'vi' | 'en')}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
            loading="lazy"
            onError={e => { ;(e.target as HTMLImageElement).src = FALLBACK_COVER }}
          />
        </div>
      </div>
      <p className="font-display font-normal text-[19px] tracking-[-0.005em] leading-[1.32] text-ink truncate mb-0.5">
        {projectTitle(project, lang as 'vi' | 'en')}
      </p>
      <p className="font-ui font-light text-[12px] tracking-[0.04em] text-muted tabular-nums">{project.date}</p>
    </article>
  )
}

export default function PortfolioSection({ projects, categories, onProjectClick }: Props) {
  const { lang } = useLang()

  return (
    <section id="portfolio" className="py-20 lg:py-28 border-t border-line bg-cream">
      {/* Header */}
      <div data-reveal className="px-[clamp(20px,4vw,64px)] mb-12">
        <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-semibold uppercase text-ink tracking-wide">
          {lang === 'vi' ? 'DỰ ÁN' : 'PROJECTS'}
        </h2>
      </div>

      {/* Groups by category */}
      <div className="flex flex-col gap-14">
        {categories.map(cat => {
          const catProjects = projects.filter(p => p.category === cat.id)
          if (catProjects.length === 0) return null
          const label = lang === 'vi' ? cat.vi : cat.en
          return (
            <div key={cat.id} data-reveal>
              {/* Category label */}
              <div className="px-[clamp(20px,4vw,64px)] mb-5 flex items-center gap-4">
                <span className="font-ui font-bold text-[15px] tracking-[0.06em] uppercase text-ink">
                  {label}
                </span>
                <div className="flex-1 h-px bg-line" />
              </div>
              {/* Horizontal scroll */}
              <div className="flex gap-5 overflow-x-auto px-[clamp(20px,4vw,64px)] pb-2">
                {catProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    lang={lang}
                    onClick={() => onProjectClick(project)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
