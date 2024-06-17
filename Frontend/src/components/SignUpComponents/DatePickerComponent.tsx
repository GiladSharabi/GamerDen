import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type DatePickerComponentProps = {
  selectedDate?: Date;
  onChange: (date: Date) => void;
};

const DatePickerComponent = ({
  selectedDate,
  onChange,
}: DatePickerComponentProps) => {
  const maxDate = dayjs().subtract(18, "year");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={selectedDate ? dayjs(selectedDate) : null}
        label="Enter birthday"
        maxDate={maxDate}
        format="DD/MM/YYYY"
        onChange={(newDate) =>
          onChange(newDate ? newDate.toDate() : new Date(0))
        }
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
