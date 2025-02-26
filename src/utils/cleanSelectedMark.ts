export default function cleanSelectedMark(option: string | undefined) {
  // Case undefined
  if (option === undefined) {
    return option;
  }

  return option.replace(" <Selected>", "");
}
