import React from 'react';

const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th'; // Handles 11th, 12th, 13th
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};



const dateConverter = (dateString: any) => {

  const date = new Date(dateString);

  const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month: string = monthNames[date.getUTCMonth()];
  const day: number = date.getUTCDate();
  const dayWithSuffix: string = `${day}${getOrdinalSuffix(day)}`;
  let a = month + " " + dayWithSuffix
  
  return a
};

export default dateConverter

