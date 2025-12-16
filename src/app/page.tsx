"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui";
import {
  ImageCreater,
  ImageAnalysis,
  IngredientRecognition,
  GeminiTextGen,
} from "@/app/_components-front";

const HomePage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center m-auto justify-between">
      <div className="w-360 h-screen px-[430px]">
        <div className="min-w-145 mt-10 relative border border-border p-3 rounded-3xl shadow-2xl bg-rose-900">
          <div className="p-8 bg-white rounded-2xl">
            <Tabs defaultValue="Image analysis" className="w-full gap-6">
              <TabsList className="w-full p-1">
                <TabsTrigger value="Image analysis" className="cursor-pointer">
                  Image analysis
                </TabsTrigger>
                <TabsTrigger
                  value="Ingredient recognition"
                  className="cursor-pointer"
                >
                  Ingredient recognition
                </TabsTrigger>
                <TabsTrigger value="Image creater" className="cursor-pointer">
                  Image creater
                </TabsTrigger>
              </TabsList>

              <div>
                <ImageAnalysis />
                <IngredientRecognition />
                <ImageCreater />
              </div>
            </Tabs>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-100">
          <GeminiTextGen />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
