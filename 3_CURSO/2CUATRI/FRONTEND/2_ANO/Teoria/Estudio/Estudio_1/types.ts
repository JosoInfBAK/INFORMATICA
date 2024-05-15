export type Breed = {
    [key: string]: string[];
  };
  export type ResponseBreeds = {
    message: Breed[];
  };
  export type RandomImageResponse= {
    message: string;
    status: string;
};
  
export type RandomImageResponsePage = {
  RandomImageResponse: RandomImageResponse;
  breedName: string;
}
export type RecievedImage={
  message: string[];
}
export type  ResponseAPI = {
  data: {
    message: string[];
  };
};