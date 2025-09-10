import * as React from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface InputIconProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
}

const InputIcon = React.forwardRef<HTMLInputElement, InputIconProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && <div className="absolute left-3 pointer-events-none">{icon}</div>}
        <Input
          className={cn(icon ? "pl-10" : "", className)}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

InputIcon.displayName = "InputIcon";

export { InputIcon };
