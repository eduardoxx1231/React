// eslint-disable-next-line no-undef
export function sortVoices(list: SpeechSynthesisVoice[]) {
  return [...list].sort((a, b) => a.name.localeCompare(b.name));
}
