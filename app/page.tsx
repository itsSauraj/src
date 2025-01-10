import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className={title({ color: "violet", size: "lg" })}>
        {siteConfig.name}
      </h1>
    </section>
  );
}
