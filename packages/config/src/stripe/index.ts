export type PlansType = {
  name: 'free' | 'pro' | 'team';
  priceId: string;
  limits: {
    // 'desktop:access': boolean;
    // 'sync:cloud': boolean;
    // 'export:advanced': boolean;
    // 'collaboration:team': boolean;
    // projects: number | null;
    // devices: number;
    // offlineGraceDays: number;
    [key: string]: boolean | number | string | null;
  };
};

export const plans: PlansType[] = [
  {
    name: 'free',
    priceId: '',
    limits: {
      'desktop:access': true,
      'sync:cloud': false,
      'export:advanced': false,
      'collaboration:team': false,
      projects: 2,
      devices: 1,
      offlineGraceDays: 0,
    },
  },
  {
    name: 'pro',
    priceId: '',
    limits: {
      'desktop:access': true,
      'sync:cloud': true,
      'export:advanced': true,
      'collaboration:team': false,
      projects: 25,
      devices: 3,
      offlineGraceDays: 3,
    },
  },
  {
    name: 'team',
    priceId: '',
    limits: {
      'desktop:access': true,
      'sync:cloud': true,
      'export:advanced': true,
      'collaboration:team': true,
      projects: null,
      devices: 10,
      offlineGraceDays: 7,
    },
  },
];
