import { DateTime } from 'luxon'

/**
 * Log errors only in development environment
 */
function logError(message: string, error: unknown) {
  if (process.dev) {
    console.error(message, error)
  }
}

/**
 * Centralized timezone utilities for the Nuxt frontend.
 * All date/time operations should use America/Toronto timezone.
 * Backend stores UTC, we convert at API boundaries.
 */
export class TimezoneUtil {
  private static readonly TIMEZONE = 'America/Toronto'

  private static readonly DAY_NAMES = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ] as const

  /**
   * Parse any date-like value into a Luxon DateTime in Toronto time.
   *
   * Parsing rules:
   * - A `Date` keeps its instant and is re-zoned to Toronto.
   * - A string carrying an offset (`...Z`, `+05:30`) has a well-defined
   *   instant, which is converted to Toronto.
   * - A string WITHOUT an offset (`2025-08-15`, `2025-08-15T19:30`) is
   *   interpreted as Toronto wall-clock time, never as browser-local time.
   *
   * That last rule is the important one: it is what keeps rendering
   * independent of the viewer's machine timezone.
   *
   * @param value - Date-like value from the API, a form input, or display code
   * @returns A DateTime in Toronto zone, or null if unparseable
   */
  private static toToronto(value: string | Date | null | undefined): DateTime | null {
    if (!value) {
      return null
    }

    const dt =
      value instanceof Date
        ? DateTime.fromJSDate(value).setZone(this.TIMEZONE)
        : DateTime.fromISO(value.trim(), { zone: this.TIMEZONE })

    return dt.isValid ? dt : null
  }

  /**
   * Convert time in HH:MM (or HH:MM:SS) form to minutes since midnight
   */
  private static timeToMinutes(timeString: string): number | null {
    const [hours, minutes] = timeString.split(':').map(Number)
    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
      return null
    }
    return hours * 60 + minutes
  }

  /**
   * Convert UTC date from API to Toronto timezone for display
   * @param utcDateLike - UTC date string or Date object from API
   * @param format - Display format (default: human readable)
   * @returns Formatted string in Toronto timezone
   */
  static formatToronto(
    utcDateLike: string | Date | null | undefined,
    format = 'MMMM d, yyyy h:mm a',
    includeTimezone = false
  ): string {
    if (!utcDateLike) {
      return ''
    }

    try {
      const dt = this.toToronto(utcDateLike)
      if (!dt) {
        return String(utcDateLike)
      }

      const formatted = dt.toFormat(format)
      if (includeTimezone) {
        const tzAbbr = dt.offsetNameShort ?? 'EST'
        return `${formatted} ${tzAbbr}`
      }
      return formatted
    } catch (error) {
      logError('Error formatting Toronto time:', error)
      return String(utcDateLike)
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
      throw new Error('Toronto local date is required')
    }

    try {
      // NOTE: DateTime.fromJSDate(d, { zone }) must NOT be used here - its
      // `zone` option only changes rendering, it does not reinterpret the
      // wall-clock time, so it would silently pass the input through
      // unchanged after `new Date()` had already parsed it as browser-local.
      const dt = this.toToronto(torontoLocal)
      if (!dt) {
        throw new Error(`Invalid date format: ${String(torontoLocal)}`)
      }
      return dt.toUTC().toISO() ?? ''
    } catch (error) {
      logError('Error parsing Toronto input:', error)
      throw new Error(`Invalid date format: ${String(torontoLocal)}`)
    }
  }

  /**
   * Format UTC date for datetime-local input (Toronto timezone)
   * @param utcDateLike - UTC date from API
   * @returns String in YYYY-MM-DDTHH:MM format for HTML datetime-local inputs
   */
  static formatForDateTimeInput(utcDateLike: string | Date | null): string {
    if (!utcDateLike) {
      return ''
    }

    try {
      const dt = this.toToronto(utcDateLike)
      return dt ? dt.toFormat("yyyy-MM-dd'T'HH:mm") : ''
    } catch (error) {
      logError('Error formatting for datetime input:', error)
      return ''
    }
  }

  /**
   * Format date only (no time) for display in Toronto timezone
   * @param utcDateLike - UTC date from API
   * @returns Formatted date string
   */
  static formatTorontoDate(utcDateLike: string | Date | null): string {
    return this.formatToronto(utcDateLike, 'MMMM d, yyyy', false)
  }

  /**
   * Format date in short format (MM/dd/yyyy) for display in Toronto timezone
   * @param utcDateLike - UTC date from API
   * @returns Formatted date string in MM/dd/yyyy format
   */
  static formatTorontoDateShort(utcDateLike: string | Date | null): string {
    return this.formatToronto(utcDateLike, 'MM/dd/yyyy', false)
  }

  /**
   * Format time only (no date) for display in Toronto timezone
   * @param utcDateLike - UTC date from API
   * @returns Formatted time string
   */
  static formatTorontoTime(utcDateLike: string | Date | null): string {
    return this.formatToronto(utcDateLike, 'h:mm a')
  }

  /**
   * Format time only (no date) for display in Toronto timezone
   * @param utcDateLike - UTC date from API
   * @returns Formatted time string
   */
  static formatTorontoTimeOnly(utcDateLike: string | Date | null): string {
    return this.formatToronto(utcDateLike, 'h:mm a')
  }

  /**
   * Get current time in Toronto timezone
   * @returns Current DateTime object in Toronto timezone
   */
  static nowToronto(): DateTime {
    return DateTime.now().setZone(this.TIMEZONE)
  }

  /**
   * Get current UTC time
   * @returns Current DateTime object in UTC
   */
  static nowUTC(): DateTime {
    return DateTime.utc()
  }

  /**
   * Check if a date is during Daylight Saving Time in Toronto
   * @param date - Date to check (optional, defaults to now)
   * @returns true if DST is active
   */
  static isDaylightSavingTime(date?: Date | string): boolean {
    try {
      const dt = date ? (this.toToronto(date) ?? this.nowToronto()) : this.nowToronto()

      return dt.offsetNameShort === 'EDT'
    } catch (error) {
      logError('Error checking DST:', error)
      return false
    }
  }

  /**
   * Get timezone information for display
   * @param date - Date to get timezone info for (optional)
   * @returns Object with timezone details
   */
  static getTimezoneInfo(date?: Date | string): {
    timezone: string
    abbreviation: string
    offset: string
    isDST: boolean
  } {
    try {
      const dt = date ? (this.toToronto(date) ?? this.nowToronto()) : this.nowToronto()

      return {
        timezone: this.TIMEZONE,
        abbreviation: dt.offsetNameShort ?? 'EST',
        offset: dt.toFormat('ZZ'),
        isDST: this.isDaylightSavingTime(date)
      }
    } catch (error) {
      logError('Error getting timezone info:', error)
      return {
        timezone: this.TIMEZONE,
        abbreviation: 'EST',
        offset: '-05:00',
        isDST: false
      }
    }
  }

  /**
   * Format operation hours range for display
   * @param openTime - Opening time in HH:MM format
   * @param closeTime - Closing time in HH:MM format
   * @returns Formatted range (e.g., "11:00 AM - 12:00 AM")
   */
  static formatOperationHours(openTime: string, closeTime: string): string {
    if (!openTime || !closeTime) {
      return 'Closed'
    }

    try {
      const today = this.nowToronto().toFormat('yyyy-MM-dd')
      const openDt = DateTime.fromISO(`${today}T${openTime}`, {
        zone: this.TIMEZONE
      })
      const closeDt = DateTime.fromISO(`${today}T${closeTime}`, {
        zone: this.TIMEZONE
      })

      const openFormatted = openDt.toFormat('h:mm a')
      const closeFormatted = closeDt.toFormat('h:mm a')

      return `${openFormatted} - ${closeFormatted}`
    } catch (error) {
      logError('Error formatting operation hours:', error)
      return 'Closed'
    }
  }

  /**
   * Check if current time is within business hours in Toronto
   * @param openTime - Opening time in HH:MM format
   * @param closeTime - Closing time in HH:MM format
   * @returns true if currently within business hours
   */
  static isWithinBusinessHours(openTime: string, closeTime: string, day?: string): boolean {
    return this.isCurrentlyOpen(openTime, closeTime, day)
  }

  /**
   * Validate if a string represents a valid datetime
   * @param dateString - String to validate
   * @returns true if valid
   */
  static isValidDateTime(dateString: string): boolean {
    if (!dateString) {
      return false
    }
    try {
      return this.toToronto(dateString) !== null
    } catch {
      return false
    }
  }

  /**
   * Format time for display (12-hour format)
   */
  static formatTime(timeString: string): string {
    try {
      const [hours, minutes] = timeString.split(':').map(Number)
      const period = hours >= 12 ? 'PM' : 'AM'
      const displayHour = hours % 12 || 12
      return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`
    } catch (error) {
      logError('Error formatting time:', error)
      return timeString
    }
  }

  /**
   * Calculate event status based on current Toronto time
   */
  static calculateEventStatus(
    startDate: string | Date,
    endDate: string | Date
  ): 'upcoming' | 'current' | 'ended' {
    try {
      const now = this.nowToronto()
      const start = this.toToronto(startDate)
      const end = this.toToronto(endDate)

      if (!start || !end) {
        return 'upcoming'
      }

      if (now < start) {
        return 'upcoming'
      }
      if (now >= start && now <= end) {
        return 'current'
      }
      return 'ended'
    } catch (error) {
      logError('Error calculating event status:', error)
      return 'upcoming'
    }
  }

  /**
   * Format event date range
   */
  static formatEventDateRange(startDate: string | Date, endDate?: string | Date): string {
    try {
      const startDt = this.toToronto(startDate)
      if (!startDt) {
        return ''
      }

      if (!endDate) {
        return this.formatTorontoTime(startDt.toJSDate())
      }

      const endDt = this.toToronto(endDate)
      if (!endDt) {
        return this.formatTorontoTime(startDt.toJSDate())
      }

      // Both are already in Toronto zone, so `hasSame` compares Toronto days
      if (startDt.hasSame(endDt, 'day')) {
        const dateStr = startDt.toFormat('MMMM d, yyyy')
        const startTime = startDt.toFormat('h:mm a')
        const endTime = endDt.toFormat('h:mm a')
        return `${dateStr} from ${startTime} to ${endTime}`
      } else {
        return `${startDt.toFormat('MMMM d, yyyy h:mm a')} - ${endDt.toFormat('MMMM d, yyyy h:mm a')}`
      }
    } catch (error) {
      logError('Error formatting event date range:', error)
      return ''
    }
  }

  /**
   * Convert date to ISO string in Toronto timezone
   */
  static toISOString(date: string | Date): string {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date
      return dateObj.toISOString()
    } catch (error) {
      logError('Error converting to ISO string:', error)
      return ''
    }
  }

  /**
   * Parse date string and ensure it's treated as Toronto time
   */
  static parseTorontoDate(dateString: string): Date {
    try {
      const dt = this.toToronto(dateString)
      return dt ? dt.toJSDate() : new Date()
    } catch (error) {
      logError('Error parsing Toronto date:', error)
      return new Date()
    }
  }

  /**
   * Get relative time description (e.g., "2 hours ago", "in 3 days")
   */
  static getRelativeTime(date: string | Date): string {
    try {
      const targetDt = this.toToronto(date)
      if (!targetDt) {
        return ''
      }
      const nowDt = this.nowToronto()

      const diff = targetDt.diff(nowDt, ['days', 'hours', 'minutes']).toObject()
      const { days = 0, hours = 0, minutes = 0 } = diff

      if (Math.abs(days) >= 1) {
        return days > 0
          ? `in ${Math.ceil(days)} day${Math.ceil(days) > 1 ? 's' : ''}`
          : `${Math.abs(Math.floor(days))} day${Math.abs(Math.floor(days)) > 1 ? 's' : ''} ago`
      } else if (Math.abs(hours) >= 1) {
        return hours > 0
          ? `in ${Math.ceil(hours)} hour${Math.ceil(hours) > 1 ? 's' : ''}`
          : `${Math.abs(Math.floor(hours))} hour${Math.abs(Math.floor(hours)) > 1 ? 's' : ''} ago`
      } else if (Math.abs(minutes) >= 1) {
        return minutes > 0
          ? `in ${Math.ceil(minutes)} minute${Math.ceil(minutes) > 1 ? 's' : ''}`
          : `${Math.abs(Math.floor(minutes))} minute${
              Math.abs(Math.floor(minutes)) > 1 ? 's' : ''
            } ago`
      } else {
        return 'now'
      }
    } catch (error) {
      logError('Error getting relative time:', error)
      return ''
    }
  }

  /**
   * Format time for operation hours display
   * @param timeString - Time in HH:MM format
   * @returns Formatted time string (e.g., "11:00 AM")
   */
  static formatOperationTime(timeString: string): string {
    if (!timeString) {
      return ''
    }

    try {
      const today = this.nowToronto().toFormat('yyyy-MM-dd')
      const dt = DateTime.fromISO(`${today}T${timeString}`, {
        zone: this.TIMEZONE
      })

      return dt.toFormat('h:mm a')
    } catch (error) {
      logError('Error formatting operation time:', error)
      return timeString
    }
  }

  /**
   * Check if currently within operation hours
   * @param openTime - Opening time in HH:MM format
   * @param closeTime - Closing time in HH:MM format
   * @returns true if currently open, false if closed
   */
  static isCurrentlyOpen(openTime: string, closeTime: string, day?: string): boolean {
    if (!openTime || !closeTime) {
      return false
    }

    try {
      const now = this.nowToronto()
      const currentMinutes = now.hour * 60 + now.minute
      const openMinutes = this.timeToMinutes(openTime)
      const closeMinutes = this.timeToMinutes(closeTime)

      if (openMinutes === null || closeMinutes === null) {
        return false
      }

      // Luxon weekday is 1 (Monday) .. 7 (Sunday); `% 7` maps Sunday to index 0
      const todayName = this.DAY_NAMES[now.weekday % 7]
      const isOvernight = closeMinutes < openMinutes

      // No specific day given: evaluate the hours against today only.
      if (!day) {
        return isOvernight
          ? currentMinutes >= openMinutes || currentMinutes < closeMinutes
          : currentMinutes >= openMinutes && currentMinutes < closeMinutes
      }

      const targetDay = day.toLowerCase()

      if (isOvernight) {
        // An overnight block belongs to `targetDay` but spills into the day
        // after it, so it can be live during either of those two calendar days.
        if (todayName === targetDay && currentMinutes >= openMinutes) {
          return true
        }

        const targetIndex = this.DAY_NAMES.indexOf(targetDay as (typeof this.DAY_NAMES)[number])
        if (targetIndex === -1) {
          return false
        }

        const nextDay = this.DAY_NAMES[(targetIndex + 1) % 7]
        return todayName === nextDay && currentMinutes < closeMinutes
      }

      if (todayName !== targetDay) {
        return false
      }

      return currentMinutes >= openMinutes && currentMinutes < closeMinutes
    } catch (error) {
      logError('Error checking if currently open:', error)
      return false
    }
  }

  /**
   * Get operation status with proper timezone display
   */
  static getOperationStatus(
    openTime: string,
    closeTime: string,
    isEnabled: boolean = true,
    day?: string
  ): string {
    if (!isEnabled || !openTime || !closeTime) {
      return 'Closed'
    }

    const isOpen = this.isCurrentlyOpen(openTime, closeTime, day)

    if (isOpen) {
      const closeFormatted = this.formatOperationTime(closeTime)
      const isOvernight = this.isOvernightHours(openTime, closeTime)
      // Only say "tomorrow" while we are still on the opening day; once the
      // clock has passed midnight the closing time is later *today*.
      const now = this.nowToronto()
      const stillOnOpeningDay =
        now.hour * 60 + now.minute >= (this.timeToMinutes(openTime) ?? 0)

      if (isOvernight && stillOnOpeningDay) {
        return `Open until ${closeFormatted} tomorrow`
      } else {
        return `Open until ${closeFormatted}`
      }
    } else {
      const openFormatted = this.formatOperationTime(openTime)
      return `Opens at ${openFormatted}`
    }
  }

  /**
   * Check if the operation hours span overnight (close time is next day)
   * @param openTime - Opening time in HH:MM format
   * @param closeTime - Closing time in HH:MM format
   * @returns true if hours span overnight
   */
  static isOvernightHours(openTime: string, closeTime: string): boolean {
    if (!openTime || !closeTime) {
      return false
    }

    try {
      const [openHour, openMin] = openTime.split(':').map(Number)
      const [closeHour, closeMin] = closeTime.split(':').map(Number)
      const openMinutes = openHour * 60 + openMin
      const closeMinutes = closeHour * 60 + closeMin

      return closeMinutes < openMinutes
    } catch (error) {
      logError('Error checking overnight hours:', error)
      return false
    }
  }
}
