export interface Tab {
  id: string;
  label: string;
}
export interface TabsProps {
  tabs: Tab[];
  activeId?: string;
  onSelect?: (id: string) => void;
}
