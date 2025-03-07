import { TodoItemType } from "@/lib/types";
import LogoImage from "../client/logo-image";
import ButtonLink from "./button-link";

export default function TodoItem({ item }: { item: TodoItemType }) {
    if (typeof item === "string") return <>{item}</>;
    if (item.type === "list")
        return <>
          {item.text}
          <ul className="list-disc list-inside">
            {item.items.map((subItem, idx) => (
              <li key={idx}>{subItem}</li>
            ))}
          </ul>
        </>;
    if (item.type === "button")
        return <>
          <div>{item.text}</div>
          <ButtonLink buttonClass="min-w-full" className="inline-block min-w-full" href={item.href}>
            {item.label}
          </ButtonLink>
        </>;
    if (item.type === "logo")
        return <>
            <div className="flex min-w-fit justify-center my-3">
            <LogoImage className="h-11 w-auto" />
            </div>
            <div>{item.text}</div>
            {item.links.map(({ href, label }, idx) => (
            <ButtonLink key={idx} buttonClass="min-w-full" className="inline-block w-1/2 px-1" href={href}>
                {label}
            </ButtonLink>
            ))}
        </>;
};