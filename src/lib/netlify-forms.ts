const NETLIFY_FORMS_PATH = "/__forms.html";

export async function submitNetlifyForm(
  formName: string,
  fields: Record<string, string>
): Promise<Response> {
  const params = new URLSearchParams();
  params.append("form-name", formName);
  for (const [key, value] of Object.entries(fields)) {
    params.append(key, value);
  }
  return fetch(NETLIFY_FORMS_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
}
