"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";
import {
  ImageCreater,
  ImageAnalysis,
  IngredientRecognition,
  GeminiTextGen,
  // Video,
} from "@/app/_components-front";
import { GeminiChat } from "./_components-front/GeminiChat";

const HomePage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center m-auto justify-between">
      <div className="w-360 h-screen px-[430px] relative">
        <div className="w-145 mt-6">
          <Tabs defaultValue="Image analysis" className="w-105 gap-6">
            <TabsList className="w-full p-1">
              <TabsTrigger value="Image analysis">Image analysis</TabsTrigger>
              <TabsTrigger value="Ingredient recognition">
                Ingredient recognition
              </TabsTrigger>
              <TabsTrigger value="Image creater">Image creater</TabsTrigger>
              <TabsTrigger value="Video">Video</TabsTrigger>
            </TabsList>

            <div>
              <ImageAnalysis />
              <IngredientRecognition />
              <ImageCreater />
            </div>
          </Tabs>
          <GeminiChat />
        </div>

        <GeminiTextGen />
      </div>
    </div>
  );
};

export default HomePage;
