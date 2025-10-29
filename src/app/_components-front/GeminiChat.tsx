import React from "react";

export const GeminiChat = () => {
  return (
    <div>
      <div className="w-95 h-118 flex flex-col justify-end items-end border border-input rounded-lg">
        <div className="w-full flex gap-2 px-4 py-2 items-center">
          <div className="w-full">Chat assistant</div>
          <Button variant={"outline"} className="w-8 h-8">
            X
          </Button>
        </div>

        <div className="w-full px-6 py-4 min-h-88 overflow-scroll border border-border">
          {result && result}
        </div>

        <div className="w-full flex gap-2 py-2 px-4">
          <Textarea
            className="min-h-10 rounded-lg text-sm leading-5 "
            placeholder="Type your message..."
          />
          <Button className="w-10 h-10 rounded-full">
            <LuSend size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
