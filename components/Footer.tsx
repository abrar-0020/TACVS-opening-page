'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const links = {
  github: 'https://github.com/your-username/your-repo', /* TODO: replace */
  app:    'https://your-app.vercel.app',                /* TODO: replace */
}

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.footer-col', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="relative pt-24 pb-10 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080b12 0%, #000000 100%)' }}
    >
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.3) 50%, transparent 100%)' }}
      />

      {/* Background grid */}
      <div className="absolute inset-0 grid-overlay opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/8">

          {/* Brand column */}
          <div className="footer-col md:col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg glass-bright flex items-center justify-center glow-primary">
                <svg className="w-5 h-5 text-[#00d4ff]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
              </div>
              <div>
                <div className="font-display font-bold text-white text-sm leading-tight">TACVS</div>
                <div className="text-[10px] text-white/30 font-mono tracking-wider">Tokenized Credentials</div>
              </div>
            </div>

            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              A blockchain-native academic credential verification system that
              issues, stores, and verifies degrees as NFTs — tamper-proof and
              instant.
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {['Ethereum', 'IPFS', 'Solidity', 'Next.js', 'ERC-721'].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-1">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/50 hover:text-[#00d4ff] hover:border-[#00d4ff33] transition-colors duration-200"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
              </a>
              <a
                href={links.app}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/50 hover:text-[#00d4ff] hover:border-[#00d4ff33] transition-colors duration-200"
                aria-label="Live App"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav column */}
          <div className="footer-col flex flex-col gap-5">
            <h4 className="font-display font-semibold text-white text-sm">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Hero',         href: '#hero'         },
                { label: 'Problem',      href: '#problem'      },
                { label: 'Solution',     href: '#solution'     },
                { label: 'Architecture', href: '#architecture' },
                { label: 'Live Demo',    href: '#demo'         },
                { label: 'Features',     href: '#features'     },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/40 text-sm hover:text-[#00d4ff] transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack column */}
          <div className="footer-col flex flex-col gap-5">
            <h4 className="font-display font-semibold text-white text-sm">Tech Stack</h4>
            <ul className="flex flex-col gap-3">
              {[
                'Ethereum / EVM',
                'Solidity Smart Contracts',
                'IPFS + Pinata',
                'Next.js 16 App Router',
                'Ethers.js v6',
                'WalletConnect v3',
                'Tailwind CSS v4',
              ].map((item) => (
                <li key={item} className="text-white/40 text-sm flex items-center gap-2">
                  <svg className="w-3 h-3 text-[#00d4ff] flex-shrink-0" fill="currentColor" viewBox="0 0 6 6">
                    <circle cx="3" cy="3" r="3" opacity="0.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs font-mono">
            © {new Date().getFullYear()} Tokenized Academic Credential Verification System
          </p>
          <div className="flex items-center gap-1 text-white/25 text-xs font-mono">
            <span>Built with</span>
            <svg className="w-3 h-3 text-red-400 mx-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
            </svg>
            <span>on</span>
            <svg className="w-3 h-3 text-white/40 mx-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0Zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054Z" />
            </svg>
            <span>Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
