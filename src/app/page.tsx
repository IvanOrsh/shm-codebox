import Code from "@/components/Code";

export default function Home() {
  return (
    <main className="h-full flex items-center justify-center flex-col gap-6">
      <h1 className="text-4xl font-black ">
        <span className="text-sky-500 font-extrabold">SHM</span>
        <span className="font-light">codebox</span>
      </h1>

      <Code placeholder="Paste some code here..." />
    </main>
  );
}
