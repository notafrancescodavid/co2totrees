import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function CalculatorDetails({ className = "" }) {

    return <div className={className}>
        <div className="text-lg font-semibold">
            The calculation above is computed by making some assumptions.
        </div>

        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Nature Sinks and Human population growth</AccordionTrigger>
                <AccordionContent>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        <li>
                            Humans on earth are predicted to go from 8.1 billion (today) to 10.5 billion, and only after that the growth will stop and population stabilise. An average growth population rate is considered based on this assumption.
                        </li>
                        <li>
                            Natural absorbtion of Co2 is assumed to decrease by 1% every year due to climate change and human destruction of nature. This is a conservative assumption unfortunately.
                        </li>
                        <li>
                            Starting from the two assumptions made above the amount of Co2 captured by nature per person per year is computed by dividing the total co2 captured by earth and the human population.
                        </li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Factors affecting Co2 absorbed by trees</AccordionTrigger>
                <AccordionContent>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        <li>
                            Age: Trees absorb Co2 annually based on a base 2 log function computed based on their age.
                            This assumes that alive trees at first absorb less carbon when small, and slowly absorb more until a point of maturity where they emit as much as they absorb.
                        </li>
                        <li>
                            Survival Rate: each year 80% of trees will survive, hence they 20% that do not are removed from the calculation.
                            (This assumption is optimistic, generally global survival rate of planted trees is around 70%)
                        </li>
                        <li>
                            Size: small trees absorb less, medium trees more, big trees a lot more.
                        </li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Co2 Emissions reductions over time</AccordionTrigger>
                <AccordionContent>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>
                        In the calculator the amount of Co2 you produce decreases each year until a maximum yearly reduction of 8%.
                        This assumes emissions reduction will continue in most heavily emitting sectors globally like energy production, aviation and agriculture.
                        (This assumption is optimistic, as emissions are unfortunately still rising globally).
                    </li>
                    <li>
                        The calculation considers a minimum amount of yearly personal emissions of 20% compared to the one you insert in the input.
                        This choice comes from the consideration that there will always be antropogenic sources of emissions that we cannot avoid.
                    </li>
                    <li>
                        Different trees in different places absorb different amounts of Co2. 
                        This calculation considers an average absorbtion based on tree size, 
                        assuming most planted trees are small when fully grown (e.g. olive trees) and some others are medium or big (e.g. quercus or sequoia).
                    </li>
                </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
 }