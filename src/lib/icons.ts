import {
  BadgeCheck,
  ConciergeBell,
  Facebook,
  FileText,
  Gem,
  Instagram,
  Layers,
  Mail,
  MessageCircle,
  MessagesSquare,
  Moon,
  MousePointerClick,
  Phone,
  RefreshCw,
  Ruler,
  Sparkles,
  Truck
} from "lucide-react";
import type { ElementType } from "react";
import type { ContactMethodKey } from "./types";

export const iconMap = {
  BadgeCheck,
  ConciergeBell,
  FileText,
  Gem,
  Layers,
  MessagesSquare,
  Moon,
  MousePointerClick,
  RefreshCw,
  Ruler,
  Sparkles,
  Truck
};

export const contactIconMap = {
  phone: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  instagram: Instagram,
  facebook: Facebook
} satisfies Record<ContactMethodKey, ElementType>;
