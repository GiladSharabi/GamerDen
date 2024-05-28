import { DateOfBirth } from "../components/DateSelector";

export function convertDateOfBirthToISO(
  dateOfBirth: DateOfBirth
): string | null {
  if (dateOfBirth.day && dateOfBirth.month && dateOfBirth.year) {
    const date = new Date(
      dateOfBirth.year,
      dateOfBirth.month - 1,
      dateOfBirth.day
    );

    if (!isNaN(date.getTime())) {
      // Convert the Date object to ISO 8601 format
      return date.toISOString().split("T")[0];
    } else {
      console.error("Invalid date components provided:", dateOfBirth);
    }
  } else {
    console.error("Missing date components:", dateOfBirth);
  }
  return null;
}
