import { memo } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PertStyles } from "@@/lib/main";
import { Check, Copy } from "lucide-react";

interface CopyDrawerProps {
  styles: PertStyles;
}

export const CopyDrawer = memo(({ styles }: CopyDrawerProps) => {
  const jsonInput = JSON.stringify(styles, null, 2);

  const handleCopyStyles = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    try {
      const input = document.createElement("textarea");
      input.value = JSON.stringify(styles, null, 2);
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, 99999);

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(input.value);
        button.classList.add("success");
        setTimeout(() => {
          button.classList.remove("success");
        }, 2000);
      }

      document.body.removeChild(input);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };
  return (
    <div className="justify-self-end">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Copy Styles</Button>
        </DrawerTrigger>
        <DrawerContent className="w-full">
          <div className="mx-auto w-full max-w-2xl">
            <DrawerHeader>
              <DrawerTitle>Copy Styles</DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <div className="p-4 pt-0 relative">
              <Button
                variant="link"
                onClick={handleCopyStyles}
                className="group absolute top-4 right-8"
                data-state=""
                size={"icon"}
              >
                <Copy className="w-4 h-4 transition-opacity group-[.success]:hidden" />
                <Check className="w-4 h-4 hidden transition-opacity group-[.success]:block text-green-500" />
              </Button>
              <Textarea
                defaultValue={jsonInput}
                id="jsonInput"
                className="min-h-[300px] resize-none font-mono text-sm
                overflow-y-auto [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-track]:bg-transparent 
                [&::-webkit-scrollbar-thumb]:bg-border"
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
});
