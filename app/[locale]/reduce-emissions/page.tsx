import { useTranslations } from 'next-intl';

import { Button } from "@/components/ui/button";
import { Link } from '@/i18n/navigation';
import PageDescription from "../../components/server/page-description";
import { ReduceEmissionsCarousel } from "../../components/server/reduce-emissions-carousel";
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

export default function ReduceEmissions({ params }: {
  params: Promise<Record<string, string>>;
}) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale);
  
  const tCommon = useTranslations('common');
  const t = useTranslations('ReduceEmissions');
  
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
