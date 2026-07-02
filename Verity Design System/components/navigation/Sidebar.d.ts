export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}
export interface SidebarProps {
  items: SidebarItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  collapsed?: boolean;
}
