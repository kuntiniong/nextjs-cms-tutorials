import qs from "qs"; // special stringifier for populated "query strings", similiar to json.stringify
import Image from "next/image"; // built-in nextjs component for image loading optimization
import Link from "next/link";

async function getTeamMembers() {
  // not sure why we need to use ipv4, localhost (ipv6) doesn't work
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  const path = "/api/team-members";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    /* populate means extracting the data we only need in a nested json to improve performance
       in this case, we don't need documentID for the photo */
    populate: {
      photo: {
        fields: ["alternativeText", "name", "url"],
      },
    },
  });

  // the pouplated api url still includes documentID, not sure why
  // console.log("Constructed URL:", url.toString());

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch team members");

  const data = await res.json();
  console.log(data);

  return data;
}
interface TeamMemberProps {
  id: number;
  documentId: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  photo: {
    id: number;
    documentId: string;
    alternativeText: string;
    name: string;
    url: string;
  }[]; 
  /* photo's data structure -> array(object) 
     just check out content type in the admin panel, strapi assumes media type is an array
     because we can more than one photo for each entry */
}

function TeamMemberCard({
  name,
  description,
  photo,
  slug,
}: Readonly<TeamMemberProps>) {
  const imageUrl = `${
    process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337"
  }${photo[0].url}`; // index zero because we wanna fetch the first photo
  return (
    <Link
      href={`/our-team/${slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Image
        src={imageUrl}
        alt={photo[0].alternativeText || name}
        width={500}
        height={500}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

export default async function OurTeam() {
  const teamMembers = await getTeamMembers();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.data.map((member: TeamMemberProps) => (
          <TeamMemberCard key={member.documentId} {...member} />
        ))}
      </div>
    </div>
  );
}