import React from "react";

export type MenuOption = {
  key: string;
  label: string;
};

type SidebarMenuProps = {
  options: MenuOption[];
  activeKey: string;
  onChange: (key: string) => void;
};

function SidebarMenu({ options, activeKey, onChange }: SidebarMenuProps) {
  return (
    <nav>
      {options.map((option) => (
        <button
          key={option.key}
          className={`sidebar-item${activeKey === option.key ? " sidebar-item-active" : ""}`}
          type="button"
          onClick={() => onChange(option.key)}
        >
          {option.label}
        </button>
      ))}
    </nav>
  );
}

export default SidebarMenu;
