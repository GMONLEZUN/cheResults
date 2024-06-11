export const formatTournamentDate = (dateString) => {
  const formattedDate = new Date(dateString).toLocaleDateString("es-Ar");
  return formattedDate;
};
