import { useState } from "react";
import styles from "../../styles/ThemeManager.module.css";
import { FaPaintRoller } from "react-icons/fa";

function ThemeView({ theme, label }: { theme: string; label: string }) {
	const selectTheme = (theme: string) => {
		document.documentElement.setAttribute("data-theme", theme);
	};

	return (
		<button
			data-theme={theme}
			className={styles["theme-manager__theme-button"]}
			type="button"
			onClick={() => selectTheme(theme)}
		>
			<span className={styles["theme-manager__theme-button__accent-box"]} />
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
						<ThemeView theme="light" label="Light" />
					</li>
					<li>
						<ThemeView theme="midnight" label="Midnight" />
					</li>
					<li>
						<ThemeView theme="default" label="Dark Sand" />
					</li>
					<li>
						<ThemeView theme="dark" label="Dark" />
					</li>
				</ul>
			)}
			<FaPaintRoller onClick={toggleMenu}>Select Theme</FaPaintRoller>
		</div>
	);
}
