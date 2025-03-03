import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ButtonLink from "./button-link";
import LogoImage from "../client/logo-image";

type CarouselItem = {
    title: string;
    todos: React.ReactNode[];
};

export function ReduceEmissionsCarousel() {
    return <Carousel
      opts={{
        align: "start",
      }}
      className="w-4/5"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">
                        {item.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex aspect-square px-6">
                    <ul className="list-none">
                        {item.todos.map((todo, idx) => 
                            <li key={idx} className="mb-6">{todo}</li>
                        )}
                    </ul>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>;
}

const items: CarouselItem[] = [
    {
        title: 'Energy 🔆🔋🔌',
        todos: [ 
            "Use renewable energy and push politicians to invest into low-emission energy (solar, wind, hydro, geothermal, nuclear)",
            <>
                Reduce the energy you use: 
                <ul className="list-disc list-inside">
                    <li>Turn off unused appliances (e.g. tv, consoles, computers)</li>
                    <li>Do not heat too much your home</li>
                    <li>Make shorter hot showers</li>
                    <li>Reduce the use of air conditioning</li>
                    <li>Use efficient appliances</li>
                    <li>Make less and fuller washing machines</li>
                </ul>
            </>
        ]
    },
    {
        title: 'Mobility 🌳🚴‍♂️🌳',
        todos: [ 
            "Use trains, bikes, walk, electric cars and ferries.",
            "Do not Take too many planes (in particular for short distances), use less your car and buy aerodynamic and light ones \
            (Yes, Sorry, a SUV is not light and generally not aerodynamic!)"
        ]
    },
    {
        title: 'Food 🍄‍🟫🥕🥔',
        todos: [ 
            "Eat vegetables, seeds, legumes, eggs, mussells (and all bivalves).",
            "Consume Red Meat at most twice per week. If you really need meat prefer white meat. \
            Avoid also cow cheese and overconsumption of cheese.",
            "Avoid overconsumption of fish. Once or twice per week should be enough"
        ]
    },
    {
        title: 'Consumerism 👎',
        todos: [ 
            "Buy few things, in particular buy few but well made products",
            "Try to fix broken objects, or at least treat them with care to make them last longer"
        ]
    },
    {
        title: 'Politics 🔥',
        todos: [ 
            "Vote for politicians that care about the planet and people.",
            <>
                Be an active part of the political speech and regulations. 
                For example propose laws with the EU citizens initiative.
                <ButtonLink buttonClass="min-w-full" className="inline-block min-w-full" href="https://citizens-initiative.europa.eu/_en">
                    Check the EU citizens initiative
                </ButtonLink>
            </>
        ]
    },
    {
        title: 'Services ⚡🔎💸',
        todos: [ 
            <>
                <div>
                    Use Smart Energy Solutions like 1Komma5.
                </div>
                <ButtonLink buttonClass="min-w-full" className="inline-block min-w-full" href="https://1komma5.com/en/">Go to 1Komma5</ButtonLink>
            </>,
            <>
                <div>
                    Use Ecosia search engine. You search and they plant trees for free!
                </div>
                <ButtonLink buttonClass="min-w-full" className="inline-block min-w-full" href="https://www.ecosia.org/">Go to Ecosia</ButtonLink>
            </>,
            <>
                <div>
                    Switch to sustainable banking alternatives, a good example is the bank Tomorrow, 
                    they use part of their revenue for Clean Projects and investments, have a look!
                </div>
                <ButtonLink buttonClass="min-w-full" className="inline-block min-w-full" href="https://www.tomorrow.one/en-EU/">Go To Tomorrow</ButtonLink>
            </>
        ]
    },
    {
        title: 'Join us and donate to Non-profits 🌳',
        todos: [
            <>
                <div className="flex min-w-fit justify-center">
                    <LogoImage className="h-11 w-auto" />
                </div>
            </>,
            <>
                <div>
                    Consider donating to non-profits and Join us at Carbon Negative, be an activist, help nature and fight climate change. You can contact us on Facebook or Instagram and ask: how can I help?
                </div>
                <ButtonLink buttonClass="min-w-full" className="inline-block w-1/2 px-1" href="https://www.facebook.com/carbonegativ">Facebook</ButtonLink>
                <ButtonLink buttonClass="min-w-full" className="inline-block w-1/2 px-1" href="https://www.instagram.com/carbon_negative_/">Instagram</ButtonLink>
            </>,
            
        ]
    }
];