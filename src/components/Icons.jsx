import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Drill,
  Droplets,
  Gauge,
  Headset,
  House,
  Mail,
  MapPin,
  Menu,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
  ClipboardCheck,
  Truck,
  Settings,
} from "lucide-react";

export const iconMap = {
  arrowDown: ArrowDown,
  arrowRight: ArrowRight,
  check: Check,
  chevronDown: ChevronDown,
  clock: Clock3,
  drill: Drill,
  water: Droplets,
  gauge: Gauge,
  headset: Headset,
  home: House,
  mail: Mail,
  mapPin: MapPin,
  menu: Menu,
  phone: Phone,
  refresh: RefreshCw,
  shield: ShieldCheck,
  sparkles: Sparkles,
  wrench: Wrench,
  close: X,
  clipboard: ClipboardCheck,
  truck: Truck,
  settings: Settings,
};

export function Icon({ name, size = 22, ...props }) {
  const Component = iconMap[name] || Droplets;
  return <Component size={size} strokeWidth={1.8} aria-hidden="true" {...props} />;
}
