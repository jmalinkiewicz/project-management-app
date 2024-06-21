import slugify from "slugify";

export function createSlug(text: string) {
  try {
    const slug = slugify(JSON.stringify(text), {
      lower: true,
      strict: true,
    });
    return slug;
  } catch (error) {
    console.log(error);
    return "";
  }
}
