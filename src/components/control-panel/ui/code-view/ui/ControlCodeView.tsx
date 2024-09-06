import { Code } from "lucide-react";
import { CodeView } from "@/components/code-view";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useCodeGeneration } from "@/components/control-panel/hooks/useCodeGeneration";

export function ControlCodeView() {
  const { output, open, setOpen, generateCode } = useCodeGeneration();

  return (
    <Drawer
      open={open}
      onOpenChange={(value: boolean) => {
        generateCode();
        setOpen(value);
      }}
    >
      <DrawerTrigger>
        <Code
          size={24}
          strokeWidth={1.75}
          className="text-gray-500 hover:text-primary transition duration-300"
        />
      </DrawerTrigger>

      <DrawerContent className="h-[85vh]">
        <CodeView codeString={output as string} />
      </DrawerContent>
    </Drawer>
  );
}
