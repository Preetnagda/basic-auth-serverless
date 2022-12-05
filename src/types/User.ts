export interface BasicUser {
    username: string;
    email: string;
}

export interface UserDetails extends BasicUser {
    firstName: string;
    lastName: string;
    profilePicture?: string;
}

export interface UserAuth extends BasicUser {
    password: string;
}