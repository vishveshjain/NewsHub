import { NewsItem, User, Comment } from '../types';

export const categories = [
  'Politics',
  'Technology',
  'Business',
  'Health',
  'Entertainment',
  'Sports',
  'Science',
  'Environment',
  'Education',
  'World'
];

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Tech journalist and enthusiast.',
    credibilityScore: 92,
    joinedDate: '2022-01-15',
    location: {
      city: 'San Francisco',
      state: 'California',
      country: 'USA'
    },
    followersCount: 1240,
    followingCount: 325
  },
  {
    id: '2',
    username: 'sarahsmith',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Environmental reporter covering climate issues.',
    credibilityScore: 88,
    joinedDate: '2022-03-22',
    location: {
      city: 'New York',
      state: 'New York',
      country: 'USA'
    },
    followersCount: 2100,
    followingCount: 178
  },
  {
    id: '3',
    username: 'michaelwong',
    email: 'michael@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Political correspondent and analyst.',
    credibilityScore: 95,
    joinedDate: '2021-11-05',
    location: {
      city: 'London',
      state: '',
      country: 'UK'
    },
    followersCount: 5420,
    followingCount: 230
  },
  {
    id: '4',
    username: 'emmajohnson',
    email: 'emma@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Sports journalist covering international events.',
    credibilityScore: 89,
    joinedDate: '2022-06-14',
    location: {
      city: 'Sydney',
      state: 'NSW',
      country: 'Australia'
    },
    followersCount: 1890,
    followingCount: 342
  }
];

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'New Breakthrough in Renewable Energy Storage',
    description: 'Scientists have developed a new type of battery that can store renewable energy for longer periods.',
    content: 'Researchers at MIT have announced a breakthrough in energy storage technology that could revolutionize how we use renewable energy. The new battery technology can store solar and wind energy for up to 30 days without significant loss, solving one of the biggest challenges in renewable energy adoption. The team believes this technology could be commercially viable within the next five years.',
    thumbnail: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=640',
    type: 'article',
    location: {
      city: 'Boston',
      state: 'Massachusetts',
      country: 'USA',
      coordinates: {
        lat: 42.3601,
        lng: -71.0589
      }
    },
    categories: ['Technology', 'Science', 'Environment'],
    author: mockUsers[0],
    createdAt: '2023-10-15T10:30:00Z',
    updatedAt: '2023-10-15T10:30:00Z',
    upvotes: 1542,
    downvotes: 45,
    viewCount: 25640,
    isModerated: true,
    comments: 128
  },
  {
    id: '2',
    title: 'Local Community Transforms Abandoned Lot into Urban Garden',
    description: 'Residents in downtown area create thriving community garden from neglected space.',
    content: 'What was once an eyesore in the heart of the city has been transformed into a vibrant community space. Local residents, led by community organizer Maria Sanchez, have spent the last six months converting an abandoned lot into a productive urban garden. The garden now produces vegetables for local food banks and serves as an educational space for nearby schools.',
    thumbnail: 'https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg?auto=compress&cs=tinysrgb&w=640',
    type: 'article',
    location: {
      city: 'Chicago',
      state: 'Illinois',
      country: 'USA',
      coordinates: {
        lat: 41.8781,
        lng: -87.6298
      }
    },
    categories: ['Environment', 'Education'],
    author: mockUsers[1],
    createdAt: '2023-10-16T14:45:00Z',
    updatedAt: '2023-10-16T14:45:00Z',
    upvotes: 872,
    downvotes: 23,
    viewCount: 13250,
    isModerated: true,
    comments: 75
  },
  {
    id: '3',
    title: 'Global Summit on Climate Change Announces New Targets',
    description: 'World leaders agree on ambitious new climate goals at international conference.',
    content: 'At the conclusion of the week-long Global Climate Summit, participating nations have announced a new set of targets aimed at limiting global warming to 1.5°C above pre-industrial levels. The agreement includes accelerated timelines for carbon neutrality and increased funding for developing nations to transition to clean energy. Environmental groups have cautiously welcomed the announcement while calling for concrete action plans.',
    thumbnail: 'https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg?auto=compress&cs=tinysrgb&w=640',
    type: 'article',
    location: {
      city: 'Geneva',
      state: '',
      country: 'Switzerland',
      coordinates: {
        lat: 46.2044,
        lng: 6.1432
      }
    },
    categories: ['Politics', 'Environment', 'World'],
    author: mockUsers[2],
    createdAt: '2023-10-17T09:15:00Z',
    updatedAt: '2023-10-17T09:15:00Z',
    upvotes: 2341,
    downvotes: 195,
    viewCount: 41280,
    isModerated: true,
    comments: 304
  },
  {
    id: '4',
    title: 'Tech Giant Unveils Revolutionary AR Glasses',
    description: 'New augmented reality device promises to change how we interact with technology.',
    content: 'Tech industry leader VisioTech has revealed its long-awaited augmented reality glasses at its annual developer conference. The device, called VisioLens, projects high-resolution digital content directly into the user\'s field of vision while maintaining transparency for real-world interaction. Early demonstrations showcased applications ranging from navigation and translation to gaming and professional training. The product is expected to launch in limited markets next spring.',
    thumbnail: 'https://images.pexels.com/photos/4009591/pexels-photo-4009591.jpeg?auto=compress&cs=tinysrgb&w=640',
    type: 'article',
    location: {
      city: 'San Francisco',
      state: 'California',
      country: 'USA',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    categories: ['Technology', 'Business'],
    author: mockUsers[0],
    createdAt: '2023-10-18T16:20:00Z',
    updatedAt: '2023-10-18T16:20:00Z',
    upvotes: 1876,
    downvotes: 68,
    viewCount: 30125,
    isModerated: true,
    comments: 215
  },
  {
    id: '5',
    title: 'Historic Sports Upset as Underdogs Win Championship',
    description: 'Against all odds, underdog team secures first championship in franchise history.',
    content: 'In what many are calling the greatest upset in recent sports history, the underdog team has defeated the heavily favored champions in a thrilling final match. Playing in front of a capacity crowd, the underdogs overcame an early deficit to claim their first championship title in the franchise\'s 25-year history. "This is for all the fans who never stopped believing," said team captain Alex Johnson in the post-game interview.',
    thumbnail: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=640',
    type: 'article',
    location: {
      city: 'Melbourne',
      state: 'Victoria',
      country: 'Australia',
      coordinates: {
        lat: -37.8136,
        lng: 144.9631
      }
    },
    categories: ['Sports'],
    author: mockUsers[3],
    createdAt: '2023-10-19T22:10:00Z',
    updatedAt: '2023-10-19T22:10:00Z',
    upvotes: 3421,
    downvotes: 124,
    viewCount: 52670,
    isModerated: true,
    comments: 437
  },
  {
    id: '6',
    title: 'New Study Reveals Benefits of Mediterranean Diet',
    description: 'Research confirms health advantages of traditional Mediterranean eating patterns.',
    content: 'A comprehensive study published in the Journal of Nutrition has provided strong evidence for the health benefits of the Mediterranean diet. The ten-year study, which followed over 12,000 participants, found that those who adhered closely to the diet had significantly lower rates of heart disease, stroke, and certain cancers. Researchers highlighted the importance of olive oil, fresh vegetables, and lean proteins as key components of the dietary pattern.',
    thumbnail: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=640',
    type: 'article',
    location: {
      city: 'Barcelona',
      state: 'Catalonia',
      country: 'Spain',
      coordinates: {
        lat: 41.3851,
        lng: 2.1734
      }
    },
    categories: ['Health', 'Science'],
    author: mockUsers[1],
    createdAt: '2023-10-20T11:05:00Z',
    updatedAt: '2023-10-20T11:05:00Z',
    upvotes: 1245,
    downvotes: 37,
    viewCount: 19840,
    isModerated: true,
    comments: 163
  },
  {
    id: '7',
    title: 'The Rise of Electric Vehicles',
    description: 'How EVs are transforming transportation worldwide',
    content: 'Electric vehicles have seen unprecedented growth in the past year with sales increasing by over 60% globally. Major automakers have committed to phasing out combustion engines, with some setting ambitious targets as early as 2030. This shift is being driven by a combination of government incentives, improved battery technology, and growing consumer awareness of environmental issues.',
    thumbnail: 'https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg?auto=compress&cs=tinysrgb&w=640',
    type: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    location: {
      city: 'Berlin',
      state: '',
      country: 'Germany',
      coordinates: {
        lat: 52.5200,
        lng: 13.4050
      }
    },
    categories: ['Technology', 'Environment', 'Business'],
    author: mockUsers[0],
    createdAt: '2023-10-21T08:30:00Z',
    updatedAt: '2023-10-21T08:30:00Z',
    upvotes: 2156,
    downvotes: 89,
    viewCount: 34520,
    isModerated: true,
    comments: 246
  },
  {
    id: '8',
    title: 'Local School Wins National Science Competition',
    description: 'Students develop innovative solution to plastic pollution in waterways.',
    content: 'A team of high school students from Westridge Academy has won first place in the National Student Innovation Challenge with their project addressing plastic pollution in urban waterways. The students designed a solar-powered filtering system that can be deployed in rivers and streams to collect microplastics before they reach the ocean. The team will receive a $50,000 grant to further develop their invention.',
    thumbnail: 'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=640',
    type: 'article',
    location: {
      city: 'Portland',
      state: 'Oregon',
      country: 'USA',
      coordinates: {
        lat: 45.5051,
        lng: -122.6750
      }
    },
    categories: ['Education', 'Science', 'Environment'],
    author: mockUsers[1],
    createdAt: '2023-10-22T15:45:00Z',
    updatedAt: '2023-10-22T15:45:00Z',
    upvotes: 945,
    downvotes: 21,
    viewCount: 15670,
    isModerated: true,
    comments: 97
  }
];

export const trendingTopics = [
  'Climate Action',
  'Tech Innovation',
  'Healthcare Reform',
  'Economic Growth',
  'Education',
  'Urban Development',
  'International Relations',
  'Sports'
];

export const mockComments: Record<string, Comment[]> = {
  '1': [
    {
      id: '101',
      content: 'This is a significant breakthrough! I wonder how scalable this technology will be for home use.',
      author: mockUsers[1],
      createdAt: '2023-10-15T14:25:00Z',
      upvotes: 45,
      downvotes: 2,
      replies: [
        {
          id: '101-1',
          content: 'The paper mentions potential home applications within 3-5 years. Really exciting!',
          author: mockUsers[2],
          createdAt: '2023-10-15T15:10:00Z',
          upvotes: 18,
          downvotes: 0
        }
      ]
    },
    {
      id: '102',
      content: 'I\'ve been following this research team for years. They consistently deliver innovative solutions.',
      author: mockUsers[3],
      createdAt: '2023-10-15T16:40:00Z',
      upvotes: 32,
      downvotes: 1
    }
  ],
  '3': [
    {
      id: '301',
      content: 'About time we saw some concrete targets! Let us hope they actually follow through this time.',
      author: mockUsers[0],
      createdAt: '2023-10-17T11:05:00Z',
      upvotes: 87,
      downvotes: 5
    },
    {
      id: '302',
      content: 'As someone working in climate science, I can say these targets are ambitious but necessary.',
      author: mockUsers[1],
      createdAt: '2023-10-17T12:30:00Z',
      upvotes: 112,
      downvotes: 3,
      replies: [
        {
          id: '302-1',
          content: 'Would you mind sharing some insights on how these targets compare to previous agreements?',
          author: mockUsers[3],
          createdAt: '2023-10-17T13:15:00Z',
          upvotes: 24,
          downvotes: 0
        },
        {
          id: '302-2',
          content: 'They are significantly more aggressive and have clearer enforcement mechanisms. Previous agreements lacked teeth.',
          author: mockUsers[1],
          createdAt: '2023-10-17T14:00:00Z',
          upvotes: 45,
          downvotes: 1
        }
      ]
    }
  ]
};

// Mock functions to simulate API calls
export const fetchTrendingNews = () => {
  return new Promise<NewsItem[]>((resolve) => {
    setTimeout(() => {
      const sorted = [...mockNews].sort((a, b) => {
        const aScore = a.upvotes - a.downvotes + (a.viewCount / 1000);
        const bScore = b.upvotes - b.downvotes + (b.viewCount / 1000);
        return bScore - aScore;
      });
      resolve(sorted);
    }, 500);
  });
};

export const fetchNewsByLocation = (location: string) => {
  return new Promise<NewsItem[]>((resolve) => {
    setTimeout(() => {
      const filtered = mockNews.filter(news => 
        news.location.city.toLowerCase().includes(location.toLowerCase()) ||
        news.location.state.toLowerCase().includes(location.toLowerCase()) ||
        news.location.country.toLowerCase().includes(location.toLowerCase())
      );
      resolve(filtered);
    }, 500);
  });
};

export const fetchNewsByCategory = (category: string) => {
  return new Promise<NewsItem[]>((resolve) => {
    setTimeout(() => {
      const filtered = mockNews.filter(news => 
        news.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
      );
      resolve(filtered);
    }, 500);
  });
};

export const fetchNewsById = (id: string) => {
  return new Promise<NewsItem | undefined>((resolve) => {
    setTimeout(() => {
      const news = mockNews.find(item => item.id === id);
      resolve(news);
    }, 300);
  });
};

export const fetchCommentsByNewsId = (newsId: string) => {
  return new Promise<Comment[]>((resolve) => {
    setTimeout(() => {
      resolve(mockComments[newsId] || []);
    }, 300);
  });
};

export const getCurrentUser = (): User => {
  return mockUsers[0];
};