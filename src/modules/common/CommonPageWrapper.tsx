import React, { useState } from "react";
import { clsx } from "clsx";
import { FaHamburger } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import styles from "../../styles/CommonPageWrapper.module.css";
import { ICON_SIZE, PATHS } from "@/contants";
import { HOME_PAGE_ANCHORS } from "@/constants/homeConstants";
import { HeaderLogo } from "./HeaderLogo";

interface ICommonPageWrapperProps {
	children: React.ReactNode;
}

export const CommonPageWrapper: React.FC<ICommonPageWrapperProps> = ({
	children,
}) => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);

	return (
		<div>
			<div className={styles.header}>
				<nav className={styles.navBar}>
					<div className={styles.logoWrapper}>
						<HeaderLogo className={styles.logo} />
					</div>
					<div id="navRow">
						<NavLinks />
					</div>
					<div className={styles.hamburgerMenu}>
						<FaHamburger
							size={ICON_SIZE.large}
							onClick={() => setIsSideBarOpen(true)}
						/>
					</div>
				</nav>
			</div>
			<div
				id="side-menu"
				className={clsx({
					[styles.closedSideMenu]: !isSideBarOpen,
					[styles.openSideMenu]: isSideBarOpen,
				})}
			>
				<div className={styles.closeIcon}>
					<IoClose
						onClick={() => setIsSideBarOpen(false)}
						size={ICON_SIZE.large}
					/>
				</div>
				<NavLinks />
			</div>
			<div>
				<div className={styles.main}>{children}</div>
			</div>
		</div>
	);
};

const NavLinks = () => (
	<>
		<a className={styles.navLink} href={`#${HOME_PAGE_ANCHORS.about}`}>
			About
		</a>
		<a className={styles.navLink} href={`#${HOME_PAGE_ANCHORS.work}`}>
			Work
		</a>
		<a className={styles.navLink} href={`#${HOME_PAGE_ANCHORS.projects}`}>
			Projects
		</a>
		<a
			href={PATHS.resume}
			className={styles.navLink}
			rel="noreferrer"
		>
			Resume
		</a>
	</>
);
