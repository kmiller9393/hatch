export type Location = {
    id: string;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
  }
  
  export type UserLocation = {
    coords: {
      latitude: number;
      longitude: number;
    };
  }