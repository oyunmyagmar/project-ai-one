"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";
import {
  ImageCreater,
  ImageAnalysis,
  IngredientRecognition,
} from "@/app/_components-front";

const HomePage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center m-auto">
      <div className="w-145 mt-6">
        <Tabs defaultValue="Image analysis" className="w-105 gap-6">
          <TabsList className="w-full p-1">
            <TabsTrigger value="Image analysis">Image analysis</TabsTrigger>
            <TabsTrigger value="Ingredient recognition">
              Ingredient recognition
            </TabsTrigger>
            <TabsTrigger value="Image creater">Image creater</TabsTrigger>
          </TabsList>

          <div>
            <ImageAnalysis />

            <IngredientRecognition />

            <ImageCreater />
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;
