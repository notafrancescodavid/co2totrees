import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CarouselItemType } from '@/lib/types'
import { useTranslations } from "next-intl";
import TodoItem from "./todo-item";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function ReduceEmissionsCarousel({ className = "" }: Props) {
    const t = useTranslations('ReduceEmissionsCarousel');
    const items = getItems<typeof t>(t);

    return <Carousel
      opts={{
        align: "start",
      }}
      className={cn(className, "w-4/5")}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
                <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex aspect-square px-6">
                    <ul className="list-none">
                    {item.todos.map((todo, idx) => (
                        <li key={idx} className="mb-6">
                            <TodoItem item={todo} />
                        </li>
                    ))}
                    </ul>
                </CardContent>
                </Card>
            </div>
            </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
}

const getItems = <T extends CallableFunction>(t: T): CarouselItemType[] => [
    {
      title: t("item1title"),
      todos: [
        t("item1todo1part1"),
        { type: "list", text: t("item1todo2part1"), items: [t("item1todo2part2"), t("item1todo2part3"), t("item1todo2part4"), t("item1todo2part5"), t("item1todo2part6"), t("item1todo2part7")] },
      ],
    },
    {
      title: t("item2title"),
      todos: [t("item2todo1part1"), t("item2todo2part1")],
    },
    {
      title: t("item5title"),
      todos: [
        t("item5todo1part1"),
        { type: "button", text: t("item5todo2part1"), label: t("item5todo2part2"), href: "https://citizens-initiative.europa.eu/_en" },
      ],
    },
    {
      title: t("item6title"),
      todos: [
        { type: "button", text: t("item6todo1part1"), label: t("item6todo1part2"), href: "https://1komma5.com/en/" },
        { type: "button", text: t("item6todo2part1"), label: t("item6todo2part2"), href: "https://www.ecosia.org/" },
        { type: "button", text: t("item6todo3part1"), label: t("item6todo3part2"), href: "https://www.tomorrow.one/en-EU/" },
      ],
    },
    {
      title: t("item7title"),
      todos: [
        {
          type: "logo",
          text: t("item7todo1part1"),
          links: [
            { href: "https://www.facebook.com/carbonegativ", label: "Facebook" },
            { href: "https://www.instagram.com/carbon_negative_/", label: "Instagram" },
          ],
        },
      ],
    },
];