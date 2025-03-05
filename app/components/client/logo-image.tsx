"use client"

import Image from 'next/image'
import { useTheme } from "next-themes"
import { THEME_TYPE } from '@/lib/constants'
import { useTranslations } from 'next-intl'

type Props = {
    className?: string, 
    width?: number, 
    height?: number,
    imgSrcLight?: string,
    imgSrcDark?: string
}

export default function LogoImage({ 
    className = "", 
    width = 208, 
    height = 88,
    imgSrcLight = "/img/cn-logo.png",
    imgSrcDark = "/img/cn-logo-dark.png"
 }: Props) {
    const { theme } = useTheme();
    const t = useTranslations('LogoImage');

    return <Image 
        {...{ className, width, height, alt: t('alt') }}
        src={theme === THEME_TYPE.LIGHT? imgSrcLight: imgSrcDark}/>
 }