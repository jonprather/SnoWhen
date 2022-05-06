import Hero from "@/components/organisms/Hero";
import SelectLocation from "@/components/molecules/selectLocation";

export default function Header({ handleEmit }) {
  return (
    <>
      <Hero />
      <SelectLocation emit={handleEmit} />
    </>
  );
}
