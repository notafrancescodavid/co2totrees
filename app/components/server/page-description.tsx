import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subTitle: string;
  className?: string;
};

export default function PageDescription({ title, subTitle, className = "" }: Props) {
  return <div className={cn(className, "py-3 sm:py-5")}>
      <div className="mx-auto my-5 sm:my-10 w-9/10 lg:w-3/5 px-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-4xl font-semibold text-pretty sm:text-5xl lg:text-balance">
            {title}
          </p>
          <p className="mt-6 text-lg/8">
            {subTitle}
          </p>
        </div>
      </div>
    </div>
}