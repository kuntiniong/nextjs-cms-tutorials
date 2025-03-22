import qs from "qs";

async function getTeamMember(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  const path = "/api/team-members";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      photo: {
        fields: ["alternativeText", "name", "url"],
      },
      blocks: {
        on: {
          "blocks.testimonial": {
            populate: {
              photo: {
                fields: ["alternativeText", "name", "url"],
              },
            },
          },
          "blocks.spoiler": {
            populate: true,
          },
          "blocks.rich-text": {
            populate: true,
          },
        },
      },
    },
    filters: {
      slug: {
        $eq: slug, // This is the slug for our team member
      },
    },
  });

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch team members");

  const data = await res.json();
  const teamMember = data?.data[0];
  console.dir(teamMember, { depth: null });
  return teamMember;
}

export default async function TeamMemberDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) <p>No member found</p>;

  const teamMember = await getTeamMember(slug);

  return (
    <div>
      <h1>Team Member Detail</h1>
      <p>{slug}</p>
      <pre>{JSON.stringify(teamMember, null, 2)}</pre>
    </div>
  );
}