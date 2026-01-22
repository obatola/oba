import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                const storedTheme = localStorage.getItem("theme");
                                let themeToApply;
                                
                                // If no theme is stored or theme is "system", use system preference
                                if (!storedTheme || storedTheme === "system") {
                                    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                                    themeToApply = systemPrefersDark ? "dark-sand" : "light";
                                } else {
                                    themeToApply = storedTheme;
                                }
                                
                                document.documentElement.setAttribute("data-theme", themeToApply);
                            })();
                        `,
                    }}
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
