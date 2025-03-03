import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
    className?: string;
    target?: string;
    href: string;
    children: string;
}

export default function ButtonLink({ href, className = "", target = "_blank", children }: Props) {
  return <a href={href} className={`mt-3 ${className}`} target={target}>
    <Button>{children}</Button>
  </a>
}