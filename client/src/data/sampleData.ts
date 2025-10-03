import { CredentialsData, IdeasData, TodoData, UserProfile } from "@/types/Forms";

// Sample todo data
export const sampleTodos: TodoData[] = [
    {
      id: "1",
      title: "Complete project proposal",
      description: "Finish the project proposal document and send it to the client for review",
      status: "in-progress",
      priority: "high",
      createdAt: new Date('2024-01-15'),
      expireDate: new Date('2024-02-01'),
      originalExpireDate: new Date('2024-02-01'),
      extensionCount: 0,
      tags: ["work", "urgent", "documentation"]
    },
    {
      id: "2",
      title: "Buy groceries",
      description: "Milk, eggs, bread, fruits, and vegetables",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-20'),
      expireDate: new Date('2024-01-22'),
      originalExpireDate: new Date('2024-01-22'),
      extensionCount: 0,
      tags: ["personal", "shopping"]
    },
    {
      id: "3",
      title: "Fix login issue",
      description: "Investigate and fix the authentication problem in the mobile app",
      status: "completed",
      priority: "high",
      createdAt: new Date('2024-01-10'),
      expireDate: new Date('2024-01-18'),
      originalExpireDate: new Date('2024-01-18'),
      lastExtendedDate: new Date('2024-01-17'),
      extensionCount: 1,
      tags: ["bug", "mobile", "authentication"]
    },
    {
      id: "4",
      title: "Write unit tests",
      description: "Add comprehensive unit tests for the new payment module",
      status: "paused",
      priority: "medium",
      createdAt: new Date('2024-01-18'),
      expireDate: new Date('2024-02-10'),
      originalExpireDate: new Date('2024-02-10'),
      extensionCount: 0,
      tags: ["development", "testing", "backend"]
    },
    {
      id: "5",
      title: "Team meeting preparation",
      description: "Prepare agenda and materials for the quarterly team meeting",
      status: "pending",
      priority: "low",
      createdAt: new Date('2024-01-22'),
      expireDate: new Date('2024-01-25'),
      originalExpireDate: new Date('2024-01-25'),
      extensionCount: 0,
      tags: ["meeting", "preparation"]
    },
    {
      id: "6",
      title: "Update documentation",
      description: "Update API documentation with the new endpoints",
      status: "failed",
      priority: "medium",
      createdAt: new Date('2024-01-12'),
      expireDate: new Date('2024-01-19'),
      originalExpireDate: new Date('2024-01-19'),
      extensionCount: 2,
      tags: ["documentation", "api"]
    },
    {
      id: "7",
      title: "Design new dashboard",
      description: "Create wireframes and mockups for the analytics dashboard",
      status: "in-progress",
      priority: "high",
      createdAt: new Date('2024-01-16'),
      expireDate: new Date('2024-02-05'),
      originalExpireDate: new Date('2024-02-05'),
      extensionCount: 0,
      tags: ["design", "ui/ux", "analytics"]
    },
    {
      id: "8",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "9",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "10",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "11",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "12",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "13",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "14",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "15",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "16",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "17",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "18",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "19",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "20",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "21",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "22",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "23",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "24",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "25",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "26",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "27",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "28",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "29",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "30",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "31",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "32",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "33",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "34",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "35",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "36",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "37",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "38",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "39",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
    {
      id: "40",
      title: "Review pull requests",
      description: "Review and merge pending pull requests in the main repository",
      status: "pending",
      priority: "medium",
      createdAt: new Date('2024-01-21'),
      expireDate: new Date('2024-01-23'),
      originalExpireDate: new Date('2024-01-23'),
      extensionCount: 0,
      tags: ["code-review", "github"]
    },
];


// Sample data
export const sampleIdeas: IdeasData[] = [
    {
      title: "AI-Powered Personal Assistant",
      description: "Build a smart personal assistant that learns from user behavior and can automate routine tasks, schedule management, and provide intelligent suggestions.",
      createAt: new Date('2024-01-15')
    },
    {
      title: "Sustainable Urban Gardening App",
      description: "Mobile app that helps urban dwellers grow their own food with limited space, providing plant care tips, community features, and local resource sharing.",
      createAt: new Date('2024-01-20')
    },
    {
      title: "Virtual Reality Learning Platform",
      description: "Immersive educational platform where students can explore historical events, scientific concepts, and cultural experiences through virtual reality.",
      createAt: new Date('2024-01-10')
    },
    {
      title: "Blockchain-based Voting System",
      description: "Secure and transparent voting system using blockchain technology to ensure election integrity and prevent fraud.",
      createAt: new Date('2024-01-18')
    },
    {
      title: "Smart Home Energy Optimizer",
      description: "IoT system that monitors energy consumption and automatically optimizes usage patterns to reduce electricity bills and carbon footprint.",
      createAt: new Date('2024-01-22')
    },
    {
      title: "Mental Health Chatbot with AI",
      description: "AI-powered chatbot that provides mental health support, resources, and can detect when users need professional help.",
      createAt: new Date('2024-01-12')
    },
    {
      title: "Augmented Reality Shopping Assistant",
      description: "AR app that lets users visualize products in their space before purchasing, with AI recommendations based on style preferences.",
      createAt: new Date('2024-01-16')
    },
    {
      title: "Food Waste Reduction Platform",
      description: "Platform connecting restaurants and grocery stores with food banks to redistribute surplus food and reduce waste.",
      createAt: new Date('2024-01-21')
    },
    {
      title: "Personal Finance AI Coach",
      description: "AI system that analyzes spending patterns and provides personalized financial advice, investment suggestions, and savings goals.",
      createAt: new Date('2024-01-14')
    },
    {
      title: "Remote Team Collaboration Tool",
      description: "All-in-one platform for remote teams with integrated video calls, project management, and virtual team-building activities.",
      createAt: new Date('2024-01-19')
    },
    {
      title: "Smart Plant Monitoring System",
      description: "IoT sensors that monitor plant health and environmental conditions, sending alerts and care recommendations to users.",
      createAt: new Date('2024-01-23')
    },
    {
      title: "Language Learning Game",
      description: "Gamified language learning app that uses AI to adapt difficulty and content based on user progress and interests.",
      createAt: new Date('2024-01-17')
    }
];
  

// src/data/sampleCredentials.ts
export const sampleCredentials: CredentialsData[] = [
  {
    url: "https://github.com",
    username: "alex.dev@techcompany.com",
    description: "Primary GitHub account for all company projects, repositories, and CI/CD pipelines",
    createAt: new Date('2024-01-15')
  },
  {
    url: "https://aws.amazon.com",
    username: "cloud-admin@techcompany.com",
    description: "AWS management console for production infrastructure, S3 buckets, and EC2 instances",
    createAt: new Date('2024-02-20')
  },
  {
    url: "https://stripe.com",
    username: "payments@myapp.com",
    description: "Stripe dashboard for handling customer subscriptions, invoices, and payment processing",
    createAt: new Date('2024-01-08')
  },
  {
    url: "https://dashboard.heroku.com",
    username: "deploy@production.com",
    description: "Heroku production environment for web application deployment and monitoring",
    createAt: new Date('2024-03-05')
  },
  {
    url: "https://analytics.google.com",
    username: "analytics@business.com",
    description: "Google Analytics 4 property for tracking website traffic and user behavior analytics",
    createAt: new Date('2024-02-12')
  },
  {
    url: "https://cloud.digitalocean.com",
    username: "devops@company.com",
    description: "DigitalOcean droplets and spaces for staging environment and backup storage",
    createAt: new Date('2024-01-25')
  },
  {
    url: "https://app.netlify.com",
    username: "frontend-team@company.com",
    description: "Netlify for continuous deployment of React and Vue.js frontend applications",
    createAt: new Date('2024-03-15')
  },
  {
    url: "https://vercel.com",
    username: "nextjs-projects@dev.com",
    description: "Vercel platform for Next.js applications, serverless functions, and edge deployment",
    createAt: new Date('2024-02-28')
  },
  {
    url: "https://slack.com",
    username: "alex.johnson@workspace.com",
    description: "Team communication workspace for development, design, and product discussions",
    createAt: new Date('2024-01-10')
  },
  {
    url: "https://figma.com",
    username: "uiux@designstudio.com",
    description: "Figma team workspace for design system, wireframes, and prototype collaboration",
    createAt: new Date('2024-03-01')
  },
  {
    url: "https://mongodb.com",
    username: "database-admin@backend.com",
    description: "MongoDB Atlas cluster for production database, backups, and performance monitoring",
    createAt: new Date('2024-02-05')
  },
  {
    url: "https://sendgrid.com",
    username: "notifications@system.com",
    description: "SendGrid account for transactional emails, marketing campaigns, and email analytics",
    createAt: new Date('2024-01-30')
  },
  {
    url: "https://mailchimp.com",
    username: "marketing@startup.com",
    description: "Mailchimp for newsletter campaigns, audience segmentation, and email automation",
    createAt: new Date('2024-02-18')
  },
  {
    url: "https://hubspot.com",
    username: "crm@sales.com",
    description: "HubSpot CRM for lead management, customer tracking, and sales pipeline",
    createAt: new Date('2024-03-10')
  },
  {
    url: "https://zapier.com",
    username: "automation@workflows.com",
    description: "Zapier for automating workflows between different apps and services",
    createAt: new Date('2024-01-22')
  },
  {
    url: "https://trello.com",
    username: "project-manager@team.com",
    description: "Trello boards for project management, task tracking, and team collaboration",
    createAt: new Date('2024-02-14')
  },
  {
    url: "https://asana.com",
    username: "team-lead@projects.com",
    description: "Asana workspace for team tasks, project timelines, and progress tracking",
    createAt: new Date('2024-03-08')
  },
  {
    url: "https://notion.so",
    username: "docs@company.com",
    description: "Notion workspace for documentation, wikis, and knowledge base management",
    createAt: new Date('2024-01-18')
  },
  {
    url: "https://dropbox.com",
    username: "files@backup.com",
    description: "Dropbox Business for file storage, team folders, and document sharing",
    createAt: new Date('2024-02-25')
  },
  {
    url: "https://drive.google.com",
    username: "storage@company.com",
    description: "Google Drive for collaborative documents, spreadsheets, and team files",
    createAt: new Date('2024-03-12')
  },
  {
    url: "https://linkedin.com",
    username: "social-media@brand.com",
    description: "LinkedIn Company Page for brand presence, content sharing, and recruitment",
    createAt: new Date('2024-01-28')
  },
  {
    url: "https://twitter.com",
    username: "social@startup.com",
    description: "Twitter business account for brand engagement and customer support",
    createAt: new Date('2024-02-08')
  },
  {
    url: "https://facebook.com",
    username: "ads@marketing.com",
    description: "Facebook Business Manager for ad campaigns and audience insights",
    createAt: new Date('2024-03-18')
  },
  {
    url: "https://instagram.com",
    username: "content@brand.com",
    description: "Instagram Business account for visual content and community engagement",
    createAt: new Date('2024-01-14')
  },
  {
    url: "https://cloudflare.com",
    username: "security@infra.com",
    description: "Cloudflare for DNS management, CDN, and website security protection",
    createAt: new Date('2024-02-22')
  },
  {
    url: "https://namecheap.com",
    username: "domains@company.com",
    description: "Namecheap account for domain registration, SSL certificates, and DNS management",
    createAt: new Date('2024-03-03')
  },
  {
    url: "https://godaddy.com",
    username: "domains@business.com",
    description: "GoDaddy for additional domain portfolio and email hosting services",
    createAt: new Date('2024-01-07')
  },
  {
    url: "https://wordpress.com",
    username: "blog@content.com",
    description: "WordPress.com for company blog, content management, and SEO optimization",
    createAt: new Date('2024-02-16')
  },
  {
    url: "https://shopify.com",
    username: "store@ecommerce.com",
    description: "Shopify store for online sales, product management, and order processing",
    createAt: new Date('2024-03-20')
  },
  {
    url: "https://quickbooks.com",
    username: "accounting@finance.com",
    description: "QuickBooks Online for invoicing, expense tracking, and financial reporting",
    createAt: new Date('2024-01-05')
  },
  {
    url: "https://xero.com",
    username: "bookkeeping@accounts.com",
    description: "Xero accounting software for bank reconciliation and financial management",
    createAt: new Date('2024-02-11')
  },
  {
    url: "https://zoom.us",
    username: "meetings@company.com",
    description: "Zoom Business for team meetings, webinars, and video conferences",
    createAt: new Date('2024-03-14')
  },
  {
    url: "https://meet.google.com",
    username: "video-calls@team.com",
    description: "Google Meet for daily standups, client calls, and team collaborations",
    createAt: new Date('2024-01-12')
  },
  {
    url: "https://calendly.com",
    username: "scheduling@company.com",
    description: "Calendly for appointment scheduling, meeting bookings, and calendar management",
    createAt: new Date('2024-02-09')
  },
  {
    url: "https://lastpass.com",
    username: "security-admin@company.com",
    description: "LastPass Business for team password management and secure credential sharing",
    createAt: new Date('2024-03-16')
  },
  {
    url: "https://1password.com",
    username: "vault@security.com",
    description: "1Password vault for personal credentials and secure note storage",
    createAt: new Date('2024-01-20')
  },
  {
    url: "https://bitwarden.com",
    username: "passwords@team.com",
    description: "Bitwarden for open-source password management across development team",
    createAt: new Date('2024-02-27')
  },
  {
    url: "https://docker.com",
    username: "containers@devops.com",
    description: "Docker Hub for container registry, image storage, and CI/CD pipelines",
    createAt: new Date('2024-03-07')
  },
  {
    url: "https://npmjs.com",
    username: "packages@developer.com",
    description: "npm account for package publishing, private modules, and dependency management",
    createAt: new Date('2024-01-09')
  },
  {
    url: "https://pypi.org",
    username: "python-dev@projects.com",
    description: "PyPI account for Python package distribution and version management",
    createAt: new Date('2024-02-19')
  },
  {
    url: "https://rubygems.org",
    username: "ruby-gems@dev.com",
    description: "RubyGems account for gem publishing and Ruby dependency management",
    createAt: new Date('2024-03-11')
  }
];


export const sampleUser: UserProfile = {
  id: 'user-123',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  phone: '+1 (555) 123-4567',
  bio: 'Full-stack developer passionate about creating amazing user experiences. Love working with React, TypeScript, and modern web technologies.',
  createdAt: new Date('2023-01-15'),
  updatedAt: new Date('2024-03-20')
};