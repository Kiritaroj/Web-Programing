export const COLLECTIONS = [
  {
    title: "Library Research Starter",
    description: "Access the digital library, e-books, and research materials.",
    href: "/categories/Library",
    image:
      "https://images.unsplash.com/photo-1695943139369-9a5b659d35b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzM1ODY1OTl8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Campus IT Rescue",
    description: "Wi-Fi, password resets, printer setup, and MFA help.",
    href: "/categories/IT%20Support",
    image:
      "https://images.unsplash.com/photo-1594182878770-c05ece34b1f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzM1ODY1OTl8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Student Life Essentials",
    description: "Housing, finance, orientation, and student services.",
    href: "/categories/Student%20Services",
    image:
      "https://images.unsplash.com/photo-1715808155999-f389175f5817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzM1ODY2MDB8&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

const IMAGE_BY_TITLE = {
  "How to Access the Digital Library": COLLECTIONS[0].image,
  "Semester Registration Guide": COLLECTIONS[1].image,
  "Campus Wi-Fi Troubleshooting": COLLECTIONS[2].image,
  "Scholarship Application Steps": COLLECTIONS[0].image,
  "Using the Career Center": COLLECTIONS[1].image
};

const IMAGE_BY_CATEGORY = {
  Library: COLLECTIONS[0].image,
  Academics: COLLECTIONS[1].image,
  "IT Support": COLLECTIONS[2].image,
  Finance: COLLECTIONS[0].image,
  "Student Services": COLLECTIONS[1].image
};

export const CATEGORY_GROUPS = [
  {
    title: "Academic Services",
    description:
      "Core study and campus access topics, grouped like a modern help center.",
    categories: ["Library", "Academics", "IT Support"]
  },
  {
    title: "Student Support",
    description:
      "Financial and student-service categories with direct route examples.",
    categories: ["Finance", "Student Services"]
  }
];

export const POPULAR_SEARCHES = [
  "semester registration",
  "digital library",
  "campus wi-fi",
  "career center"
];

export const INITIAL_RECENT_SEARCHES = ["library", "wifi", "scholarship"];

export function getArticleImage(article) {
  return IMAGE_BY_TITLE[article.title] ?? IMAGE_BY_CATEGORY[article.category] ?? COLLECTIONS[0].image;
}

export function getArticleExcerpt(content, length = 108) {
  if (!content) {
    return "";
  }

  if (content.length <= length) {
    return content;
  }

  return `${content.slice(0, length).trimEnd()}...`;
}
