/**
 * plugins/webfontloader.ts
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
  const webFontLoader = await import("webfontloader");

  webFontLoader.load({
    google: {
      families: [
        "Inter:400,500,600,700,800,900&display=swap",
        "Fira+Mono:400,500,700&display=swap",
        "Open+Sans:100,300,400,500,700,900&display=swap",
        "Roboto:100,300,400,500,700,900&display=swap",
      ],
    },
  });
}
