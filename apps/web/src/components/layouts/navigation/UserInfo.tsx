import { Avatar, AvatarFallback, AvatarImage } from "@voyagr/ui";
import type { NavMenuUser } from "./types";
import { getUserAvatarFallback } from "./utils";

interface UserInfoProps {
  user: NavMenuUser;
  size: "sm" | "lg";
}

export function UserInfo({ user, size }: UserInfoProps) {
  const sizeClasses = {
    sm: "h-xl w-xl",
    lg: "h-lg w-lg",
  };

  const fallbackName = getUserAvatarFallback(user.name);

  return (
    <>
      <Avatar
        className={`${sizeClasses[size]} rounded-lg ${size === "lg" ? "grayscale" : ""}`}
      >
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="rounded-lg">{fallbackName}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate text-xs text-muted-foreground">
          {user.email}
        </span>
      </div>
    </>
  );
}
