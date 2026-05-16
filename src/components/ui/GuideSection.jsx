import { motion } from 'framer-motion'
import { Sparkles, Lightbulb, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

/**
 * GuideSection — Hộp hướng dẫn tái sử dụng có hiệu ứng đẹp.
 *
 * Props:
 *  - title: tiêu đề mục hướng dẫn
 *  - subtitle: mô tả ngắn dưới tiêu đề
 *  - steps: [{ icon, title, desc, tip? }]
 *  - tips: [string] - mảng mẹo nhỏ hiển thị bên dưới
 *  - accent: 'brand' | 'cyan' | 'pink' | 'emerald' | 'amber'
 *  - icon: lucide icon component cho header
 *  - compact: boolean - rút gọn padding
 *  - badgeText: chuỗi nhãn nhỏ ở header (vd: "Hướng dẫn", "5 bước")
 */

const ACCENTS = {
  brand:   { color: '#7c5cff', bg: 'rgba(110,75,255,0.12)',  border: 'rgba(110,75,255,0.30)',  text: 'text-brand-300',  glow: 'rgba(110,75,255,0.45)' },
  cyan:    { color: '#4dd0ff', bg: 'rgba(77,208,255,0.10)',  border: 'rgba(77,208,255,0.28)',  text: 'text-cyan-300',   glow: 'rgba(77,208,255,0.45)' },
  pink:    { color: '#f472b6', bg: 'rgba(244,114,182,0.10)', border: 'rgba(244,114,182,0.28)', text: 'text-pink-300',   glow: 'rgba(244,114,182,0.45)' },
  emerald: { color: '#2bf2c0', bg: 'rgba(43,242,192,0.10)',  border: 'rgba(43,242,192,0.28)',  text: 'text-emerald-300',glow: 'rgba(43,242,192,0.45)' },
  amber:   { color: '#fbbf24', bg: 'rgba(251,191,36,0.10)',  border: 'rgba(251,191,36,0.28)',  text: 'text-amber-300',  glow: 'rgba(251,191,36,0.45)' },
}

export default function GuideSection({
  title = 'Hướng dẫn sử dụng',
  subtitle,
  steps = [],
  tips = [],
  accent = 'brand',
  icon: HeaderIcon = Sparkles,
  compact = false,
  badgeText,
  className = '',
}) {
  const c = ACCENTS[accent] || ACCENTS.brand

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.22, 0.8, 0.22, 1] }}
      className={clsx('relative overflow-hidden rounded-3xl', compact ? 'p-5' : 'p-6 sm:p-7', className)}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(24px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${c.color}, transparent)` }} />

      {/* Decorative orbs */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none anim-float-y-slow"
        style={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`, opacity: 0.55 }} />
      <div className="absolute -bottom-16 -left-12 w-48 h-48 rounded-full pointer-events-none anim-float-y"
        style={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`, opacity: 0.35 }} />

      {/* Faint grid pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${c.color} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)',
        }} />

      {/* ── Header ── */}
      <div className="relative flex items-center gap-3 mb-5">
        <div className="relative w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: c.bg,
            border: `1px solid ${c.border}`,
            boxShadow: `0 0 24px -6px ${c.glow}`,
          }}>
          <HeaderIcon size={18} style={{ color: c.color }} />
          <span className="absolute inset-0 rounded-2xl anim-ring-pulse pointer-events-none" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-semibold text-white text-base sm:text-lg leading-tight">
              {title}
            </h3>
            {badgeText && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
                {badgeText}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-[13px] text-white/45 mt-0.5 leading-relaxed">{subtitle}</p>
          )}
        </div>
      </div>

      {/* ── Steps grid ── */}
      {steps.length > 0 && (
        <div className={clsx('relative grid gap-3',
          steps.length <= 3 ? 'sm:grid-cols-3' : steps.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'
        )}>
          {steps.map((s, i) => {
            const StepIcon = s.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, ease: [0.22, 0.8, 0.22, 1] }}
                className="step-pill group"
              >
                {/* connector arrow (desktop only, between steps) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                    style={{ color: c.color, opacity: 0.45 }}>
                    <ChevronRight size={16} />
                  </div>
                )}

                <div className="flex items-start gap-3">
                  {/* step number + icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: c.bg,
                        border: `1px solid ${c.border}`,
                        boxShadow: `0 0 18px -6px ${c.glow}`,
                      }}>
                      {StepIcon ? <StepIcon size={16} style={{ color: c.color }} /> : (
                        <span className="text-sm font-bold" style={{ color: c.color }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      )}
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ background: c.color, boxShadow: `0 2px 8px ${c.glow}` }}>
                      {i + 1}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white leading-tight">{s.title}</p>
                    <p className="text-xs text-white/45 mt-1 leading-relaxed">{s.desc}</p>
                    {s.tip && (
                      <div className="mt-2 flex items-start gap-1.5 text-[11px] text-white/55 leading-snug">
                        <Lightbulb size={11} className={c.text} />
                        <span>{s.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* ── Tips list ── */}
      {tips.length > 0 && (
        <div className="relative mt-5 rounded-2xl p-4"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={13} className={c.text} />
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Mẹo nhỏ</span>
          </div>
          <ul className="space-y-1.5">
            {tips.map((tip, i) => (
              <motion.li key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-xs text-white/55 leading-relaxed flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: c.color, boxShadow: `0 0 6px ${c.glow}` }} />
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.section>
  )
}
