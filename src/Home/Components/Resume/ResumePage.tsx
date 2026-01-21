import { Center, Grid, Group, Stack } from "@mantine/core";
import classes from "./ResumePage.module.css";
import * as Icons from "@styled-icons/ionicons-solid";
import type { ResumeAchievementsType, ResumeEducationType, ResumeExperienceType, ResumeHeaderType, ResumeProjectType, ResumeTechnologiesType, ResumeType, SectionType } from "./ResumePage.types";

const SPACING = {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
}

function Icon({ icon }: { icon: keyof typeof Icons }) {
    if (!Icons[icon]) {
        return null;
    }
    const IconComponent = Icons[icon];

    return <Center className={classes["resume-page__icon"]}><IconComponent strokeWidth={3} className={classes["resume-page__icon"]} /></Center>
}

function Header({
    name,
    items,
}: ResumeHeaderType) {
    return (
        <section>
            <Stack gap={SPACING.sm}>
                <h1>{name}</h1>
                <Group gap={SPACING.lg}>
                    {items.map((item) => (
                        <Group key={item.icon} gap={SPACING.sm} className={classes["resume-page__header-item"]}>
                            <Icon icon={item.icon} />
                            <p>{item.content}</p>
                        </Group>
                    ))}
                </Group>
            </Stack>
        </section>
    )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section>
            <h2>{title}</h2>
            {children}
        </section>
    )
}

function Experience({ title, company, date, location, children }: ResumeExperienceType) {
    return (
        <article>
            <Stack gap={SPACING.none}>
                <h3>{title}</h3>
                <Group gap={SPACING.lg} align="baseline">
                    <h4 className={classes["resume-page__accented-text"]}>{company}</h4>
                    <p className={classes["resume-page__caption"]}>{date}</p>
                    <p className={classes["resume-page__caption"]}>{location}</p>
                </Group>
            </Stack>
            {children}
        </article>
    )
}

function Technologies({ technologies }: ResumeTechnologiesType) {
    return (
        <article>
            <Group gap={SPACING.md}>
                {technologies.map((technology) => (
                    <p key={technology} className={classes["resume-page__technology"]}>{technology}</p>
                ))}
            </Group>
        </article>
    )
}

function Achievements({ achievements }: ResumeAchievementsType) {
    return (
        <article>
            <Group gap={SPACING.md}>
                {achievements.map((achievement) => (
                    <Group key={achievement.icon} gap={SPACING.md} wrap="nowrap" align="start" className={classes["resume-page__achievement"]}>
                        <Icon icon={achievement.icon} />
                        <p>{achievement.content}</p>
                    </Group>
                ))}
            </Group>
        </article>
    )
}

function Project({ title, url, children }: ResumeProjectType) {
    return (
        <article>
            <Stack gap={SPACING.sm}>
                <h3>{title}</h3>
                <p className={classes["resume-page__caption"]}>{url}</p>
            </Stack>
            {children}
        </article>
    )
}

function Education({ degree, school, date, gpa }: ResumeEducationType) {
    return (
        <article>
            <Stack gap={SPACING.sm}>
                <Stack gap={SPACING.sm}>
                    <Stack gap={SPACING.none}>
                        <h3>{degree}</h3>
                        <h4 className={classes["resume-page__accented-text"]}>{school}</h4>
                    </Stack>
                    <Group gap={SPACING.lg}>
                        <p className={classes["resume-page__caption"]}>{date}</p>
                        <p>GPA: {gpa}</p>
                    </Group>
                </Stack>
            </Stack>
        </article >
    )
}


function DynamicSection({ title, content }: SectionType) {
    const contentDOM = content.map((item, index) => {
        switch (item.type) {
            case 'generic':
                return <div key={index}>{item.children}</div>;
            case 'experience':
                return <Experience key={index} {...item} />;
            case 'technologies':
                return <Technologies key={index} {...item} />;
            case 'achievements':
                return <Achievements key={index} {...item} />;
            case 'project':
                return <Project key={index} {...item} />;
            case 'education':
                return <Education key={index} {...item} />;
            default:
                return null;
        }
    })
    return (
        <Section title={title}>
            <Stack gap={SPACING.xl}>
                {contentDOM}
            </Stack>
        </Section>
    )
}

export function DynamicResumePage({ resume }: { resume: ResumeType }) {
    const mainPanelDOM = resume.mainPanel.map((item) => <DynamicSection key={item.title} {...item} />)
    const rightPanelDOM = resume.rightPanel.map((item) => <DynamicSection key={item.title} {...item} />)

    return (
        <div className={classes["resume-page-container"]}>
            <div className={classes["resume-page__resume-wrapper"]}>
                <div className={classes["resume-page__resume"]}>
                    <Stack>
                        <Header {...resume.header} />
                        <Grid gutter={14}>
                            <Grid.Col span={{ base: 12, xs: 7 }}>
                                <Stack gap={SPACING.xl}>
                                    {mainPanelDOM}
                                </Stack>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 5 }}>
                                <Stack gap={SPACING.xl}>
                                    {rightPanelDOM}
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </Stack>
                </div>
            </div>
        </div>
    )
}
