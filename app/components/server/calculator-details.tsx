import {
    Accordion,
  } from "@/components/ui/accordion"
import { useTranslations } from "next-intl"
import AccordionItemList from "./accordion-item-list";

type Props = {
    className?: string;
}

export default function CalculatorDetails({ className = "" }: Props) {
    const t = useTranslations('CalculatorDetails');

    return <div className={className}>
        <h4 className="text-lg font-semibold">
            {t('header')}
        </h4>

        <Accordion type="single" collapsible className="w-full">
            <AccordionItemList 
                valueAttr="item-1" 
                title={t('item1TriggerTitle')}
                listItemText={[
                    t('item1Content1'),
                    t('item1Content2'),
                    t('item1Content3'),
                ]}
                />
            <AccordionItemList 
                valueAttr="item-2" 
                title={t('item2TriggerTitle')}
                listItemText={[
                    t('item2Content1'),
                    t('item2Content2'),
                    t('item2Content3'),
                ]}
                />
            <AccordionItemList 
                valueAttr="item-3" 
                title={t('item3TriggerTitle')}
                listItemText={[
                    t('item3Content1'),
                    t('item3Content2'),
                    t('item3Content3'),
                ]}
                />
        </Accordion>
    </div>
 }