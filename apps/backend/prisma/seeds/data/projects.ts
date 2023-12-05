import { Prisma } from "@prisma/client"
import { WithId } from "../utils"

type Project = WithId<Prisma.ProjectUncheckedCreateInput>

export function getProjects(): Project[] {
  return [
    {
      id: 1,
      name: "Project Titan",
      description:
        "Project Titan is an ambitious endeavor focusing on revolutionizing the field of artificial intelligence. The aim is to create a groundbreaking AI system capable of autonomous decision-making in complex scenarios. This project is expected to pave the way for advanced AI applications in various industries, from healthcare to automotive.The development phase involves extensive research and collaboration with leading AI experts globally. The project team is dedicated to ensuring ethical considerations and responsible AI development are at the forefront of this initiative.",
      from: new Date("2023-01-01T00:00:00Z"),
      to: new Date("2023-12-31T23:59:59Z"),
      managerId: 1,
    },
    {
      id: 2,
      name: "Project Atlas",
      description:
        "Project Atlas is set to be a landmark achievement in geospatial technology. It aims to create the most detailed and dynamic world map available, leveraging the latest in satellite imaging and data analytics. The project aspires to provide real-time insights into environmental changes, urban development, and global weather patterns.Through this endeavor, the team is committed to contributing to efforts in climate change research and urban planning. The project also seeks to foster a deeper understanding of our planet and its diverse ecosystems.",
      from: new Date("2023-02-01T00:00:00Z"),
      managerId: 2,
    },
    {
      id: 3,
      name: "Project Horizon",
      description:
        "Project Horizon marks a significant leap in renewable energy technology. The project's primary objective is to develop an innovative solar energy harvesting system capable of operating with unprecedented efficiency. This system is designed to harness solar power even under low-light conditions, making renewable energy more accessible worldwide.The project also emphasizes sustainability and the use of environmentally friendly materials. The team envisions that the success of Project Horizon will inspire a global shift towards cleaner and more sustainable energy sources.",
      from: new Date("2022-03-15T00:00:00Z"),
      to: new Date("2022-11-20T23:59:59Z"),
      managerId: 1,
    },
    {
      id: 4,
      name: "Project Oasis",
      description:
        "Project Oasis is an innovative venture aimed at creating sustainable, self-contained ecosystems in urban areas. The project explores advanced techniques in vertical farming and water recycling to establish green spaces within cities. These areas are not only designed to provide local food sources but also to enhance urban biodiversity and improve air quality.The project team is collaborating with urban planners and environmental scientists to integrate these ecosystems seamlessly into existing urban landscapes. Project Oasis could revolutionize how cities approach sustainability and self-sufficiency.",
      from: new Date("2021-05-01T00:00:00Z"),
      to: new Date("2021-10-31T23:59:59Z"),
      managerId: 2,
    },
    {
      id: 5,
      name: "Project Neptune",
      description:
        "Project Neptune is a cutting-edge marine research initiative focused on exploring the deepest parts of our oceans. The project aims to study uncharted marine ecosystems and their unique biodiversity, using state-of-the-art submersible technology. This exploration is crucial for understanding the impact of climate change on marine life and for discovering potential new resources.The project also includes an educational component, aiming to raise public awareness about the importance of marine conservation. Through its discoveries, Project Neptune aspires to contribute significantly to the global efforts in preserving our oceans.",
      from: new Date("2023-04-01T00:00:00Z"),
      to: new Date("2023-09-30T23:59:59Z"),
      managerId: 1,
    },
    {
      id: 6,
      name: "Project Echo",
      description:
        "Project Echo is an advanced telecommunications initiative aiming to enhance global connectivity through a new generation of communication satellites. These satellites are designed to provide high-speed internet access in remote and underserved areas around the world. The project is a step towards bridging the digital divide and empowering communities with digital literacy and access.Collaborating with international space agencies and telecommunication experts, the project team is committed to ensuring that the deployment of these satellites is carried out with minimal environmental impact. Project Echo represents a milestone in connecting the world like never before.",
      from: new Date("2023-06-01T00:00:00Z"),
      managerId: 2,
    },
    {
      id: 7,
      name: "Project Lumina",
      description:
        "Project Lumina embarks on an ambitious journey to revolutionize lighting technology. The project focuses on developing organic light-emitting diodes (OLEDs) that are more efficient, durable, and environmentally friendly than current options. These advancements in lighting technology have the potential to significantly reduce global energy consumption.The project aims not only to enhance the performance of OLEDs but also to make them more cost-effective for widespread use. Through collaborative efforts with industry leaders, Project Lumina is set to illuminate the future with sustainable and innovative lighting solutions.",
      from: new Date("2024-01-15T00:00:00Z"),
      to: new Date("2024-12-15T23:59:59Z"),
      managerId: 1,
    },
  ]
}
