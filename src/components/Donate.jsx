import { useState } from 'react'
import { PricingCard } from './ui/pricing-section'
import { BadgeCheckIcon } from './Icons'
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './ui/popover'
import { X } from 'lucide-react'

const TIERS = [
  {
    title: 'Seedling',
    description:
      'A small gift with a big ripple. Help cover seeds, soil, and tools for a garden bed — growing nutritious food for a school feeding programme.',
    features: [
      'Seeds & soil for a garden bed',
      'Supports school feeding schemes',
      'Grows produce for local vendors',
    ],
    buttonText: 'Give as a Seedling',
    useSparkles: false,
  },
  {
    title: 'Caregiver',
    description:
      "Support elder care at Ikhayalabantu or Sizamile Old Age Home — providing meals, companionship, and dignity to Langa's seniors.",
    features: [
      'Elder care support',
      'Meals & personal assistance',
      'Companionship for isolated residents',
      'Supports two care homes',
    ],
    buttonText: 'Give as a Caregiver',
    useSparkles: false,
    featured: true,
  },
  {
    title: 'Community Builder',
    description:
      "Help fund school safety patrols or ECD support — keeping Langa's children safe on their way to school and thriving in early learning.",
    features: [
      'School safety patrols',
      'ECD programme materials',
      'Safety vests for patrol volunteers',
      'Care stipends for ECD workers',
    ],
    buttonText: 'Give as a Builder',
    useSparkles: true,
  },
]

const BANKING = [
  { label: 'Bank',         value: 'Nedbank' },
  { label: 'Account Name', value: 'Ithemba Labantu Projects' },
  { label: 'Account No.',  value: '1234 567 890' },
  { label: 'Branch Code',  value: '198 765' },
  { label: 'Account Type', value: 'Cheque / Current' },
  { label: 'Reference',    value: 'Your name + DONATE' },
]

// Replace the `data` param with ILP's real SnapScan merchant URL
const SNAPSCAN_QR = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://pos.snapscan.io/qr/IthembaLabantu&color=1a6b3c&bgcolor=ffffff&margin=8'

function DonationPopover({ buttonText }) {
  const [tab, setTab] = useState('snapscan')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-full rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--green-dark)' }}
        >
          {buttonText}
        </button>
      </PopoverTrigger>

      <PopoverContent side="top" className="relative w-[min(24rem,calc(100vw-2rem))]">
        <PopoverClose className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </PopoverClose>

        <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--green-dark)' }}>
          How would you like to pay?
        </p>

        {/* SnapScan / EFT tabs */}
        <div className="flex gap-1 rounded-xl p-1 mb-4" style={{ background: 'var(--gray-100)' }}>
          {['snapscan', 'eft'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all"
              style={{
                background: tab === t ? 'var(--white)' : 'transparent',
                color: tab === t ? 'var(--green-dark)' : 'var(--text-light)',
                boxShadow: tab === t ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {t === 'snapscan' ? 'SnapScan' : 'EFT / Bank'}
            </button>
          ))}
        </div>

        {/* SnapScan tab */}
        {tab === 'snapscan' && (
          <div className="flex flex-col items-center gap-3">
            <img
              src={SNAPSCAN_QR}
              alt="SnapScan QR code for Ithemba Labantu Projects"
              className="rounded-xl border"
              style={{ borderColor: 'var(--gray-200)' }}
              width={160}
              height={160}
            />
            <p className="text-xs text-center" style={{ color: 'var(--text-light)' }}>
              Open <strong>SnapScan</strong> and scan to pay instantly
            </p>
            <p className="text-xs text-center rounded-lg px-3 py-2 w-full" style={{ background: '#fffbeb', color: '#92400e', border: '1px solid #fde68a' }}>
              ⚠ Replace this QR with your real SnapScan merchant code
            </p>
          </div>
        )}

        {/* EFT tab */}
        {tab === 'eft' && (
          <dl className="flex flex-col gap-2">
            {BANKING.map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between gap-3 text-xs border-b pb-2 last:border-0 last:pb-0"
                style={{ borderColor: 'var(--gray-200)' }}
              >
                <dt style={{ color: 'var(--text-light)', flexShrink: 0 }}>{label}</dt>
                <dd className="font-semibold text-right select-all" style={{ color: 'var(--text-dark)' }}>{value}</dd>
              </div>
            ))}
          </dl>
        )}

        <p className="mt-4 text-xs leading-relaxed" style={{ color: 'var(--text-light)' }}>
          Email proof of payment to{' '}
          <a href="mailto:ithembalabantu22@gmail.com" className="underline" style={{ color: 'var(--green-dark)' }}>
            ithembalabantu22@gmail.com
          </a>
        </p>
      </PopoverContent>
    </Popover>
  )
}

export default function Donate() {
  return (
    <section id="donate" style={{ padding: '6rem 0', background: 'var(--off-white)' }}>
      <div className="container">

        {/* Header */}
        <div className="section-header">
          <span className="section-label">Make a Difference</span>
          <h2>Support Our Work</h2>
          <p className="subtitle">
            Every contribution — large or small — goes directly to growing food, caring
            for elders, and keeping children safe in Langa. Give what you can.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-10">
          {TIERS.map(tier => (
            <PricingCard
              key={tier.title}
              title={tier.title}
              description={tier.description}
              features={tier.features}
              buttonText={tier.buttonText}
              useSparkles={tier.useSparkles}
              className={tier.featured ? 'border-2' : ''}
              style={tier.featured ? { borderColor: 'var(--orange)' } : {}}
              buttonElement={<DonationPopover buttonText={tier.buttonText} />}
            />
          ))}
        </div>

        {/* Bottom panel */}
        <div
          id="donate-banking"
          className="grid grid-cols-1 gap-8 md:grid-cols-2 rounded-2xl p-8"
          style={{ background: 'var(--white)', boxShadow: 'var(--shadow-md)' }}
        >
          <div>
            <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--green-dark)', fontFamily: "'Poppins', sans-serif" }}>
              EFT / Bank Transfer
            </h3>
            <dl className="flex flex-col gap-3">
              {BANKING.map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-4 text-sm pb-3 border-b last:border-0 last:pb-0" style={{ borderColor: 'var(--gray-200)' }}>
                  <dt style={{ color: 'var(--text-light)', flexShrink: 0 }}>{label}</dt>
                  <dd className="font-semibold text-right select-all" style={{ color: 'var(--text-dark)' }}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--green-dark)', fontFamily: "'Poppins', sans-serif" }}>
                Other Ways to Give
              </h3>
              <p style={{ color: 'var(--text-medium)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                Not sure where to start? Any contribution — big or small — makes a real
                difference. You can also donate time by volunteering, or drop off seeds,
                gardening tools, and care materials.
              </p>
              <a href="#volunteer" className="btn btn-green mt-4" style={{ display: 'inline-flex', width: 'auto', padding: '0.65rem 1.5rem' }}>
                Volunteer Instead
              </a>
            </div>

            <div className="flex items-start gap-3 rounded-xl px-5 py-4" style={{ background: 'var(--green-pale)', border: '1px solid var(--green-light)' }}>
              <BadgeCheckIcon size={18} style={{ color: 'var(--green-dark)', flexShrink: 0, marginTop: 2 }} />
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-medium)' }}>
                Registered <strong>NPO 068-348</strong>. Email proof of payment to{' '}
                <a href="mailto:ithembalabantu22@gmail.com" style={{ color: 'var(--green-dark)', textDecoration: 'underline' }}>
                  ithembalabantu22@gmail.com
                </a>{' '}
                for an official receipt.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
