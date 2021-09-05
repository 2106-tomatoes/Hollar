// Formats time
export const getDateTime = (createdAt) => {
  const date = new Date(createdAt);
  let newDate = date.toLocaleDateString();
  let minutes = date.getMinutes(); // 0 to 59
  if(minutes < 10) {
    minutes = `0${minutes}`;
  }
  const hours24 = date.getHours(); // 0 to 23
  let hours12 = 0;
  let time = ''; //hh:mm ampm

  if(hours24 >= 12) {
    if(hours24 === 12) {
      hours12 = 12;
    } else {
      hours12 = hours24 % 12;
    }
    
    time += hours12 + `:${minutes} PM`;  
  } else {
    if(hours24 === 0) {
      hours12 = 12;
    } else {
      hours12 = hours24;
    }
    
    time += hours12 + `:${minutes} AM`;
  }
  
  return `${newDate}, ${time}`;
}