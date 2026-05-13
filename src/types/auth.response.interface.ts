export type AuthUser = {
  name: string;
  email: string;
  role: string;
};

export type AuthSuccessResponse = {
  message: "success";
  user: AuthUser;
  token: string;
};

export type AuthErrorResponse = {
  statusMsg: "fail";
  message: string;
};
