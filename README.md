# User Directory Dashboard

A modern, full-featured React application for browsing and managing user information from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users). Built with React 19, Tailwind CSS, and Material-UI with support for light/dark modes.

## 🎯 Features

### Core Functionality
- **📊 Dashboard Table** — Displays users with Name, Email, Phone, and Company columns
- **🔍 Smart Search** — Real-time client-side filtering by name or email with text highlighting
- **↕️ Advanced Sorting** — Click column headers to sort by Name or Company (ascending/descending)
- **👤 User Detail Page** — Click any row to view comprehensive user information including contact details, address, and company information
- **⌨️ Keyboard Accessibility** — Tab-navigable rows; press Enter to view user details

### User Interface
- **🌓 Dark/Light Mode** — Toggle between light and dark themes with Context API persistence
- **🎨 Professional Styling** — Built with Tailwind CSS utility-first framework
- **📱 Responsive Design** — Works seamlessly on mobile, tablet, and desktop screens
- **✨ Smooth Interactions** — Hover effects, transitions, and Material-UI alerts for sorting notifications
- **🔆 Search Highlighting** — Matching terms are highlighted with gradient backgrounds

### Technical Features
- **⚡ Fast Performance** — Uses React hooks and memoization for optimized rendering
- **🛡️ Type-Safe Development** — ESLint configured for code quality
- **🎯 Smart State Management** — Context API for global theme state with localStorage persistence
- **📡 RESTful API Integration** — Fetches user data from JSONPlaceholder API

## 📋 Tech Stack

| Technology | Version | Purpose |
| --- | --- | --- |
| [React](https://react.dev/) | 19.2.4 | Core UI framework |
| [Vite](https://vite.dev/) | 8.0.2 | Build tool and dev server |
| [React Router](https://reactrouter.com/) | 7.13.2 | Client-side routing |
| [Tailwind CSS](https://tailwindcss.com/) | 4.2.2 | Utility-first CSS framework |
| [Material-UI (MUI)](https://mui.com/) | 7.3.9 | Alert component |
| [React Icons](https://react-icons.github.io/react-icons/) | 5.6.0 | Theme toggle icons |
| [PostCSS](https://postcss.org/) | 8.5.8 | CSS processing |
| [ESLint](https://eslint.org/) | 9.39.4 | Code linting |

## 📁 Project Structure

```
user-directory-dashboard/
├── src/
│   ├── context/
│   │   ├── ThemeContextValue.js      # Context creation (non-component)
│   │   ├── ThemeContext.jsx          # ThemeProvider component
│   │   └── useTheme.js               # Custom hook for theme usage
│   ├── components/
│   │   └── HighlightedText.jsx       # Search highlighting component
│   ├── pages/
│   │   ├── UserList.jsx              # Dashboard with search, sort, and theme toggle
│   │   └── UserDetail.jsx            # Individual user detail page
│   ├── App.jsx                       # Main app component (styling moved to index.css)
│   ├── main.jsx                      # Application entry point
│   └── index.css                     # Tailwind directives, alerts, highlighting
├── public/                           # Static assets
├── tailwind.config.js                # Tailwind configuration
├── postcss.config.js                 # PostCSS configuration
├── vite.config.js                    # Vite configuration
├── eslint.config.js                  # ESLint rules
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm (or yarn)

### Installation

```bash
# Clone or navigate to the project directory
cd user-directory-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 Usage Guide

### Dashboard View
1. **View Users** — All users load automatically from the JSONPlaceholder API
2. **Search** — Type in the search bar to filter by name or email (real-time)
3. **Sort** — Click "Name ↑" or "Company ↕" headers to sort; indicators show sort direction
4. **Highlight** — Search terms are highlighted in amber/gold gradient
5. **Switch Theme** — Use the sun/moon icon button in the top-right to toggle dark/light mode

### User Detail View
1. **Open Details** — Click any user row to navigate to their detail page
2. **View Information** — See organized sections: Contact, Address, and Company information
3. **Back to List** — Click the "← Back" button to return to the dashboard

## ⚙️ Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with the new `@tailwindcss/postcss` plugin.

**Key configuration files:**
- `tailwind.config.js` — Extends theme with custom colors (primary, success, highlight)
- `postcss.config.js` — PostCSS setup with Tailwind plugin
- `src/index.css` — Tailwind directives + custom styles for alerts and highlighting

### Theme System
Dark/light mode is managed globally via React Context API:
- **Stored in** — `src/context/` folder (separate files for Fast Refresh compliance)
- **Persistence** — Theme preference saved to localStorage
- **Implementation** — Uses CSS class approach (`dark-mode` class on document)

### API Integration
- **Endpoint** — `https://jsonplaceholder.typicode.com/users`
- **Data Fetched** — User objects with id, name, email, phone, address, company, etc.
- **Method** — Fetch API with error handling

## 🎯 Component Architecture

### UserList.jsx
- Fetches users from API
- Implements search filtering (memoized for performance)
- Handles sorting with Material-UI alert notifications
- Manages theme toggle
- Renders user table with highlighting

### UserDetail.jsx
- Displays comprehensive user information
- Organized in three sections: Contact, Address, Company
- Responsive grid layout (1-3 columns based on screen size)
- Supports dark/light mode styling

### HighlightedText.jsx
- Pure component for rendering search term highlights
- Uses regex for case-insensitive matching
- Applies gradient background to matching text

### Context Components
- `ThemeContextValue.js` — Creates context only
- `ThemeContext.jsx` — Provides ThemeProvider component
- `useTheme.js` — Custom hook with error checking

## 🎨 Styling Approach

### Tailwind CSS
- Utility-first framework for responsive design
- Custom color palette in `tailwind.config.js`
- Dark mode support with `dark:` prefix
- Group hover states for interactive elements

### Custom CSS (Minimal)
Only used for components that need special styling:
- Material-UI Alert styling (`.sort-alert`)
- Search highlighting (`.highlight-text`)
- Animations (`@keyframes slideDown`)

### Dark Mode
- Toggle stored in localStorage
- Applied via `dark-mode` class on document root
- Prefix all dark styles with `dark:` in Tailwind classes
- Smooth transitions between modes

## 📊 Color Palette

### Light Mode
- **Title** — Indigo to Emerald gradient
- **Headers** — Blue (#0284c7)
- **Background** — Clean white
- **Hover** — Light gray background
- **Text** — Dark gray on light

### Dark Mode
- **Title** — Indigo to Emerald gradient (unchanged)
- **Headers** — Dark blue gradient
- **Background** — Dark gray (#111827)
- **Hover** — Blue gradient background
- **Text** — Light gray/white on dark

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start Vite dev server at localhost:5173

# Production
npm run build        # Build optimized production bundle
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint and report issues
```

## 🔧 Development

### Adding a New Feature
1. Create new component in `src/components/` or `src/pages/`
2. Use `useTheme()` hook for theme support
3. Add Tailwind classes with `dark:` prefixes for dark mode
4. Import and use in relevant parent components

### Modifying Styles
- Prefer Tailwind classes over custom CSS
- Add custom styles to `src/index.css` only for non-Tailwind components
- Use `dark:` prefix for dark mode support

### Running Linter
```bash
npm run lint         # Check for issues
```

## 🐛 Known Issues & Limitations

None currently. All features working as expected.

## 🚀 Future Enhancements

- [ ] Add pagination for large user lists
- [ ] Implement user profile pictures
- [ ] Add filtering by company/city
- [ ] Export user data to CSV
- [ ] Add unit tests with Jest/Vitest
- [ ] Implement user creation/editing
- [ ] Add local data persistence
- [ ] Deploy to production hosting (Vercel, Netlify)

## 🔐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Development Environment

**Tested on:**
- Node.js v22.22.2
- npm 10.x
- Windows 11 / macOS / Linux

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues or questions:
1. Check the [React documentation](https://react.dev/)
2. Review [Tailwind CSS docs](https://tailwindcss.com/docs)
3. Consult [React Router guide](https://reactrouter.com/)
4. Check [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
