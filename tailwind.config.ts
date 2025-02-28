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
  		colors: {
  			'green-1': '#afe230',
  			'green-2': '#1b6302',
  			'green-3': '#041200',
  			'green-4': '#092C1C',
  			'green-5': '#E6FFDA',
  			'green-6': '#22C55E',
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
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			shine: {
  				'0%': {
  					'background-position': '0% 0%'
  				},
  				'50%': {
  					'background-position': '100% 100%'
  				},
  				to: {
  					'background-position': '0% 0%'
  				}
  			},
        "pulse-yellow": {
          "0%": { transform: "scale(0.9)", boxShadow: "0 0 0 0 #FFD791" },
          "70%": { transform: "scale(1)", boxShadow: "0 0 0 10px rgba(255, 215, 145, 0)" },
          "100%": { transform: "scale(0.9)", boxShadow: "0 0 0 0 rgba(255, 215, 145, 0)" },
        },
        "pulse-green": {
          "0%": { transform: "scale(0.9)", boxShadow: "0 0 0 0 #91FF91" },
          "70%": { transform: "scale(1)", boxShadow: "0 0 0 10px rgba(145, 255, 145, 0)" },
          "100%": { transform: "scale(0.9)", boxShadow: "0 0 0 0 rgba(145, 255, 145, 0)" },
        },
        "pulse-red": {
          "0%": { transform: "scale(0.9)", boxShadow: "0 0 0 0 #FF8282" },
          "70%": { transform: "scale(1)", boxShadow: "0 0 0 10px rgba(255, 82, 82, 0)" },
          "100%": { transform: "scale(0.9)", boxShadow: "0 0 0 0 rgba(255, 82, 82, 0)" },
        },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			shine: 'shine var(--duration) infinite linear',
        'pulse-yellow': 'pulse-yellow 2s infinite',
        'pulse-green': 'pulse-green 2s infinite',
        'pulse-red': 'pulse-red 2s infinite',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
