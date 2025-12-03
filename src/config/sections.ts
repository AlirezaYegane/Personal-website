export interface Section {
    id: string;
    title: string;
    description: string;
    order: number;
}

export const sections: Section[] = [
    {
        id: "hero",
        title: "Hero",
        description: "Introduction and main call-to-action",
        order: 1,
    },
    {
        id: "about",
        title: "About",
        description: "Personal information and background",
        order: 2,
    },
    {
        id: "projects",
        title: "Projects",
        description: "Portfolio of work and projects",
        order: 3,
    },
    {
        id: "contact",
        title: "Contact",
        description: "Contact form and information",
        order: 4,
    },
];
