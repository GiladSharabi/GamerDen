import { FormControl, FormHelperText, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type DatePickerComponentProps = {
  selectedDate?: Date;
  onChange: (date: Date) => void;
  dateError: string;
};

const DatePickerComponent = ({
  selectedDate,
  onChange,
  dateError,
}: DatePickerComponentProps) => {
  const maxDate = dayjs().subtract(18, "year");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl>
        <DatePicker
          value={selectedDate ? dayjs(selectedDate) : null}
          label="Enter birthday"
          maxDate={maxDate}
          format="DD/MM/YYYY"
          onChange={(newDate) =>
            onChange(newDate ? newDate.toDate() : new Date(0))
          }
        />
        {dateError && <FormHelperText error>{dateError}</FormHelperText>}
      </FormControl>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
