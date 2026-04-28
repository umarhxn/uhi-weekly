// lib/store.js
// In-memory store — data resets on server restart.
// For production, replace with a real database (PlanetScale, Supabase, MongoDB, etc.)

const store = {
  posts: [
    {
      id: '1',
      cat: 'scholarship',
      title: 'Fully funded Commonwealth Scholarship 2025',
      excerpt: 'Applications now open for postgraduate study in the UK. Open to citizens of Commonwealth countries.',
      body: `The Commonwealth Scholarship Commission is offering fully funded scholarships for postgraduate study at UK universities.\n\nCoverage includes:\n• Tuition fees (full)\n• Monthly living allowance\n• Return airfare\n• Thesis/study grant\n\nEligibility:\n• Citizens of Commonwealth developing countries\n• Under 40 years old\n• Relevant undergraduate degree (minimum 2:1)\n\nDeadline: December 18, 2025\n\nApply through your national nominating agency.`,
      link: 'https://cscuk.fcdo.gov.uk/scholarships/',
      date: new Date('2026-04-27').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    },
    {
      id: '2',
      cat: 'job',
      title: 'Remote AI Content Writer — $60k/yr',
      excerpt: 'Fast-growing EdTech startup hiring a full-time AI content writer. 100% remote, flexible hours.',
      body: `EdTech startup EduAI is hiring a remote AI Content Writer to create educational content around artificial intelligence.\n\nRequirements:\n• Strong English writing skills\n• Interest in AI/ML topics\n• Ability to work independently\n• Portfolio of technical writing preferred\n\nBenefits:\n• $60,000/year salary\n• 100% remote, anywhere in the world\n• Flexible hours\n• Health insurance\n\nDeadline: Rolling applications`,
      link: 'https://linkedin.com',
      date: new Date('2026-04-25').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    },
    {
      id: '3',
      cat: 'ai',
      title: 'Use Claude to summarize research papers in 60 seconds',
      excerpt: 'A simple prompt trick that extracts key insights from any academic paper without reading it all.',
      body: `Here is a prompt that consistently extracts the core insights from any research paper:\n\n"Summarize this paper in 5 bullet points:\n1. What problem does it solve?\n2. What is the key method?\n3. What are the main results?\n4. What are the limitations?\n5. What is the practical takeaway?"\n\nPaste the abstract or full text and Claude will give you a clean, structured summary you can act on immediately.\n\nBonus tip: Follow up with "What questions would a skeptic ask about this paper?" for a critical perspective.\n\nThis works especially well for papers in AI, medicine, and social science.`,
      date: new Date('2026-04-23').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    },
  ],
  subscribers: [],
  emailsSent: 0,
};

export default store;
