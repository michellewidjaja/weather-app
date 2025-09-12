import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: '0.75rem',
  			md: '0.625rem',
  			sm: '0.5rem'
  		},
			fontFamily: {
				sans: ["var(--font-dm-sans)", "sans-serif"],
				bricolage: ["var(--font-bricolage-grotesque)", "sans-serif"],
			},
			fontSize: {
				"preset-1": [
					"6rem",
					{
						lineHeight: "100%",
						letterSpacing: "-0.125rem",
					},
				],
				"preset-2": [
					"3.25rem",
					{
						lineHeight: "100%",
						letterSpacing: "0px",
					},
				],
				"preset-3": [
					"2rem",
					{
						lineHeight: "100%",
						letterSpacing: "0px",
					},
				],
				"preset-4": [
					"1.75rem",
					{
						lineHeight: "100%",
						letterSpacing: "0px",
					},
				],
				"preset-5": [
					"1.25rem",
					{
						lineHeight: "100%",
						letterSpacing: "0px",
					},
				],
				"preset-6": [
					"1.125rem",
					{
						lineHeight: "100%",
						letterSpacing: "0px",
					},
				],
				"preset-7": [
					"1rem",
					{
						lineHeight: "100%",
						letterSpacing: "0px",
					},
				],
				"preset-8": [
					"0.875rem",
					{
						lineHeight: "100%",
						letterSpacing: "0px",
					},
				],
			},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
				neutral: {
					100: "hsl(0, 0%, 100%)",
					200: "hsl(250, 6%, 84%)",
					300: "hsl(240, 6%, 70%)",
					600: "hsl(243, 23%, 30%)",
					700: "hsl(243, 23%, 24%)",
					800: "hsl(243, 27%, 20%)",
					900: "hsl(243, 96%, 9%)",
				},
				blue: {
					DEFAULT: 'hsl(var(--blue-500))',
					500: 'hsl(var(--blue-500))',
					700: 'hsl(var(--blue-700))'
				},
				orange: {
					DEFAULT: 'hsl(var(--orange-500))'
				},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--neutral-800))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
