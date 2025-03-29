export class UtilsFormat {
  static amountToCurrency(
    amount: number,
    options = {
      locales: 'es-HN',
      currency: 'HNL'
    }
  ) {
    return amount.toLocaleString(options.locales, {
      style: 'currency',
      currency: options.currency
    });
  }
  static capitalizeWords(input: string): string {
    return input
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  static normalizeToTwoDigits(input: number): string {
    return input.toString().padStart(2, '0');
  }
  static timestampToLocaleDate(timestamp: string) {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
      date
    );
    return formattedDate;
  }
  static timestampToTimeAgo(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();

    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return this.timestampToLocaleDate(timestamp);
    if (months > 0) return `hace ${months} mes${months > 1 ? 'es' : ''}`;
    if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    return 'hace segundos';
  }
  static timestampToDatetimeLocal(timestamp: string) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  static getInitials(input: string): string {
    const words = input.split(' ').filter((word) => word.length > 0);
    if (words.length === 0) return '';
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }
}
