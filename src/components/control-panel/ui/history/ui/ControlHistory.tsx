import { Redo, Undo } from "lucide-react";
import { useEditorHistory } from "@/components/control-panel/hooks/useEditorHistory";

export function ControlHistory() {
  const { canUndo, canRedo, actions } = useEditorHistory();

  return (
    <>
      <div className="w-8">
        {canUndo && (
          <Undo
            size={24}
            strokeWidth={1.75}
            className="text-gray-500 hover:text-primary transition duration-300 cursor-pointer"
            onClick={() => {
              actions.history.undo();
            }}
          />
        )}
      </div>
      <div className="w-8">
        {canRedo && (
          <Redo
            size={24}
            strokeWidth={1.75}
            className="text-gray-500 hover:text-primary transition duration-300 cursor-pointer"
            onClick={() => {
              actions.history.redo();
            }}
          />
        )}
      </div>
    </>
  );
}
