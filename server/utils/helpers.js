module.exports = {
    formatTime: (date) => {
      return new Date(date).toLocaleTimeString();
    },
    formatDate: (date) => {
      const formattedDate = new Date(date);
      const month = formattedDate.getMonth() + 1;
      const day = formattedDate.getDate();
      const year = formattedDate.getFullYear();
      return `${month}/${day}/${year}`;
    },
  };