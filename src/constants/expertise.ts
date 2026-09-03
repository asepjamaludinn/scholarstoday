import type { ExpertiseItem } from "../types/expertise";
import uiuxImg from "../assets/images/uiux.jpg";
import webdevImg from "../assets/images/webdev.jpg";
import dataScienceImg from "../assets/images/datascience.jpg";
import marketingImg from "../assets/images/marketing.jpg";

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    program: "UI/UX Design",
    image: uiuxImg,
    description:
      "Kami merancang antarmuka yang intuitif untuk meningkatkan usability, memandu pengguna, dan meningkatkan engagement produk digital.",
    skills: [
      "User Research",
      "Wireframing",
      "Usability Testing",
      "Prototyping",
    ],
  },
  {
    program: "Web Development",
    image: webdevImg,
    description:
      "Kami membangun aplikasi web modern yang cepat, scalable, dan mudah dikembangkan menggunakan teknologi terkini.",
    skills: [
      "React & Next.js",
      "REST API",
      "Version Control",
      "Responsive Design",
    ],
  },
  {
    program: "Data Science",
    image: dataScienceImg,
    description:
      "Kami mengolah data menjadi insight yang bisa diandalkan untuk pengambilan keputusan berbasis data.",
    skills: [
      "Data Analysis",
      "Machine Learning",
      "Data Visualization",
      "Python",
    ],
  },
  {
    program: "Digital Marketing",
    image: marketingImg,
    description:
      "Kami merancang strategi pemasaran digital yang efektif untuk menjangkau audiens yang tepat dan meningkatkan konversi.",
    skills: ["SEO & SEM", "Content Strategy", "Social Media", "Analytics"],
  },
];

export const EXPERTISE_HEADING = "Program Kami";
export const EXPERTISE_SUBHEADING =
  "Pilih program yang sesuai dengan minat dan tujuan belajarmu";
