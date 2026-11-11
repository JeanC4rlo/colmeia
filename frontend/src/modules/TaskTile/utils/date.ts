export const formatTaskDate = (dateString: string | Date | undefined | null): string => {
  if (!dateString) return '';
  
  const taskDate = new Date(dateString);
  const now = new Date();
  
  const oneYearInMs = 365 *  24 * 60 * 60 * 1000;
  const isOlderThanOneYear = (now.getTime() - taskDate.getTime()) > oneYearInMs;

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };

  if (isOlderThanOneYear) {
    options.year = 'numeric';
  }

  return taskDate.toLocaleString('pt-BR', options);
};