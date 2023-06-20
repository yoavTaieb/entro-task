import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const outline = defineStyle({
    backgroundColor: "#EEF2F8",
    borderRadius: "10px",
    borderWidth: 0,
    padding: "16px",
    fontSize: "13px",
    textColor: "#475467"
})

const subtleBadge = defineStyle({
    padding: "2px 12px",
    borderRadius: 16,
    textTransform: "lowercased",
    textColor: "#475467",
    fontWeight: "500"
})

const solid = defineStyle({
    background: "var(--entro-blue)",
    fontWeight: 'semibold',
    textColor: "white",
    _hover: {
        backgroundColor: "var(--entro-blue)",
        opacity: 0.8,
    }
})

const outlineButton = defineStyle({
    background: "#DFE3EB",
    border: "1px solid #DFE3EB",
    textColor: "#475467",
})

const sm = defineStyle({
    fontSize: '12px',
    width: "100px",
    height: "32px",
    borderRadius: '8px',
})

export const solidButtonTheme = defineStyleConfig({
    variants: { solid, outline: outlineButton },
    sizes: { sm },
})



export const badgeTheme = defineStyleConfig({
    variants: { subtle: subtleBadge },
})

export const textareaTheme = defineStyleConfig({
    variants: { outline },
})