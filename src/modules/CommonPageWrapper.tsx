import React, { useState } from 'react';
import styles from './CommonPageWrapper.module.css';
import Link from 'next/link';
import { ICON_SIZE, LINK_TO_RESUME } from '@/contants';
import { clsx } from 'clsx';
import { FaHamburger } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import Image from 'next/image';
import ObaLogo from '../../public/images/obase_logo.png'


interface ICommonPageWrapperProps {
  children: React.ReactNode
}

export const CommonPageWrapper: React.FC<ICommonPageWrapperProps> = ({children}) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    return (
      <div>
        <div className={styles.header}>
          <nav className={styles.navBar}>
            <div className={styles.logoWrapper}>
                <Link href="/">
                <Image
                    priority
                    src={ObaLogo}
                    className={styles.logo}
                    alt=""
                />
                </Link>
            </div>
            <div id="navRow">
                <NavLinks />
            </div>
            <div id="hamburgerMenu"><FaHamburger size={ICON_SIZE.large} onClick={() => setIsSideBarOpen(true)} /></div>
          </nav>
        </div>
        <div id="side-menu" className={clsx({
            [styles.closedSideMenu]: !isSideBarOpen,
            [styles.openSideMenu]: isSideBarOpen,
        })}>
          <IoClose onClick={() => setIsSideBarOpen(false)} size={ICON_SIZE.large} />
          <NavLinks />
        </div>
        <div>
          <div className={styles.main}>
            {children}
          </div>
        </div>
      </div>
    )
}

const NavLinks = () => (
  <>
    <a className={styles.navLink} href={`#1`}>About</a>
    <a className={styles.navLink} href={`#2`}>Work</a>
    <a className={styles.navLink} href={`#3`}>Projects</a>
    <a target="_blank" href={LINK_TO_RESUME} className={styles.navLink}>Resume</a>
  </>
);