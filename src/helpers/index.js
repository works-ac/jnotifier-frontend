export function getInitials(name = "") {
  if (!name) return null;

  const firstWord = name.split(" ").at(0);
  const lastWord = name.split(" ").at(-1);

  return `${firstWord.at(0)}${lastWord.at(0)}`;
}

export function getToastNotification() {
  return { autoClose: 4000, theme: "dark" };
}

export function getErrorMsg(error) {
  const message =
    error?.response?.data?.msg ??
    error?.response?.data?.error?.message ??
    error?.message ??
    "Something went wrong while processing your request, please try again!!!";

  return message;
}

export function whatsAppFormatter(markdownText) {
  if (!markdownText) return "";

  return (
    markdownText
      // 1. Convert Headings (e.g., # Heading -> *Heading*)
      // WhatsApp doesn't support size changes, so making it bold is the best alternative
      .replace(/^#+\s*(.*)$/gm, "*$1*")

      // 2. Convert Bold (e.g., **text** -> *text*)
      .replace(/\*\*(.*?)\*\*/g, "*$1*")

      // 3. Convert Markdown Links (e.g., [Google](https://google.com) -> Google: https://google.com)
      // WhatsApp makes raw URLs clickable automatically
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1: $2")

      // 4. Convert Strikethrough (e.g., ~~text~~ -> ~text~)
      .replace(/~~(.*?)~~/g, "~$1~")

      // 5. (Optional) Convert asterisks used for lists into dashes to prevent formatting issues
      .replace(/^\*\s+/gm, "- ")
  );
}
