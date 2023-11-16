//format date and time
class HelpersService {
    formatTime(date) {
      return new Date(date).toLocaleTimeString();
    };
    formatDate(date) {
      const formattedDate = new Date(+date);
      const month = formattedDate.getMonth() + 1;
      const day = formattedDate.getDate();
      const year = formattedDate.getFullYear();
      let hours = formattedDate.getHours();
      let mins = formattedDate.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
  
      hours = hours % 12 || 12;

      mins = mins < 10 ? `0${mins}` : mins;
  
      return `${month}/${day}/${year} ${hours}:${mins} ${period}`;
    }
  }
export default new HelpersService();