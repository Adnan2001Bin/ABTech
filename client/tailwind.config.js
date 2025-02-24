/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		colors: {
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  chart: {
			1: "hsl(var(--chart-1))",
			2: "hsl(var(--chart-2))",
			3: "hsl(var(--chart-3))",
			4: "hsl(var(--chart-4))",
			5: "hsl(var(--chart-5))",
		  },
		  // Earthy Theme Colors (Previous)
		  terracotta: {
			600: "#D97706",
		  },
		  amber: {
			50: "#FFFBEB",
			100: "#FEF3C7",
			200: "#FDE68A",
			300: "#F59E0B",
			700: "#B45309",
		  },
		  olive: {
			100: "#D1D5DB",
			800: "#1F2A44",
		  },
		  stone: {
			50: "#F5F5F4",
			100: "#E7E5E4",
			200: "#D6D3D1",
			400: "#A8A29E",
			500: "#78716C",
			600: "#57534E",
			700: "#44403C",
		  },
		  // New Green Theme (Subtle, Not Too Bright)
		  sage: {
			50: "#F1F5F0",  // Very light sage for backgrounds
			100: "#E2EAE2", // Subtle hover states
			200: "#C4D3C4", // Light accent
			300: "#A3BFA3", // Main sage for buttons
			600: "#6B8E6B", // Deeper sage for headers
		  },
		  moss: {
			100: "#D9DED1", // Light moss for status highlights
			700: "#4A5A43", // Dark moss for text
		  },
		  forest: {
			200: "#B7C4A8", // Soft forest green for accents
			500: "#6B7A5E", // Mid-tone forest for totals
		  },
		},
		// Add custom animation keyframes
		keyframes: {
		  slideIn: {
			"0%": { opacity: 0, transform: "translateX(-8px)" },
			"100%": { opacity: 1, transform: "translateX(0)" },
		  },
		},
		// Add custom animation
		animation: {
		  slideIn: "slideIn 0.6s ease-in-out",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };