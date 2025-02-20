import Head from "next/head";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Head>
        <title>Photography Portfolio</title>
        <meta
          name="description"
          content="Professional photography portfolio showcasing beautiful moments"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="overflow-hidden">
        <Hero />
        <Gallery />
        <About />
        <Contact />
      </main>
    </>
  );
}
