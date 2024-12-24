import React from "react";

export function Button({ variant = "default", size = "md", className, ...props }) {
  // Define the variant and size mappings
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  // Combine variant and size className with any other custom className
  const buttonClassName = `${variants[variant]} ${sizes[size]} ${className || ""}`;

  return (
    <button className={buttonClassName} {...props} />
  );
}
