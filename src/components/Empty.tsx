import { toast } from "sonner";
import { cn } from "../lib/utils";

// Empty component with null safety
export function Empty() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      toast('Coming soon');
    }
  };
  
  return (
    <div className={cn("flex h-full items-center justify-center")} onClick={handleClick}>Empty</div>
  );
}