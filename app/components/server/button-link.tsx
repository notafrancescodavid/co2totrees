import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    target?: string;
    buttonClass?: string;
    href: string;
    children: string;
}

export default function ButtonLink({ href, className = "", target = "_blank", buttonClass = "", children }: Props) {
  return <a href={href} className={cn(className, 'mt-3')} target={target}>
    <Button className={buttonClass}>{children}</Button>
  </a>
}