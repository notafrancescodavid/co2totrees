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
import { CarouselItemType } from '@/lib/types'
import { useTranslations } from "next-intl";

export function ReduceEmissionsCarousel() {
    const t = useTranslations('ReduceEmissionsCarousel');
    const items = getItems(t);

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

const getItems = <T extends CallableFunction>(t: T): CarouselItemType[] => [
    {
        title: t('item1title'),
        todos: [ 
            t('item1todo1part1'),
            <>
                {t('item1todo2part1')}
                <ul className="list-disc list-inside">
                    <li>{t('item1todo2part2')}</li>
                    <li>{t('item1todo2part3')}</li>
                    <li>{t('item1todo2part4')}</li>
                    <li>{t('item1todo2part5')}</li>
                    <li>{t('item1todo2part6')}</li>
                    <li>{t('item1todo2part7')}</li>
                </ul>
            </>
        ]
    },
    {
        title: t('item2title'),
        todos: [ 
            t('item2todo1part1'),
            t('item2todo2part1')
        ]
    },
    {
        title: t('item3title'),
        todos: [ 
            t('item3todo1part1'),
            t('item3todo2part1'),
            t('item3todo3part1')
        ]
    },
    {
        title: t('item4title'),
        todos: [ 
            t('item4todo1part1'),
            t('item4todo2part1')
        ]
    },
    {
        title: t('item5title'),
        todos: [ 
            t('item5todo1part1'),
            <>
                {t('item5todo2part1')}
                <ButtonLink buttonClass="min-w-full" className="inline-block min-w-full" href="https://citizens-initiative.europa.eu/_en">
                    {t('item5todo2part2')}
                </ButtonLink>
            </>
        ]
    },
    {
        title: t('item6title'),
        todos: [ 
            <>
                <div>{t('item6todo1part1')}</div>
                <ButtonLink buttonClass="min-w-full" className="inline-block min-w-full" href="https://1komma5.com/en/">
                    {t('item6todo1part2')}
                </ButtonLink>
            </>,
            <>
                <div>{t('item6todo2part1')}</div>
                <ButtonLink buttonClass="min-w-full" className="inline-block min-w-full" href="https://www.ecosia.org/">
                    {t('item6todo2part2')}
                </ButtonLink>
            </>,
            <>
                <div>{t('item6todo3part1')}</div>
                <ButtonLink buttonClass="min-w-full" className="inline-block min-w-full" href="https://www.tomorrow.one/en-EU/">
                    {t('item6todo3part2')}
                </ButtonLink>
            </>
        ]
    },
    {
        title: t('item7title'),
        todos: [
            <>
                <div className="flex min-w-fit justify-center my-3">
                    <LogoImage className="h-11 w-auto" />
                </div>
                <div>{t('item7todo1part1')}</div>
                <ButtonLink buttonClass="min-w-full" className="inline-block w-1/2 px-1" href="https://www.facebook.com/carbonegativ">Facebook</ButtonLink>
                <ButtonLink buttonClass="min-w-full" className="inline-block w-1/2 px-1" href="https://www.instagram.com/carbon_negative_/">Instagram</ButtonLink>
            </>,
            
        ]
    }
];