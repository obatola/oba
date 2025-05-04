import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import styles from "../../styles/ThemeManager.module.css";
import { FaPaintRoller } from "react-icons/fa";
import clsx from "clsx";

const themes = ["light", "terminal-green", "default", "midnight", "dark", "system"] as const;
type Theme = (typeof themes)[number];

const defaultTheme = "default";

interface ThemeContextType {
	/** The theme that is currently active. */
	activeTheme: Theme;
	/** The theme that is currently displayed. Can be different from the active theme if the active theme is "system". */
	displayedTheme: Theme;
	/** Set the theme. */
	setTheme: (theme: Theme) => void;
	/** Whether the active theme is a light theme. */
	isLightTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
	activeTheme: defaultTheme,
	displayedTheme: defaultTheme,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setTheme: () => { },
	isLightTheme: false,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [activeTheme, setActiveTheme] = useState<Theme>(defaultTheme);
	const [displayedTheme, setDisplayedTheme] = useState<Theme>(defaultTheme);

	// Helper function to apply the theme based on localStorage or system preferences
	const applyTheme = () => {
		const storedTheme = window.localStorage.getItem("theme") as Theme;
		if (storedTheme === "system") {
			const systemPrefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches;
			const newDisplayedTheme = systemPrefersDark ? "dark" : "light";
			document.documentElement.setAttribute("data-theme", newDisplayedTheme);
			setActiveTheme("system");
			setDisplayedTheme(newDisplayedTheme);
		} else {
			document.documentElement.setAttribute(
				"data-theme",
				storedTheme || defaultTheme,
			);
			setActiveTheme(storedTheme || defaultTheme);
			setDisplayedTheme(storedTheme || defaultTheme);
		}
	};

	// Function to set the theme and store it in localStorage
	const setTheme = (theme: string) => {
		window.localStorage.setItem("theme", theme);
		applyTheme();
	};

	// Apply theme on initial mount
	useEffect(() => {
		applyTheme();
	}, []);

	// Listen for changes in system theme preferences and update the theme accordingly
	useEffect(() => {
		const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

		const handleSystemThemeChange = () => {
			const storedTheme = window.localStorage.getItem("theme");
			if (storedTheme === "system") {
				const newDisplayedTheme = systemTheme.matches ? "dark" : "light";
				document.documentElement.setAttribute("data-theme", newDisplayedTheme);
				setDisplayedTheme(newDisplayedTheme);
			}
		};

		systemTheme.addEventListener("change", handleSystemThemeChange);
		return () =>
			systemTheme.removeEventListener("change", handleSystemThemeChange);
	}, []);

	const isLightTheme = useMemo(() => displayedTheme === "light", [displayedTheme]);

	return (
		<ThemeContext.Provider value={{ activeTheme, displayedTheme, setTheme, isLightTheme }}>
			{children}
			<ThemeManager />
		</ThemeContext.Provider>
	);
}

function ThemeView({
	label,
	theme,
}: {
	label: string;
	theme: Theme;
}) {
	const { activeTheme, displayedTheme, setTheme } = useTheme();

	const themeToDisplay = theme === "system" ? displayedTheme : theme;

	return (
		<button
			data-theme={themeToDisplay}
			className={styles["theme-manager__theme-button"]}
			type="button"
			onClick={() => setTheme(theme)}
		>
			<span
				className={clsx(styles["theme-manager__theme-button__accent-box"], {
					[styles["theme-manager__theme-button__accent-box--active"]]:
						activeTheme === theme,
				})}
			/>
			{label}
		</button>
	);
}

export function ThemeManager() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles["theme-manager__container"]}>
			{isOpen && (
				<ul className={styles["theme-manager__menu"]}>
					<li>
						<ThemeView
							theme="light"
							label="Light"
						/>
					</li>
					<li>
						<ThemeView
							theme="terminal-green"
							label="Terminal"
						/>
					</li>
					<li>
						<ThemeView
							theme="default"
							label="Dark Sand"
						/>
					</li>
					<li>
						<ThemeView
							theme="midnight"
							label="Midnight"
						/>
					</li>
					<li>
						<ThemeView
							theme="dark"
							label="Dark"
						/>
					</li>
					<li>
						<ThemeView
							theme="system"
							label="System"
						/>
					</li>
				</ul>
			)}
			<FaPaintRoller onClick={toggleMenu}>Select Theme</FaPaintRoller>
		</div>
	);
}
