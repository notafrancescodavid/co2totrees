import CalculatorDetails from "./components/server/calculator-details";
import Co2ToTreeCalculatorCard from "./components/client/co2-to-tree-calculator-card";
import PageDescription from "./components/server/page-description";

export default function Home() {
  const serviceExplanationTitle = "How many trees do you need to absorb all your Co2 emissions?";
  const serviceExplanationSubTitle = "Imagine every year you plant some trees. You decide to plant trees that when mature can become small, mid-sized, big or huge. Use the calculator to see how many you need to plant each year to become Carbon Negative.";

  return <>
    <PageDescription title={serviceExplanationTitle} subTitle={serviceExplanationSubTitle}/>
    <section className="flex flex-col items-center">
          <Co2ToTreeCalculatorCard />
          <CalculatorDetails className={"my-10 w-4/5 lg:w-3/5 lg:w-2/5"}/>
      </section>
  </>;
}
