import { DateOfBirth } from "../components/DateSelector";

export function convertDateOfBirthToISO(
  dateOfBirth: DateOfBirth
): Date | null {
  if (dateOfBirth.day && dateOfBirth.month && dateOfBirth.year) {
    const date = new Date(
      dateOfBirth.year,
      dateOfBirth.month - 1,
      dateOfBirth.day
    );

    if (!isNaN(date.getTime())) {
      return date;
    } else {
      console.error("Invalid date components provided:", dateOfBirth);
    }
  } else {
    console.error("Missing date components:", dateOfBirth);
  }
  return null;
}

export function convertIsoToDateOfBirth(isoDateString: string): DateOfBirth | null {
  const date = new Date(isoDateString);

  if (!isNaN(date.getTime())) {
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  } else {
    console.error("Invalid ISO date string provided:", isoDateString);
    return null;
  }
}

