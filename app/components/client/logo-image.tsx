"use client"

import Image from 'next/image'
import { useTheme } from "next-themes"
import { THEME_TYPE } from '@/lib/constants'

export default function LogoImage({ className = "" }) {
    const { theme } = useTheme()

    return <Image 
        className={className}
        src={theme === THEME_TYPE.LIGHT? "/img/cn-logo.png": "/img/cn-logo-dark.png"}
        width={208} 
        height={88}
        alt="The Carbon Negative logo"/>
 }