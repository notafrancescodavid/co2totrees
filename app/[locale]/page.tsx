import { useTranslations } from 'next-intl';

import CalculatorDetails from "../components/server/calculator-details";
import Co2ToTreeCalculatorCard from "../components/client/co2-to-tree-calculator-card";
import PageDescription from "../components/server/page-description";

export default function Home() {
  const t = useTranslations('Home');

  return <>
    <PageDescription title={t('title')} subTitle={t('subTitle')}/>
    <section className="flex flex-col items-center">
          <Co2ToTreeCalculatorCard />
          <CalculatorDetails className={"my-10 w-4/5 lg:w-3/5 lg:w-2/5"}/>
      </section>
  </>;
}
