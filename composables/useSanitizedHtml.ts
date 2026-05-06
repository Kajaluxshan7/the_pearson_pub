import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitize HTML content and optionally format plain text with paragraph breaks.
 */
export function useSanitizedHtml() {
  /**
   * Sanitize raw HTML content using DOMPurify.
   */
  const sanitize = (html: string): string => {
    if (!html) return ''
    return DOMPurify.sanitize(html)
  }

  /**
   * Convert plain text with line breaks to sanitized HTML paragraphs.
   */
  const formatAsParagraphs = (content: string): string => {
    if (!content) return ''
    const html = content
      .split('\n\n')
      .map(paragraph => `<p class="mb-4">${paragraph.trim()}</p>`)
      .join('')
    return DOMPurify.sanitize(html)
  }

  /**
   * Replace newlines with <br> tags and sanitize.
   */
  const formatWithLineBreaks = (content: string): string => {
    if (!content) return ''
    return DOMPurify.sanitize(content.replace(/\n/g, '<br>'))
  }

  return {
    sanitize,
    formatAsParagraphs,
    formatWithLineBreaks
  }
}
