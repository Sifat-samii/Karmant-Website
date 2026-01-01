# Karmant Official Website

A high-performance, modern website for the thrash metal band Karmant. Built with Next.js 14+, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎸 **Modern Design**: Dark, aggressive theme with premium aesthetics
- ⚡ **High Performance**: Optimized for Lighthouse scores 90+ on mobile
- 📱 **Responsive**: Fully responsive design for all devices
- 🎨 **Animations**: Subtle Framer Motion animations
- 📝 **Easy Content Management**: Content stored in JSON/Markdown files
- 🔍 **SEO Optimized**: Built-in metadata, sitemap, and robots.txt
- ♿ **Accessible**: WCAG compliant with keyboard navigation support

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **SEO**: next-seo + built-in metadata API
- **Content**: JSON files + Markdown (gray-matter)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd karmant-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── media/             # Media page (videos & photos)
│   ├── music/             # Music/discography pages
│   ├── press/             # Press kit page
│   ├── tour/              # Tour dates page
│   ├── privacy/           # Privacy policy
│   ├── terms/            # Terms of service
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── globals.css       # Global styles
│   ├── sitemap.ts        # Sitemap generation
│   └── robots.ts         # Robots.txt generation
├── components/            # React components
│   ├── Navbar.tsx        # Navigation bar
│   ├── Footer.tsx        # Footer component
│   ├── Hero.tsx          # Hero section
│   ├── LatestRelease.tsx # Latest release card
│   ├── UpcomingShows.tsx # Upcoming shows preview
│   ├── FeaturedVideo.tsx # Featured video embed
│   ├── MerchPreview.tsx # Merch preview grid
│   ├── NewsPreview.tsx  # News preview
│   ├── TourTabs.tsx     # Tour dates tabs
│   ├── VideoGallery.tsx # Video gallery
│   ├── PhotoGallery.tsx # Photo gallery (lightbox)
│   └── NewsletterForm.tsx # Newsletter signup
├── content/              # Content files (JSON/Markdown)
│   ├── site.json        # Site configuration
│   ├── releases.json    # Discography
│   ├── shows.json       # Tour dates
│   ├── merch.json       # Merchandise
│   ├── about.json       # About page content
│   ├── press.json       # Press kit content
│   └── news/            # News posts (Markdown)
├── lib/                 # Utility functions
│   └── news.ts         # News post utilities
└── public/             # Static assets
    └── images/         # Images (add your assets here)
```

## Content Management

### Updating Site Information

Edit `content/site.json` to update:
- Tagline
- Social media links
- Email addresses
- External links (merch, Bandsintown, etc.)
- Newsletter configuration

### Adding/Editing Releases

Edit `content/releases.json`. Each release should have:
- `slug`: URL-friendly identifier (e.g., "riot-in-uniform")
- `title`: Release title
- `type`: "EP", "Album", "Single", "Live", etc. (capitalized)
- `releaseDate`: ISO date string (YYYY-MM-DD)
- `artwork`: Path to artwork image (e.g., "/images/releases/riot-in-uniform.jpg")
- `tracklist`: Array of track names (required for proper display)
- `streaming`: Object with platform URLs:
  - `bandcamp`: Bandcamp album URL
  - `spotify`: Spotify URL (optional)
  - `apple`: Apple Music URL (optional)
  - `youtube`: YouTube URL (optional)
- `description`: Release description (supports line breaks)
- `featuredTrack`: Track name to highlight (optional, defaults to first track)
- `duration`: Total duration string (optional, e.g., "25:30")
- `credits`: Object with credits (optional):
  - `producer`: Producer name
  - `mix`: Mix engineer name
  - `master`: Mastering engineer name
- `streamEmbeds`: Object with HTML embed codes (optional):
  - `bandcamp`: Bandcamp iframe HTML for quick preview modal
- `merchLink`: Link to related merch (optional)
- `relatedVideos`: Array of related YouTube videos (optional):
  - `title`: Video title
  - `youtubeId`: YouTube video ID
  - `url`: Direct URL (optional)

**Example release:**
```json
{
  "slug": "riot-in-uniform",
  "title": "Riot in Uniform",
  "type": "EP",
  "releaseDate": "2021-04-01",
  "artwork": "/images/releases/riot-in-uniform.jpg",
  "tracklist": [
    "Nuclear Outbreak",
    "Riot in Uniform",
    "Greed",
    "General Destroyer"
  ],
  "streaming": {
    "bandcamp": "https://karmant.bandcamp.com/album/riot-in-uniform",
    "spotify": "",
    "apple": "",
    "youtube": ""
  },
  "description": "Debut EP released April 1, 2021. Four tracks of raw thrash metal intensity from Dhaka, Bangladesh.",
  "featuredTrack": "Riot in Uniform",
  "duration": "18:45",
  "credits": {
    "producer": "",
    "mix": "",
    "master": ""
  }
}
```

**Adding Artwork:**
1. Place artwork image in `public/images/releases/`
2. Use descriptive filename (e.g., `riot-in-uniform.jpg`)
3. Recommended size: 1000x1000px or larger (square)
4. Reference in `artwork` field: `/images/releases/filename.jpg`

### Adding/Editing Tour Dates

Edit `content/shows.json`. Structure:
- `upcoming`: Array of upcoming shows
- `past`: Array of past shows

Each show should have:
- `id`: Unique identifier
- `date`: ISO date string
- `city`: City name
- `venue`: Venue name
- `venueUrl`: Venue website (optional)
- `ticketUrl`: Ticket purchase link
- `bandsintownUrl`: Bandsintown link (optional)
- `support`: Supporting acts info (optional)

### Adding News Posts

1. Create a new Markdown file in `content/news/` (e.g., `post-4.md`)
2. Add frontmatter:
```markdown
---
title: "Your Post Title"
date: "2024-05-15"
excerpt: "Short excerpt for preview"
cover: "/images/news/your-image.jpg"
---

Your post content here...
```

### Adding Merch Items

Edit `content/merch.json`. Each item should have:
- `id`: Unique identifier
- `name`: Product name
- `image`: Path to product image
- `price`: Price string
- `link`: External shop link

### Updating Band Members

Edit `content/about.json`:
- `shortBio`: Short bio text
- `longBio`: Long bio text (supports line breaks with `\n\n`)
- `members`: Array of band members with name, role, bio, and socials
- `gear`: Optional gear section

### Updating Press Kit

Edit `content/press.json`:
- Bio information
- Similar artists
- Key facts
- Press photos
- Top videos (YouTube IDs)
- Press quotes

## How to Update Band Info

### Basic Band Information

Edit `content/site.json` to update:
- `bandName`: Band name
- `tagline`: Hero tagline
- `location`: City/Country
- `formed`: Year formed
- `genre`: Music genre
- `label`: Record label or "Unsigned/Independent"
- `disambiguation`: SEO note (e.g., "Karmant (BD) — Thrash Metal band")
- `phone`: Contact phone number
- `socials`: Social media URLs (Facebook, Bandcamp, etc.)
- `emails`: Contact email addresses

### Band Members

Edit `content/about.json` or `content/band.json`:
- Update the `members` array with current lineup
- Include: name, role, years active, bio, socials
- Only include verified, current members
- Do not invent or assume lineup changes

### Releases

Edit `content/releases.json`:
- Add new releases with verified information only
- Include: slug, title, type (EP/Album/Single), releaseDate (YYYY-MM-DD), artwork path, tracklist, streaming links
- Do not add placeholder releases with unverified dates
- Mark future releases as "TBA" if dates are not confirmed

### Tour Dates

Edit `content/shows.json`:
- `upcoming`: Array of confirmed upcoming shows
- `past`: Array of past shows (can include notable appearances)
- Mark shows with `notable: true` for special highlights
- Only include verified show information

### Media

Edit `content/media.json`:
- Add YouTube video IDs to the `videos` array
- Format: `{ "id": "youtube-video-id", "title": "Video Title" }`
- Only include verified, official videos

## Adding Images

Place images in the `public/images/` directory:

```
public/
  images/
    releases/        # Album artwork
    merch/          # Merchandise photos
    news/           # News post covers
    photos/         # Photo gallery images
    press/          # Press photos
```

Reference them in content files using paths like `/images/releases/album-name.jpg`

### Open Graph Image

Create an `og-image.jpg` file (1200x630px) in the `public/` directory for social media sharing. This will be used as the default OG image for all pages.

## Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
# Optional: Formspree endpoint for contact form
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

# Optional: Newsletter provider endpoint
# Configure in content/site.json under newsletter.endpoint
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. Add environment variables in Vercel dashboard if needed

### Netlify

1. Push your code to a Git repository
2. In Netlify, create a new site from Git
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables in Netlify dashboard

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Build command: `npm run build`
- Start command: `npm start`
- Node version: 18+

## Performance Optimization

The site is optimized for performance:

- **Images**: Using Next.js Image component with automatic optimization
- **Code Splitting**: Automatic with Next.js App Router
- **Lazy Loading**: Embeds and images load lazily
- **Fonts**: Optimized font loading
- **CSS**: Tailwind CSS with purging unused styles

## SEO

- Metadata configured per page
- Open Graph tags for social sharing
- Twitter Card support
- Sitemap automatically generated
- Robots.txt configured
- Semantic HTML structure

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme. The current theme uses:
- `metal-dark`: #0a0a0a
- `metal-darker`: #000000
- `metal-red`: #dc2626
- `metal-gold`: #d4af37
- `metal-gray`: #1a1a1a

### Fonts

Update fonts in `app/globals.css` or `app/layout.tsx`. Currently using system fonts for performance.

### Animations

Animations use Framer Motion. Adjust in component files or disable via `prefers-reduced-motion` media query.

## Troubleshooting

### Images not loading
- Ensure images are in the `public/images/` directory
- Check file paths in JSON/Markdown files
- Verify image file extensions match

### News posts not showing
- Ensure Markdown files are in `content/news/`
- Check frontmatter format
- Verify file extensions are `.md`

### Build errors
- Run `npm install` to ensure dependencies are installed
- Check Node.js version (18+ required)
- Clear `.next` folder and rebuild

## Support

For issues or questions:
- Check the documentation above
- Review Next.js documentation: https://nextjs.org/docs
- Contact: info@karmant.com

## License

Copyright © 2024 Karmant. All rights reserved.

