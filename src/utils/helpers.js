// Format date helper
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Truncate text helper
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Strip HTML tags
export const stripHtml = (html) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

// Generate excerpt from content
export const generateExcerpt = (content, length = 150) => {
  const text = stripHtml(content);
  return truncateText(text, length);
};

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
};

// Initial blog data
export const initialBlogs = [
  {
    id: '1',
    title: 'The Ultimate Guide to White-Hat Link Building in 2024',
    author: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    content: `
      <h2>Introduction to Modern Link Building</h2>
      <p>Link building has evolved significantly over the past few years. Gone are the days of spammy tactics and low-quality directory submissions.</p>
      
      <h3>Key Principles of White-Hat Link Building</h3>
      <ul>
        <li><strong>Quality over Quantity:</strong> Focus on securing links from high-authority, relevant websites</li>
        <li><strong>Natural Link Profiles:</strong> Diversify anchor text and link types for organic growth</li>
        <li><strong>Content-Driven Approach:</strong> Create valuable content that naturally attracts backlinks</li>
      </ul>
      
      <p>Ready to implement these strategies? Contact our team for a personalized link building audit.</p>
    `,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Case Study: How We Increased Organic Traffic by 400% in 8 Months',
    author: 'Mike Chen',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    content: `
      <h2>The Challenge</h2>
      <p>Our client, a B2B SaaS company, was struggling with organic visibility despite having a great product.</p>
      
      <h3>Results After 8 Months</h3>
      <ul>
        <li><strong>Organic Traffic:</strong> 1,200 → 6,000 monthly visitors (+400%)</li>
        <li><strong>Domain Rating:</strong> 28 → 52 (+24 points)</li>
        <li><strong>Ranking Keywords:</strong> 45 → 180 (+300%)</li>
      </ul>
    `,
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: '3',
    title: 'Link Building Mistakes That Are Killing Your SEO',
    author: 'Emma Rodriguez',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    content: `
      <h2>Common Link Building Pitfalls</h2>
      <p>After analyzing hundreds of campaigns, we've identified the most common mistakes.</p>
      
      <h3>Mistake #1: Focusing Only on High DA Sites</h3>
      <p>Many businesses obsess over Domain Authority scores while ignoring relevance.</p>
      
      <h3>Mistake #2: Over-Optimized Anchor Text</h3>
      <p>Using exact-match keywords in 80% of your anchor text looks unnatural.</p>
    `,
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
  },
];