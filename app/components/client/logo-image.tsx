"use client"

import Image from 'next/image'
import { useTheme } from "next-themes"
import { THEME_TYPE } from '@/lib/constants'

type Props = {
    className?: string, 
    width?: number, 
    height?: number,
    alt?: string,
    imgSrcLight?: string,
    imgSrcDark?: string
}

export default function LogoImage({ 
    className = "", 
    width = 208, 
    height = 88,
    alt = "The Carbon Negative logo",
    imgSrcLight = "/img/cn-logo.png",
    imgSrcDark = "/img/cn-logo-dark.png"
 }: Props) {
    const { theme } = useTheme()

    return <Image 
        {...{ className, width, height, alt }}
        src={theme === THEME_TYPE.LIGHT? imgSrcLight: imgSrcDark}/>
 }