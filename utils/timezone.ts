import { DateTime } from "luxon";

/**
 * Log errors only in development environment
 */
function logError(message: string, error: unknown) {
  if (process.dev) {
    console.error(message, error);
  }
}

/**
 * Centralized timezone utilities for the Nuxt frontend.
 * All date/time operations should use America/Toronto timezone.
 * Backend stores UTC, we convert at API boundaries.
 */
export class TimezoneUtil {
  private static readonly TIMEZONE = "America/Toronto";

  /**
   * Convert UTC date from API to Toronto timezone for display
   * @param utcDateLike - UTC date string or Date object from API
   * @param format - Display format (default: human readable)
   * @returns Formatted string in Toronto timezone
   */
  static formatToronto(
    utcDateLike: string | Date | null | undefined,
    format = "MMMM d, yyyy h:mm a"
  ): string {
    if (!utcDateLike) return "";

    try {
      const dt = DateTime.fromJSDate(new Date(utcDateLike), {
        zone: "utc",
      }).setZone(this.TIMEZONE);

      return dt.toFormat(format);
    } catch (error) {
      logError("Error formatting Toronto time:", error);
      return String(utcDateLike);
    }
  }

  /**
   * Convert Toronto local input to UTC ISO string for API
   * Use this when sending datetime values to the backend
   * @param torontoLocal - Date input assumed to be in Toronto timezone
   * @returns UTC ISO string for API
   */
  static parseTorontoInputToISO(torontoLocal: string | Date): string {
    if (!torontoLocal) {
      throw new Error("Toronto local date is required");
    }

    try {
      const dt = DateTime.fromJSDate(new Date(torontoLocal), {
        zone: this.TIMEZONE,
      });
      return dt.toUTC().toISO() ?? "";
    } catch (error) {
      logError("Error parsing Toronto input:", error);
      throw new Error(`Invalid date format: ${torontoLocal}`);
    }
  }

  /**
   * Format UTC date for datetime-local input (Toronto timezone)
   * @param utcDateLike - UTC date from API
   * @returns String in YYYY-MM-DDTHH:MM format for HTML datetime-local inputs
   */
  static formatForDateTimeInput(utcDateLike: string | Date | null): string {
    if (!utcDateLike) return "";

    try {
      const dt = DateTime.fromJSDate(new Date(utcDateLike), {
        zone: "utc",
      }).setZone(this.TIMEZONE);

      return dt.toFormat("yyyy-MM-dd'T'HH:mm");
    } catch (error) {
      logError("Error formatting for datetime input:", error);
      return "";
    }
  }

  /**
   * Format date only (no time) for display in Toronto timezone
   * @param utcDateLike - UTC date from API
   * @returns Formatted date string
   */
  static formatTorontoDate(utcDateLike: string | Date | null): string {
    return this.formatToronto(utcDateLike, "MMMM d, yyyy");
  }

  /**
   * Format date in short format (MM/dd/yyyy) for display in Toronto timezone
   * @param utcDateLike - UTC date from API
   * @returns Formatted date string in MM/dd/yyyy format
   */
  static formatTorontoDateShort(utcDateLike: string | Date | null): string {
    return this.formatToronto(utcDateLike, "MM/dd/yyyy");
  }

  /**
   * Format time only (no date) for display in Toronto timezone
   * @param utcDateLike - UTC date from API
   * @returns Formatted time string
   */
  static formatTorontoTime(utcDateLike: string | Date | null): string {
    return this.formatToronto(utcDateLike, "h:mm a");
  }

  /**
   * Format time only (no date) for display in Toronto timezone
   * @param utcDateLike - UTC date from API
   * @returns Formatted time string
   */
  static formatTorontoTimeOnly(utcDateLike: string | Date | null): string {
    return this.formatToronto(utcDateLike, "h:mm a");
  }

  /**
   * Get current time in Toronto timezone
   * @returns Current DateTime object in Toronto timezone
   */
  static nowToronto(): DateTime {
    return DateTime.now().setZone(this.TIMEZONE);
  }

  /**
   * Get current UTC time
   * @returns Current DateTime object in UTC
   */
  static nowUTC(): DateTime {
    return DateTime.utc();
  }

  /**
   * Check if a date is during Daylight Saving Time in Toronto
   * @param date - Date to check (optional, defaults to now)
   * @returns true if DST is active
   */
  static isDaylightSavingTime(date?: Date | string): boolean {
    try {
      const dt = date
        ? DateTime.fromJSDate(new Date(date)).setZone(this.TIMEZONE)
        : this.nowToronto();

      return dt.offsetNameShort === "EDT";
    } catch (error) {
      logError("Error checking DST:", error);
      return false;
    }
  }

  /**
   * Get timezone information for display
   * @param date - Date to get timezone info for (optional)
   * @returns Object with timezone details
   */
  static getTimezoneInfo(date?: Date | string): {
    timezone: string;
    abbreviation: string;
    offset: string;
    isDST: boolean;
  } {
    try {
      const dt = date
        ? DateTime.fromJSDate(new Date(date)).setZone(this.TIMEZONE)
        : this.nowToronto();

      return {
        timezone: this.TIMEZONE,
        abbreviation: dt.offsetNameShort ?? "EST",
        offset: dt.toFormat("ZZ"),
        isDST: this.isDaylightSavingTime(date),
      };
    } catch (error) {
      logError("Error getting timezone info:", error);
      return {
        timezone: this.TIMEZONE,
        abbreviation: "EST",
        offset: "-05:00",
        isDST: false,
      };
    }
  }

  /**
   * Format operation hours range for display
   * @param openTime - Opening time in HH:MM format
   * @param closeTime - Closing time in HH:MM format
   * @returns Formatted range (e.g., "11:00 AM - 12:00 AM")
   */
  static formatOperationHours(openTime: string, closeTime: string): string {
    if (!openTime || !closeTime) return "Closed";

    try {
      const today = this.nowToronto().toFormat("yyyy-MM-dd");
      const openDt = DateTime.fromISO(`${today}T${openTime}`, {
        zone: this.TIMEZONE,
      });
      const closeDt = DateTime.fromISO(`${today}T${closeTime}`, {
        zone: this.TIMEZONE,
      });

      const openFormatted = openDt.toFormat("h:mm a");
      const closeFormatted = closeDt.toFormat("h:mm a");

      return `${openFormatted} - ${closeFormatted}`;
    } catch (error) {
      logError("Error formatting operation hours:", error);
      return "Closed";
    }
  }

  /**
   * Check if current time is within business hours in Toronto
   * @param openTime - Opening time in HH:MM format
   * @param closeTime - Closing time in HH:MM format
   * @returns true if currently within business hours
   */
  static isWithinBusinessHours(openTime: string, closeTime: string): boolean {
    try {
      if (!openTime || !closeTime) return false;

      const now = this.nowToronto();
      const today = now.toFormat("yyyy-MM-dd");

      const openDt = DateTime.fromISO(`${today}T${openTime}`, {
        zone: this.TIMEZONE,
      });
      let closeDt = DateTime.fromISO(`${today}T${closeTime}`, {
        zone: this.TIMEZONE,
      });

      // Handle overnight hours (e.g., 20:30 to 11:30 next day)
      if (closeDt <= openDt) {
        closeDt = closeDt.plus({ days: 1 });

        // Check if we're currently within the overnight period
        // This could be either:
        // 1. Same day after opening time (e.g., Saturday 9 PM when open at 8:30 PM)
        // 2. Next day before closing time (e.g., Sunday 10 AM when closing at 11:30 AM)

        if (
          now >= openDt ||
          now <= closeDt.minus({ days: 1 }).plus({ days: 1 })
        ) {
          return true;
        }

        return false;
      }

      return now >= openDt && now <= closeDt;
    } catch (error) {
      logError("Error checking business hours:", error);
      return false;
    }
  }

  /**
   * Validate if a string represents a valid datetime
   * @param dateString - String to validate
   * @returns true if valid
   */
  static isValidDateTime(dateString: string): boolean {
    if (!dateString) return false;
    try {
      const dt = DateTime.fromJSDate(new Date(dateString));
      return dt.isValid;
    } catch {
      return false;
    }
  }

  /**
   * Format time for display (12-hour format)
   */
  static formatTime(timeString: string): string {
    try {
      const [hours, minutes] = timeString.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const displayHour = hours % 12 || 12;
      return `${displayHour}:${minutes.toString().padStart(2, "0")} ${period}`;
    } catch (error) {
      logError("Error formatting time:", error);
      return timeString;
    }
  }

  /**
   * Calculate event status based on current Toronto time
   */
  static calculateEventStatus(
    startDate: string | Date,
    endDate: string | Date
  ): "upcoming" | "current" | "ended" {
    try {
      const now = this.nowToronto().toJSDate(); // Use Toronto time instead of system time
      const start =
        typeof startDate === "string" ? new Date(startDate) : startDate;
      const end = typeof endDate === "string" ? new Date(endDate) : endDate;

      if (now < start) return "upcoming";
      if (now >= start && now <= end) return "current";
      return "ended";
    } catch (error) {
      logError("Error calculating event status:", error);
      return "upcoming";
    }
  }

  /**
   * Format event date range
   */
  static formatEventDateRange(
    startDate: string | Date,
    endDate?: string | Date
  ): string {
    try {
      const start =
        typeof startDate === "string" ? new Date(startDate) : startDate;

      if (!endDate) {
        return this.formatTorontoTime(start);
      }

      const end = typeof endDate === "string" ? new Date(endDate) : endDate;

      // Check if same day using Toronto timezone
      const startDt = DateTime.fromJSDate(start).setZone(this.TIMEZONE);
      const endDt = DateTime.fromJSDate(end).setZone(this.TIMEZONE);

      if (startDt.hasSame(endDt, "day")) {
        const dateStr = this.formatTorontoDate(start);
        const startTime = this.formatTorontoTimeOnly(start);
        const endTime = this.formatTorontoTimeOnly(end);
        return `${dateStr} from ${startTime} to ${endTime}`;
      } else {
        return `${this.formatTorontoTime(start)} - ${this.formatTorontoTime(
          end
        )}`;
      }
    } catch (error) {
      logError("Error formatting event date range:", error);
      return "";
    }
  }

  /**
   * Convert date to ISO string in Toronto timezone
   */
  static toISOString(date: string | Date): string {
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return dateObj.toISOString();
    } catch (error) {
      logError("Error converting to ISO string:", error);
      return "";
    }
  }

  /**
   * Parse date string and ensure it's treated as Toronto time
   */
  static parseTorontoDate(dateString: string): Date {
    try {
      // Use Luxon for proper timezone handling
      if (
        !dateString.includes("T") ||
        (!dateString.includes("+") && !dateString.includes("Z"))
      ) {
        // Treat as Toronto local time
        const dt = DateTime.fromISO(dateString, { zone: this.TIMEZONE });
        return dt.toJSDate();
      }
      // Has timezone info, convert to Toronto time
      const dt = DateTime.fromISO(dateString).setZone(this.TIMEZONE);
      return dt.toJSDate();
    } catch (error) {
      logError("Error parsing Toronto date:", error);
      return new Date();
    }
  }

  /**
   * Get relative time description (e.g., "2 hours ago", "in 3 days")
   */
  static getRelativeTime(date: string | Date): string {
    try {
      const targetDt = DateTime.fromJSDate(
        typeof date === "string" ? new Date(date) : date
      ).setZone(this.TIMEZONE);
      const nowDt = this.nowToronto();

      const diff = targetDt
        .diff(nowDt, ["days", "hours", "minutes"])
        .toObject();
      const { days = 0, hours = 0, minutes = 0 } = diff;

      if (Math.abs(days) >= 1) {
        return days > 0
          ? `in ${Math.ceil(days)} day${Math.ceil(days) > 1 ? "s" : ""}`
          : `${Math.abs(Math.floor(days))} day${
              Math.abs(Math.floor(days)) > 1 ? "s" : ""
            } ago`;
      } else if (Math.abs(hours) >= 1) {
        return hours > 0
          ? `in ${Math.ceil(hours)} hour${Math.ceil(hours) > 1 ? "s" : ""}`
          : `${Math.abs(Math.floor(hours))} hour${
              Math.abs(Math.floor(hours)) > 1 ? "s" : ""
            } ago`;
      } else if (Math.abs(minutes) >= 1) {
        return minutes > 0
          ? `in ${Math.ceil(minutes)} minute${
              Math.ceil(minutes) > 1 ? "s" : ""
            }`
          : `${Math.abs(Math.floor(minutes))} minute${
              Math.abs(Math.floor(minutes)) > 1 ? "s" : ""
            } ago`;
      } else {
        return "now";
      }
    } catch (error) {
      logError("Error getting relative time:", error);
      return "";
    }
  }

  /**
   * Format time for operation hours display
   * @param timeString - Time in HH:MM format
   * @returns Formatted time string (e.g., "11:00 AM")
   */
  static formatOperationTime(timeString: string): string {
    if (!timeString) return "";

    try {
      const today = this.nowToronto().toFormat("yyyy-MM-dd");
      const dt = DateTime.fromISO(`${today}T${timeString}`, {
        zone: this.TIMEZONE,
      });

      return dt.toFormat("h:mm a");
    } catch (error) {
      logError("Error formatting operation time:", error);
      return timeString;
    }
  }

  /**
   * Check if currently within operation hours
   * @param openTime - Opening time in HH:MM format
   * @param closeTime - Closing time in HH:MM format
   * @returns true if currently open, false if closed
   */
  static isCurrentlyOpen(openTime: string, closeTime: string): boolean {
    if (!openTime || !closeTime) return false;

    try {
      const now = this.nowToronto();
      const today = now.toFormat("yyyy-MM-dd");

      const openDt = DateTime.fromISO(`${today}T${openTime}`, {
        zone: this.TIMEZONE,
      });
      let closeDt = DateTime.fromISO(`${today}T${closeTime}`, {
        zone: this.TIMEZONE,
      });

      // Handle overnight hours (e.g., 20:30 to 11:30 next day)
      if (closeDt <= openDt) {
        closeDt = closeDt.plus({ days: 1 });

        // For overnight hours, we need to check if current time is either:
        // 1. After opening time today, OR
        // 2. Before closing time tomorrow (but adjusted for today's reference)

        // Create a reference point for "tomorrow's" closing time
        const tomorrowCloseDt = DateTime.fromISO(`${today}T${closeTime}`, {
          zone: this.TIMEZONE,
        }).plus({ days: 1 });

        // Check if we're in the overnight period
        return now >= openDt || now <= tomorrowCloseDt;
      }

      return now >= openDt && now <= closeDt;
    } catch (error) {
      logError("Error checking if currently open:", error);
      return false;
    }
  }

  /**
   * Get operation status with proper timezone display
   */
  static getOperationStatus(
    openTime: string,
    closeTime: string,
    isEnabled: boolean = true
  ): string {
    if (!isEnabled || !openTime || !closeTime) {
      return "Closed";
    }

    const isOpen = this.isCurrentlyOpen(openTime, closeTime);

    if (isOpen) {
      const closeFormatted = this.formatOperationTime(closeTime);
      const isOvernight = this.isOvernightHours(openTime, closeTime);

      if (isOvernight) {
        return `Open until ${closeFormatted} tomorrow`;
      } else {
        return `Open until ${closeFormatted}`;
      }
    } else {
      const openFormatted = this.formatOperationTime(openTime);
      return `Opens at ${openFormatted}`;
    }
  }

  /**
   * Check if the operation hours span overnight (close time is next day)
   * @param openTime - Opening time in HH:MM format
   * @param closeTime - Closing time in HH:MM format
   * @returns true if hours span overnight
   */
  static isOvernightHours(openTime: string, closeTime: string): boolean {
    if (!openTime || !closeTime) return false;

    try {
      const [openHour, openMin] = openTime.split(":").map(Number);
      const [closeHour, closeMin] = closeTime.split(":").map(Number);
      const openMinutes = openHour * 60 + openMin;
      const closeMinutes = closeHour * 60 + closeMin;

      return closeMinutes < openMinutes;
    } catch (error) {
      logError("Error checking overnight hours:", error);
      return false;
    }
  }
}
