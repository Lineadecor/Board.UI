import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Yönetim',
    url: '/yonetim/dashboard',
    iconComponent: ['fas', 'home']
  },
  {
    name: 'Finans',
    url: '/finans/dashboard',
    iconComponent: ['fas', 'comments-dollar']
  },
  {
    name: 'Satış Pazarlama',
    url: '/satis/dashboard',
    iconComponent: ['fas', 'briefcase']
  },
];