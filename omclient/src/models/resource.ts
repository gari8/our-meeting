export enum ColorMap {
    title = "#16c79a",
    textMain = "#09015f",
    textAc = "#16c79a",
    bgMain = "#11698e",
    bgSub = "#19456b",
    bgGray = "#D1D5DB",
    bgBase = "#f8f1f1",
}

export enum Texts {
    title = "The minutes",
    login = "Log in",
    logout = "Log out",
}

export enum Fonts {
    title = '"MS Pゴシック", system-ui, sans-serif',
}

export type AccordionItem = {
    label: string
    linkUrl: string
    textColor?: string
}


export const AccordionLinks: AccordionItem[] = [
    {
        label: "DashBoard",
        linkUrl: "/dashboard",
    },
    {
        label: "Brainstorming",
        linkUrl: "/brain-storming",
    },
]