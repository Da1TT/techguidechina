export interface Tour {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    highlights: string[];
    badge?: string;
}

export const tours: Tour[] = [
    {
        id: 1,
        title: "Beijing Historical & Cultural Tour",
        description: "Explore Beijing's iconic landmarks including the Forbidden City, Tiananmen Square, and Temple of Heaven.",
        image: "/images/tour-beijing-forbidden-city.jpg",
        category: "historical",
        badge: "BESTSELLER",
        highlights: [
            "Visit the magnificent Forbidden City",
            "Explore Tiananmen Square",
            "Discover the ancient Temple of Heaven",
            "Experience traditional Chinese culture with an expert guide"
        ]
    },
    {
        id: 2,
        title: "Shanghai Modern City Tour",
        description: "Experience contemporary Shanghai with visits to the Bund, Pudong Skyline, and vibrant shopping districts.",
        image: "/images/tour-shanghai-modern-city.jpg",
        category: "modern",
        badge: "MODERN",
        highlights: [
            "Visit the Olympic Park and Bird's Nest Stadium",
            "Enjoy panoramic views from CCTV Tower",
            "Experience vibrant shopping districts",
            "See modern Beijing's development with expert commentary"
        ]
    },
    {
        id: 3,
        title: "Shanghai Bund & Skyline Tour",
        description: "Explore Shanghai's iconic Bund and modern Pudong skyline, experiencing the blend of Eastern and Western cultures.",
        image: "/images/tour-shanghai-bund.jpg",
        category: "modern",
        highlights: [
            "Stroll along the Bund, admiring century-old buildings",
            "Visit Shanghai World Financial Center or Shanghai Tower observation deck",
            "Explore Yu Garden and traditional shopping areas",
            "Experience Shanghai's vibrant nightlife"
        ]
    },
    {
        id: 4,
        title: "Xi'an Terracotta Army & City Wall Tour",
        description: "Explore the 8th Wonder of the World - Terracotta Army, and cycle along China's best-preserved Ming Dynasty city wall.",
        image: "/images/tour-xian-terracotta-army.jpg",
        category: "historical",
        highlights: [
            "Visit the Terracotta Army Museum",
            "Cycle or walk along the Ming Dynasty City Wall",
            "Explore Dacien Temple and Big Wild Goose Pagoda",
            "Taste authentic Shaanxi cuisine"
        ]
    },
    {
        id: 5,
        title: "Chengdu Panda Base & Sichuan Cuisine Tour",
        description: "Visit the world-famous Giant Panda Breeding Research Base and taste authentic Sichuan cuisine.",
        image: "/images/tour-chengdu-panda.jpg",
        category: "cultural",
        highlights: [
            "Observe cute giant pandas and red pandas",
            "Learn about panda conservation efforts",
            "Explore Kuanzhai Ancient Street historical area",
            "Taste authentic Sichuan cuisine, including spicy hot pot"
        ]
    },
    {
        id: 6,
        title: "Guilin Landscape & Li River Bamboo Raft Tour",
        description: "Admire Guilin's magnificent karst landscape and take a traditional bamboo raft ride along the Li River.",
        image: "/images/tour-guilin-li-river.jpg",
        category: "scenic",
        highlights: [
            "Take a traditional bamboo raft ride along the Li River",
            "Admire the 'world's most beautiful landscape' in Guilin",
            "Visit Yangshuo West Street",
            "Experience local ethnic minority culture"
        ]
    },
    {
        id: 7,
        title: "Hangzhou West Lake Tour",
        description: "Visit the beautiful West Lake and historic temples in Hangzhou, the 'Paradise on Earth'.",
        image: "/images/tour-hangzhou-west-lake.jpg",
        category: "gardens",
        badge: "ROYAL",
        highlights: [
            "Take a boat ride on the beautiful West Lake",
            "Visit Longjing tea plantations and learn about tea culture",
            "Taste authentic West Lake Longjing tea",
            "Explore Lingyin Temple"
        ]
    },
    {
        id: 8,
        title: "Great Wall of China Day Trip",
        description: "Visit the magnificent Mutianyu section of the Great Wall of China, one of the best-preserved sections.",
        image: "/images/tour-great-wall.jpg",
        category: "historical",
        highlights: [
            "Visit Mutianyu section of the Great Wall with fewer crowds",
            "Enjoy breathtaking mountain views",
            "Experience cable car ride up to the wall",
            "Learn about the wall's history from an expert guide"
        ]
    }
];
