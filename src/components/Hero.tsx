import type { SiteProfile } from '../store'
import { profileName } from '../store'
import { useLang } from '../i18n'

interface Props {
  profile: SiteProfile
}

export default function Hero({ profile }: Props) {
  const { lang } = useLang()

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="about" className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.92fr] min-h-[min(88vh,860px)] bg-cream">
      {/* Text — left column / overlay on mobile */}
      <div className="relative z-10 flex flex-col justify-end lg:justify-center px-[clamp(20px,4vw,64px)] pb-[clamp(48px,8vw,110px)] pt-[clamp(48px,8vw,110px)] min-h-[min(88vh,860px)] lg:min-h-0 order-2 lg:order-1">
        <h1 className="font-ui font-semibold text-[clamp(36px,5.5vw,76px)] text-cream lg:text-ink tracking-[-0.02em] leading-[1.08] mb-8">
          {lang === 'vi' ? (
            <>Phong cách<br />& dấu ấn.</>
          ) : (
            <>Styling Stories,<br />Visual Impact.</>
          )}
        </h1>
        <p className="font-ui font-light text-[15px] text-cream/80 lg:text-ink-soft leading-[1.78] mb-12 max-w-[34ch]">
          {lang === 'vi'
            ? 'Stylist tại Việt Nam. Chuyên tạo phong cách cho editorial, thương mại, nghệ sĩ & nhiều hơn nữa.'
            : 'Stylist based in Vietnam. Specialized in fashion styling for editorial, commercial, artists & more.'}
        </p>
        <button
          onClick={() => scrollTo('portfolio')}
          className="self-start font-ui font-medium text-[11px] tracking-[0.18em] uppercase text-cream border border-cream/50 lg:text-ink lg:border-ink/30 px-6 py-3 hover:bg-cream hover:text-ink lg:hover:bg-ink lg:hover:text-cream active:scale-[0.98] transition-all duration-300"
        >
          {lang === 'vi' ? 'Xem dự án' : 'View work'}
        </button>
      </div>

      {/* Image — background on mobile, right column on desktop */}
      <div className="absolute inset-0 lg:relative lg:inset-auto overflow-hidden order-1 lg:order-2">
        <img
          src={profile.profilePhoto}
          alt={profileName(profile, lang)}
          className="w-full h-full object-cover object-[center_18%]"
        />
        {/* Dark overlay on mobile for text readability */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(180deg, rgba(34,30,23,0.25) 0%, rgba(34,30,23,0.65) 100%)' }}
        />
        {/* Gradient fade left on desktop */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{ background: 'linear-gradient(90deg, #fdf9ec 0%, rgba(253,249,236,.55) 20%, rgba(253,249,236,0) 58%)' }}
        />
      </div>
    </section>
  )
}
