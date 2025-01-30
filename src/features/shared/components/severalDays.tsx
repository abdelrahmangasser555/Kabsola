import React, { useState, useEffect } from "react";
import { Calendar, Trash2, Undo2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function SeveralDays({ setState, state, name }: any) {
  // Define days of the week
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Ensure the state is initialized if the key doesn't exist
  const ensureStateInitialized = () => {
    setState((prev: any) => {
      // If the name key doesn't exist, create it
      if (!prev[name]) {
        return {
          ...prev,
          [name]: days.reduce(
            (acc, day) => ({
              ...acc,
              [day]: {
                start: "",
                end: "",
                active: true,
              },
            }),
            {}
          ),
        };
      }

      // If the name key exists but doesn't have all days, add missing days
      const newDaysState = { ...prev[name] };
      days.forEach((day) => {
        if (!newDaysState[day]) {
          newDaysState[day] = {
            start: "",
            end: "",
            active: true,
          };
        }
      });

      return {
        ...prev,
        [name]: newDaysState,
      };
    });
  };

  // Initialize state if needed when component mounts
  useEffect(() => {
    ensureStateInitialized();
  }, [name]);

  return (
    <div className="w-[100%  overflow-x-auto">
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
        {days.map((day) => (
          <SingleDay
            key={day}
            setState={setState}
            state={state}
            day={day}
            name={name}
          />
        ))}
      </div>
    </div>
  );
}

export function SingleDay({ setState, state, day, name }: any) {
  function handleChange(type: "start" | "end", value: string) {
    setState((prev: any) => {
      // Ensure the state structure exists
      if (!prev[name]) {
        prev[name] = {};
      }
      if (!prev[name][day]) {
        prev[name][day] = {
          start: "",
          end: "",
          active: true,
        };
      }

      // Create a new state object
      const newState = {
        ...prev,
        [name]: {
          ...prev[name],
          [day]: {
            ...prev[name][day],
            [type]: value,
          },
        },
      };

      // Validate the times
      const startTime = newState[name][day].start;
      const endTime = newState[name][day].end;
      if (type === "start" && endTime && value > endTime) {
        toast.error("Start time cannot be later than end time");
        return prev;
      }
      if (type === "end" && startTime && value < startTime) {
        toast.error("End time cannot be earlier than start time");
        return prev;
      }

      return newState;
    });
  }

  function handleToggleDay() {
    setState((prev: any) => {
      // Ensure the state structure exists
      if (!prev[name]) {
        prev[name] = {};
      }
      if (!prev[name][day]) {
        prev[name][day] = {
          start: "",
          end: "",
          active: true,
        };
      }

      // Create a new state object with toggled active status
      const newState = {
        ...prev,
        [name]: {
          ...prev[name],
          [day]: {
            ...prev[name][day],
            active: !prev[name][day].active,
          },
        },
      };

      return newState;
    });
  }

  // Safely get day data with default values
  const dayData = state?.[name]?.[day] ?? {
    start: "",
    end: "",
    active: true,
  };

  return (
    <div
      className={`
                        flex flex-col items-start space-y-2 min-w-[200px] 
                         p-4 rounded-lg border border-border 
                        ${!dayData.active ? "opacity-50" : ""}
                `}
      style={{
        marginRight: "1rem",
      }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">{day}</h2>
        </div>

        {dayData.active ? (
          <button
            onClick={handleToggleDay}
            className="text-destructive hover:bg-secondary/30 p-1 rounded-full"
            title="Disable day"
          >
            <Trash2
              className="w-5 h-5"
              style={{
                color: "red",
              }}
            />
          </button>
        ) : (
          <button
            onClick={handleToggleDay}
            className="text-primary hover:bg-secondary/30 p-1 rounded-full"
            title="Restore day"
          >
            <Undo2 className="w-5 h-5" />
          </button>
        )}
      </div>
      <Toaster />
      <div className="grid grid-cols-2 gap-2 w-full">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Start</label>
          <select
            className="w-full px-2 py-1 bg-background border border-input rounded-md text-foreground 
                                                        focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                                                        disabled:opacity-50 disabled:cursor-not-allowed"
            onChange={(e) => handleChange("start", e.target.value)}
            value={dayData.start || ""}
            name={`${day}-start`}
            disabled={!dayData.active}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i.toString().padStart(2, "0") + ":00"}>
                {i.toString().padStart(2, "0")}:00
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">End</label>
          <select
            className="w-full px-2 py-1 bg-background border border-input rounded-md text-foreground 
                                                        focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                                                        disabled:opacity-50 disabled:cursor-not-allowed"
            onChange={(e) => handleChange("end", e.target.value)}
            value={dayData.end || ""}
            name={`${day}-end`}
            disabled={!dayData.active}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i.toString().padStart(2, "0") + ":00"}>
                {i.toString().padStart(2, "0")}:00
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
