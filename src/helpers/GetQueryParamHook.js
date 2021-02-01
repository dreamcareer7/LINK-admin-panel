import { useLocation } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
