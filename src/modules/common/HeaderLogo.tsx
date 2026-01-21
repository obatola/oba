import React, { useMemo } from "react";
import Link from "next/link";
import Image, { ImageProps } from "next/image";
import ObaLogo from "../../../public/images/obase_logo.png";
import ObaLogoDark from "../../../public/images/obase_logo_dark.png";
import { useTheme } from "./ThemeManager";


export function HeaderLogo({ className, ...props }: { className?: string } & Omit<ImageProps, "src" | "alt">) {
    const { isLightTheme } = useTheme();

    const Logo = useMemo(() => (isLightTheme ? ObaLogoDark : ObaLogo), [isLightTheme]);

    return (
        <Link href="/" style={{
            display: "inline-block",
            lineHeight: 0,
            padding: 0,
            margin: 0,
        }}>
            <Image priority src={Logo} className={className} alt="" {...props} />
        </Link >
    )
}