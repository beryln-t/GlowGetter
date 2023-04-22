import QuizIntroMsg from "./QuizIntroMsg";
import SkinTypeMsg from "./SkinTypeMsg";
import QuizBody from "./QuizBody";
import QuizButtons from "./QuizButtons";

export default function SkinAnalyser() {
  return (
    <div>
      <QuizIntroMsg />
      <SkinTypeMsg />
      <QuizBody />
      <QuizButtons />
    </div>
  );
}
