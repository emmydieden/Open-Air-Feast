import { PromptForm } from "../PromptForm";
import "./heroSection.css";

export const HeroSection = () => {
  return (
    <>
      <section className="hero">
      <h2>Generate a recipe for your next outdoor adventure!</h2> 
        <PromptForm/>
      </section>
    </>
  );
};
