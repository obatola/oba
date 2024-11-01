import { useEffect, useState } from "react";
import styles from "../../styles/ThemeManager.module.css";
import { FaPaintRoller } from "react-icons/fa";
import clsx from "clsx";

function ThemeView({
	activeTheme,
	label,
	setTheme,
	theme,
}: {
	activeTheme: string;
	label: string;
	setTheme: (theme: string) => void;
	theme: string;
}) {
	let themeToDisplay = theme;
	const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
	if (theme === "system") {
		themeToDisplay = systemTheme.matches ? "dark" : "light";
	}

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
	const [activeTheme, setActiveTheme] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	// Function to set the theme and store it in localStorage
	const setTheme = (theme: string) => {
		window.localStorage.setItem("theme", theme);
		applyTheme();
	};

	// Helper function to apply the theme based on localStorage or system preferences
	const applyTheme = () => {
		const storedTheme = window.localStorage.getItem("theme");
		if (storedTheme === "system") {
			const systemPrefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches;
			document.documentElement.setAttribute(
				"data-theme",
				systemPrefersDark ? "dark" : "light",
			);
			setActiveTheme("system");
		} else {
			document.documentElement.setAttribute(
				"data-theme",
				storedTheme || "light",
			);
			setActiveTheme(storedTheme || "light");
		}
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
				applyTheme();
			}
		};

		systemTheme.addEventListener("change", handleSystemThemeChange);
		return () =>
			systemTheme.removeEventListener("change", handleSystemThemeChange);
	}, []);

	return (
		<div className={styles["theme-manager__container"]}>
			{isOpen && (
				<ul className={styles["theme-manager__menu"]}>
					<li>
						<ThemeView
							activeTheme={activeTheme}
							theme="light"
							label="Light"
							setTheme={setTheme}
						/>
					</li>
					<li>
						<ThemeView
							activeTheme={activeTheme}
							theme="terminal-green"
							label="Terminal"
							setTheme={setTheme}
						/>
					</li>
					<li>
						<ThemeView
							activeTheme={activeTheme}
							theme="default"
							label="Dark Sand"
							setTheme={setTheme}
						/>
					</li>
					<li>
						<ThemeView
							activeTheme={activeTheme}
							theme="midnight"
							label="Midnight"
							setTheme={setTheme}
						/>
					</li>
					<li>
						<ThemeView
							activeTheme={activeTheme}
							theme="dark"
							label="Dark"
							setTheme={setTheme}
						/>
					</li>
					<li>
						<ThemeView
							activeTheme={activeTheme}
							theme="system"
							label="System"
							setTheme={setTheme}
						/>
					</li>
				</ul>
			)}
			<FaPaintRoller onClick={toggleMenu}>Select Theme</FaPaintRoller>
		</div>
	);
}
