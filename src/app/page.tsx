import Code from "@/components/Code";
import Settings from "@/components/Settings";

export default function Home() {
  return (
    <main
      id="main"
      className="h-screen flex flex-col items-center justify-center"
    >
      <Code placeholder="Add some code here..." />
      <Settings />
    </main>
  );
}
