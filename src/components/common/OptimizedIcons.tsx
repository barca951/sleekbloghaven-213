// Imports optimisés des icônes les plus utilisées
// Au lieu d'importer toute la bibliothèque lucide-react

import { memo } from 'react';

// Icons les plus fréquemment utilisées dans l'app
export { 
  FileText,
  Scale,
  Users,
  TrendingUp,
  Calendar,
  Bell,
  Search,
  BookOpen,
  BarChart3,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
  Download,
  Share2,
  Star,
  Bot,
  Zap,
  Target,
  Activity,
  ClipboardList,
  Upload,
  Settings,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Save,
  Edit,
  Trash2,
  MoreHorizontal,
  Filter,
  ArrowLeft,
  ArrowRight,
  Home,
  Menu,
  User,
  LogOut,
  HelpCircle,
  Info
} from 'lucide-react';

// Wrapper mémorisé pour les icônes personnalisées si nécessaire
export const MemoizedIcon = memo(({ 
  Icon, 
  className = '', 
  size = 16,
  ...props 
}: {
  Icon: React.ComponentType<any>;
  className?: string;
  size?: number;
  [key: string]: any;
}) => {
  return <Icon className={className} size={size} {...props} />;
});

MemoizedIcon.displayName = 'MemoizedIcon';