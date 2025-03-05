import { useTranslations } from 'next-intl';

import { Button } from "@/components/ui/button";
import { Link } from '@/i18n/navigation';
import PageDescription from "../../components/server/page-description";
import { ReduceEmissionsCarousel } from "../../components/server/reduce-emissions-carousel";

export default function ReduceEmissions() {
  const t = useTranslations('ReduceEmissions');
  const tCommon = useTranslations('common');
  
  return <>
    <PageDescription title={t('title')} subTitle={t('subTitle')} />
    <section className="flex flex-col items-center">
      <ReduceEmissionsCarousel />
      <Link href="/" className="w-3/5 mb-5">
          <Button className="min-w-full">{tCommon('backToCalculator')}</Button>
      </Link>
    </section>
  </>;
}
