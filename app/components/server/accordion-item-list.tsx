import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Props = {
    valueAttr: string;
    title: string;
    listItemText: string[];
    className?: string;
  };
  
  export default function AccordionItemList({ valueAttr, title, listItemText, className = "" }: Props) {
    return <AccordionItem value={valueAttr}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
                <ul className={className || "my-6 ml-6 list-disc [&>li]:mt-2"}>
                    {listItemText.map((text, idx) => <li key={idx}>{text}</li>)}
                </ul>
            </AccordionContent>
        </AccordionItem>;
  }