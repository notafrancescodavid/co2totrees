import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageDescription from "../components/server/page-description";
import { ReduceEmissionsCarousel } from "../components/server/reduce-emissions-carousel";

export default function Page() {
  const title = "I wish there was a way to reduce emissions and help me, nature and other people for free.";
  const subTitle = "Good news! there are many ways to reduce your emissions, it turns out not only you can do them for free, but many save you money. Here is a list of some of the most impactful things you can do."
  
  return <>
    <PageDescription title={title} subTitle={subTitle} />
    <section className="flex flex-col items-center">
      <ReduceEmissionsCarousel />
      <Link href="/" className="w-3/5 mb-5">
          <Button className="min-w-full">Back to the calculator</Button>
      </Link>
    </section>
  </>;
}
