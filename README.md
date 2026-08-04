# INRIP - India's Natural Resource Intelligence Platform

<div align="center">

![INRIP Logo](https://img.shields.io/badge/INRIP-AI%20Powered-yellow)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.1.0-purple)
![MapLibre](https://img.shields.io/badge/MapLibre-4.1.0-green)

**India's AI-Powered Natural Resource Intelligence Platform**

Unify satellite imagery, geological data, mining datasets and AI into one intelligent GIS platform for mineral exploration and feasibility analysis.

[Live Demo](#) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Data Sources](#-data-sources)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 About

INRIP (India Natural Resource Intelligence Platform) is a cutting-edge geospatial intelligence platform designed to revolutionize mineral exploration in India. By integrating authoritative government data sources with AI-powered analysis, INRIP enables faster, data-driven decision making for mining companies, government agencies, and research institutions.

### Key Benefits

- **Unified Data Access**: Access data from Indian Bureau of Mines, GSI, NGDR, ISRO Bhuvan, and more in one platform
- **AI-Powered Analysis**: Get intelligent recommendations for site selection and feasibility assessment
- **Real-Time Intelligence**: Interactive GIS dashboard with real-time spatial data visualization
- **Comprehensive Scoring**: AI suitability scores covering geological, infrastructure, environmental, and ESG factors
- **Enterprise Ready**: Built for scale with secure authentication and collaboration features

---

## ✨ Features

### Landing Page
- **Professional Design**: Modern, responsive landing page with smooth animations
- **Trusted Data Sources**: Showcase of authoritative data providers with official badges
- **AI Scoring Demo**: Interactive score panel demonstrating platform capabilities
- **Industry Solutions**: Tailored solutions for mining, government, renewable energy, and more
- **Product Roadmap**: Transparent development timeline and future features
- **Newsletter**: Stay updated with product news and GIS intelligence

### GIS Dashboard
- **Interactive Map**: Full-featured MapLibre GL JS integration with custom styling
- **Mineral Database**: Comprehensive database of Indian mines with filtering capabilities
- **Layer Controls**: Toggle between different data layers (geological, infrastructure, environmental)
- **Clustered Markers**: Efficient visualization of dense mineral data
- **Filter Panel**: Advanced filtering by mineral type, state, and district
- **Export Reports**: Generate comprehensive feasibility reports with AI insights

### Authentication
- **Secure Login**: Email/password authentication with Supabase integration
- **Social Login**: Google OAuth integration
- **User Registration**: Complete onboarding flow with validation
- **Password Recovery**: Forgot password functionality

### User Experience
- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion animations throughout the application
- **Loading States**: Professional loading screens and skeleton loaders
- **Toast Notifications**: Real-time feedback for user actions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

---

## 🛠 Technology Stack

### Frontend
- **React 18.2.0** - UI library
- **TypeScript 5.3.3** - Type safety
- **Vite 5.1.0** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Mapping & Geospatial
- **MapLibre GL JS 4.1.0** - Open-source mapping library
- **MapTiler** - Map tiles and geospatial services
- **Supabase** - Backend-as-a-Service for authentication

### UI Components
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

---

## 📦 Installation

### Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/inrip.git
cd inrip
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your environment variables:

```env
VITE_MAPTILER_API_KEY=your_maptiler_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Getting API Keys

- **MapTiler API Key**: Sign up at [MapTiler](https://www.maptiler.com/) and get your free API key
- **Supabase**: Create a project at [Supabase](https://supabase.com/) to get your URL and anon key

### Step 4: Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## ⚙️ Configuration

### Map Configuration

Configure the map in `src/App.tsx`:

```typescript
const INDIA_CENTER: [number, number] = [78.9629, 20.5937];
const INDIA_SUBCONTINENT_BOUNDS: [[number, number], [number, number]] = [
  [60, 0],
  [100, 40]
];
```

### Theme Configuration

Customize colors in `src/styles/index.css`:

```css
:root {
  --primary: 46 100% 65%; /* #FFD54A Yellow */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... other variables */
}
```

### SEO Configuration

Update meta tags in `index.html` for production deployment.

---

## 🚀 Usage

### Development

```bash
# Start development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploying

The application can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Configure in repository settings

---

## 📁 Project Structure

```
inrip/
├── public/                      # Static assets
├── src/
│   ├── components/
│   │   ├── auth/               # Authentication components
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── dashboard/          # GIS dashboard components
│   │   │   ├── MapTopOverlays.tsx
│   │   │   ├── FloatingFilterPanel.tsx
│   │   │   ├── FloatingLayersPanel.tsx
│   │   │   ├── FloatingLegend.tsx
│   │   │   ├── ActiveLayerWidget.tsx
│   │   │   ├── MapBottomControls.tsx
│   │   │   └── ClusteredMarkers.tsx
│   │   ├── landing/            # Landing page components
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── SolutionsSection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── TrustedDataSources.tsx
│   │   │   ├── WhyINRIP.tsx
│   │   │   ├── AIScoring.tsx
│   │   │   ├── IndustriesSection.tsx
│   │   │   ├── ProductRoadmap.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Newsletter.tsx
│   │   │   ├── CookieConsent.tsx
│   │   │   └── AIAssistant.tsx
│   │   ├── error/              # Error page components
│   │   │   ├── NotFoundPage.tsx
│   │   │   └── UnauthorizedPage.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── Skeleton.tsx
│   │       └── LoadingScreen.tsx
│   ├── contexts/               # React contexts
│   │   ├── ThemeContext.tsx
│   │   └── ToastContext.tsx
│   ├── lib/                    # Utility libraries
│   │   └── supabase.ts
│   ├── services/               # API services
│   │   └── mineralsService.ts
│   ├── styles/                 # Global styles
│   │   └── index.css
│   ├── types/                  # TypeScript types
│   │   └── minerals.ts
│   ├── App.tsx                 # Main app component
│   └── main.tsx                # Entry point
├── index.html                  # HTML template
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 📊 Data Sources

INRIP integrates data from authoritative Indian government sources:

- **Indian Bureau of Mines (IBM)** - Official mineral production and consumption data
- **Geological Survey of India (GSI)** - Geological maps and mineral resource assessments
- **National Geoscience Data Repository (NGDR)** - Comprehensive geoscience data
- **ISRO Bhuvan** - Satellite imagery and remote sensing data
- **India-WRIS** - Water resources information system
- **Ministry of Coal** - Coal production and distribution statistics
- **OpenStreetMap** - Open-source mapping data
- **MapTiler** - High-quality map tiles

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the ISC License.

---

## 📞 Contact

- **Website**: https://inrip.in
- **Email**: contact@inrip.in
- **Twitter**: [@inrip](https://twitter.com/inrip)
- **LinkedIn**: [INRIP](https://linkedin.com/company/inrip)

---

## 🙏 Acknowledgments

- MapLibre GL JS team for the excellent open-source mapping library
- MapTiler for providing high-quality map tiles
- Supabase for the backend-as-a-service platform
- The open-source community for the amazing tools and libraries

---

<div align="center">

**Built with ❤️ for India's Natural Resource Sector**

[⬆ Back to Top](#inrip---indias-natural-resource-intelligence-platform)

</div>
