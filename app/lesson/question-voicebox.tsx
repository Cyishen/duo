import Image from "next/image";
import { useAudio } from "react-use";
import { useCallback, useEffect, useState } from "react";

type Props = {
  question: string;
  imageSrc: string | null;
  audioSrc: string | null;
};

export const QuestionVoiceBox = ({ question, imageSrc, audioSrc }: Props) => {
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const [audio, _, controls] = useAudio({ src: audioSrc || "" });

  useEffect(() => {
    if (audioSrc && !hasAutoPlayed) {
      controls.play();
      setHasAutoPlayed(true);
    }
  }, [audioSrc, controls, hasAutoPlayed]);

  const handleClick = useCallback(() => {
    if (!hasAutoPlayed) {
      return;
    }

    controls.play();
  }, [controls, hasAutoPlayed]);

  
  return (
    <div
      onClick={handleClick} 
      className="flex items-center justify-center gap-x-4 mb-6"
    >
      {audio}
      
      {audioSrc ? (
        <div className="flex items-center justify-center h-full rounded-xl border-2 border-b-4 active:border-b-2 hover:bg-black/5 p-4 lg:p-6 cursor-pointer gap-3">
          <Image src="/voice_btn.svg" alt="voice_btn" width={40} height={40} />

          {question}
        </div>
      ) : (
        <div className="flex items-center h-full gap-3">
          <Image src={imageSrc as string} alt="imageSrc" width={100} height={100} />
          
          {question}
        </div>
      )}
    </div>
  );
};
