import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type DatePickerComponentProps = {
  selectedDate: Date;
  onChange: (date: Date | null) => void;
};

const DatePickerComponent = ({
  selectedDate,
  onChange,
}: DatePickerComponentProps) => {
  const maxDate = dayjs().subtract(18, "year");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Enter birthday"
        maxDate={maxDate}
        format="DD/MM/YYYY"
        onChange={(newDate) => onChange(newDate ? newDate.toDate() : null)}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
