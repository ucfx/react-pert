import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PertStyles, Task } from "@@/lib/main";
import { memo, useState } from "react";
import { StyleOptions } from "./StyleOptions";
import { PertDetails } from "./PertDetails";

type SidebarProps = PertStyles & {
  onStyleChange: (key: keyof PertStyles, value: any) => void;
  selectedTask: Task | null;
};

export const Sidebar = memo(
  ({ onStyleChange, selectedTask, ...styles }: SidebarProps) => {
    const [tab, setActiveTab] = useState("details");

    return (
      <Card className="h-[calc(100vh-1rem)] w-80">
        <Tabs
          defaultValue="details"
          className="h-full"
          onValueChange={setActiveTab}
          value={tab}
        >
          <TabsList className="w-full grid-cols-2 grid bg-transparent">
            <TabsTrigger value="styles" className="data-[state=active]:bg-accent">
              Styles
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-accent">
              Details
            </TabsTrigger>
          </TabsList>
          <TabsContent value="styles" forceMount={true} hidden={"styles" !== tab}>
            <StyleOptions {...styles} onStyleChange={onStyleChange} />
          </TabsContent>
          <TabsContent forceMount={true} value="details" hidden={"details" !== tab}>
            <PertDetails selectedTask={selectedTask} />
          </TabsContent>
        </Tabs>
      </Card>
    );
  }
);
