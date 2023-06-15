import styles from "./../../styles/Home.module.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";

const Form = () => {
  const router = useRouter();
  const taskId = router.query.id;

  console.log(router);

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: null,
    priority: "",
    status: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (taskId) {
      updateTask(taskId);
      return;
    }
    saveTask();
  };

  const saveTask = async () => {
    try {
      const response = await fetch("http://localhost:3030/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const formValue = await response.json();
      if (response.status === 200) {
        alert("Task added successfully");
        setForm(formValue);
        router.push("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const updateTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3030/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const formValue = await response.json();
      if (response.status === 200) {
        alert("Task updated successfully");
        router.push("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (date) => {
    setForm((prevData) => ({
      ...prevData,
      dueDate: date.toISOString(),
    }));
  };

  useEffect(() => {
    if (!taskId) {
      return;
    }
    const getTaskById = async (id) => {
      try {
        const response = await fetch(`http://localhost:3030/task/${id}`);
        const formValue = await response.json();
        if (response.status === 200) {
          setForm({ ...formValue, dueDate: dayjs(formValue.dueDate) });
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getTaskById(taskId);
  }, [taskId]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className={styles.title}>Task / Add</h1>
      <div className="column">
        <TextField
          required
          label="Title"
          name="title"
          fullWidth
          value={form.title}
          onChange={handleInputChange}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Due Date"
            value={form.dueDate}
            onChange={handleDateChange}
            className="datePicker"
            name="datePicker"
          />
        </LocalizationProvider>
      </div>
      <div className="column">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Priority</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Priority"
            name="priority"
            onChange={handleInputChange}
            value={form.priority}
          >
            <MenuItem value={"Urgent"}>Urgent</MenuItem>
            <MenuItem value={"High"}>High </MenuItem>
            <MenuItem value={"Normal"}>Normal</MenuItem>
            <MenuItem value={"Low"}>Low</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Status"
            name="status"
            onChange={handleInputChange}
            value={form.status}
            fullWidth
          >
            <MenuItem value={"Open"}>Open</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"Done"}>Done</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TextField
        multiline
        rows={4}
        maxRows={4}
        name="description"
        label="Description"
        value={form.description}
        onChange={handleInputChange}
      />

      <div className="action">
        <Button variant="contained" color="error" href="/" type="button">
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          {taskId ? "Update" : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
