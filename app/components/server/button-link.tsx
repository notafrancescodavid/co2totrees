import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
    className?: string;
    target?: string;
    buttonClass?: string;
    href: string;
    children: string;
}

export default function ButtonLink({ href, className = "", target = "_blank", buttonClass = "", children }: Props) {
  return <a href={href} className={`mt-3 ${className}`} target={target}>
    <Button className={buttonClass}>{children}</Button>
  </a>
}