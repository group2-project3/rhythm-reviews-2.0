class HelpersService {
    formatTime(date) {
      return new Date(date).toLocaleTimeString();
    };
    formatDate(date) {
      const formattedDate = new Date(+date);
      const month = formattedDate.getMonth() + 1;
      const day = formattedDate.getDate();
      const year = formattedDate.getFullYear();
      const hours = formattedDate.getHours();
      const mins = formattedDate.getMinutes();
      return `${month}/${day}/${year} ${hours}:${mins}`;
    };
  }
export default new HelpersService();