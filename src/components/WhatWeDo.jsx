import { Gallery6 } from './ui/gallery6'

const ITEMS = [
  {
    id: 'item-1',
    title: 'Community Vegetable Gardens',
    summary:
      'ILP maintains four active vegetable gardens across Langa, covering over 310 m² of cultivated land. Volunteers grow seasonal vegetables that go directly to school feeding schemes and local vendors, keeping fresh food accessible to families who need it most. The gardens also serve as hands-on spaces where residents build practical agricultural skills.',
    url: '#volunteer',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
  },
  {
    id: 'item-2',
    title: 'Elderly & Frail Citizen Caregiving',
    summary:
      'Our care team supports elderly and frail residents at Ikhayalabantu and Sizamile Old Age Homes in Langa. Volunteers provide companionship, assist with daily tasks, and help coordinate access to healthcare — ensuring our elders are seen, heard, and treated with the dignity they deserve.',
    url: '#contact',
    image: '/brand_assets/elderly_care.jpg',
  },
  {
    id: 'item-4',
    title: 'ECD Assistance & Caregiving',
    summary:
      'ILP supports ECD centres in Langa with trained caregivers who assist with structured play, literacy activities, and nutritional support. Many centres operate with limited staff — our volunteers bridge that gap so educators can focus on quality learning during the years that matter most.',
    url: '#contact',
    image: '/brand_assets/ecd.jpg',
  },
  {
    id: 'item-5',
    title: 'School Safety Patrol',
    summary:
      'Trained volunteers are stationed along key walking routes in Langa at drop-off and pick-up times, assisting children at busy intersections and maintaining a safe presence near school gates. The programme builds trust between schools, families, and the wider community.',
    url: '#volunteer',
    image: '/brand_assets/school_kids.jpg',
  },
  {
    id: 'item-3',
    title: 'School Grounds Cleaning & Maintenance',
    summary:
      'ILP volunteers work alongside school staff to keep grounds litter-free, facilities sanitary, and classrooms tidy — addressing upkeep that stretched school budgets cannot always cover. A well-maintained environment fosters pride and focus in every learner and teacher.',
    url: '#volunteer',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
  },
]

export default function WhatWeDo() {
  return (
    <section className="what-we-do" id="what-we-do">
      <div className="section-header container">
        <span className="section-label">Our Work</span>
        <h2>What We Do</h2>
        <p className="subtitle">
          From gardens to classrooms to old age homes — our volunteers show up every
          day to build a stronger, more caring Langa.
        </p>
      </div>

      <Gallery6
        heading=""
        linkText="Get involved"
        linkUrl="#volunteer"
        items={ITEMS}
      />


    </section>
  )
}
