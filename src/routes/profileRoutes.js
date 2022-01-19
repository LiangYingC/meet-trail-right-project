import ProfileLike from '../components/pages/Profile/ProfileLike.jsx';
import ProfileReport from '../components/pages/Profile/ProfileReport.jsx';
import ProfileTrail from '../components/pages/Profile/ProfileTrail.jsx';

export const profileRoutes = [
  {
    path: '/profile/report',
    exact: false,
    main: () => <ProfileReport />,
  },
  {
    path: '/profile/trail',
    exact: false,
    main: () => <ProfileTrail />,
  },
  {
    path: '/profile',
    exact: true,
    main: () => <ProfileLike />,
  },
];
