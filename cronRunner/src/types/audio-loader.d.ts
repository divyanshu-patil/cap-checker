// types/audio-loader.d.ts
declare module "audio-loader" {
  function audioLoader(file: string | string[]): Promise<AudioBuffer>;
  export = audioLoader;
}
