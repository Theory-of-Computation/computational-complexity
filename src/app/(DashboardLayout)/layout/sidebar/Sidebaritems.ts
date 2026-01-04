import { uniqueId } from 'lodash'

export interface ChildItem {
  id?: number | string
  name?: string
  icon?: any
  children?: ChildItem[]
  item?: any
  url?: any
  color?: string
  disabled?: boolean
  subtitle?: string
  badge?: boolean
  badgeType?: string
  isPro?: boolean
}

export interface MenuItem {
  heading?: string
  name?: string
  icon?: any
  id?: number
  to?: string
  items?: MenuItem[]
  children?: ChildItem[]
  url?: any
  disabled?: boolean
  subtitle?: string
  badgeType?: string
  badge?: boolean
  isPro?: boolean
}

const SidebarContent: MenuItem[] = [
  // ==================== NON-PRO SECTIONS ====================
  {
    heading: 'Summary',
    children: [
      {
        name: 'Summary',
        icon: 'solar:notification-unread-lines-bold',
        id: uniqueId(),
        url: '/',
        isPro: false,
      },
    ],
  },

  {
    heading: 'excercises',
    children: [
      {
        name: 'Duplicates & Triplicates',
        icon: 'dinkie-icons:keycap-digit-one-small',
        id: uniqueId(),
        url: '/exercises/duplicates&triplicates',
      },
      {
        name: 'Turing Machines',
        icon: 'dinkie-icons:keycap-digit-two-small',
        id: uniqueId(),
        url: '/exercises/turing-machines',
      },
      {
        name: 'String Recognition',
        icon: 'dinkie-icons:keycap-digit-three-small',
        id: uniqueId(),
        url: '/exercises/string-recognition',
      },
      {
        name: 'Complexity Theory',
        icon: 'dinkie-icons:keycap-digit-four-small',
        id: uniqueId(),
        url: '/exercises/complexity-theory',
      },
      {
        name: '3-SAT Reductions',
        icon: 'dinkie-icons:keycap-digit-five-small',
        id: uniqueId(),
        url: '/exercises/three-sat-reductions',
      },
      {
        name: 'NP-Completeness',
        icon: 'dinkie-icons:keycap-digit-six-small',
        id: uniqueId(),
        url: '/exercises/np-completeness',
      },
    ],
  },
];

export default SidebarContent;
