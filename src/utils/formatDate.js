export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long' };
    
    const formattedDate = date.toLocaleDateString(undefined, options);
    const currentYear = new Date().getFullYear();
    
    if (date.getFullYear() !== currentYear) {
      return `${formattedDate} ${date.getFullYear()}`;
    }
    
    return formattedDate;
  }