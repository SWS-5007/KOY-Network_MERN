export const getKeyCreatedDate = (dateString: string) => {
  // Parse the date string into a Date object
  const date: Date = new Date(dateString);

  // Define an array of month abbreviations
  const monthAbbreviations: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract day, month, and year components
  const day: number = date.getDate();
  const monthIndex: number = date.getMonth();
  const year: number = date.getFullYear();

  // Get the month abbreviation from the array
  const monthAbbreviation: string = monthAbbreviations[monthIndex];

  // Format the date components
  const formattedDate: string = `${day} ${monthAbbreviation} ${year
    .toString()
    .slice(-2)}`;

  console.log(formattedDate); // Output: "15 Sep 23"

  return formattedDate;
};
