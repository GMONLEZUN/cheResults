export const formatTournamentDate = (dateString) => {
  const formattedDate = new Date(dateString).toLocaleDateString("es-Ar");
  return formattedDate;
};

export const formatTournamentDateTime = (dateString) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const formattedDate = new Date(dateString).toLocaleDateString("es-Ar", options);
  const formattedTime = new Date(dateString).toLocaleTimeString("es-Ar");
  return `${formattedDate} ${formattedTime}`;
};
