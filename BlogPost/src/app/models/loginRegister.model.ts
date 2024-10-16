export interface LoginDTO {
    email: string;
    password: string;
    rememberMe: boolean;
  }
  
  export interface RegisterDTO {
    userName: string;
    email: string;
    password: string;
  }
  
  // export interface LoginResponseDTO {
  //   id: string;
  //   email: string;
  //   userName: string;
  //   token: string;
  // }
  export interface LoginResponseDTO {
    data: {
      id: string;
      email: string;
      userName: string;
      token: string;
    };
  }
  