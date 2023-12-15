import { DateTime } from '../../node_modules/luxon/src/luxon.js';

export const displayTime = () => {
  const now = DateTime.local();
  const formattedTime = now.toFormat("MMMM d'th' yyyy, h:mm:ss a");
  return formattedTime;
};
