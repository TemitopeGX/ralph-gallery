export interface Image {
  _id?: string;
  url: string;
  title?: string;
  description?: string;
  category?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: Image;
  images: Image[];
  createdAt: string;
}
