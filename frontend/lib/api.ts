async function fetchRESTAPI(path: string): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json;
}

async function fetchGraphAPI(
  query: string,
  { variables }: { variables?: string } = {}
): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getGetHomePageContent(): Promise<Record<string, unknown>> {
  const data = await fetchRESTAPI('/homepage');
  return data;
}

export async function getGetAboutPageContent(): Promise<any> {
  const data = await fetchRESTAPI('/about-page');
  return data;
}

export async function getKap(slug: string): Promise<any> {
  const data = await fetchRESTAPI('/kot-a-projets?slug=' + slug);
  return data[0];
}

export async function getKapContacts(slug: string): Promise<any[]> {
  const data = await fetchRESTAPI('/contacts?kot_a_projet.slug=' + slug);
  return data;
}

export async function getKapProducts(slug: string): Promise<any[]> {
  const data = await fetchRESTAPI('/products?kot_a_projet.slug=' + slug);
  return data;
}

export async function getKapsLogo(): Promise<any[]> {
  const data = await fetchGraphAPI(`{kotAProjets {logo {url} slug}}`);
  return data.kotAProjets;
}

export async function getStaffContent(): Promise<any[]> {
  const data = await fetchGraphAPI(`{users {nom prenom poste position photo {url}}}`);
  return data.users;
}

export async function getSocials(): Promise<any[]> {
  const data = await fetchGraphAPI(`{socials {label url name icon}}`);
  return data.socials;
}

export async function getKaps(): Promise<any[]> {
  const data = await fetchGraphAPI(`{kotAProjets { name slug logo {url} categories {name color}}}`);
  return data.kotAProjets;
}

export async function getKapsSlug(): Promise<any[]> {
  const data = await fetchGraphAPI(`{kotAProjets {slug}}`);
  return data.kotAProjets;
}
