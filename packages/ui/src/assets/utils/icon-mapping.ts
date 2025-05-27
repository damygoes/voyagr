import * as Icons from "lucide-react";

export const iconMap = {
  calendar: Icons.Calendar,
  cancel: Icons.X,
  confirm: Icons.Check,
  copy: Icons.Copy,
  dashboard: Icons.LayoutDashboard,
  delete: Icons.Trash2,
  download: Icons.Download,
  edit: Icons.Pencil,
  editProfile: Icons.UserCog,
  email: Icons.Mail,
  entry: Icons.FileText,
  help: Icons.LifeBuoy,
  home: Icons.Home,
  image: Icons.Image,
  info: Icons.Info,
  invisible: Icons.EyeOff,
  loading: Icons.Loader2,
  location: Icons.MapPin,
  login: Icons.LogIn,
  logout: Icons.LogOut,
  menu: Icons.Menu,
  newEntry: Icons.FilePlus,
  notifications: Icons.Bell,
  password: Icons.Lock,
  permissions: Icons.ShieldCheck,
  register: Icons.UserPlus,
  save: Icons.Save,
  search: Icons.Search,
  settings: Icons.Settings,
  share: Icons.Share2,
  success: Icons.CheckCircle2,
  upload: Icons.Upload,
  user: Icons.User,
  userGroup: Icons.Users,
  visible: Icons.Eye,
  warning: Icons.AlertTriangle,
} as const;

export type IconName = keyof typeof iconMap;

// This gives a typed array of keys
export const iconNames = Object.keys(iconMap) as IconName[];
